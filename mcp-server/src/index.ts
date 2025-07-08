#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { promises as fs } from "fs";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { validateTemplates, formatValidationResults } from "./validate_templates.js";
import { fillWorkerTemplates, createStandardReplacements } from "./fill_template.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Tool schemas
const CreateWorkerSchema = z.object({
  workerName: z.string().describe("Name of the worker (e.g., 'worker_1')"),
  projectRepo: z.string().describe("Git URL of the project repository"),
  projectPath: z.string().describe("Path to the orchestrator repository"),
});

const SetupBranchSchema = z.object({
  workerPath: z.string().describe("Path to worker's project directory"),
  branchName: z.string().describe("Feature branch name (e.g., 'feature/add-auth')"),
  baseBranch: z.string().default("main").describe("Base branch to create from"),
});

const CopyTemplatesSchema = z.object({
  orchestratorPath: z.string().describe("Path to orchestrator repository"),
  workerProjectPath: z.string().describe("Path to worker's project directory"),
});

const CreatePrivateBranchSchema = z.object({
  workerPath: z.string().describe("Path to worker's project directory"),
  workerName: z.string().describe("Name of the worker"),
  featureName: z.string().describe("Feature name for the private branch"),
});

const BackupClaudemdSchema = z.object({
  workerPath: z.string().describe("Path to worker's project directory"),
  privateBranch: z.string().describe("Private branch name"),
});

const ValidateTemplatesSchema = z.object({
  workerPath: z.string().describe("Path to worker's project directory"),
});

const FillTemplatesSchema = z.object({
  workerPath: z.string().describe("Path to worker's project directory"),
  projectInfo: z.object({
    branchName: z.string(),
    workerName: z.string(),
    repoUrl: z.string(),
    featureName: z.string(),
    projectName: z.string(),
    prUrl: z.string().optional(),
    buildCommands: z.string().optional(),
    prNumber: z.string().optional(),
    priority: z.string().optional(),
  }).describe("Project information for replacements"),
  customSections: z.record(z.string(), z.object({
    replacements: z.record(z.string(), z.string()).optional(),
    appendSections: z.record(z.string(), z.string()).optional(),
  })).optional().describe("Template-specific customizations"),
});

