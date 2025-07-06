# Pull Request Workflow

## Overview

All communication between the Orchestrator and workers happens through GitHub Pull Requests. This leverages GitHub's built-in notification system and provides a clear audit trail of all development activities.

## Workflow Steps

### 1. Assignment Creation (Orchestrator)

When assigning a new task:

```bash
# Create feature branch in the project repository
git checkout -b feature/[descriptive-name]
git push -u origin feature/[descriptive-name]

# Copy and customize worker files
cp /path/to/orchestrator/ONBOARDING_TEMPLATE.md ./ONBOARDING.md
cp -r /path/to/orchestrator/assistant ./
cp /path/to/orchestrator/template_CLAUDE.md ./CLAUDE.md  # Generic starter

# Edit ONBOARDING.md to fill in:
# - Branch name (feature/[descriptive-name])
# - Repository URL
# - Project-specific setup commands
# - Any additional context

# Edit CLAUDE.md to add:
# - Project-specific context
# - Feature-specific guidance
# - Task-relevant information

# Commit worker setup files
git add ONBOARDING.md assistant/ CLAUDE.md
git commit -m "Add worker setup files"
git push

# Create PR with assignment
gh pr create --title "Worker [X]: [Task Description]" \
  --body "$(cat /path/to/orchestrator/ASSIGNMENT_TEMPLATE.md)" \
  --assignee [github-username]
```

### 2. Worker Notification

Workers are notified by:
- **PR Assignment**: Using GitHub's assignee feature
- **PR Mentions**: Tag workers in PR comments
- **Email Notification**: GitHub sends emails for assignments and mentions

### 3. Worker Setup

After receiving assignment notification:
1. Clone the project repository
2. Checkout the assigned feature branch (contains ONBOARDING.md, assistant/, and starter CLAUDE.md)
3. Customize the CLAUDE.md file for your needs (but never commit it)
4. Follow ONBOARDING.md instructions
5. Start Claude Code from the project repository directory

**Optional**: Back up your CLAUDE.md to a private branch:
```bash
# Create private branch from current state
git checkout -b private/[worker-name]/[feature-name]
git add CLAUDE.md
git commit -m "Backup my workspace context"
git push -u origin private/[worker-name]/[feature-name]

# Return to feature branch
git checkout feature/[assigned-branch]
# Continue working - CLAUDE.md remains in working directory but uncommitted
```

### 4. Assignment Format

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

## Communication Patterns

### Progress Updates

Workers post PR comments for:
- **Regular Updates**: Summary of progress
- **Blockers**: Issues requiring assistance
- **Questions**: Technical clarifications needed
- **Discoveries**: Important findings or insights

Example:
```markdown
## Progress Update - [Date]

✅ Completed:
- Implemented feature X
- Added unit tests
- Updated documentation

🔧 In Progress:
- Integration testing
- Performance optimization

❓ Question:
Should we use approach A or B for handling edge case Y?
```

### Requesting Help

When blocked:
```markdown
## 🚨 Blocked - Need Assistance

**Issue**: [Description of the problem]
**Error**: [Error message if applicable]
**Attempted Solutions**:
1. [What you tried first]
2. [What you tried next]
3. [Other attempts]

**Context**: [Additional relevant information]

Could you provide guidance on how to proceed?
```

### Ready for Review

When work is complete:
```markdown
## ✅ Ready for Review

**Completed**:
- All success criteria met
- Tests passing
- Documentation updated

**Key Changes**:
- `file1.js`: [What changed and why]
- `file2.js`: [What changed and why]
- `docs/`: [Documentation updates]

**Testing**:
- ✅ Unit tests
- ✅ Integration tests
- ✅ Manual testing

Ready to merge when approved!
```

## Orchestrator Responses

### Code Review
- Use PR review feature for inline comments
- Approve or request changes through GitHub UI
- Provide clear feedback on what needs adjustment

### Providing Guidance
```markdown
Good question! For this use case, I recommend approach A because:
1. [Reason 1]
2. [Reason 2]
3. [Reason 3]

Here's an example:
```code
// Example implementation
```

Let me know if you need more clarification!
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