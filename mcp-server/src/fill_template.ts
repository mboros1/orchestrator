import { promises as fs } from 'fs';
import path from 'path';
import { getValidPlaceholders } from './validate_templates.js';

interface FillResult {
  success: boolean;
  message: string;
  replacedCount: number;
  appendedCount: number;
  warnings: string[];
}

interface TemplateSpecific {
  replacements?: Record<string, string>;
  appendSections?: Record<string, string>;
}

interface FillWorkerResult {
  success: boolean;
  templates: Record<string, FillResult>;
  summary: string;
}

interface ProjectInfo {
  branchName: string;
  workerName: string;
  prUrl?: string;
  repoUrl: string;
  featureName: string;
  buildCommands?: string;
  prNumber?: string;
  projectName: string;
  priority?: string;
}

/**
 * Fill template with provided values and optional append sections
 */
export async function fillTemplate(
  templatePath: string, 
  replacements: Record<string, string> = {}, 
  appendSections: Record<string, string> = {}
): Promise<FillResult> {
  const result: FillResult = {
    success: false,
    message: '',
    replacedCount: 0,
    appendedCount: 0,
    warnings: []
  };

  try {
    try {
      await fs.access(templatePath);
    } catch {
      result.message = `Template file not found: ${templatePath}`;
      return result;
    }

    // Read template content
    let content = await fs.readFile(templatePath, 'utf-8');
    const validPlaceholders = getValidPlaceholders();

    // Track what we've replaced
    const replacedPlaceholders = new Set<string>();

    // Replace placeholders
    for (const [placeholder, value] of Object.entries(replacements)) {
      let normalizedPlaceholder = placeholder;
      
      if (!placeholder.startsWith('__ORCH_') || !placeholder.endsWith('__')) {
        // Normalize the placeholder format if needed
        normalizedPlaceholder = `__ORCH_${placeholder.replace(/^__ORCH_|__$/g, '')}__`;
      }
      
      if (validPlaceholders[normalizedPlaceholder]) {
        const regex = new RegExp(normalizedPlaceholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const occurrences = (content.match(regex) || []).length;
        
        if (occurrences > 0) {
          content = content.replace(regex, value);
          replacedPlaceholders.add(normalizedPlaceholder);
          result.replacedCount += occurrences;
        }
      } else {
        result.warnings.push(`Unknown placeholder: ${placeholder}`);
      }
    }

    // Process append sections
    for (const [marker, sectionContent] of Object.entries(appendSections)) {
      const appendMarker = `<!-- ORCHESTRATOR:APPEND:${marker} -->`;
      
      if (content.includes(appendMarker)) {
        // Insert content after the marker
        content = content.replace(
          appendMarker,
          `${appendMarker}\n\n${sectionContent}\n`
        );
        result.appendedCount++;
      } else {
        // If marker not found, append to end of file
        content += `\n\n${sectionContent}\n`;
        result.appendedCount++;
        result.warnings.push(`Marker '${appendMarker}' not found, appended to end of file`);
      }
    }

    // Write the filled template
    await fs.writeFile(templatePath, content, 'utf-8');

    result.success = true;
    result.message = `Successfully processed ${templatePath}: ${result.replacedCount} replacements, ${result.appendedCount} sections appended`;

    // Check for any remaining placeholders
    const remainingPlaceholders = content.match(/__ORCH_[A-Z_]+__/g);
    if (remainingPlaceholders) {
      result.warnings.push(`${remainingPlaceholders.length} placeholder(s) still remain unfilled`);
    }

  } catch (error: any) {
    result.message = `Error processing template: ${error.message}`;
  }

  return result;
}

/**
 * Fill multiple templates in a worker directory
 */
export async function fillWorkerTemplates(
  workerPath: string, 
  commonReplacements: Record<string, string> = {}, 
  templateSpecific: Record<string, TemplateSpecific> = {}
): Promise<FillWorkerResult> {
  const results: FillWorkerResult = {
    success: true,
    templates: {},
    summary: ''
  };

  const templates = ['ONBOARDING.md', 'CLAUDE.md', 'ASSIGNMENT.md'];

  for (const template of templates) {
    const templatePath = path.join(workerPath, template);
    
    try {
      await fs.access(templatePath);
    } catch {
      continue; // Skip if doesn't exist
    }

    // Merge common and specific replacements
    const replacements = {
      ...commonReplacements,
      ...(templateSpecific[template]?.replacements || {})
    };

    const appendSections = templateSpecific[template]?.appendSections || {};

    const result = await fillTemplate(templatePath, replacements, appendSections);
    results.templates[template] = result;

    if (!result.success) {
      results.success = false;
    }
  }

  // Generate summary
  const totalReplaced = Object.values(results.templates)
    .reduce((sum, r) => sum + (r.replacedCount || 0), 0);
  const totalAppended = Object.values(results.templates)
    .reduce((sum, r) => sum + (r.appendedCount || 0), 0);

  results.summary = `Processed ${Object.keys(results.templates).length} templates: ${totalReplaced} replacements, ${totalAppended} sections appended`;

  return results;
}

/**
 * Create a standard set of replacements from project info
 */
export function createStandardReplacements(projectInfo: ProjectInfo): Record<string, string> {
  return {
    '__ORCH_BRANCH_NAME__': projectInfo.branchName,
    '__ORCH_WORKER_NAME__': projectInfo.workerName,
    '__ORCH_PR_URL__': projectInfo.prUrl || '[PR will be created after first push]',
    '__ORCH_REPO_URL__': projectInfo.repoUrl,
    '__ORCH_PRIVATE_BRANCH__': `private/${projectInfo.workerName}/${projectInfo.featureName}`,
    '__ORCH_BUILD_COMMANDS__': projectInfo.buildCommands || '# Add project-specific build commands',
    '__ORCH_PR_NUMBER__': projectInfo.prNumber || '[TBD]',
    '__ORCH_START_DATE__': new Date().toISOString().split('T')[0],
    '__ORCH_PROJECT_NAME__': projectInfo.projectName,
    '__ORCH_DATE__': new Date().toISOString().split('T')[0],
    '__ORCH_PRIORITY__': projectInfo.priority || 'Medium'
  };
}