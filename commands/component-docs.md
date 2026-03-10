---
description: "Auto-generate component documentation from Figma — props, variants, usage guidelines, spacing specs, and code snippets in Storybook-style format."
argument-hint: "[Figma URL, component name, or 'all components']"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /component-docs

You are generating **component documentation** from Figma component sets. This creates Storybook-style reference docs with visual examples, prop tables, usage guidelines, and code snippets.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/design-system-lead.md` for token/component architecture and `${CLAUDE_PLUGIN_ROOT}/skills/design/references/figma-creation.md` for Figma API patterns.

## Process

### 1. Connect & Identify Components

```
figma_get_status → verify Desktop Bridge connection
```

Find all component sets in the file:
```javascript
figma_execute: `
  await figma.loadAllPagesAsync();
  const sets = figma.root.findAllWithCriteria({ types: ['COMPONENT_SET'] });
  const components = figma.root.findAllWithCriteria({ types: ['COMPONENT'] })
    .filter(c => c.parent?.type !== 'COMPONENT_SET');

  return {
    componentSets: sets.map(cs => ({
      id: cs.id,
      name: cs.name,
      variantCount: cs.children.length,
      variants: cs.children.map(v => v.name),
      properties: cs.componentPropertyDefinitions
        ? Object.entries(cs.componentPropertyDefinitions).map(([key, def]) => ({
            name: key.split('#')[0],
            type: def.type,
            defaultValue: def.defaultValue,
            variantOptions: def.variantOptions
          }))
        : [],
      description: cs.description,
      page: cs.parent?.parent?.name || cs.parent?.name
    })),
    standaloneComponents: components.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      page: c.parent?.parent?.name || c.parent?.name
    }))
  };
`
```

### 2. Extract Component Details

For each component set, gather detailed specs:

#### Visual Specs
```javascript
figma_execute: `
  const cs = await figma.getNodeByIdAsync('COMPONENT_SET_ID');
  const variants = cs.children.map(v => {
    const texts = v.findAllWithCriteria({ types: ['TEXT'] });
    return {
      name: v.name,
      width: Math.round(v.width),
      height: Math.round(v.height),
      layoutMode: v.layoutMode,
      padding: v.paddingLeft ? {
        top: v.paddingTop, right: v.paddingRight,
        bottom: v.paddingBottom, left: v.paddingLeft
      } : null,
      itemSpacing: v.itemSpacing,
      cornerRadius: v.cornerRadius,
      fills: v.fills?.map(f => {
        if (f.type === 'SOLID') {
          const c = f.color;
          return '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
        }
        return f.type;
      }),
      textContent: texts.map(t => ({
        text: t.characters?.substring(0, 50),
        fontSize: t.fontSize,
        fontWeight: t.fontName?.style
      }))
    };
  });
  return variants;
`
```

#### Screenshot Each Variant
```
For each variant in the component set:
  figma_capture_screenshot(variantId) → visual reference
```

Or screenshot the entire component set:
```
figma_capture_screenshot(componentSetId) → overview image
```

### 3. Generate Documentation

For each component, produce a documentation page:

```markdown
# [Component Name]

> [Description from Figma or auto-generated summary]

![Component Overview](screenshot.png)

## Props / Properties

| Property | Type | Default | Options | Description |
|----------|------|---------|---------|-------------|
| Type | Variant | Primary | Primary, Secondary, Ghost, Danger | Visual style variant |
| Size | Variant | Medium | Small, Medium, Large | Size of the component |
| State | Variant | Default | Default, Hover, Active, Disabled | Interactive state |
| Show Icon | Boolean | false | true, false | Whether to show a leading icon |
| Label | Text | "Button" | any string | Button label text |

## Variants

### By Type
| Primary | Secondary | Ghost | Danger |
|---------|-----------|-------|--------|
| [img] | [img] | [img] | [img] |

### By Size
| Small (32px) | Medium (40px) | Large (48px) |
|------|--------|-------|
| [img] | [img] | [img] |

