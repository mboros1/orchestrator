#!/bin/bash

# Orchestrator Self-Diagnostic Script
# Run this to verify your orchestrator setup is working correctly

echo "🔍 Orchestrator Self-Diagnostic"
echo "=============================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from orchestrator directory
if [ ! -f "CLAUDE.md" ] || [ ! -f "ONBOARDING.md" ]; then
    echo -e "${RED}❌ Not running from orchestrator directory${NC}"
    echo "   Please run this script from the root of your orchestrator repository"
    exit 1
fi

echo "1. Checking directory structure..."
MISSING_DIRS=()
for dir in "assistant" "mcp-server" "scripts"; do
    if [ -d "$dir" ]; then
        echo -e "   ${GREEN}✓${NC} $dir/"
    else
        echo -e "   ${RED}✗${NC} $dir/ (missing)"
        MISSING_DIRS+=("$dir")
    fi
done

echo ""
echo "2. Checking required files..."
MISSING_FILES=()
for file in "CLAUDE.md" "ONBOARDING.md" "PROJECT_SPEC.md" "ASSIGNMENT_TEMPLATE.md" "RESEARCH_CHECKLIST.md"; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✓${NC} $file"
    else
        echo -e "   ${RED}✗${NC} $file (missing)"
        MISSING_FILES+=("$file")
    fi
done

echo ""
echo "3. Checking MCP server..."
if [ -f "mcp-server/package.json" ]; then
    echo -e "   ${GREEN}✓${NC} MCP server package.json found"
    
    # Check if built
    if [ -f "mcp-server/dist/index.js" ]; then
        echo -e "   ${GREEN}✓${NC} MCP server is built"
    else
        echo -e "   ${YELLOW}⚠${NC}  MCP server not built - run: cd mcp-server && npm install && npm run build"
    fi
else
    echo -e "   ${RED}✗${NC} MCP server not found"
fi

echo ""
echo "4. Checking MCP configuration..."
if [ -f "mcp-config.json" ]; then
    echo -e "   ${GREEN}✓${NC} mcp-config.json found"
    
    # Check if it contains orchestrator server
    if grep -q "orchestrator" mcp-config.json 2>/dev/null; then
        echo -e "   ${GREEN}✓${NC} Orchestrator MCP server configured"
    else
        echo -e "   ${YELLOW}⚠${NC}  Orchestrator server not in mcp-config.json"
    fi
else
    echo -e "   ${RED}✗${NC} mcp-config.json not found"
fi

echo ""
echo "5. Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "   ${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "   ${RED}✗${NC} Node.js not found - required for MCP server"
fi

echo ""
echo "6. Checking git..."
if command -v git &> /dev/null; then
    echo -e "   ${GREEN}✓${NC} Git installed"
    
    # Check if in git repo
    if git rev-parse --git-dir > /dev/null 2>&1; then
        echo -e "   ${GREEN}✓${NC} In git repository"
        BRANCH=$(git branch --show-current)
        echo -e "   ${GREEN}✓${NC} Current branch: $BRANCH"
    else
        echo -e "   ${YELLOW}⚠${NC}  Not in a git repository"
    fi
else
    echo -e "   ${RED}✗${NC} Git not found"
fi

echo ""
echo "7. Checking GitHub CLI..."
if command -v gh &> /dev/null; then
    echo -e "   ${GREEN}✓${NC} GitHub CLI installed"
    
    # Check if authenticated
    if gh auth status &> /dev/null; then
        echo -e "   ${GREEN}✓${NC} GitHub CLI authenticated"
    else
        echo -e "   ${YELLOW}⚠${NC}  GitHub CLI not authenticated - run: gh auth login"
    fi
else
    echo -e "   ${YELLOW}⚠${NC}  GitHub CLI not found - optional but recommended"
fi

echo ""
echo "8. Checking worker workspace..."
if [ -d "project_workspace" ]; then
    echo -e "   ${GREEN}✓${NC} project_workspace/ exists"
    WORKER_COUNT=$(find project_workspace -maxdepth 1 -type d -name "worker_*" | wc -l)
    echo -e "   ${GREEN}✓${NC} Active workers: $WORKER_COUNT"
else
    echo -e "   ${GREEN}✓${NC} project_workspace/ not found (will be created when needed)"
fi

echo ""
echo "=============================="
echo "Diagnostic Summary:"
echo ""

# Summary
if [ ${#MISSING_DIRS[@]} -eq 0 ] && [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ All core components present${NC}"
else
    echo -e "${RED}✗ Missing components detected${NC}"
    if [ ${#MISSING_DIRS[@]} -gt 0 ]; then
        echo "  Missing directories: ${MISSING_DIRS[*]}"
    fi
    if [ ${#MISSING_FILES[@]} -gt 0 ]; then
        echo "  Missing files: ${MISSING_FILES[*]}"
    fi
fi

echo ""
echo "Next steps:"
echo "1. Fix any missing components"
echo "2. Restart Claude Code to load MCP server"
echo "3. Start orchestrating with confidence!"
echo ""