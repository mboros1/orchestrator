# Template Setup Guide

This guide helps you set up the Orchestrator template for your specific project.

## Quick Start

1. **Use this template** to create your orchestrator repository
2. **Clone** your new orchestrator repository
3. **Customize** the templates for your project
4. **Initialize** your first worker

## Step-by-Step Setup

### 1. Create Your Orchestrator Repository

Click "Use this template" on GitHub and create a new repository named `[your-project]-orchestrator`.

### 2. Clone and Configure

```bash
git clone https://github.com/yourusername/your-project-orchestrator
cd your-project-orchestrator
```

### 3. Customize Core Files

#### Update CLAUDE.md
Replace generic placeholders with your project information:
- Project name and description
- Repository URLs
- Technology stack
- Development workflow preferences

#### Update template_README.md
This becomes the README for your main project repository:
- Fill in project name and description
- Complete the technology stack section
- Add project-specific setup instructions
- Update build and test commands

### 4. Configure Templates

#### ASSIGNMENT_TEMPLATE.md
Customize for your workflow:
- Add project-specific sections
- Include relevant technical requirements
- Define your success criteria format

#### ONBOARDING_TEMPLATE.md
Adapt for your project:
- Update setup commands
- Add project-specific verification steps
- Include relevant development commands

### 5. Set Up Your Main Project Repository

If you haven't already:
```bash
# Create your main project repository on GitHub
# Then clone it locally for testing
git clone https://github.com/yourusername/your-project
```

### 6. Initialize First Worker Workspace

```bash
# From orchestrator root
mkdir -p project_workspace/worker_1
cd project_workspace/worker_1
git clone https://github.com/yourusername/your-project
cd your-project

# Copy the template README
cp ../../../template_README.md README.md
# Edit README.md to fill in your project details

# Copy the assistant directory for worker use
cp -r ../../../assistant ./
```

### 7. Create First Assignment

```bash
# From your main project repo
git checkout -b feature/initial-setup
git push -u origin feature/initial-setup

# Create PR with assignment
gh pr create \
  --title "Worker 1: Initial Project Setup" \
  --body "$(cat path/to/ASSIGNMENT_TEMPLATE.md)" \
  --base main
```

## Customization Checklist

- [ ] Update CLAUDE.md with project details
- [ ] Customize template_README.md for your project
- [ ] Adapt ASSIGNMENT_TEMPLATE.md to your workflow
- [ ] Modify ONBOARDING_TEMPLATE.md for your setup
- [ ] Create main project repository
- [ ] Set up first worker workspace
- [ ] Create and assign first PR

## Optional Enhancements

### GitHub Actions
Consider adding automation:
- Auto-assign PRs based on branch patterns
- Run tests on PR updates
- Add status checks

### Project-Specific Templates
You might add:
- Bug report templates
- Feature request templates
- Code review checklists

### Documentation
Consider maintaining:
- Architecture decision records
- API documentation
- Development guides

## Tips for Success

1. **Start Simple**: Don't over-customize initially
2. **Iterate**: Refine templates as you learn what works
3. **Document Decisions**: Keep notes on why you made certain choices
4. **Regular Reviews**: Periodically review and update your workflow

## Next Steps

Once setup is complete:
1. Start assigning tasks to workers via PRs
2. Monitor progress through PR comments
3. Refine your templates based on experience
4. Scale up with more workers as needed

---

*Remember: The best orchestration setup is one that fits your team's specific needs and workflow.*