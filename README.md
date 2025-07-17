[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/mboros1-orchestrator-badge.png)](https://mseep.ai/app/mboros1-orchestrator)

# Orchestrator Template

A GitHub template repository that creates an AI Orchestrator - a Claude Code instance that manages multiple AI workers on your software development project.

## 🚀 Quick Start

### 1. Clone your orchestrator repository:
```bash
git clone https://github.com/yourusername/your-orchestrator-repo
cd your-orchestrator-repo
```

### 2. Set up the MCP server:
```bash
cd mcp-server && npm install && npm run build && cd ..
```

### 3. (Optional) Create PROJECT_SPEC.md:
Choose one:
- Fill out `PROJECT_SPEC.md` manually with your project details
- Use `GENERATE_PROJECT_SPEC_PROMPT.md` to analyze existing code
- Ask the Orchestrator to analyze your repository directly

### 4. Launch your Orchestrator:
```bash
claude --mcp-config mcp-config.json
```

### 5. Start with this message:
```
Hello! Please read your ONBOARDING.md to get started
```

That's it! Your Orchestrator will read its instructions, research your tech stack, and be ready to manage your project intelligently.

## Overview

This template sets up an Orchestrator agent (a Claude Code instance) that coordinates parallel development by managing other Claude Code instances (workers). The Orchestrator works with you to understand your project needs, creates assignments, and ensures smooth integration of work.

## Features

- **Multi-Instance Coordination**: Manage multiple Claude Code instances working on different features simultaneously
- **Branch Isolation**: Each worker operates on their own feature branch to prevent conflicts
- **PR-Based Assignment**: Use GitHub pull requests to assign and track work
- **Context Preservation**: Save and organize development context from each worker
- **Structured Workflows**: Templates and processes for consistent operations
- **MCP Tools**: Efficient worker management through specialized tools
- **Automated Template System**: Validates and fills placeholders to prevent setup errors
- **Intelligent Research**: Orchestrator researches your tech stack and best practices before creating workers
- **Domain Expertise**: Builds deep understanding of your project through structured research
- **Codebase Analysis**: Can analyze existing projects to auto-generate PROJECT_SPEC.md

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
├── mcp-server/                      # MCP server for orchestrator tools
│   ├── src/                        # TypeScript source files
│   ├── dist/                       # Compiled JavaScript (after build)
│   ├── package.json                # Server dependencies
│   └── README.md                   # MCP server documentation
├── ASSIGNMENT_TEMPLATE.md           # Template for PR assignments
├── ONBOARDING_TEMPLATE.md          # Template for worker onboarding (v1.2)
├── TEMPLATE_MANIFEST.md            # Registry of all template placeholders
├── PR_WORKFLOW.md                  # Pull request workflow guide
├── REPOSITORY_HYGIENE.md           # Repository cleanliness guide
├── TEMPLATE_SETUP.md               # Setup guide for new users
├── template_README.md              # Template for project README
├── mcp-config.json                 # MCP configuration file
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

## Template System

The Orchestrator uses a versioned template system (v1.2) with automated validation:

### Template Placeholders
All placeholders use the format `__ORCH_*__` for easy identification:
- `__ORCH_BRANCH_NAME__` - Feature branch name
- `__ORCH_WORKER_NAME__` - Worker identifier
- `__ORCH_PR_URL__` - Pull request URL
- And more (see TEMPLATE_MANIFEST.md for full list)

### Automated Workflow
1. **Copy**: `copy_templates` copies templates to worker
2. **Fill**: `fill_templates` replaces placeholders automatically
3. **Validate**: `validate_templates` ensures no placeholders remain
4. **Customize**: Add project-specific sections at predefined markers

This prevents common issues like missing placeholders or incomplete customization.

## Best Practices

1. **One Worker Per Feature**: Assign each major feature to a single worker to maintain focus
2. **Clear Assignments**: Provide detailed context and requirements in PR descriptions
3. **Regular Check-ins**: Monitor PR comments for progress updates
4. **Context Preservation**: Encourage workers to save their context regularly
5. **Clean Merges**: Review carefully before merging to maintain code quality
6. **Template Validation**: Always run `validate_templates` before creating PRs

## Prerequisites

- Git installed and configured
- GitHub CLI (`gh`) installed and authenticated
- Access to Claude Code
- Node.js (for MCP server)

## MCP Server Setup (Recommended)

The Orchestrator includes an MCP server that provides efficient tools for managing workers. This is the recommended way to use the Orchestrator.

### Quick Setup

1. **Install MCP server dependencies:**
```bash
cd mcp-server
npm install
npm run build
cd ..
```

2. **Start Claude Code with MCP tools:**
```bash
claude --mcp-config mcp-config.json
```

### Available MCP Tools

When using the MCP configuration, the Orchestrator has access to these specialized tools:

- **`create_worker`** - Creates worker workspace and clones project repository
- **`setup_branch`** - Creates and checks out feature branches for workers
- **`copy_templates`** - Copies onboarding and context templates to worker projects
- **`fill_templates`** - Automatically fills template placeholders with project-specific values
- **`validate_templates`** - Validates templates to ensure no placeholders remain unfilled
- **`manage_private_branch`** - Manages private branches for CLAUDE.md persistence (create/backup actions)
- **`activate_mode`** - Switches between Sharp (conversational) and Absolute (formal writing) modes

These tools handle complex operations atomically with better error handling than manual commands.

## Manual Setup (Alternative)

If you prefer not to use the MCP server, you can set up workers manually:

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

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

*Built for orchestrating multiple Claude Code instances in parallel development workflows.*