# Repository Hygiene Guidelines

## Overview

To maintain a clean production repository while preserving development history, follow these guidelines for what belongs in the main repository versus what should be archived.

## What NOT to Commit to Main Repository

### 🚫 Workflow Files
- `ASSIGNMENT.md` - Internal task assignments (kept in PR descriptions)
- `ONBOARDING.md` - Worker onboarding guides
- Orchestrator-specific communication files
- `.claude_context/` - AI context management files (evaluate per project)

### 🚫 Development Artifacts
- Temporary test files in root directory
- Excessive debug logging
- Personal notes or TODOs
- Draft documentation
- Incomplete implementations

## What TO Commit

### ✅ Production Code
- Source code implementations
- Proper test files (in appropriate directories)
- Production configuration files
- Build scripts and tooling

### ✅ Documentation
- Technical documentation (API, architecture)
- Implementation guides
- README files
- Worker-specific CLAUDE.md (in feature branches)

### ✅ Development History
- Important decision documentation
- Performance benchmarks
- Architectural decisions
- Migration guides

## Archive Structure

Preserve development context and history:

```
archives/
└── [feature_name]/
    ├── context/
    │   └── [saved context files]
    ├── decisions/
    │   └── [architectural decisions]
    └── notes/
        └── [development notes]
```

## .gitignore Patterns

Add these to your project's .gitignore:

```gitignore
# Workflow files
ASSIGNMENT.md
ONBOARDING.md
*_TEMPLATE.md

# Context files (optional - project specific)
.claude_context/

# Temporary files
*.tmp
*.log
```

## Why This Matters

1. **Clean Repository**: Production code isn't cluttered with workflow files
2. **Preserved History**: Important context is archived, not lost
3. **Professional Appearance**: Repository shows only relevant code
4. **Maintainability**: Clear separation between code and process

## Implementation

When preparing a PR:
1. Review all changed files
2. Remove workflow-specific files
3. Archive important context if needed
4. Update .gitignore if necessary
5. Keep only production-ready code in commits

## Best Practices

- Commit early and often to feature branches
- Clean up before merging to main
- Document important decisions in appropriate locations
- Use PR descriptions for task-specific context

---

*A clean repository enables efficient collaboration and professional code delivery.*