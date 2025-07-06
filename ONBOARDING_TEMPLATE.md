# Worker Onboarding

Welcome to your project workspace! This guide will help you get started with your assignment.

## Your Workspace

- **Working Directory**: THIS directory - always start Claude Code here!
- **Branch**: `[branch-name]`
- **Remote**: `[repository-url]`

⚠️ **Critical**: See `assistant/WORKER_SETUP_GUIDE.md` (in this directory) for detailed setup instructions to ensure proper context isolation.

## Getting Started

### Step 1: Review Your Assignment
Your assignment is in the PR description at: [PR URL]

### Step 2: Set Up Your Environment
```bash
# Install dependencies (example - adjust for your project)
npm install

# Run development mode
npm start

# Run tests
npm test
```

### Step 3: Configure Your CLAUDE.md
Create or update your branch-specific CLAUDE.md to document your understanding and approach:
```bash
cat > CLAUDE.md << 'EOF'
# Worker Instance - [Feature/Task Name]

**Branch**: [branch-name]
**Task**: [Brief description]
**Started**: [Date]

## Task Understanding
[Your understanding of the assignment]

## Technical Approach
[Your planned approach]

## Progress Log
[Track your progress here]

## Key Decisions
[Document important decisions]

## Challenges & Solutions
[Track problems and how you solved them]
EOF
```

## Communication Protocol

### PR Comments
All communication happens through PR comments:

**Progress Updates**:
```markdown
## Progress Update - [Date]

✅ Completed:
- [What you finished]

🔧 In Progress:
- [What you're working on]

❓ Questions:
- [Any blockers or questions]
```

**Requesting Help**:
```markdown
## Need Assistance

**Issue**: [Description]
**What I've Tried**: [Your attempts]
**Context**: [Relevant information]

Could you provide guidance?
```

**Ready for Review**:
```markdown
## Ready for Review

All tasks complete and tested. Key changes:
- [Summary of changes]
- [Files modified]

Ready to merge!
```

## Development Workflow

### Best Practices
1. Check PR for new comments regularly
2. Post progress updates when reaching milestones
3. Ask questions early - don't stay blocked
4. Commit with clear, descriptive messages
5. Save context using `/compact` regularly

### Before Marking Complete
- [ ] All acceptance criteria met
- [ ] Tests passing
- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] CLAUDE.md reflects current state
- [ ] Final "Ready for Review" comment posted

## Important Notes

### DO NOT Commit
- This ONBOARDING.md file
- Any ASSIGNMENT.md files
- Temporary or workflow files

### DO Commit
- Your updated CLAUDE.md
- All code changes
- Documentation updates
- Test files
- Configuration changes

## Context Management

### Saving Context
Use the `/compact` command regularly to save your working context:
```
/compact
```

This creates a snapshot in `.claude_context/` that can be restored later.

### Restoring Context
If you need to resume work after a break, your context files help you quickly get back up to speed.

## Communication Modes

You must follow these communication modes (check your local `assistant/` directory):

### Sharp Mode
**Use for**: All conversational interactions, discussions, and problem-solving. Provide direct feedback, critical analysis, and honest assessments. Clearly signal uncertainty levels and ask clarifying questions.

### Absolute Mode  
**Use for**: All documentation writing. Write concisely without decorative language, emotional appeals, or unnecessary transitions.

**Location**: These mode definitions are in your project repository at:
- `assistant/sharp_mode.txt`
- `assistant/absolute_mode.txt`

## Need Help?

Post a comment on your PR describing your issue. The orchestrator will respond and help unblock you.

---

*Remember: Clear communication and regular updates help ensure smooth collaboration!*