### Interactive States
| Default | Hover | Active | Disabled |
|---------|-------|--------|----------|
| [img] | [img] | [img] | [img] |

## Specs

### Dimensions
| Variant | Width | Height | Padding | Corner Radius |
|---------|-------|--------|---------|---------------|
| Small | auto | 32px | 8px 12px | 6px |
| Medium | auto | 40px | 10px 16px | 8px |
| Large | auto | 48px | 12px 20px | 8px |

### Typography
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Label (SM) | Inter | 14px | 500 | --color-white |
| Label (MD) | Inter | 14px | 500 | --color-white |
| Label (LG) | Inter | 16px | 600 | --color-white |

### Colors
| Variant | Background | Text | Border | Hover BG |
|---------|-----------|------|--------|----------|
| Primary | --primary-500 | white | none | --primary-600 |
| Secondary | transparent | --primary-500 | --primary-500 | --primary-50 |

## Usage Guidelines

### Do
- Use Primary for the main action on a page
- Use one Primary button per section maximum
- Use Ghost for low-emphasis actions in toolbars

### Don't
- Don't use Danger for non-destructive actions
- Don't stack more than 3 buttons horizontally
- Don't use disabled state without explaining why

## Code Example

### HTML + Tailwind
```html
<button class="inline-flex items-center px-4 py-2 bg-primary-500 text-white
               rounded-lg font-medium text-sm hover:bg-primary-600
               focus:outline-none focus:ring-2 focus:ring-primary-500/50
               disabled:opacity-50 disabled:cursor-not-allowed">
  Button Label
</button>
```

### React
```jsx
function Button({ type = 'primary', size = 'md', children, ...props }) {
  return (
    <button className={cn(styles.base, styles[type], styles[size])} {...props}>
      {children}
    </button>
  );
}
```

## Accessibility

- Uses `<button>` element (not `<div>` or `<a>`)
- Disabled state uses `disabled` attribute, not just visual styling
- Focus ring visible with keyboard navigation
- Minimum touch target: 44×44px
- Color contrast: label on background meets WCAG AA (4.5:1)
```

### 4. Generate Index Page

Create a component library index:

```markdown
# Component Library

| Component | Variants | Properties | Status |
|-----------|----------|------------|--------|
| Button | 12 | Type, Size, State, Icon | ✅ Complete |
| Content Card | 6 | Type, Size | ✅ Complete |
| Tag Pill | 3 | Category | ✅ Complete |
| Input | — | — | ⚠️ Needs variants |
```

### 5. Output

Generate documentation as:

**Single Markdown File** (default):
```
./component-docs/README.md    — index + all components
```

**Multi-File** (for larger systems):
```
./component-docs/
├── README.md               — index
├── button.md              — Button docs
├── content-card.md        — Content Card docs
├── tag-pill.md            — Tag Pill docs
└── assets/                — screenshots
```

**HTML Site** (optional):
Generate a browsable HTML documentation site using the preview server.

### 6. Preview

```
preview_start → launch the HTML docs
preview_screenshot → capture proof
```

## Notes

- **Property naming**: Strip the `#nodeId` suffix from Figma property names for clean docs
- **Auto-generate descriptions**: If Figma components lack descriptions, generate sensible defaults based on the component structure
- **Usage guidelines**: Infer Do/Don't from the variant structure (e.g., if there's a "Danger" type, add a guideline about destructive actions)
- **Code examples**: Adapt to detected framework (React/Vue/Svelte/HTML)
- **Screenshots**: Prefer `figma_capture_screenshot` (current state) over REST API (cloud state)

## MCP Fallback

If Figma Desktop Bridge is unavailable:
- Ask the user for component screenshots and a list of props/variants
- Generate documentation from the manually provided inputs
- Code examples and usage guidelines are still generated normally

## What's Next

After generating component docs:
- `/design-handoff` — generate full developer handoff including component docs
- `/figma-sync` — check if code components match the documented Figma components
- `/design-review` — audit component implementations for quality
- `/design-present` — create a component library walkthrough presentation
