import { promises as fs } from 'fs';
import path from 'path';

interface ValidationResult {
  valid: boolean;
  filesChecked: string[];
  placeholdersFound: Record<string, PlaceholderInfo[]>;
  summary: string;
  errors: string[];
}

interface PlaceholderInfo {
  placeholder: string;
  line: number;
  preview: string;
}

/**
 * Validates template files for remaining orchestrator placeholders
 */
export async function validateTemplates(workerPath: string): Promise<ValidationResult> {
  const results: ValidationResult = {
    valid: true,
    filesChecked: [],
    placeholdersFound: {},
    summary: '',
    errors: []
  };

  // Define files to check
  const templateFiles = [
    'ONBOARDING.md',
    'CLAUDE.md',
    'ASSIGNMENT.md'
  ];

  // Regex to find orchestrator placeholders
  const placeholderRegex = /__ORCH_[A-Z_]+__/g;

  for (const file of templateFiles) {
    const filePath = path.join(workerPath, file);
    
    try {
      await fs.access(filePath);
    } catch {
      continue; // Skip files that don't exist
    }

    results.filesChecked.push(file);

    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      const foundPlaceholders: PlaceholderInfo[] = [];

      lines.forEach((line, index) => {
        const matches = line.match(placeholderRegex);
        if (matches) {
          matches.forEach(match => {
            foundPlaceholders.push({
              placeholder: match,
              line: index + 1,
              preview: line.trim().substring(0, 80) + (line.length > 80 ? '...' : '')
            });
          });
        }
      });

      if (foundPlaceholders.length > 0) {
        results.placeholdersFound[file] = foundPlaceholders;
        results.valid = false;
      }
    } catch (error: any) {
      results.errors.push(`Error reading ${file}: ${error.message}`);
      results.valid = false;
    }
  }

  // Generate summary
  const totalPlaceholders = Object.values(results.placeholdersFound)
    .reduce((sum, filePlaceholders) => sum + filePlaceholders.length, 0);

  if (totalPlaceholders > 0) {
    results.summary = `Found ${totalPlaceholders} placeholder(s) in ${Object.keys(results.placeholdersFound).length} file(s)`;
  } else if (results.filesChecked.length === 0) {
    results.summary = 'No template files found to validate';
  } else {
    results.summary = `All templates validated successfully (${results.filesChecked.length} files checked)`;
  }

  return results;
}

/**
 * Get list of all valid placeholders from manifest
 */
export function getValidPlaceholders(): Record<string, string> {
  return {
    // ONBOARDING.md placeholders
    '__ORCH_BRANCH_NAME__': 'Feature branch name',
    '__ORCH_WORKER_NAME__': 'Worker identifier',
    '__ORCH_PR_URL__': 'Pull request URL',
    '__ORCH_REPO_URL__': 'Repository URL', 
    '__ORCH_PRIVATE_BRANCH__': 'Private knowledge branch',
    '__ORCH_BUILD_COMMANDS__': 'Project-specific build commands',
    
    // CLAUDE.md placeholders
    '__ORCH_PR_NUMBER__': 'PR number for reference',
    '__ORCH_START_DATE__': 'Assignment start date',
    '__ORCH_PROJECT_NAME__': 'Project name',
    
    // ASSIGNMENT.md placeholders
    '__ORCH_DATE__': 'Assignment date',
    '__ORCH_PRIORITY__': 'Task priority'
  };
}

/**
 * Format validation results for display
 */
export function formatValidationResults(results: ValidationResult): string {
  const output: string[] = [];
  
  if (results.valid) {
    output.push(`✅ ${results.summary}`);
  } else {
    output.push(`❌ ${results.summary}`);
    output.push('');
    
    // Show details for each file with placeholders
    for (const [file, placeholders] of Object.entries(results.placeholdersFound)) {
      output.push(`📄 ${file}:`);
      placeholders.forEach(p => {
        output.push(`   Line ${p.line}: ${p.placeholder}`);
        output.push(`   Preview: ${p.preview}`);
      });
      output.push('');
    }

    // Show errors if any
    if (results.errors.length > 0) {
      output.push('❗ Errors:');
      results.errors.forEach(err => output.push(`   ${err}`));
    }
  }
  
  return output.join('\n');
}