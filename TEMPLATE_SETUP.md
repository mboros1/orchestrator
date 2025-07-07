# Template Setup Guide

This guide explains how to set up your Orchestrator - an AI agent that manages multiple Claude Code workers on your project.

## Understanding the System

When you use this template, you're creating:
1. **An Orchestrator** - A Claude Code instance that lives in this repository
2. **Worker Environments** - Spaces for other Claude Code instances to work on your project
3. **Coordination System** - PR-based communication between all agents

## Initial Setup

### 1. Create Your Orchestrator Repository

Click "Use this template" on GitHub and create a new repository named `[your-project]-orchestrator`.

### 2. Clone and Activate Your Orchestrator

```bash
git clone https://github.com/yourusername/your-project-orchestrator
cd your-project-orchestrator
claude  # This starts your Orchestrator
```

### 3. First Conversation with Your Orchestrator

Your Orchestrator will need to understand your project. Be ready to discuss:

- **Project Overview**: What are you building?
- **Tech Stack**: What languages, frameworks, and tools?
- **Architecture**: How is the project structured?
- **Standards**: Coding conventions, testing requirements?
- **Goals**: What do you need help with?

### 4. Orchestrator Self-Configuration

The Orchestrator will:
1. Update its own CLAUDE.md with your project context
2. Customize the templates for your specific needs
3. Prepare to create worker assignments

## Working with Your Orchestrator

### Describing Tasks

Be specific about what you need:

**Good Examples:**
- "I need a REST API for user management with JWT authentication, using Express.js and PostgreSQL"
- "We need to add real-time notifications using WebSockets to our React app"
- "Help me refactor our monolithic service into microservices"

**The Orchestrator will ask clarifying questions:**
- What's your current authentication approach?
- Do you have preferred patterns or libraries?
- What's your testing strategy?

### Orchestrator's Work Process

When you give the Orchestrator a task, it will:

1. **Analyze Requirements**
   - Break down the work into manageable pieces
   - Identify dependencies between tasks
   - Determine optimal worker allocation

2. **Create Worker Assignments**
   - Generate customized ONBOARDING.md for each worker
   - Create starter CLAUDE.md with relevant context
   - Set up feature branches in your project

3. **Launch Workers**
   - Create PRs with detailed assignments
   - Help you start worker instances
   - Monitor their progress

4. **Facilitate Development**
   - Answer worker questions
   - Coordinate between workers
   - Ensure smooth integration

## Orchestrator Evolution

Your Orchestrator improves over time:

### Knowledge Building
- Learns your codebase patterns
- Understands your preferences
- Builds expertise in your domain

### Context Refinement
The Orchestrator updates its own CLAUDE.md with:
- Discovered patterns
- Successful approaches
- Project-specific knowledge

### Better Assignments
As the Orchestrator learns, it creates:
- More targeted worker contexts
- Better work breakdowns
- Clearer requirements

## Best Practices

### For You (The Human)

1. **Be Clear About Goals**
   - Explain the why, not just the what
   - Share business context when relevant

2. **Provide Feedback**
   - Tell the Orchestrator what worked well
   - Suggest improvements to its approach

3. **Trust the Process**
   - Let the Orchestrator manage workers
   - Focus on high-level requirements

### For the Orchestrator

The Orchestrator should:
1. Ask clarifying questions before creating assignments
2. Document all project learnings in its CLAUDE.md
3. Create clear, actionable worker assignments
4. Monitor and support workers actively

## Common Scenarios

### Scenario 1: New Feature
```
You: "I need to add payment processing to our e-commerce site"
Orchestrator: *asks about payment providers, currencies, requirements*
Orchestrator: *creates assignments for payment integration, testing, documentation*
Orchestrator: *launches workers and monitors progress*
```

### Scenario 2: Bug Fix Sprint
```
You: "We have 15 bugs to fix from our bug tracker"
Orchestrator: *analyzes bugs and groups by subsystem*
Orchestrator: *creates targeted assignments for each area*
Orchestrator: *coordinates fixes without conflicts*
```

### Scenario 3: Major Refactor
```
You: "Our authentication system needs to be completely rebuilt"
Orchestrator: *understands current system and target state*
Orchestrator: *plans phased migration approach*
Orchestrator: *manages gradual transition with multiple workers*
```

## Troubleshooting

### Orchestrator Seems Confused
- Review and update its CLAUDE.md together
- Provide more project context
- Share example code or patterns

### Workers Not Performing Well
- The Orchestrator may need to improve its assignments
- Share feedback so it can adjust its approach
- Consider simpler task breakdowns

### Integration Issues
- The Orchestrator should coordinate better
- Discuss dependency management
- Review the branching strategy

## Next Steps

1. Start your Orchestrator with `claude`
2. Have your initial project discussion
3. Describe your first task
4. Let the Orchestrator begin managing workers
5. Iterate and improve together

Remember: The Orchestrator is your partner in managing AI-powered development. The more context and feedback you provide, the better it becomes at serving your project's needs.