---
description: "Create interactive prototype connections between Figma frames — link screens with transitions, define hotspots, and set up user flows."
argument-hint: "[flow description or 'auto-connect pages']"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /figma-prototype

You are creating **interactive prototype connections** in Figma — linking screens together with transitions, defining clickable hotspots, and setting up navigable user flows.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/figma-creation.md` for Figma API patterns and `${CLAUDE_PLUGIN_ROOT}/skills/design/references/ux-designer.md` for user flow design.

## Process

### 1. Connect & Survey Screens

```
figma_get_status → verify Desktop Bridge connection
```

Get all top-level frames that could be screens:
```javascript
figma_execute: `
  await figma.loadAllPagesAsync();
  const pages = figma.root.children.map(p => ({
    name: p.name,
    frames: p.children
      .filter(c => c.type === 'FRAME' && c.width >= 300 && c.height >= 400)
      .map(f => ({
        id: f.id,
        name: f.name,
        width: Math.round(f.width),
        height: Math.round(f.height)
      }))
  }));
  return pages;
`
```

### 2. Identify Interactive Elements

For each screen, find elements that should be clickable:

```javascript
figma_execute: `
  const frame = await figma.getNodeByIdAsync('FRAME_ID');
  const interactive = [];

  function scan(node) {
    const name = node.name.toLowerCase();
    const isInteractive =
      name.includes('button') || name.includes('btn') ||
      name.includes('link') || name.includes('cta') ||
      name.includes('nav') || name.includes('tab') ||
      name.includes('menu') || name.includes('card') ||
      name.includes('icon') || name.includes('arrow') ||
      name.includes('back') || name.includes('close') ||
      name.includes('next') || name.includes('prev') ||
      node.type === 'INSTANCE';

    if (isInteractive && node.width > 20 && node.height > 20) {
      interactive.push({
        id: node.id,
        name: node.name,
        type: node.type,
        width: Math.round(node.width),
        height: Math.round(node.height),
        x: Math.round(node.absoluteTransform[0][2]),
        y: Math.round(node.absoluteTransform[1][2])
      });
    }
    if ('children' in node && node.type !== 'INSTANCE') {
      node.children.forEach(scan);
    }
  }
  frame.children.forEach(scan);
  return { screen: frame.name, interactiveElements: interactive.slice(0, 30) };
`
```

### 3. Plan the Flow

Based on user input or auto-detection, plan connections:

#### Auto-Connect Strategy
If user says "auto-connect":
1. Order screens by page position (left-to-right, top-to-bottom)
2. Connect sequential screens via "Next" / "Continue" / "CTA" buttons
3. Connect "Back" buttons to previous screen
4. Connect navigation items to their corresponding screens
5. Connect "Close" / "X" to the parent or previous screen

#### Manual Flow
If user describes a flow:
```
"Home → click CTA → Pricing → click Plan → Checkout → click Pay → Confirmation"
```
Parse into connections:
```
{ from: "Home", trigger: "CTA button", to: "Pricing", transition: "slide-left" }
{ from: "Pricing", trigger: "Plan card", to: "Checkout", transition: "slide-left" }
{ from: "Checkout", trigger: "Pay button", to: "Confirmation", transition: "slide-left" }
```

### 4. Create Prototype Connections

```javascript
figma_execute: `
  // Create a reaction (prototype connection) on a node
  const sourceNode = await figma.getNodeByIdAsync('SOURCE_NODE_ID');
  const targetFrame = await figma.getNodeByIdAsync('TARGET_FRAME_ID');

  // Add prototype reaction
  const reactions = sourceNode.reactions ? [...sourceNode.reactions] : [];
  reactions.push({
    action: {
      type: 'NODE',
      destinationId: targetFrame.id,
      navigation: 'NAVIGATE',
      transition: {
        type: 'SLIDE_IN',
        direction: 'LEFT',
        duration: 0.3,
        easing: { type: 'EASE_IN_AND_OUT' }
      },
      preserveScrollPosition: false
    },
    trigger: { type: 'ON_CLICK' }
  });
  sourceNode.reactions = reactions;

  return {
    source: sourceNode.name,
    target: targetFrame.name,
    trigger: 'ON_CLICK',
    transition: 'SLIDE_IN LEFT 0.3s'
  };
`
```

### 5. Transition Types

Choose transitions based on navigation context:

| Navigation Pattern | Transition | Duration | Easing |
|-------------------|-----------|----------|--------|
| Forward (next screen) | Slide Left | 300ms | ease-in-out |
| Back (previous screen) | Slide Right | 300ms | ease-in-out |
| Modal / Overlay | Move In (Bottom) | 250ms | ease-out |
| Close modal | Move Out (Bottom) | 200ms | ease-in |
| Tab switch | Dissolve | 200ms | ease-in-out |
| Page refresh | Dissolve | 150ms | linear |
| Detail view | Smart Animate | 300ms | ease-in-out |

```javascript
// Transition presets
const transitions = {
  forward: {
    type: 'SLIDE_IN', direction: 'LEFT',
    duration: 0.3, easing: { type: 'EASE_IN_AND_OUT' }
  },
  back: {
    type: 'SLIDE_IN', direction: 'RIGHT',
    duration: 0.3, easing: { type: 'EASE_IN_AND_OUT' }
  },
  modal: {
    type: 'MOVE_IN', direction: 'BOTTOM',
    duration: 0.25, easing: { type: 'EASE_OUT' }
  },
  dismiss: {
    type: 'MOVE_OUT', direction: 'BOTTOM',
    duration: 0.2, easing: { type: 'EASE_IN' }
  },
  dissolve: {
    type: 'DISSOLVE',
    duration: 0.2, easing: { type: 'EASE_IN_AND_OUT' }
  }
};
```

### 6. Set Starting Point

```javascript
figma_execute: `
  const startFrame = await figma.getNodeByIdAsync('FIRST_SCREEN_ID');
  // Set as prototype starting point
  figma.currentPage.flowStartingPoints = [{
    nodeId: startFrame.id,
    name: 'Main Flow'
  }];
  return 'Set ' + startFrame.name + ' as flow starting point';
`
```

### 7. Validate

Screenshot the prototype flow overview:
```
figma_capture_screenshot(pageId) → see connection lines
```

List all connections created:
```javascript
figma_execute: `
  const connections = [];
  const page = figma.currentPage;
  function scan(node) {
    if (node.reactions?.length) {
      for (const r of node.reactions) {
        if (r.action?.destinationId) {
          connections.push({
            from: node.name,
            fromScreen: node.parent?.name || 'unknown',
            to: r.action.destinationId,
            trigger: r.trigger?.type,
            transition: r.action.transition?.type
          });
        }
      }
    }
    if ('children' in node) node.children.forEach(scan);
  }
  page.children.forEach(scan);
  return { totalConnections: connections.length, connections };
`
```

### 8. Report

```markdown
## Prototype Flow Created

