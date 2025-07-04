# Worker Setup Guide

## Important: Context Isolation

To ensure proper context isolation between the Forge Master and worker instances, workers must follow these setup instructions carefully.

## Why This Matters

Claude Code searches up the directory tree for CLAUDE.md files. If you start Claude Code from the wrong directory, you'll see the Forge Master's instructions instead of your own worker context!

## Correct Worker Setup

### 1. Navigate to Your Repository Directory
```bash
# From anywhere in the system
cd [path-to-orchestrator]/project_workspace/instance_X/electric-dreams-forge/

# Example for Instance 1:
cd ~/git/electric-dreams-forge_orchestrator/project_workspace/instance_1/electric-dreams-forge/
```

### 2. Start Claude Code FROM THIS DIRECTORY
```bash
# Make sure you're in the electric-dreams-forge/ directory!
pwd  # Should show: .../instance_X/electric-dreams-forge/
claude  # or however you launch Claude Code
```

### 3. Verify Correct Context
When Claude Code starts, it should:
- NOT see the Forge Master's CLAUDE.md
- See your local project files
- Have access to your signals/ directory
- Be in the correct git repository context

## File Locations for Workers

From your perspective as a worker:
- **Your Root**: `electric-dreams-forge/` (where you start Claude Code)
- **Signals**: `signals/` (in your root)
- **Context**: `.claude_context/` (in your root)
- **Assignment**: `ASSIGNMENT.md` (in your root)
- **Onboarding**: `ONBOARDING.md` (in your root)

## Common Mistakes to Avoid

❌ **DON'T** start Claude Code from:
- The orchestrator root directory
- The instance_X directory
- Any parent directory

✅ **DO** start Claude Code from:
- `electric-dreams-forge/` directory specifically

## Quick Verification

After starting Claude Code, run:
```bash
pwd  # Should show electric-dreams-forge as current directory
ls   # Should show project files, not orchestrator files
ls ../  # Should show only instance-level items
```

## If You See Wrong Context

If you see Forge Master instructions or the wrong CLAUDE.md:
1. Exit Claude Code
2. Navigate to the correct directory
3. Restart Claude Code from `electric-dreams-forge/`

Remember: The directory you start Claude Code from matters! It determines which context and instructions you'll see.

---
🔨 **Forge Master** <forge.master@electric-dreams.ai>