# Worker Onboarding: [Persona Name]

Welcome to your Electric Dreams Forge workspace! This guide will help you get started with your assignment.

## Your Role

**Title**: [Persona Title]  
**Specialty**: [Domain Expertise]  
**Mission**: [Your specific mission]

## Your Workspace

- **Working Directory**: THIS directory - always start Claude Code here!
- **Branch**: `[branch-name]`
- **Remote**: `https://github.com/mboros1/electric-dreams-forge.git`

## Getting Started

### Step 1: Review Your Assignment
Your assignment is in the PR description at: [PR URL]

### Step 2: Set Up Your Environment
```bash
# Install dependencies
npm install

# Run development mode
npm start

# Run tests
npm test
```

### Step 3: Create Your Persona (First Task)
Create your specialized CLAUDE.md to establish your identity:
```bash
cat > CLAUDE.md << 'EOF'
# [Persona Title] - [Your Specialty]

**Title**: [Your Title]
**Specialty**: [Your Domain]
**Mission**: [Your Purpose]
**Email**: [persona.name]@electric-dreams.ai

## My Purpose
[Your role description]

## Core Expertise
[Your specialized knowledge]

## My Tools of the Trade
[Your specialized toolkit]

[Continue building your identity...]
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
**Next Steps**: [What you think might help]

@Forge Master - could you provide guidance?
```

**Ready for Review**:
```markdown
## Ready for Review

All tasks complete and tested. Key changes:
- [File 1]: [What changed]
- [File 2]: [What changed]

Ready to merge!
```

## Development Workflow

### Daily Routine
1. Check PR for new comments
2. Post progress update if significant work done
3. Ask questions early - don't stay blocked
4. Commit with clear messages

### Before Marking Complete
- [ ] All acceptance criteria met
- [ ] Tests passing
- [ ] Code documented
- [ ] Persona CLAUDE.md created/updated
- [ ] Final "Ready for Review" comment posted

## Important Notes

### DO NOT Commit
- This ONBOARDING.md file
- Any ASSIGNMENT.md files
- Workflow-related documents

### DO Commit
- Your specialized CLAUDE.md
- All code changes
- Documentation updates
- Test files

## Need Help?

Post a comment on your PR and tag @Forge Master. We're here to help you succeed!

---

*"Welcome to the forge - may your code be strong and your bugs be few!"*

🔨 **Forge Master** <forge.master@electric-dreams.ai>