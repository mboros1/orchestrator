# Worker MCP Setup Guide

## Overview

Workers benefit from MCP (Model Context Protocol) tools for enhanced development capabilities. This guide helps workers configure MCP in their project repositories.

## Core MCP Tools for Workers

### Communication Modes
Essential for precise communication:
- **Sharp Mode**: Critical thinking, analysis, direct feedback
- **Absolute Mode**: Documentation writing without decoration

### Development Tools
Recommended MCP capabilities:
- **Vector Search**: Fast codebase exploration and pattern finding
- **Code Analysis**: Static analysis and quality checking  
- **Performance Profiling**: Benchmarking and optimization
- **Test Generation**: Automated test creation and validation

## Setup Instructions

### 1. Check for Existing MCP Configuration

Look for these files in your project repository:
```
mcp-config.json          # MCP server configuration
.claude_mcp/            # MCP tools directory
assistant/              # Communication mode definitions
```

### 2. Basic MCP Configuration

If no MCP setup exists, create minimal configuration:

```json
{
  "mcpServers": {
    "development": {
      "command": "node",
      "args": ["mcp-server/dist/index.js"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

### 3. Communication Modes Setup

Ensure you have mode definitions:
- `assistant/sharp_mode.txt` - For analysis and discussion
- `assistant/absolute_mode.txt` - For documentation writing

### 4. Project-Specific Tools

Common project-specific MCP tools:

**For C++ Projects**:
- Static analysis (clang-tidy, cppcheck)
- Performance profiling (perf, valgrind)
- Build system integration (CMake, Make)

**For Node.js Projects**:
- Package management (npm, yarn)
- Testing frameworks (Jest, Mocha)
- Bundling and optimization

**For Python Projects**:
- Type checking (mypy, pyright)
- Code formatting (black, ruff)
- Testing (pytest, unittest)

## Integration Benefits

### Enhanced Development Velocity
- **Faster Code Navigation**: Vector search through large codebases
- **Pattern Recognition**: Identify existing patterns and conventions
- **Automated Testing**: Generate comprehensive test suites
- **Performance Optimization**: Identify bottlenecks and improvements

### Quality Assurance
- **Static Analysis**: Catch issues before runtime
- **Code Standards**: Enforce project conventions
- **Documentation**: Generate and maintain technical documentation
- **Security Scanning**: Identify potential vulnerabilities

## Configuration Examples

### Vector Search Integration
```json
{
  "vectorSearch": {
    "embeddings": "sentence-transformers/all-MiniLM-L6-v2",
    "indexPath": ".claude_context/vector_index",
    "chunkSize": 512
  }
}
```

### Code Analysis Tools
```json
{
  "codeAnalysis": {
    "staticAnalysis": true,
    "performanceProfiling": true,
    "testGeneration": true,
    "documentationSync": true
  }
}
```

## Best Practices

### MCP Tool Usage
1. **Start Simple**: Begin with communication modes and basic tools
2. **Add Incrementally**: Introduce tools as needed for specific tasks
3. **Performance Focus**: Choose tools that enhance rather than slow development
4. **Project Alignment**: Ensure tools match project technology stack

### Integration Workflow
1. Configure MCP tools during project setup
2. Test tools with simple operations before complex tasks
3. Document tool-specific workflows in project CLAUDE.md
4. Share useful configurations with team/future workers

## Troubleshooting

### Common Issues
- **Tool Installation**: Ensure all dependencies are available
- **Path Configuration**: Verify tool paths are correct for the environment
- **Environment Variables**: Check required environment setup
- **Performance**: Monitor tool overhead and adjust as needed

### Debugging
```bash
# Test MCP server connection
claude-mcp test-connection

# Validate configuration
claude-mcp validate-config

# Check tool availability
claude-mcp list-tools
```

## Advanced Configuration

### Custom MCP Servers
For project-specific needs, workers can implement custom MCP servers:
- Domain-specific analysis tools
- Integration with project CI/CD
- Custom performance metrics
- Specialized documentation generation

### Tool Chaining
Combine multiple MCP tools for complex workflows:
1. Vector search to find similar code patterns
2. Static analysis to validate approaches
3. Test generation for comprehensive coverage
4. Performance profiling for optimization

## Conclusion

MCP tools significantly enhance worker capabilities and development velocity. The key is choosing the right tools for each project and integrating them smoothly into the development workflow.

Start with communication modes and basic tools, then expand based on project needs and worker preferences.