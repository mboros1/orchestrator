# Multi-Instance Claude Code Orchestrator

## Architecture Overview

**Central Orchestrator Setup:**
- A dedicated folder (e.g., `project_orchestrator/`) that serves as the coordination point
- Contains scripts or a simple system to:
  - Track which branches are currently in use by which Claude Code instance
  - Create new feature branches on demand
  - Possibly maintain a manifest file listing active branches and their purposes

**Multiple Working Directories:**
- Each Claude Code instance gets its own working directory
- Example structure:
  ```
  project_workspace/
  ├── project_orchestrator/
  ├── instance_1/project_repo/
  ├── instance_2/project_repo/
  └── instance_3/project_repo/
  ```

## Claude Code Instance Workflow

**Instance 1 - Feature Development:**
1. Forge Master creates `feature/user-auth` branch and opens a PR
2. Worker is tagged in PR: @Module Forge <module.forge@electric-dreams.ai>
3. Assignment details are included in the PR description
4. Worker clones branch and begins development
5. Progress updates and questions posted as PR comments
6. When complete, worker comments "Ready for review" on the PR

**Instance 2 - Bug Fixing:**
1. Forge Master creates `fix/performance-issue` branch and PR
2. Worker tagged: @Forge Whisperer <forge.whisperer@electric-dreams.ai>
3. Bug details and reproduction steps in PR description
4. Worker investigates and provides updates via PR comments
5. Fix implemented with clear explanation in commits

**Instance 3 - Documentation:**
1. Forge Master creates `docs/api-updates` branch and PR
2. Worker tagged with their persona email
3. Documentation requirements in PR description
4. Updates committed with progress noted in PR comments

## Coordination Benefits

- **Isolation**: Each instance works in its own branch, preventing conflicts
- **Parallel Progress**: Multiple features/fixes can advance simultaneously
- **Clear Context**: Each Claude Code instance maintains focus on a specific task
- **Easy Integration**: Standard Git workflows for merging when ready

The orchestrator could be as simple as a bash script that creates branches and checks them out in the appropriate directories, or as sophisticated as a small application that tracks instance states and automates merging strategies.

## Getting Started

### Prerequisites
- Git installed
- GitHub CLI (`gh`) installed and authenticated
- Multiple Claude Code instances available

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mboros1/electric-dreams-forge.git
   cd electric-dreams-forge
   ```

2. **Create the workspace structure:**
   ```bash
   mkdir -p ../project_workspace/project_orchestrator
   mkdir -p ../project_workspace/instance_1
   mkdir -p ../project_workspace/instance_2
   mkdir -p ../project_workspace/instance_3
   ```

3. **Clone repository instances:**
   ```bash
   # Clone for each instance
   git clone https://github.com/mboros1/electric-dreams-forge.git ../project_workspace/instance_1/electric-dreams-forge
   git clone https://github.com/mboros1/electric-dreams-forge.git ../project_workspace/instance_2/electric-dreams-forge
   git clone https://github.com/mboros1/electric-dreams-forge.git ../project_workspace/instance_3/electric-dreams-forge
   ```

4. **Initialize each Claude Code instance:**
   - Open separate terminals for each instance
   - Navigate to respective instance directories
   - Start Claude Code in each directory

### Usage

Each Claude Code instance can now work independently on different branches while maintaining coordination through the central orchestrator system.