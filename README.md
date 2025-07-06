# Orchestrator Template

A GitHub template repository for orchestrating multiple Claude Code instances working in parallel on software development projects.

## Overview

This template provides a structured approach to managing multiple AI workers on a single codebase. It includes branch management, task assignment via pull requests, context preservation, and coordination workflows.

## Features

- **Multi-Instance Coordination**: Manage multiple Claude Code instances working on different features simultaneously
- **Branch Isolation**: Each worker operates on their own feature branch to prevent conflicts
- **PR-Based Assignment**: Use GitHub pull requests to assign and track work
- **Context Preservation**: Save and organize development context from each worker
- **Structured Workflows**: Templates and processes for consistent operations

## Getting Started

### 1. Use This Template

Click "Use this template" to create a new repository based on this orchestrator template.

### 2. Clone Your New Repository

```bash
git clone https://github.com/yourusername/your-orchestrator-repo
cd your-orchestrator-repo
```

### 3. Configure for Your Project

1. Update `CLAUDE.md` with your project-specific information
2. Modify the assignment and onboarding templates to match your needs
3. Set up your main project repository that workers will contribute to

### 4. Initialize Worker Workspaces

The orchestrator uses a `project_workspace/` directory (gitignored) to house worker instances:

```bash
# Create workspace for first worker
mkdir -p project_workspace/worker_1
cd project_workspace/worker_1
git clone https://github.com/yourusername/your-project-repo
```

## How It Works

### The Orchestrator

The Orchestrator (you, running Claude Code from the orchestrator repo) manages:
- Creating feature branches in the main project repository
- Opening pull requests with detailed assignments
- Monitoring worker progress
- Reviewing and merging completed work

### The Workers

Each worker:
- Receives assignments via pull request
- Works on their assigned feature branch
- Updates their progress through PR comments
- Maintains their own CLAUDE.md for specialized context

### Workflow

1. **Orchestrator** creates a feature branch in the project repo
2. **Orchestrator** opens a PR with assignment details
3. **Worker** clones the project repo and checks out their branch
4. **Worker** completes the assigned work
5. **Worker** updates the PR with progress
6. **Orchestrator** reviews and merges the work

## Directory Structure

```
your-orchestrator-repo/
├── .claude_context/                 # Context storage
├── project_workspace/               # Worker instances (gitignored)
│   └── worker_1/                   # Individual worker workspaces
│       └── your-project-repo/      # Worker's copy of project
├── assistant/                       # Claude Code specific instructions
│   ├── README.md                   # Documentation for assistant files
│   ├── absolute_mode.txt           # Documentation writing mode
│   ├── sharp_mode.txt              # Conversational interaction mode
│   └── WORKER_SETUP_GUIDE.md       # Worker setup instructions
├── ASSIGNMENT_TEMPLATE.md           # Template for PR assignments
├── ONBOARDING_TEMPLATE.md          # Template for worker onboarding
├── PR_WORKFLOW.md                  # Pull request workflow guide
├── REPOSITORY_HYGIENE.md           # Repository cleanliness guide
├── TEMPLATE_SETUP.md               # Setup guide for new users
├── template_README.md              # Template for project README
├── CLAUDE.md                       # Orchestrator configuration
└── README.md                       # This file
```

## Templates

### ASSIGNMENT_TEMPLATE.md
Use this template when creating pull requests to assign work to Claude Code instances.

### ONBOARDING_TEMPLATE.md
Place this in each worker's branch to guide their initial setup and understanding of their role.

### PR_WORKFLOW.md
Detailed guide on the pull request-based workflow for coordination.

## Best Practices

1. **One Worker Per Feature**: Assign each major feature to a single worker to maintain focus
2. **Clear Assignments**: Provide detailed context and requirements in PR descriptions
3. **Regular Check-ins**: Monitor PR comments for progress updates
4. **Context Preservation**: Encourage workers to save their context regularly
5. **Clean Merges**: Review carefully before merging to maintain code quality

## Prerequisites

- Git installed and configured
- GitHub CLI (`gh`) installed and authenticated
- Access to Claude Code

## Example Setup

```bash
# Clone orchestrator repo
git clone https://github.com/yourusername/my-project-orchestrator
cd my-project-orchestrator

# Set up worker workspaces
mkdir -p project_workspace/worker_1
mkdir -p project_workspace/worker_2

# Clone project repo for each worker
cd project_workspace/worker_1
git clone https://github.com/yourusername/my-project
cd ../worker_2
git clone https://github.com/yourusername/my-project
```

## Contributing

This is a template repository. To contribute improvements to the template itself, please open an issue or pull request.

## License

[Choose an appropriate license for your template]

---

*Built for orchestrating multiple Claude Code instances in parallel development workflows.*