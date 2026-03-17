#!/usr/bin/env node
/**
 * naksha-studio MCP Dashboard Server
 * Exposes tools Claude can call to write live state into .naksha/dashboard.json
 * Claude Code registers this via plugin.json mcpServers entry.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const STATE_FILE = path.join(PROJECT_ROOT, ".naksha", "dashboard.json");
const NAKSHA_DIR = path.join(PROJECT_ROOT, ".naksha");

// ── helpers ──────────────────────────────────────────────────────────────────

function readState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return defaultState();
  }
}

function writeState(state) {
  if (!fs.existsSync(NAKSHA_DIR)) fs.mkdirSync(NAKSHA_DIR, { recursive: true });
  state.updated = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function defaultState() {
  return {
    version: "1.0",
    updated: new Date().toISOString(),
    score: { total: null, accessibility: null, usability: null, visual: null, tokens: null, updated: null },
    commands: [],
    tokens: { color: 0, spacing: 0, radius: 0, typography: 0, health: null, updated: null },
    lint: { issues: 0, files_scanned: 0, updated: null },
    queue: [],
  };
}

// ── server ───────────────────────────────────────────────────────────────────

const server = new Server(
  { name: "naksha-dashboard", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "dashboard_log_command",
      description: "Log a completed naksha command run to the dashboard. Call this at the end of any /design-* command.",
      inputSchema: {
        type: "object",
        properties: {
          name:     { type: "string", description: "Command name e.g. /design-review" },
          status:   { type: "string", enum: ["success", "warning", "error"], description: "Outcome" },
          summary:  { type: "string", description: "One-line result summary" },
          duration: { type: "number", description: "Duration in seconds (optional)" },
        },
        required: ["name", "status", "summary"],
      },
    },
    {
      name: "dashboard_update_score",
      description: "Write the latest design score from /design-score to the dashboard.",
      inputSchema: {
        type: "object",
        properties: {
          total:         { type: "number", description: "Overall score 0-100" },
          accessibility: { type: "number" },
          usability:     { type: "number" },
          visual:        { type: "number" },
          tokens:        { type: "number" },
        },
        required: ["total"],
      },
    },
    {
      name: "dashboard_update_tokens",
      description: "Write token health summary from /design-token-extractor to the dashboard.",
      inputSchema: {
        type: "object",
        properties: {
          color:      { type: "number", description: "Number of color tokens found" },
          spacing:    { type: "number" },
          radius:     { type: "number" },
          typography: { type: "number" },
          health:     { type: "string", enum: ["healthy", "warning", "critical"], description: "Overall token health" },
        },
        required: ["health"],
      },
    },
    {
      name: "dashboard_update_lint",
      description: "Write lint results from /design-lint to the dashboard.",
      inputSchema: {
        type: "object",
        properties: {
          issues:        { type: "number", description: "Total issues found" },
          files_scanned: { type: "number" },
        },
        required: ["issues", "files_scanned"],
      },
    },
    {
      name: "dashboard_get_queue",
      description: "Read and clear the command queue set by the UI. Returns array of pending commands.",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  const state = readState();

  switch (name) {
    case "dashboard_log_command": {
      const entry = {
        name: args.name,
        status: args.status,
        summary: args.summary,
        duration: args.duration ?? null,
        timestamp: new Date().toISOString(),
      };
      state.commands = [entry, ...state.commands].slice(0, 20); // keep last 20
      writeState(state);
      return { content: [{ type: "text", text: `Logged: ${args.name} → ${args.status}` }] };
    }

    case "dashboard_update_score": {
      state.score = { ...state.score, ...args, updated: new Date().toISOString() };
      writeState(state);
      return { content: [{ type: "text", text: `Score updated: ${args.total}/100` }] };
    }

    case "dashboard_update_tokens": {
      state.tokens = { ...state.tokens, ...args, updated: new Date().toISOString() };
      writeState(state);
      return { content: [{ type: "text", text: `Token health: ${args.health}` }] };
    }

    case "dashboard_update_lint": {
      state.lint = { issues: args.issues, files_scanned: args.files_scanned, updated: new Date().toISOString() };
      writeState(state);
      return { content: [{ type: "text", text: `Lint: ${args.issues} issues across ${args.files_scanned} files` }] };
    }

    case "dashboard_get_queue": {
      const queue = [...(state.queue ?? [])];
      state.queue = [];
      writeState(state);
      return { content: [{ type: "text", text: JSON.stringify(queue) }] };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// ── start ────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
