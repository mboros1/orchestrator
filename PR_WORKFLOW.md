# Pull Request Workflow

## Overview

The orchestrator creates comprehensive assignments and hands off to autonomous workers. Communication during execution is minimal - workers deliver complete implementations based on thorough research and detailed onboarding documentation.

## Important: Understanding the Roles

- **Orchestrator**: Claude Code instance performing research and creating worker assignments
- **Workers**: Autonomous Claude Code instances delivering complete implementations
- **You**: The human providing direction and making decisions

## Workflow Steps

### 1. Assignment Creation (What I Do as Orchestrator)

When you describe a task to me, I will:

```bash
# Create feature branch in your project repository
git checkout -b feature/user-authentication
git push -u origin feature/user-authentication

# Use MCP tools to set up worker environment efficiently
mcp__orchestrator__create_worker \
  --workerName "worker_1" \
  --projectRepo "https://github.com/user/project"

mcp__orchestrator__setup_branch \
  --branchName "feature/user-authentication"

mcp__orchestrator__copy_templates

# Fill templates with project-specific information
mcp__orchestrator__fill_templates \
  --projectInfo '{"branchName": "feature/user-authentication", ...}'

# Validate no placeholders remain
mcp__orchestrator__validate_templates

# Commit customized templates
git add ONBOARDING.md ASSIGNMENT.md assistant/
git commit -m "Add worker setup files for authentication feature"
git push

# Create detailed PR with assignment
# I'll fill in the assignment template with:
# - Clear requirements based on our discussion
# - Success criteria
# - Technical approach
# - Resources and context
```

### 2. Worker Notification

Workers are notified by:
- **PR Assignment**: Using GitHub's assignee feature
- **PR Mentions**: Tag workers in PR comments
- **Email Notification**: GitHub sends emails for assignments and mentions

### 3. Worker Setup

After receiving assignment notification:
1. Clone the project repository
2. Checkout the assigned feature branch (contains ONBOARDING.md and assistant/)
3. Read ONBOARDING.md thoroughly - it contains all context needed for autonomous execution
4. Start Claude Code from the project repository directory
5. Worker maintains their own CLAUDE.md in the repository root (gitignored)

**Simplified Context Management**:
- Single CLAUDE.md per repository owned by the worker
- No complex branch management for context preservation
- Worker accumulates expertise naturally during implementation
- CLAUDE.md evolves with the project and worker's understanding

### 4. Template System (v1.2)

The orchestrator uses an automated template system to ensure consistent worker setup:

#### Placeholders
All templates use `__ORCH_*__` format placeholders that are automatically filled:
- `__ORCH_BRANCH_NAME__` → `feature/user-authentication`
- `__ORCH_WORKER_NAME__` → `worker_1`
- `__ORCH_PR_URL__` → `https://github.com/user/project/pull/123`
- See TEMPLATE_MANIFEST.md for complete list

#### Validation
The `validate_templates` tool ensures no placeholders are missed, preventing setup errors.

### 5. Assignment Format

PR descriptions should include:
```markdown
## Assignment for Worker [X]

### Task Overview
[Clear description of the task]

### Technical Requirements
- [Requirement 1]
- [Requirement 2]

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Resources
- [Relevant files]
- [Documentation links]

---
*See ONBOARDING.md in your branch for setup instructions*
```

## Autonomous Execution Model

### Minimal Communication
Workers operate autonomously with comprehensive handoffs:
- **Research Phase**: Orchestrator conducts 15-minute mandatory research before assignment
- **Detailed ONBOARDING.md**: Contains all technical context and implementation guidance
- **Self-Sufficient Execution**: Workers have everything needed for complete delivery
- **Outcome-Focused**: Communication only for final delivery and edge cases

### When Workers Do Communicate
Rare instances requiring human/orchestrator input:
- **Fundamental Requirement Changes**: Discovered during implementation
- **Critical Technical Blockers**: Cannot be resolved with available context
- **Integration Dependencies**: Require coordination with external systems

### Final Delivery
Workers deliver complete implementations:
```markdown
## ✅ Implementation Complete

**Delivered**:
- All assignment requirements met
- Tests passing and documented
- Performance targets achieved
- Documentation updated

**Key Technical Decisions**:
- [Decision 1]: [Rationale]
- [Decision 2]: [Rationale]

**Validation**:
- ✅ Functional requirements
- ✅ Performance requirements  
- ✅ Code quality standards

Ready for merge.
```

## Best Practices

### DO:
- Keep PR descriptions clear and actionable
- Update progress regularly
- Use GitHub's formatting features (checkboxes, code blocks, etc.)
- Tag people when you need their attention
- Close resolved conversation threads
- Include relevant commit messages

### DON'T:
- Create separate issues for task questions (use PR comments)
- Wait too long before asking for help
- Commit workflow files (ASSIGNMENT.md, ONBOARDING.md)
- Use external communication channels for project discussions
- Force push after review has started

## Automation Opportunities

### GitHub Actions
- Auto-assign PRs based on branch names
- Add labels based on PR content
- Run tests on PR updates
- Notify orchestrator of stale PRs

### PR Templates
Create `.github/pull_request_template.md` for consistent formatting

### Branch Protection
- Require PR reviews before merging
- Enforce status checks
- Prevent force pushes
- Require up-to-date branches

## Merge Strategy

### Before Merging
1. All CI checks passing
2. Code review approved
3. No unresolved conversations
4. Branch is up to date with base branch

### Merge Options
- **Squash and Merge**: For feature branches (recommended)
- **Merge Commit**: For preserving detailed history
- **Rebase and Merge**: For linear history

## Summary

The PR workflow provides:
- **Centralized Communication**: All discussions in one place
- **Clear History**: Full audit trail of decisions and changes
- **GitHub Integration**: Notifications, reviews, and automation
- **Professional Process**: Industry-standard development workflow
- **Traceability**: Every change linked to its purpose and discussion

---

*Effective communication through PRs ensures smooth collaboration and high-quality code delivery.*