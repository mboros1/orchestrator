#!/bin/bash

# Forge Master Multi-Instance Signal Monitor
# This script monitors signals from all worker instances

# Function to check signals in a specific instance
check_instance_signals() {
    local instance_dir=$1
    local instance_name=$(basename "$instance_dir")
    local signals_dir="$instance_dir/electric-dreams-forge/signals"
    
    echo "📍 Checking $instance_name..."
    
    if [ ! -d "$signals_dir" ]; then
        echo "   ⚪ No signals directory found"
        return
    fi
    
    # Check for any files in signals directory
    if [ -n "$(ls -A $signals_dir 2>/dev/null)" ]; then
        echo "   📨 New signals detected:"
        for signal_file in "$signals_dir"/*.md; do
            if [ -f "$signal_file" ]; then
                echo "   📋 Signal: $(basename $signal_file)"
                echo "   Content:"
                cat "$signal_file" | sed 's/^/   /'
                echo "   ---"
                
                # Archive processed signal
                mkdir -p "$signals_dir/processed"
                mv "$signal_file" "$signals_dir/processed/"
                echo "   ✅ Signal archived to $instance_name/signals/processed/"
            fi
        done
    else
        echo "   🔍 No new signals"
    fi
    echo ""
}

# Main monitoring function
monitor_all() {
    echo "=== 🔨 Forge Master Multi-Instance Signal Monitor - $(date) ==="
    echo ""
    
    # Check project workspace exists
    if [ ! -d "project_workspace" ]; then
        echo "❌ No project_workspace directory found"
        echo "💡 Run from the orchestrator root directory"
        exit 1
    fi
    
    # Monitor all instances
    for instance_dir in project_workspace/instance_*/; do
        if [ -d "$instance_dir" ]; then
            check_instance_signals "$instance_dir"
        fi
    done
    
    echo "💡 Workers create signals in their instance's signals/ directory"
    echo "📊 Active instances: $(ls -d project_workspace/instance_*/ 2>/dev/null | wc -l)"
    echo ""
}

# Check for Forge Master's own signals
check_forge_master_signals() {
    echo "=== 🔨 Forge Master's Own Signals ==="
    if [ -d "signals" ] && [ -n "$(ls -A signals 2>/dev/null)" ]; then
        echo "📨 Forge Master signals detected:"
        ls -la signals/
    else
        echo "🔍 No Forge Master signals"
    fi
    echo ""
}

# Run monitoring
if [ "$1" = "continuous" ]; then
    echo "🔨 Forge Master starting continuous multi-instance monitoring..."
    echo "Press Ctrl+C to stop"
    while true; do
        clear
        monitor_all
        check_forge_master_signals
        sleep 5
    done
else
    monitor_all
    check_forge_master_signals
fi