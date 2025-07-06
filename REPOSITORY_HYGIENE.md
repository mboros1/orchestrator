# Repository Hygiene Guidelines

## Overview

Guidelines for maintaining clean production repositories while preserving development context.

## What NOT to Commit

### Workflow Files
- `ASSIGNMENT.md` - Keep in PR descriptions
- `ONBOARDING.md` - Worker setup guides
- Worker CLAUDE.md files - Keep in private branches only
- Orchestrator communication files

### Development Artifacts
- Temporary files
- Debug logs
- Personal notes
- Draft documentation

<!-- TODO: Add project-specific exclusions based on your tech stack -->

## What TO Commit

### Production Code
- Source implementations
- Tests
- Configuration files
- Build scripts

### Documentation
- Technical docs
- Architecture guides
- README files

<!-- TODO: Add project-specific inclusions based on your tech stack -->

## .gitignore Suggestions

```gitignore
# Workflow files
ASSIGNMENT.md
ONBOARDING.md
*_TEMPLATE.md

# Add your project-specific patterns here
```

## Best Practices

- Keep feature branches messy, main branch clean
- Archive important context before deleting
- Use PR descriptions for temporary documentation
- Review all files before merging

---

*Customize these guidelines based on your project's needs and technology stack.*