# /naksha-init — Project Memory Setup

**Running /naksha-init — interactive project setup wizard**

---

## Project Memory Initialized

The following configuration has been written to `.naksha/project.json` and `.naksha/memory.md`.

---

## Configuration Written

### `.naksha/project.json`

```json
{
  "name": "Lumina Analytics",
  "brand": {
    "primary": "#6366F1",
    "secondary": "#06B6D4",
    "font": "Inter",
    "voice": "professional, clear, approachable"
  },
  "framework": "Next.js",
  "tokenFormat": "CSS custom properties",
  "designSystemPath": "styles/tokens.css"
}
```

### `.naksha/memory.md` (created with header)

```markdown
# Lumina Analytics — Project Memory
<!-- append design decisions below; newest entries at the bottom -->
```

---

## Setup Summary

| Field | Value |
|-------|-------|
| **Project name** | Lumina Analytics |
| **Primary brand color** | `#6366F1` (indigo) |
| **Secondary brand color** | `#06B6D4` (cyan) |
| **Brand font** | Inter |
| **Brand voice** | Professional, clear, approachable |
| **Framework** | Next.js |
| **Token format** | CSS custom properties |
| **Design system path** | `styles/tokens.css` |

---

## Project Memory Is Now Active

Future design commands (`/design`, `/brand-kit`, `/design-system`) will automatically:

1. **Read** `.naksha/project.json` to apply your brand colors, font, and framework defaults — no need to re-specify them each time
2. **Append** significant decisions to `.naksha/memory.md` so your design system builds incrementally across sessions

---

## Next Steps

Run `/naksha-status` at any time to review stored project context and recent decisions.

Run `/brand-kit` to generate a full color palette and type scale from your brand colors — the system will automatically pick up `#6366F1` and `Inter` from memory.

Run `/design-system` to generate a complete token architecture — the CSS custom properties format and `styles/tokens.css` path are already configured.

---

## Directory Created

```
.naksha/
├── project.json     ← brand, framework, token format
└── memory.md        ← design decision log (append-only)
```

Run from project root to ensure `.naksha/` is placed at the top level of your repository.
