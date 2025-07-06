# CLAUDE.md - Orchestrator Configuration

## Overview

This file configures the Orchestrator for managing multiple Claude Code instances working in parallel on your project. The Orchestrator coordinates branch management, task assignment, and integration of work from multiple AI workers.

## Orchestrator Role

The Orchestrator manages:
- **Branch Management**: Creating and managing feature branches for different workers
- **Task Assignment**: Distributing work across multiple Claude Code instances via PR assignments
- **Context Management**: Preserving and organizing development context from each worker
- **Integration**: Reviewing and merging completed work back into the main branch
- **Quality Control**: Ensuring consistency and quality across all development streams

## Core Responsibilities

### 1. Branch Management
- Create feature branches for different Claude Code instances
- Ensure branch isolation to prevent conflicts
- Coordinate branch merging and integration
- Maintain branch tracking and status

### 2. Context Management
- Each worker maintains their own specialized CLAUDE.md in their branch
- Save `/compact` outputs to `.claude_context/` for knowledge preservation
- Archive completed feature contexts for future reference
- Maintain project-wide context awareness

### 3. Pull Request Management
- **Create Assignment PRs**: Open PRs with detailed task descriptions
- **Monitor Progress**: Track worker updates through PR comments
- **Code Review**: Provide feedback on completed work
- **Merge Coordination**: Ensure clean integration of features

### 4. Worker Coordination
- Assign specific features/tasks to individual workers
- Monitor progress across all active instances
- Resolve dependencies between parallel development streams
- Ensure consistency across instances

## Operational Protocols

### Context Storage
When using `/compact`, outputs are saved to:
```
.claude_context/context_[project]_[feature]_[timestamp].md
```

### Worker Assignment Process
1. Create feature branch for the worker
2. Copy and customize ONBOARDING.md, assistant/, and template_CLAUDE.md to the branch
3. Commit these setup files to the branch
4. Open PR with detailed assignment in description
5. Worker clones repo and checks out their branch
6. Worker customizes CLAUDE.md locally (never commits it)
7. Worker optionally backs up CLAUDE.md to private branch
8. Progress tracked through PR comments
9. Review and merge feature branch when complete

### Directory Structure
```
orchestrator/                         # This repository (Orchestrator HQ)
├── .claude_context/                 # Orchestrator context storage
├── project_workspace/               # Worker instances (gitignored)
│   ├── worker_1/                   # Worker 1 workspace
│   │   └── [project-repo]/         # Worker 1 repository
│   └── worker_2/                   # Worker 2 workspace
│       └── [project-repo]/         # Worker 2 repository
├── ASSIGNMENT_TEMPLATE.md           # Template for PR assignments
├── ONBOARDING_TEMPLATE.md          # Template for worker onboarding
├── PR_WORKFLOW.md                  # Pull request workflow documentation
├── README.md                       # Project documentation
├── CLAUDE.md                       # This file
└── assistant/                      # Assistant-specific instructions
    ├── README.md                   # Documentation for assistant files
    ├── absolute_mode.txt           # Documentation writing mode
    ├── sharp_mode.txt              # Conversational interaction mode
    └── WORKER_SETUP_GUIDE.md       # Worker context isolation guide
```

## Development Philosophy

The Orchestrator prioritizes:
- **Isolation**: Each instance works independently to prevent conflicts
- **Coordination**: Clear communication and task assignment
- **Quality**: Consistent standards across all development streams
- **Efficiency**: Parallel development to maximize productivity
- **Context Preservation**: Persistent storage of development context

## Communication Modes

### Sharp Mode (assistant/sharp_mode.txt)
For conversational interactions with critical thinking and direct feedback. No emotional softening when disagreeing. Clear uncertainty signals.

### Absolute Mode (assistant/absolute_mode.txt)
For documentation writing. Stripped-down, direct information transfer without decorative language or engagement optimization.

## Customization

To adapt this orchestrator for your project:
1. Update this file with your project-specific information
2. Modify templates to match your project needs
3. Define your branching strategy
4. Set up your quality standards and review process

---

*The Orchestrator ensures that multiple Claude Code instances work in harmony, each contributing to your project while maintaining code quality and coherence.*