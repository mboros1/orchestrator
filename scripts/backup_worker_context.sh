#!/bin/bash

# Backup Worker Context Script
# Preserves CLAUDE.md and other context files from workers

WORKER_NAME=${1:-"worker_1"}
BACKUP_DIR="project_knowledge/worker_backups"

echo "📦 Backing up context for $WORKER_NAME"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Find the worker directory
WORKER_DIR=$(find project_workspace -name "$WORKER_NAME" -type d | head -1)

if [ -z "$WORKER_DIR" ]; then
    echo "❌ Worker $WORKER_NAME not found"
    exit 1
fi

echo "Found worker at: $WORKER_DIR"

# Create timestamped backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="${WORKER_NAME}_backup_${TIMESTAMP}"

# Copy context files
echo "Copying context files..."

# Look for CLAUDE.md in any subdirectory
find "$WORKER_DIR" -name "CLAUDE.md" -exec cp {} "$BACKUP_DIR/${BACKUP_NAME}_CLAUDE.md" \; 2>/dev/null

# Look for any context files
find "$WORKER_DIR" -name "*.context" -o -name "*compact*.md" | while read -r file; do
    filename=$(basename "$file")
    cp "$file" "$BACKUP_DIR/${BACKUP_NAME}_${filename}"
done

# Check if anything was backed up
if ls "$BACKUP_DIR/${BACKUP_NAME}"* 1> /dev/null 2>&1; then
    echo "✅ Context backed up to $BACKUP_DIR/"
    ls -la "$BACKUP_DIR/${BACKUP_NAME}"*
else
    echo "⚠️  No context files found for $WORKER_NAME"
fi