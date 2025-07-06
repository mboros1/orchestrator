# Setup Guide

This guide walks you through setting up Orchestrator for your project.

## Prerequisites

- Git installed and configured
- GitHub CLI (`gh`) installed and authenticated
- Access to Claude Code
- A project repository to orchestrate

## Step 1: Create Your Orchestrator

### Use the Template

1. Go to [github.com/mboros1/orchestrator](https://github.com/mboros1/orchestrator)
2. Click "Use this template"
3. Name your repository `[project-name]-orchestrator`
4. Clone your new repository:

```bash
git clone https://github.com/yourusername/my-project-orchestrator
cd my-project-orchestrator
```

## Step 2: Customize for Your Project

### Update CLAUDE.md

Edit `CLAUDE.md` to add your project-specific information:

```markdown
## Project Context: [Your Project Name]

### Project Overview
[Description of your project]

### Architecture Goals
[Your technical goals]

### Development Standards
[Your coding standards]
```

### Configure Templates

1. **template_README.md** - Fill in your project details
2. **ASSIGNMENT_TEMPLATE.md** - Add project-specific sections
3. **ONBOARDING_TEMPLATE.md** - Update with your setup commands

## Step 3: Initialize Worker Workspace

```bash
# Create workspace directory
mkdir -p project_workspace/worker_1

# Clone your project repository
cd project_workspace/worker_1
git clone https://github.com/yourusername/your-project
cd your-project

# Copy and customize the README
cp ../../../template_README.md README.md
```

## Step 4: Create First Assignment

### In Your Project Repository

```bash
# Create feature branch
git checkout -b feature/initial-setup
git push -u origin feature/initial-setup

# Copy worker files
cp /path/to/orchestrator/ONBOARDING_TEMPLATE.md ./ONBOARDING.md
cp -r /path/to/orchestrator/assistant ./
cp /path/to/orchestrator/template_CLAUDE.md ./CLAUDE.md

# Customize ONBOARDING.md with:
# - Branch name: feature/initial-setup
# - Repository URL
# - Setup commands (npm install, etc.)
# - Project context

# Customize CLAUDE.md with:
# - Project overview
# - Initial task context
# - Any helpful patterns

# Commit setup files
git add ONBOARDING.md assistant/ CLAUDE.md
git commit -m "Add worker setup files"
git push
```

### Create the PR

```bash
# Create PR with assignment details
gh pr create \
  --title "Worker 1: Initial Project Setup" \
  --body "$(cat /path/to/orchestrator/ASSIGNMENT_TEMPLATE.md)" \
  --assignee worker-github-username
```

## Step 5: Worker Setup

When a worker receives an assignment:

1. Clone the project repository
2. Checkout their assigned branch
3. Customize their CLAUDE.md
4. Create private branch for knowledge persistence
5. Start working

See [Workflow](workflow.md) for detailed worker instructions.

## Configuration Options

### Communication Modes

Orchestrator includes two communication modes in `assistant/`:

- **Sharp Mode** - Direct feedback and critical thinking
- **Absolute Mode** - Concise documentation writing

### Directory Structure

```
your-orchestrator/
├── assistant/          # Claude Code instructions
├── project_workspace/  # Worker instances (gitignored)
├── Templates          # Customizable templates
└── Documentation      # Guides and workflows
```

## Next Steps

- Read the [Workflow Guide](workflow.md) to understand the full process
- Review [Best Practices](best-practices.md) for tips
- Start assigning tasks to workers!

[Back to Home](index.md) | [Workflow →](workflow.md)