**Starting Point**: [Screen Name]
**Total Connections**: [N]

| # | From Screen | Trigger Element | To Screen | Transition |
|---|-------------|-----------------|-----------|-----------|
| 1 | Home | CTA Button | Pricing | Slide Left |
| 2 | Pricing | Plan Card | Checkout | Slide Left |
| 3 | Checkout | Back Button | Pricing | Slide Right |
| 4 | Checkout | Pay Button | Confirmation | Slide Left |

### How to Test
1. Select the starting frame in Figma
2. Click the Play (▶) button in the top-right
3. Click through the interactive elements
```

## Notes

- **Prototype API limitations**: The `reactions` property is the only way to set prototype connections programmatically. It requires setting the full reactions array (not just appending).
- **Smart Animate**: Only works when source and target have matching layer names — use for subtle state transitions, not screen navigation.
- **Overlay targets**: For modals, set `navigation: 'OVERLAY'` instead of `'NAVIGATE'` and specify overlay position.
- **Back action**: Use `navigation: 'BACK'` for generic "go back" without specifying a destination.
- **Flow starting points**: A page can have multiple flow starting points for different user journeys.
- **Connection limit**: Keep individual screens to <10 connections to maintain clarity.

## MCP Fallback

If Figma Desktop Bridge is unavailable:
- Output the prototype flow as a spec table: source screen, interaction trigger, target screen, and transition type
- Format as a markdown flow map that can be wired manually in Figma

## What's Next

After creating prototype connections:
- `/design-present` — build a presentation to walk stakeholders through the flow
- `/ux-audit` — audit the prototype flow against the design brief
- `/figma-responsive` — add mobile/tablet variants to the prototyped screens
- `/design-sprint` — run a design sprint to validate the prototype with users
