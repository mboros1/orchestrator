# Orchestrator MCP Server

This MCP (Model Context Protocol) server provides specialized tools for orchestrator operations, enabling efficient management of multiple AI workers.

## Tools Provided

### 1. `create_worker`
Creates a new worker workspace and clones the project repository.

**Parameters:**
- `workerName`: Name of the worker (e.g., 'worker_1')
- `projectRepo`: Git URL of the project repository
- `projectPath`: Path to the orchestrator repository

### 2. `setup_branch`
Creates and checks out a feature branch for the worker.

**Parameters:**
- `workerPath`: Path to worker's project directory
- `branchName`: Feature branch name (e.g., 'feature/add-auth')
- `baseBranch`: Base branch to create from (default: 'main')

### 3. `copy_templates`
Copies orchestrator templates and assistant files to the worker's project.

**Parameters:**
- `orchestratorPath`: Path to orchestrator repository
- `workerProjectPath`: Path to worker's project directory

### 4. `create_private_branch`
Creates a private branch for backing up the worker's CLAUDE.md.

**Parameters:**
- `workerPath`: Path to worker's project directory
- `workerName`: Name of the worker
- `featureName`: Feature name for the private branch

### 5. `backup_claudemd`
Backs up CLAUDE.md to the worker's private branch.

**Parameters:**
- `workerPath`: Path to worker's project directory
- `privateBranch`: Private branch name

## Setup

1. Install dependencies:
```bash
cd mcp-server
npm install
```

2. Build the server:
```bash
npm run build
```

3. The server is now ready to use with the MCP configuration file.

## Development

To run the server in development mode:
```bash
npm run dev
```

## How It Works

This is an stdio-based MCP server that:
- Launches on-demand when Claude needs it
- Executes orchestrator operations atomically
- Provides better error handling than raw bash commands
- Returns structured responses to Claude

Each tool encapsulates complex git and filesystem operations into simple, reliable function calls.