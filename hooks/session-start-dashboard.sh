#!/bin/bash
# naksha-studio: Session Start — Launch Dashboard HTTP Server
# Starts the local dashboard at http://localhost:7432 when a Claude Code
# session opens in this project. Skips if already running.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DASHBOARD_DIR="$PROJECT_ROOT/dashboard"
PID_FILE="$PROJECT_ROOT/.naksha/dashboard.pid"
PORT="${NAKSHA_DASHBOARD_PORT:-7432}"

# Skip if dashboard server is already running
if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    echo "naksha dashboard already running (PID $PID) → http://localhost:$PORT"
    exit 0
  fi
fi

# Install deps if needed
if [ ! -d "$DASHBOARD_DIR/node_modules" ]; then
  echo "naksha dashboard: installing dependencies…"
  cd "$DASHBOARD_DIR" && npm install --silent
fi

# Start the dashboard HTTP server in background
cd "$DASHBOARD_DIR"
node server.js > /tmp/naksha-dashboard.log 2>&1 &
echo "naksha dashboard started → http://localhost:$PORT"
