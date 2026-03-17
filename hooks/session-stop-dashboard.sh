#!/bin/bash
# naksha-studio: Session Stop — Shutdown Dashboard HTTP Server

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PID_FILE="$PROJECT_ROOT/.naksha/dashboard.pid"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    kill "$PID" && echo "naksha dashboard stopped (PID $PID)"
  fi
  rm -f "$PID_FILE"
fi