// Create MCP server
const server = new Server(
  {
    name: "orchestrator-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Helper functions
async function runCommand(command: string, cwd?: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    // Parse command and arguments
    const [cmd, ...args] = command.match(/(?:[^\s"]+|"[^"]*")+/g)?.map(arg => 
      arg.startsWith('"') && arg.endsWith('"') ? arg.slice(1, -1) : arg
    ) || [];
    
    if (!cmd) {
      reject(new Error('Invalid command'));
      return;
    }

    const proc = spawn(cmd, args, {
      cwd,
      shell: false,
      env: { ...process.env, PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin' }
    });

    let stdout = '';
    let stderr = '';

    proc.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr || stdout}\nCommand: ${command}`));
      }
    });

    proc.on('error', (error) => {
      reject(new Error(`Failed to execute command: ${error.message}\nCommand: ${command}`));
    });
  });
}

async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

// Tool: Create Worker Workspace
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "create_worker",
        description: "Create a new worker workspace with cloned project repository",
        inputSchema: {
          type: "object",
          properties: {
            workerName: { type: "string", description: "Name of the worker (e.g., 'worker_1')" },
            projectRepo: { type: "string", description: "Git URL of the project repository" },
            projectPath: { type: "string", description: "Path to the orchestrator repository" },
          },
          required: ["workerName", "projectRepo", "projectPath"],
        },
      },
      {
        name: "setup_branch",
        description: "Create and checkout a feature branch for the worker",
        inputSchema: {
          type: "object",
          properties: {
            workerPath: { type: "string", description: "Path to worker's project directory" },
            branchName: { type: "string", description: "Feature branch name" },
            baseBranch: { type: "string", description: "Base branch to create from", default: "main" },
          },
          required: ["workerPath", "branchName"],
        },
      },
      {
        name: "copy_templates",
        description: "Copy orchestrator templates and assistant files to worker project",
        inputSchema: {
          type: "object",
          properties: {
            orchestratorPath: { type: "string", description: "Path to orchestrator repository" },
            workerProjectPath: { type: "string", description: "Path to worker's project directory" },
          },
          required: ["orchestratorPath", "workerProjectPath"],
        },
      },
      {
        name: "create_private_branch",
        description: "Create a private branch for worker's CLAUDE.md backup",
        inputSchema: {
          type: "object",
          properties: {
            workerPath: { type: "string", description: "Path to worker's project directory" },
            workerName: { type: "string", description: "Name of the worker" },
            featureName: { type: "string", description: "Feature name for the private branch" },
          },
          required: ["workerPath", "workerName", "featureName"],
        },
      },
      {
        name: "backup_claudemd",
        description: "Backup CLAUDE.md to worker's private branch",
        inputSchema: {
          type: "object",
          properties: {
            workerPath: { type: "string", description: "Path to worker's project directory" },
            privateBranch: { type: "string", description: "Private branch name" },
          },
          required: ["workerPath", "privateBranch"],
        },
      },
      {
        name: "validate_templates",
        description: "Validate template files for remaining orchestrator placeholders. Run after copying templates to check for unfilled placeholders.",
        inputSchema: {
          type: "object",
          properties: {
            workerPath: { type: "string", description: "Path to worker's project directory" },
          },
          required: ["workerPath"],
        },
      },
      {
        name: "fill_templates",
        description: "Fill template placeholders with project-specific values and add custom sections",
        inputSchema: {
          type: "object",
          properties: {
            workerPath: { type: "string", description: "Path to worker's project directory" },
            projectInfo: { 
              type: "object",
              description: "Project information for replacements",
              properties: {
                branchName: { type: "string" },
                workerName: { type: "string" },
                repoUrl: { type: "string" },
                featureName: { type: "string" },
                projectName: { type: "string" },
                prUrl: { type: "string" },
                buildCommands: { type: "string" },
                prNumber: { type: "string" },
                priority: { type: "string" },
              },
              required: ["branchName", "workerName", "repoUrl", "featureName", "projectName"],
            },
            customSections: {
              type: "object",
              description: "Template-specific customizations",
              additionalProperties: {
                type: "object",
                properties: {
                  replacements: { type: "object", additionalProperties: { type: "string" } },
                  appendSections: { type: "object", additionalProperties: { type: "string" } },
                },
              },
            },
          },
          required: ["workerPath", "projectInfo"],
        },
      },
      {
        name: "activate_sharp_mode",
        description: "CRITICAL: Activate Sharp Mode by reading assistant/sharp_mode.txt. USE THIS: At conversation start, every 10-15 messages, after breaks, when writing becomes cushioned/apologetic, before critical analysis.",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "activate_absolute_mode",
        description: "Activate Absolute Mode for documentation writing. USE THIS: ONLY when writing *.md files, README files, or other documentation. Switch back to Sharp Mode immediately after documentation task.",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Tool handlers
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "create_worker": {
        const { workerName, projectRepo, projectPath } = CreateWorkerSchema.parse(args);
        
        const workspacePath = path.join(projectPath, "project_workspace", workerName);
        await ensureDirectory(workspacePath);
        
        // Extract project name from repo URL
        const projectName = projectRepo.split('/').pop()?.replace('.git', '') || 'project';
        const projectDir = path.join(workspacePath, projectName);
        
        // Clone the repository into a subdirectory
        await runCommand(`git clone "${projectRepo}" "${projectName}"`, workspacePath);
        
        return {
          content: [
            {
              type: "text",
              text: `✅ Created worker workspace at: ${workspacePath}\n✅ Cloned repository to: ${projectDir}`,
            },
          ],
        };
      }

      case "setup_branch": {
        const { workerPath, branchName, baseBranch } = SetupBranchSchema.parse(args);
        
        try {
          // Verify directory exists
          await fs.access(workerPath);
          
          // Check if it's a git repository
          try {
            await runCommand("git rev-parse --git-dir", workerPath);
          } catch {
            throw new Error(`Not a git repository: ${workerPath}`);
          }
          
          // Fetch latest changes
          await runCommand("git fetch origin", workerPath);
          
          // Check if branch already exists
          try {
            await runCommand(`git rev-parse --verify "${branchName}"`, workerPath);
            // Branch exists, check it out
            await runCommand(`git checkout "${branchName}"`, workerPath);
          } catch {
            // Branch doesn't exist, create it
            await runCommand(`git checkout -b "${branchName}" "origin/${baseBranch}"`, workerPath);
          }
          
          return {
            content: [
              {
                type: "text",
                text: `✅ Created and checked out branch: ${branchName}\n✅ Based on: origin/${baseBranch}`,
              },
            ],
          };
        } catch (error: any) {
          // Provide fallback bash commands
          return {
            content: [
              {
                type: "text",
                text: `❌ Error: ${error.message}\n\nFallback commands:\n\`\`\`bash\ncd "${workerPath}"\ngit fetch origin\ngit checkout -b "${branchName}" "origin/${baseBranch}"\n\`\`\``,
              },
            ],
          };
        }
      }

      case "copy_templates": {
        const { orchestratorPath, workerProjectPath } = CopyTemplatesSchema.parse(args);
        
        let copiedItems = [];
        
        // Copy assistant directory if exists
        const assistantSrc = path.join(orchestratorPath, "assistant");
        const assistantDest = path.join(workerProjectPath, "assistant");
        if (await directoryExists(assistantSrc)) {
          await runCommand(`cp -r "${assistantSrc}" "${assistantDest}"`);
          copiedItems.push("assistant/ directory");
        }
        
        // Copy ONBOARDING_TEMPLATE.md as ONBOARDING.md
        const onboardingSrc = path.join(orchestratorPath, "ONBOARDING_TEMPLATE.md");
        const onboardingDest = path.join(workerProjectPath, "ONBOARDING.md");
        try {
          await fs.access(onboardingSrc);
          await fs.copyFile(onboardingSrc, onboardingDest);
          copiedItems.push("ONBOARDING.md");
        } catch {
          // Template doesn't exist
        }
        
        // Create CLAUDE.md from template or create empty
        const claudemdDest = path.join(workerProjectPath, "CLAUDE.md");
        const claudemdTemplate = path.join(orchestratorPath, "CLAUDE_TEMPLATE.md");
        try {
          await fs.access(claudemdTemplate);
          await fs.copyFile(claudemdTemplate, claudemdDest);
          copiedItems.push("CLAUDE.md (from template)");
        } catch {
          // Create default CLAUDE.md
          const defaultContent = `# Worker CLAUDE.md - ${path.basename(workerProjectPath)}\n\n**Branch**: [feature-branch]\n**Private Branch**: [private-branch]\n**Assignment PR**: #[PR-number]\n**Started**: ${new Date().toISOString().split('T')[0]}\n\n## Project Context\n\n[To be filled]\n\n## My Task Understanding\n\n[To be filled]\n\n## Technical Approach\n\n[To be filled]\n\n## Progress Log\n\n[To be filled]\n\n---\n\n**IMPORTANT**: This file should NEVER be committed to your feature branch!\n`;
          await fs.writeFile(claudemdDest, defaultContent);
          copiedItems.push("CLAUDE.md (default created)");
        }
        
        // Add CLAUDE.md to git exclusions
        const excludePath = path.join(workerProjectPath, ".git", "info", "exclude");
        try {
          await fs.access(excludePath);
          const excludeContent = await fs.readFile(excludePath, 'utf-8');
          if (!excludeContent.includes('CLAUDE.md')) {
            await fs.appendFile(excludePath, '\nCLAUDE.md\n');
            copiedItems.push("Git exclusion for CLAUDE.md");
          }
        } catch {
          // .git/info/exclude might not exist yet
        }
        
        return {
          content: [
            {
              type: "text",
              text: `✅ Copied files:\n${copiedItems.map(item => `  - ${item}`).join('\n')}`,
            },
          ],
        };
      }

      case "create_private_branch": {
        const { workerPath, workerName, featureName } = CreatePrivateBranchSchema.parse(args);
        
        const privateBranch = `private/${workerName}/${featureName}`;
        
        try {
          // Verify it's a git repository
          await runCommand("git rev-parse --git-dir", workerPath);
          
          // Get current branch to return to it later
          const { stdout: currentBranch } = await runCommand("git rev-parse --abbrev-ref HEAD", workerPath);
          
          // Check if private branch already exists
          try {
            await runCommand(`git rev-parse --verify "${privateBranch}"`, workerPath);
            // Branch exists
            return {
              content: [
                {
                  type: "text",
                  text: `ℹ️ Private branch already exists: ${privateBranch}`,
                },
              ],
            };
          } catch {
            // Branch doesn't exist, create it
            await runCommand(`git checkout -b "${privateBranch}"`, workerPath);
            
            // Add CLAUDE.md to git exclusions if not already
            const excludePath = path.join(workerPath, ".git", "info", "exclude");
            try {
              const excludeContent = await fs.readFile(excludePath, 'utf-8');
              if (!excludeContent.includes('CLAUDE.md')) {
                await fs.appendFile(excludePath, '\nCLAUDE.md\n');
              }
            } catch {
              // .git/info/exclude doesn't exist, create it
              await fs.writeFile(excludePath, 'CLAUDE.md\n');
            }
            
            // Switch back to original branch
            await runCommand(`git checkout "${currentBranch.trim()}"`, workerPath);
            
            return {
              content: [
                {
                  type: "text",
                  text: `✅ Created private branch: ${privateBranch}\n✅ Added CLAUDE.md to git exclusions\n✅ Switched back to: ${currentBranch.trim()}`,
                },
              ],
            };
          }
        } catch (error: any) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error: ${error.message}\n\nManual steps:\n1. cd "${workerPath}"\n2. git checkout -b "${privateBranch}"\n3. echo "CLAUDE.md" >> .git/info/exclude\n4. git checkout -`,
              },
            ],
          };
        }
      }

      case "backup_claudemd": {
        const { workerPath, privateBranch } = BackupClaudemdSchema.parse(args);
        
        // Get current branch
        const { stdout: currentBranch } = await runCommand("git rev-parse --abbrev-ref HEAD", workerPath);
        
        // Switch to private branch
        await runCommand(`git checkout "${privateBranch}"`, workerPath);
        
        // Check if CLAUDE.md exists
        try {
          await fs.access(path.join(workerPath, "CLAUDE.md"));
          
          // Commit CLAUDE.md
          await runCommand("git add CLAUDE.md", workerPath);
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          await runCommand(`git commit -m "Backup CLAUDE.md - ${timestamp}"`, workerPath);
          
          // Push to private branch
          await runCommand(`git push -u origin "${privateBranch}"`, workerPath);
        } catch {
          // CLAUDE.md doesn't exist yet
        }
        
        // Switch back to original branch
        await runCommand(`git checkout "${currentBranch.trim()}"`, workerPath);
        
        return {
          content: [
            {
              type: "text",
              text: `✅ Backed up CLAUDE.md to: ${privateBranch}\n✅ Returned to feature branch`,
            },
          ],
        };
      }

      case "validate_templates": {
        const { workerPath } = ValidateTemplatesSchema.parse(args);
        
        try {
          const results = await validateTemplates(workerPath);
          const formatted = formatValidationResults(results);
          
          return {
            content: [
              {
                type: "text",
                text: formatted,
              },
            ],
          };
        } catch (error: any) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error validating templates: ${error.message}`,
              },
            ],
          };
        }
      }

      case "fill_templates": {
        const { workerPath, projectInfo, customSections } = FillTemplatesSchema.parse(args);
        
        try {
          // Create standard replacements
          const commonReplacements = createStandardReplacements(projectInfo);
          
          // Fill all templates
          const results = await fillWorkerTemplates(workerPath, commonReplacements, customSections || {});
          
          // Format results
          let output = [`${results.success ? '✅' : '❌'} ${results.summary}\n`];
          
          for (const [template, result] of Object.entries(results.templates)) {
            output.push(`📄 ${template}: ${result.message}`);
            if (result.warnings.length > 0) {
              result.warnings.forEach(w => output.push(`   ⚠️  ${w}`));
            }
          }
          
          return {
            content: [
              {
                type: "text",
                text: output.join('\n'),
              },
            ],
          };
        } catch (error: any) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Error filling templates: ${error.message}`,
              },
            ],
          };
        }
      }

      case "activate_sharp_mode": {
        const sharpModePath = path.join(process.cwd(), "assistant", "sharp_mode.txt");
        try {
          const content = await fs.readFile(sharpModePath, 'utf-8');
          return {
            content: [
              {
                type: "text",
                text: `Sharp Mode Activated. Instructions loaded:\n\n${content}\n\nMaintain this mode for all subsequent interactions.`,
              },
            ],
          };
        } catch (error: any) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Failed to activate Sharp Mode: ${error.message}`,
              },
            ],
          };
        }
      }

      case "activate_absolute_mode": {
        const absoluteModePath = path.join(process.cwd(), "assistant", "absolute_mode.txt");
        try {
          const content = await fs.readFile(absoluteModePath, 'utf-8');
          return {
            content: [
              {
                type: "text",
                text: `Absolute Mode Activated for documentation writing.\n\n${content}\n\nREMEMBER: Return to Sharp Mode after completing documentation.`,
              },
            ],
          };
        } catch (error: any) {
          return {
            content: [
              {
                type: "text",
                text: `❌ Failed to activate Absolute Mode: ${error.message}`,
              },
            ],
          };
        }
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `❌ Error: ${error.message}`,
        },
      ],
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Orchestrator MCP server started");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});