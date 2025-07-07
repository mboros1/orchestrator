# Orchestrator Template

A GitHub template repository that creates an AI Orchestrator - a Claude Code instance that manages multiple AI workers on your software development project.

## Overview

This template sets up an Orchestrator agent (a Claude Code instance) that coordinates parallel development by managing other Claude Code instances (workers). The Orchestrator works with you to understand your project needs, creates assignments, and ensures smooth integration of work.

## Features

- **Multi-Instance Coordination**: Manage multiple Claude Code instances working on different features simultaneously
- **Branch Isolation**: Each worker operates on their own feature branch to prevent conflicts
- **PR-Based Assignment**: Use GitHub pull requests to assign and track work
- **Context Preservation**: Save and organize development context from each worker
- **Structured Workflows**: Templates and processes for consistent operations

## Getting Started

### 1. Use This Template

Click "Use this template" to create your orchestrator repository.

### 2. Clone and Start Your Orchestrator

```bash
git clone https://github.com/yourusername/your-orchestrator-repo
cd your-orchestrator-repo
claude  # Start Claude Code - this activates your Orchestrator
```

### 3. Work with Your Orchestrator

Your Orchestrator will:
1. Ask you about your project to understand its needs
2. Help refine its own CLAUDE.md with project-specific context
3. Prepare to manage workers for your project

### 4. Describe Your First Task

Tell your Orchestrator what you need:
- "I need user authentication for my Express.js app"
- "We need to refactor the frontend to use React hooks"
- "Help me migrate from MongoDB to PostgreSQL"

The Orchestrator will handle creating assignments and setting up workers.

## How It Works

### The Orchestrator (Claude Code Instance)

The Orchestrator is a Claude Code instance that:
- Lives in this orchestrator repository
- Works with you to understand project requirements
- Creates and customizes all worker assignments
- Manages multiple AI workers in parallel
- Continuously improves its understanding of your project

### The Workers (Other Claude Code Instances)

Each worker is a separate Claude Code instance that:
- Receives customized assignments from the Orchestrator
- Works on isolated feature branches
- Builds specialized expertise over time
- Communicates progress through PR comments

### The Workflow

1. **You** describe what you need to the Orchestrator
2. **Orchestrator** breaks down the work and creates assignments
3. **Orchestrator** sets up customized environments for each worker
4. **Workers** develop features in parallel
5. **Orchestrator** monitors progress and facilitates integration
6. **You** review and approve the final results

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