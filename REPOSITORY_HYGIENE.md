# Repository Hygiene Guidelines

## Overview

To maintain a clean production repository while preserving our rich development history, we follow these guidelines for what belongs in the main repository versus what should be archived.

## What NOT to Commit to Main Repository

### 🚫 Forge Workflow Files
- `ASSIGNMENT.md` - Internal task assignments (now in PR descriptions)
- `ONBOARDING.md` - Worker onboarding guides
- `forge_master_*.md` - Any Forge Master communications
- `.claude_context/` - AI context management files (evaluate per project)

### 🚫 Development Artifacts
- Temporary test files in root directory
- Excessive debug logging
- Personal notes or TODOs
- Draft documentation

## What TO Commit

### ✅ Production Code
- Source code implementations
- Proper test files (in `test/` directory)
- Production configuration files
- Build scripts and tooling

### ✅ Documentation
- Technical documentation (API, architecture)
- Solution explanations (like `WEBPACK_NATIVE_MODULE_SOLUTION.md`)
- README files
- Specialized CLAUDE.md (worker personas)

### ✅ Development History
- `contributors/[persona]/[date]_[feature].md` - Development logs
- Important decision documentation
- Performance benchmarks

## Archive Structure

Preserve forge communications and journey artifacts:

```
contributors/
└── [persona_name]/
    ├── archive/
    │   ├── onboarding/
    │   │   └── ONBOARDING.md
    │   └── journey/
    │       └── [development artifacts]
    └── [date]_[feature].md  # Public development log
```

## .gitignore Patterns

Add these to project .gitignore:

```gitignore
# Forge workflow files
ASSIGNMENT.md
ONBOARDING.md
forge_master_*.md

# Optional (project-specific)
.claude_context/
```

## Why This Matters

1. **Clean Repository**: Production code isn't cluttered with workflow files
2. **Preserved History**: Important context is archived, not lost
3. **Professional Appearance**: Public repository shows only relevant code
4. **Searchability**: Contributors' work is organized and findable

## Implementation

When preparing a PR:
1. Review all changed files
2. Move workflow files to archive structure
3. Update .gitignore if needed
4. Keep only production-ready code in the commit

---

*"A clean repository is like a well-organized forge - everything in its place, ready for crafting excellence."*

🔨 **Forge Master** <forge.master@electric-dreams.ai>