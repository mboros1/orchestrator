# Pull Request Workflow

## Overview

All communication between the Forge Master and workers happens through GitHub Pull Requests. This leverages GitHub's built-in notification system and provides a clear audit trail of all development activities.

## Workflow Steps

### 1. Assignment Creation (Forge Master)

When assigning a new task:

```bash
# Create feature branch
git checkout -b feature/[descriptive-name]
git push -u origin feature/[descriptive-name]

# Create PR with assignment
gh pr create --title "[Persona]: [Task Description]" \
  --body "$(cat ONBOARDING_TEMPLATE.md)" \
  --assignee [github-username]
```

### 2. Worker Notification

Workers are notified by:
- **Tagging in PR**: `@Module Forge <module.forge@electric-dreams.ai>`
- **PR Assignment**: Using GitHub's assignee feature
- **Email Notification**: GitHub sends email to tagged users

### 3. Assignment Format

PR descriptions include:
```markdown
## Assignment for @Module Forge <module.forge@electric-dreams.ai>

### Your Mission
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
*See ONBOARDING.md in your branch for detailed setup instructions*
```

## Communication Patterns

### Progress Updates

Workers post PR comments for:
- **Daily Updates**: Brief summary of progress
- **Blockers**: Issues requiring assistance
- **Questions**: Technical clarifications needed
- **Discoveries**: Important findings or insights

Example:
```markdown
## Progress Update - Day 2

✅ Completed:
- Implemented webpack externals configuration
- Tested in development environment

🔧 In Progress:
- Testing production build
- Documenting configuration changes

❓ Question:
Should we use @vercel/webpack-asset-relocator-loader or stick with manual configuration?
```

### Requesting Help

When blocked:
```markdown
## 🚨 Blocked - Need Assistance

**Issue**: Native module fails to load in packaged app
**Error**: `Cannot find module './build/Release/addon.node'`
**Attempted Solutions**:
1. Updated asarUnpack patterns
2. Added extraResource configuration
3. Verified file exists in app.asar.unpacked

**Next Steps**: Need help debugging the production path resolution.

@Forge Master - could you take a look at the forge.config.js changes?
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
- `src/main.js`: Added eval('require') for native module loading
- `forge.config.js`: Updated ASAR unpacking configuration
- `docs/`: Added troubleshooting guide

**Testing**:
- ✅ Development mode
- ✅ Production build
- ✅ Cross-platform (macOS, Windows, Linux)

Ready to merge when approved!
```

## Forge Master Responses

### Code Review
- Use PR review feature for inline comments
- Approve or request changes through GitHub UI
- Tag worker in comments: `@Module Forge <module.forge@electric-dreams.ai>`

### Providing Guidance
```markdown
@Module Forge <module.forge@electric-dreams.ai> 

Good question! For this use case, I recommend using the manual configuration approach because:
1. More control over path resolution
2. Fewer dependencies
3. Easier to debug

Here's an example configuration:
```js
// webpack.main.config.js
externals: {
  './build/Release/addon.node': 'commonjs ./build/Release/addon.node'
}
```
```

## Best Practices

### DO:
- Keep PR descriptions clear and actionable
- Update progress regularly (at least every 2 days)
- Use GitHub's formatting features (checkboxes, code blocks, etc.)
- Tag people when you need their attention
- Close resolved conversation threads

### DON'T:
- Create separate issues for questions (use PR comments)
- Wait too long before asking for help
- Commit workflow files (ASSIGNMENT.md, ONBOARDING.md)
- Use external communication channels for project discussions

## Automation Opportunities

### GitHub Actions
- Auto-assign PRs based on branch names
- Add labels based on PR content
- Run tests on PR updates
- Notify Forge Master of stale PRs

### PR Templates
Create `.github/pull_request_template.md` for consistent formatting

### Branch Protection
- Require PR reviews before merging
- Enforce status checks
- Prevent force pushes

## Summary

The PR workflow provides:
- **Centralized Communication**: All discussions in one place
- **Clear History**: Full audit trail of decisions
- **GitHub Integration**: Notifications, reviews, and automation
- **Professional Process**: Industry-standard development workflow

---

*"In the forge of collaboration, PRs are our hammer and anvil"*

🔨 **Forge Master** <forge.master@electric-dreams.ai>