---
description: "Initialize Naksha project memory — sets up brand context, framework, and token format that persists across sessions."
argument-hint: "[optional: project name]"
allowed-tools: ["Read", "Write", "Bash"]
---

# /naksha-init $ARGUMENTS

You are the Naksha project setup wizard. Your job is to collect project context interactively and write it to `.naksha/project.json` so that all other Naksha commands can read it automatically.

**IMPORTANT: Run this command from your project root directory.** The `.naksha/` directory will be created there.

## Step 1: Check for Existing Config

Use `Bash` to check whether `.naksha/project.json` already exists:

```bash
test -f .naksha/project.json && cat .naksha/project.json || echo "NOT_FOUND"
```

- If the file exists: display the current values in a readable summary, then ask:
  > "A Naksha project is already initialized here. Do you want to update it? (yes/no)"
  - If the user says **no**: stop and remind them they can run `/naksha-status` to view context.
  - If the user says **yes**: continue with the wizard, pre-filling each prompt with the current value so they can keep or change it.
- If the file does not exist: proceed directly to the wizard.

Capture the existing values (if any) as:
- `existing_name`, `existing_primary`, `existing_secondary`, `existing_font`, `existing_voice`, `existing_framework`, `existing_token_format`, `existing_created_at`

## Step 2: Ask 7 Questions (One at a Time)

Ask each question, wait for the answer, then move to the next. If updating, show the current value in brackets so the user can press Enter to keep it.

### Q1 — Project Name
> "What is your project name? (e.g. Lumina SaaS)[current: {existing_name}]"

Collect as `project_name`. Required — do not accept empty.

### Q2 — Primary Brand Color
> "What is your primary brand color? (hex, e.g. #6366F1)[current: {existing_primary}]"

Collect as `brand_primary`. Required. Must start with `#` and be 4 or 7 characters (short or full hex).

### Q3 — Secondary Brand Color
> "What is your secondary/accent color? (hex, optional — press Enter to skip)[current: {existing_secondary}]"

Collect as `brand_secondary`. Optional — empty input means omit the field from JSON.

### Q4 — Primary Font Family
> "What is your primary font family? (e.g. Inter, Geist Mono)[current: {existing_font}]"

Collect as `brand_font`. Required — do not accept empty.

### Q5 — Brand Voice / Tone
> "Describe your brand voice in 1–5 words (e.g. professional and approachable)[current: {existing_voice}]"

Collect as `brand_voice`. Required — do not accept empty.

### Q6 — Framework
> "Which framework are you using?
>   1. react
>   2. vue
>   3. svelte
>   4. nextjs
>   5. astro
>   6. html
> Enter number or name [current: {existing_framework}]:"

Accept either the number or the exact name. Map to one of: `react`, `vue`, `svelte`, `nextjs`, `astro`, `html`. Required.

### Q7 — Token Format
> "Which design token format do you want?
>   1. css-vars
>   2. tailwind
>   3. style-dictionary
> Enter number or name [current: {existing_token_format}]:"

Accept either the number or the exact name. Map to one of: `css-vars`, `tailwind`, `style-dictionary`. Required.

## Step 3: Create Directory and Write project.json

### 3a. Create the `.naksha/` directory

```bash
mkdir -p .naksha
```

### 3b. Get the current ISO timestamp

```bash
date -u +"%Y-%m-%dT%H:%M:%SZ"
```

Use this as `updated_at`. If creating fresh, also use it as `created_at`. If updating, preserve the original `createdAt` as `created_at`.

### 3c. Build the JSON

Construct the JSON object with the collected values. If `brand_secondary` was skipped, omit the `"secondary"` key entirely from the `brand` object.

**With secondary color:**
```json
{
  "name": "<project_name>",
  "brand": {
    "primary": "<brand_primary>",
    "secondary": "<brand_secondary>",
    "font": "<brand_font>",
    "voice": "<brand_voice>"
  },
  "framework": "<framework>",
  "tokenFormat": "<token_format>",
  "createdAt": "<created_at>",
  "updatedAt": "<updated_at>"
}
```

**Without secondary color:**
```json
{
  "name": "<project_name>",
  "brand": {
    "primary": "<brand_primary>",
    "font": "<brand_font>",
    "voice": "<brand_voice>"
  },
  "framework": "<framework>",
  "tokenFormat": "<token_format>",
  "createdAt": "<created_at>",
  "updatedAt": "<updated_at>"
}
```

Write this to `.naksha/project.json` using the `Write` tool.

## Step 4: Create memory.md (if not exists)

Check if `.naksha/memory.md` already exists:

```bash
test -f .naksha/memory.md && echo "EXISTS" || echo "NOT_FOUND"
```

If it does **not** exist, create it with the `Write` tool using exactly this format:

```
# Naksha Project Memory — <project_name>

```

(Two lines: the header line, then a blank line. Do not add any entries — memory entries are appended by other commands.)

If it already exists, do **not** modify it (preserve all existing entries).

## Step 5: Show Confirmation Summary

Display a clean summary of what was saved:

```
Naksha initialized for: <project_name>

  Brand:
    Primary color   <brand_primary>
    Secondary color <brand_secondary or "(none)">
    Font            <brand_font>
    Voice           <brand_voice>

  Framework:    <framework>
  Token format: <token_format>

  Files written:
    .naksha/project.json
    .naksha/memory.md  <(created) or (already existed — preserved)>

Run /naksha-status anytime to see your project context.
```

## Notes

- Re-running `/naksha-init` is safe. It overwrites `project.json` with updated values while preserving `createdAt` and all existing `memory.md` entries.
- If you want to commit your project context to git, add and commit the `.naksha/` directory. To keep it local-only, add `.naksha/` to your `.gitignore`.
- All other Naksha commands (e.g. `/brand-kit`, `/design`, `/design-system`) automatically read from `.naksha/project.json` when present.
