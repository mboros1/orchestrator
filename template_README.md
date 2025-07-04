# [Project Name]

> [Brief project description - what this project does and why it exists]

## Vision

[Project vision statement - what this project aims to achieve]

## Technology Stack

- **Frontend**: [e.g., React, TypeScript, HTML/CSS]
- **Backend**: [e.g., Node.js, Electron, Python]
- **Build Tools**: [e.g., Webpack, Vite, Forge]
- **Testing**: [e.g., Jest, Cypress, Playwright]
- **Other**: [Additional technologies used]

## Current Development State

[Current status of the project - what's implemented, what's in progress, what's planned]

## Architecture Overview

[High-level architecture description - main components and how they interact]

## Getting Started

### Prerequisites

- [List of required software/tools]
- [Version requirements]

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd [project-directory]

# Install dependencies
npm install

# [Any additional setup steps]
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Project Structure

```
project-root/
├── src/                 # Source code
├── tests/               # Test files
├── docs/                # Documentation
├── .claude_context/     # Claude Code context storage
├── package.json         # Project dependencies and scripts
└── README.md           # This file
```

## Development Workflow

### Branch Strategy

This project uses a trunk-based development strategy:
- `trunk`: Main development branch
- Feature branches: `feature/[feature-name]`
- Bug fix branches: `fix/[bug-description]`
- Documentation branches: `docs/[doc-update]`

### Claude Code Integration

This project is optimized for development with Claude Code:

- **Context Storage**: Run `/compact` to save current context to `.claude_context/context_[project]_[feature]_[timestamp].md`
- **Session Management**: Use the context files to maintain continuity across sessions
- **Code Standards**: Follow the existing code style and patterns established in the codebase

### Testing

[Testing strategy and how to run tests]

## Contributing

### Code Style

- Follow existing code patterns and conventions
- Use TypeScript for type safety
- Write tests for new features
- Update documentation as needed

### Pull Request Process

1. Create a feature branch from `trunk`
2. Implement your changes
3. Run tests and ensure they pass
4. Update documentation if needed
5. Create a pull request with a clear description

## Build and Deployment

[Instructions for building and deploying the project]

## Related Projects

- [Links to related projects or inspiration]
- [Documentation links]
- [API references]

## License

[License information]

## Support

[How to get help, report issues, or contribute]

---

*This project is developed with Claude Code assistance. Context is automatically saved to `.claude_context/` for session continuity.*