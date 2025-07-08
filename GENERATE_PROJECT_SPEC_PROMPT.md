# Generate PROJECT_SPEC.md for Your Existing Project

You have two options to create a PROJECT_SPEC.md for your existing codebase:

## Option 1: Do It Yourself

1. Clone your project repository:
```bash
git clone [your-project-url]
cd [your-project-name]
```

2. Open it with Claude Code:
```bash
claude
```

3. Copy and paste this prompt:

```
Please analyze this codebase and generate a complete PROJECT_SPEC.md file following the orchestrator template format. 

Read through:
- package.json, requirements.txt, go.mod, Gemfile, or other dependency files
- README.md and any documentation
- The source code structure
- Configuration files
- Test files to understand testing approach
- CI/CD configuration files

Then create a PROJECT_SPEC.md that includes:
1. Project overview and description
2. Complete tech stack (backend, frontend, infrastructure)
3. List of current features (analyze the codebase to identify them)
4. Architecture patterns you observe
5. Development workflow commands
6. Any constraints or requirements you can infer

Make educated guesses where needed, but mark uncertain items with [VERIFY] so I can review them.

IMPORTANT: Remove the "<!-- DELETE THIS LINE AFTER FILLING OUT THE TEMPLATE -->" line since this will be a completed spec.
```

4. Review the generated PROJECT_SPEC.md and verify any [VERIFY] items
5. Copy it to your orchestrator repository

## Option 2: Let the Orchestrator Do It

When you start your orchestrator, you can say:

```
I have an existing project I'd like you to analyze. The repository is at [your-git-url]. 
Could you clone it, analyze the codebase, and generate a PROJECT_SPEC.md for me?
```

The orchestrator will:
1. Clone your repository
2. Analyze the entire codebase
3. Generate a comprehensive PROJECT_SPEC.md
4. Show it to you for review
5. Save it to the orchestrator repository

## Tips for Better Results

- Ensure your repository has a good README.md
- Include example .env files (like .env.example)
- Have your package.json/requirements.txt up to date
- Include any architecture documentation

## What the Orchestrator Looks For

When analyzing your codebase, the orchestrator examines:

### Tech Stack Detection
- **Backend**: Looks for server files, framework imports, API routes
- **Frontend**: Checks for UI frameworks, component structures
- **Database**: Finds connection configs, migrations, models
- **Testing**: Identifies test runners, test file patterns

### Feature Detection
- API endpoints → Features
- UI routes/pages → User-facing features
- Background jobs → System features
- Integration points → External features

### Architecture Patterns
- File organization (MVC, layers, modules)
- Design patterns in code
- API structure (REST, GraphQL)
- State management approach

### Development Workflow
- Scripts in package.json
- Makefile targets
- Docker commands
- CI/CD pipelines

## Example Output

After analysis, you'll get a PROJECT_SPEC.md like:

```markdown
# Project Specification

## Project Overview

**Project Name:** awesome-saas-app

**Description:** A multi-tenant SaaS platform for project management with real-time collaboration features

**Domain:** SaaS, Project Management

## Tech Stack

### Backend
- **Language:** Node.js
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL
- **ORM/ODM:** Prisma
- **Authentication:** JWT with refresh tokens

### Frontend
- **Framework:** React 18 with Next.js 13
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design system
- **State Management:** Zustand with React Query
- **Build Tool:** Next.js built-in (Webpack)

[... continues with all sections filled ...]
```

---

*This automated analysis saves significant time and ensures the orchestrator has comprehensive project understanding from day one.*