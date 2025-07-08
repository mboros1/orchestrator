#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { promises as fs } from "fs";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const execAsync = promisify(exec);
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
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    return { stdout, stderr };
  } catch (error: any) {
    throw new Error(`Command failed: ${error.message}\nCommand: ${command}`);
  }
}

async function ensureDirectory(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
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
        
        // Clone the repository
        await runCommand(`git clone "${projectRepo}" .`, workspacePath);
        
        return {
          content: [
            {
              type: "text",
              text: `✅ Created worker workspace at: ${workspacePath}\n✅ Cloned repository: ${projectRepo}`,
            },
          ],
        };
      }

      case "setup_branch": {
        const { workerPath, branchName, baseBranch } = SetupBranchSchema.parse(args);
        
        // Fetch latest changes
        await runCommand("git fetch origin", workerPath);
        
        // Create and checkout new branch
        await runCommand(`git checkout -b "${branchName}" "origin/${baseBranch}"`, workerPath);
        
        return {
          content: [
            {
              type: "text",
              text: `✅ Created and checked out branch: ${branchName}\n✅ Based on: origin/${baseBranch}`,
            },
          ],
        };
      }

      case "copy_templates": {
        const { orchestratorPath, workerProjectPath } = CopyTemplatesSchema.parse(args);
        
        // Copy assistant directory
        const assistantSrc = path.join(orchestratorPath, "assistant");
        const assistantDest = path.join(workerProjectPath, "assistant");
        await runCommand(`cp -r "${assistantSrc}" "${assistantDest}"`);
        
        // Copy templates
        const templates = ["ONBOARDING.md", "CLAUDE.md"];
        for (const template of templates) {
          const src = path.join(orchestratorPath, `template_${template}`);
          const dest = path.join(workerProjectPath, template);
          
          // Check if template exists
          try {
            await fs.access(src);
            await runCommand(`cp "${src}" "${dest}"`);
          } catch {
            // If template doesn't exist, skip it
          }
        }
        
        return {
          content: [
            {
              type: "text",
              text: `✅ Copied assistant/ directory\n✅ Copied available templates to worker project`,
            },
          ],
        };
      }

      case "create_private_branch": {
        const { workerPath, workerName, featureName } = CreatePrivateBranchSchema.parse(args);
        
        const privateBranch = `private/${workerName}/${featureName}`;
        
        // Create the private branch
        await runCommand(`git checkout -b "${privateBranch}"`, workerPath);
        
        // Switch back to feature branch
        await runCommand(`git checkout -`, workerPath);
        
        return {
          content: [
            {
              type: "text",
              text: `✅ Created private branch: ${privateBranch}\n✅ Switched back to feature branch`,
            },
          ],
        };
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
          await runCommand(`git commit -m "Backup CLAUDE.md - $(date +%Y-%m-%d_%H:%M:%S)"`, workerPath);
          
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