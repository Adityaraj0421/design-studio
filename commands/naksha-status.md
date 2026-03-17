---
description: "Show current Naksha project memory — brand settings, framework, token format, and recent design decisions."
argument-hint: ""
allowed-tools: ["Read", "Bash"]
---

# /naksha-status

Display the current Naksha project context and memory stored in `.naksha/project.json` and `.naksha/memory.md`.

## Process

### Step 1: Walk Up Directory Tree

Search for `.naksha/project.json` starting from `$PWD` and walking up to 3 parent directory levels:

```bash
for i in 0 1 2 3; do
  path=$(printf '%s' "$PWD" | sed "s|/[^/]*$||;t" | head -c $((${#PWD} - i * (${#PWD} / 4))) || echo "$PWD")
  [ -f "$path/.naksha/project.json" ] && echo "$path/.naksha/project.json" && break
done
```

Or use a simpler bash loop:

```bash
current="$PWD"
found=""
for i in {0..3}; do
  if [ -f "$current/.naksha/project.json" ]; then
    found="$current/.naksha/project.json"
    break
  fi
  parent=$(dirname "$current")
  [ "$parent" = "$current" ] && break
  current="$parent"
done
echo "$found"
```

### Step 2: Check for Project File

If `.naksha/project.json` is **not found**:

```
No project memory found. Run /naksha-init to set up your project context.
```

Exit cleanly.

If **found**: proceed to Step 3.

### Step 3: Read and Parse project.json

Read the `.naksha/project.json` file. Extract:
- `name` → project name
- `brand.primary` → primary color (hex)
- `brand.secondary` → secondary color (hex, may be absent)
- `brand.font` → font family
- `brand.voice` → brand voice/tone description
- `framework` → framework name
- `tokenFormat` → token format name
- `createdAt` → ISO timestamp
- `designSystemPath` → design system path (may be absent)

### Step 4: Generate Color Hints

For each color (primary and secondary), append a human-readable color name hint:

```
#6366F1 → indigo
#F59E0B → amber
#10B981 → emerald
#3B82F6 → blue
#EF4444 → red
#8B5CF6 → purple
#EC4899 → pink
#F97316 → orange
#FBBF24 → yellow
#6366F1 → indigo
#14B8A6 → teal
#000000 → black
#FFFFFF → white
#808080 → gray
```

Use a basic color matching: convert the hex to HSL or RGB and find the closest standard web color name. If no close match, just display the hex value without a hint.

### Step 5: Read memory.md (if exists)

Check if `.naksha/memory.md` exists (same directory as project.json):

```bash
memory_file="$(dirname "$project_json")/memory.md"
[ -f "$memory_file" ] && cat "$memory_file"
```

Extract the last 10 entries (lines that start with `[`) from memory.md, with newest first (reverse order).

Format of memory entries: `[YYYY-MM-DDTHH:MM:SSZ] /command: description`

### Step 6: Build Output

Render a formatted status dashboard:

```
## Naksha Project Status

**Project:** {name}
**Initialized:** {createdAt date in YYYY-MM-DD format}

### Brand
| Setting | Value |
|---------|-------|
| Primary color | {primary} ({color hint}) |
| Secondary color | {secondary} ({color hint}) or "—" if absent |
| Font | {font} |
| Voice | {voice} |

### Technical
| Setting | Value |
|---------|-------|
| Framework | {framework} |
| Token format | {tokenFormat} |
| Design system path | {designSystemPath} or "—" if absent |

### Recent Decisions (last 10)
{numbered list of last 10 memory entries, with newest first}

---
Run `/naksha-init` to update any of these settings.
```

### Example Output

```
## Naksha Project Status

**Project:** Lumina SaaS
**Initialized:** 2026-03-17

### Brand
| Setting | Value |
|---------|-------|
| Primary color | #6366F1 (indigo) |
| Secondary color | #F59E0B (amber) |
| Font | Inter |
| Voice | professional and approachable |

### Technical
| Setting | Value |
|---------|-------|
| Framework | nextjs |
| Token format | css-vars |
| Design system path | src/tokens/tokens.css |

### Recent Decisions (last 10)
1. [2026-03-17T15:01:00Z] /design-system: Token format CSS vars, path src/tokens/tokens.css
2. [2026-03-17T14:35:00Z] /design: Landing page — hero split layout, CTA primary-500
3. [2026-03-17T14:22:00Z] /brand-kit: Primary #6366F1, secondary #F59E0B, font Inter

---
Run `/naksha-init` to update any of these settings.
```

## Color Hint Logic

Map hex colors to nearest standard color names using simple distance calculation:

```javascript
function getColorHint(hex) {
  const colors = {
    '#6366F1': 'indigo',
    '#3B82F6': 'blue',
    '#0EA5E9': 'sky',
    '#06B6D4': 'cyan',
    '#14B8A6': 'teal',
    '#10B981': 'emerald',
    '#22C55E': 'lime',
    '#FBBF24': 'amber',
    '#F59E0B': 'amber',
    '#F97316': 'orange',
    '#EF4444': 'red',
    '#EC4899': 'pink',
    '#8B5CF6': 'purple',
    '#A855F7': 'violet',
    '#000000': 'black',
    '#FFFFFF': 'white',
    '#6B7280': 'gray'
  };

  const upperHex = hex.toUpperCase();
  if (colors[upperHex]) return colors[upperHex];

  // Find closest match by hex distance
  let closest = '#6366F1';
  let minDist = 999;
  for (let [c, name] of Object.entries(colors)) {
    const dist = Math.abs(parseInt(c.slice(1), 16) - parseInt(upperHex.slice(1), 16));
    if (dist < minDist) {
      minDist = dist;
      closest = c;
    }
  }
  return colors[closest];
}
```

## Notes

- If `.naksha/memory.md` does not exist, simply omit the "Recent Decisions" section.
- If there are fewer than 10 entries in memory.md, display all of them.
- Format the creation date in readable form (YYYY-MM-DD) in the heading, but preserve the full ISO timestamp in the memory list.
- Keep the status output scannable and clean — use tables for structured data.
