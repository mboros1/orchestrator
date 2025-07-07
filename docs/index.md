# Orchestrator

A GitHub template that creates an AI Orchestrator - a Claude Code instance that manages multiple AI workers on your software development project.

## What is Orchestrator?

Orchestrator is an agentic AI system where a primary Claude Code instance (the Orchestrator) coordinates multiple other Claude Code instances (workers) to build software in parallel. You describe what you need, and the Orchestrator handles breaking down work, creating assignments, and managing integration.

## Key Features

- **Multi-Instance Coordination** - Manage multiple Claude Code instances working simultaneously
- **Branch Isolation** - Each worker operates on their own feature branch
- **PR-Based Workflow** - All communication happens through GitHub Pull Requests
- **Knowledge Persistence** - Workers build expertise over time through private branches
- **Communication Modes** - Sharp Mode for conversations, Absolute Mode for documentation

## Quick Start

1. **[Use this template](https://github.com/mboros1/orchestrator)** to create your orchestrator repository
2. Clone your new repository
3. Follow the [Setup Guide](setup.md) to configure for your project
4. Create your first [worker assignment](workflow.md)

## How It Works

```mermaid
graph TD
    A[You] -->|Describe Need| B[Orchestrator AI]
    B -->|Creates Assignments| C[Worker 1]
    B -->|Creates Assignments| D[Worker 2]  
    B -->|Creates Assignments| E[Worker 3]
    C -->|Develops| F[Feature Branch 1]
    D -->|Develops| G[Feature Branch 2]
    E -->|Develops| H[Feature Branch 3]
    B -->|Integrates| I[Main Branch]
    I -->|Delivers| A
```

1. **You** tell the Orchestrator what you need
2. **Orchestrator** understands requirements and creates assignments
3. **Workers** develop features in parallel
4. **Orchestrator** manages integration
5. **You** review the results

## Documentation

- [Setup Guide](setup.md) - Get started with your own orchestrator
- [Workflow](workflow.md) - Understand the PR-based workflow
- [Architecture](architecture.md) - Technical details and design decisions
- [Best Practices](best-practices.md) - Tips for effective orchestration

## Use Cases

- **Large Feature Development** - Break down complex features across multiple workers
- **Parallel Bug Fixing** - Assign different bugs to different workers
- **Documentation Updates** - Coordinate documentation efforts
- **Refactoring Projects** - Systematic codebase improvements

## Why Orchestrator?

Traditional development with AI assistants faces challenges:
- Context loss between sessions
- Difficulty coordinating multiple tasks
- No systematic knowledge building
- Merge conflicts from parallel work

Orchestrator solves these through:
- Persistent context in private branches
- Clear task isolation
- Knowledge accumulation over time
- Branch-based conflict prevention

[Get Started →](setup.md)