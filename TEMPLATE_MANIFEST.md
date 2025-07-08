# Template Manifest v1.2

This manifest documents all templates, placeholders, and customization points used by the orchestrator when creating new workers.

## Template Files

### ONBOARDING_TEMPLATE.md → ONBOARDING.md
**Purpose**: Worker-specific setup and communication guide  
**Version**: 1.2

#### Required Placeholders
- `__ORCH_BRANCH_NAME__`: Feature branch name (e.g., "feature/simd-operations")
- `__ORCH_WORKER_NAME__`: Worker identifier (e.g., "worker_3")
- `__ORCH_PR_URL__`: Pull request URL for assignment
- `__ORCH_REPO_URL__`: Project repository URL
- `__ORCH_PRIVATE_BRANCH__`: Private branch for knowledge persistence
- `__ORCH_BUILD_COMMANDS__`: Project-specific build/test commands

#### Optional Append Sections
- `<!-- ORCHESTRATOR:APPEND:after_setup -->`: Additional setup instructions
- `<!-- ORCHESTRATOR:APPEND:after_development_workflow -->`: Project-specific workflow
- `<!-- ORCHESTRATOR:APPEND:before_communication_protocol -->`: Custom guidelines

### CLAUDE.md (Worker)
**Purpose**: Worker's knowledge base and context  
**Version**: 1.2

#### Required Placeholders
- `__ORCH_BRANCH_NAME__`: Feature branch name
- `__ORCH_PRIVATE_BRANCH__`: Private knowledge branch
- `__ORCH_PR_NUMBER__`: PR number for reference
- `__ORCH_START_DATE__`: Assignment start date
- `__ORCH_PROJECT_NAME__`: Project name for context

#### Optional Append Sections
- `<!-- ORCHESTRATOR:APPEND:project_context -->`: Detailed project information
- `<!-- ORCHESTRATOR:APPEND:technical_approach -->`: Implementation strategies
- `<!-- ORCHESTRATOR:APPEND:codebase_patterns -->`: Project-specific patterns

### ASSIGNMENT_TEMPLATE.md → ASSIGNMENT.md
**Purpose**: Detailed task assignment in PR  
**Version**: 1.2

#### Required Placeholders
- `__ORCH_DATE__`: Assignment date
- `__ORCH_WORKER_NAME__`: Worker identifier
- `__ORCH_BRANCH_NAME__`: Feature branch
- `__ORCH_PRIORITY__`: Task priority (High/Medium/Low)

#### Content Sections (Manual Customization Required)
- Mission Brief
- Current Context
- Technical Approach
- Expected Outcomes

## Placeholder Format Guidelines

### Naming Convention
- Prefix: `__ORCH_` (identifies orchestrator placeholders)
- Body: `DESCRIPTIVE_NAME` (uppercase with underscores)
- Suffix: `__` (closes the placeholder)

### Examples
- Correct: `__ORCH_BRANCH_NAME__`
- Incorrect: `[branch-name]`, `{{BRANCH_NAME}}`, `$BRANCH_NAME$`

## Validation Rules

1. **No Orphaned Placeholders**: All `__ORCH_*__` patterns must be replaced
2. **Required vs Optional**: Required placeholders MUST be filled, optional MAY be removed
3. **Append Sections**: Must preserve comment markers if not used
4. **File Integrity**: Templates must remain valid Markdown after processing

## Version History

### v1.2 (Current)
- Introduced `__ORCH_*__` placeholder format
- Added append section markers
- Structured validation rules

### v1.1
- Used `{{PLACEHOLDER}}` format
- Basic replacement only

### v1.0
- Original `[placeholder]` format
- Manual replacement process

## Tool Integration

### validate_templates
Checks for:
- Remaining placeholders matching `__ORCH_*__`
- Required placeholders are filled
- Template version compatibility

### fill_template
Processes:
- Replacement of all registered placeholders
- Injection at append section markers
- Preservation of template structure

## Adding New Placeholders

1. Add to this manifest with clear description
2. Update template version if breaking change
3. Add to validation tool's registry
4. Document in CHANGELOG.md

## Template Locations

- Source: `/orchestrator/*_TEMPLATE.md`
- Destination: `/project_workspace/worker_N/project/`
- Backups: `/orchestrator/template_archive/v{VERSION}/`

---

**Note**: This manifest is the source of truth for all template operations. Any changes to templates or placeholders MUST be reflected here first.