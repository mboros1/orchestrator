#!/bin/bash

# Forge Master Signal Monitor
# This script monitors for worker communications

SIGNALS_DIR="./signals"
LAST_CHECK_FILE=".last_check"

# Create signals directory if it doesn't exist
mkdir -p "$SIGNALS_DIR"

# Function to check for new signals
check_signals() {
    echo "=== Forge Master Signal Monitor - $(date) ==="
    echo "Monitoring: $SIGNALS_DIR"
    
    # Check for any files in signals directory
    if [ -n "$(ls -A $SIGNALS_DIR 2>/dev/null)" ]; then
        echo "📨 New signals detected:"
        ls -lat "$SIGNALS_DIR"
        
        # Process each signal file
        for signal_file in "$SIGNALS_DIR"/*.md; do
            if [ -f "$signal_file" ]; then
                echo "📋 Processing signal: $(basename $signal_file)"
                echo "Content:"
                cat "$signal_file"
                echo "---"
                
                # Archive processed signal
                mkdir -p "$SIGNALS_DIR/processed"
                mv "$signal_file" "$SIGNALS_DIR/processed/"
                echo "✅ Signal archived to processed/"
            fi
        done
    else
        echo "🔍 No signals detected. Workers are quiet."
    fi
    
    echo "💡 Workers can signal by creating files like:"
    echo "  $SIGNALS_DIR/instance1_task_complete_$(date +%Y%m%d_%H%M%S).md"
    echo "  $SIGNALS_DIR/instance2_need_help_$(date +%Y%m%d_%H%M%S).md"
    echo "  $SIGNALS_DIR/instance3_update_ready_$(date +%Y%m%d_%H%M%S).md"
    echo ""
}

# Run monitoring
if [ "$1" = "continuous" ]; then
    echo "🔨 Forge Master starting continuous monitoring..."
    echo "Press Ctrl+C to stop"
    while true; do
        check_signals
        sleep 5
        echo "----------------------------------------"
    done
else
    check_signals
fi