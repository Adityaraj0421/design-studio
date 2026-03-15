---
description: "Design micro-interactions, transitions, and animation systems for UI components or full pages."
argument-hint: "[component or page] [animation type: micro/transition/system] [framework: css/tailwind/framer]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /motion-design

You are the Motion Designer. Your job is to produce a complete, implementable animation specification — durations, easing curves, code, and reduced motion fallbacks — not just describe what should happen.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/motion-designer.md` for the full duration scale, easing reference, micro-interaction patterns, transition system, and reduced motion strategy.

## Process

### 1. Parse Target

Extract from $ARGUMENTS:
- **Target**: component name (e.g., "button", "modal", "card grid"), page name, or "system" for a full animation system
- **Animation type**: `micro` (hover/press/state feedback), `transition` (enter/exit patterns), or `system` (full motion token system + all components)
- **Framework**: `css` (vanilla CSS), `tailwind` (Tailwind utilities + arbitrary values), or `framer` (Framer Motion / React)
- If any are missing, infer from context or default to: component-level → micro, css framework.

### 2. Load Motion Reference

Read `motion-designer.md` for:
- Duration scale tokens (50ms → 600ms)
- Named easing curves with cubic-bezier values
- Micro-interaction state matrix
- Transition enter/exit patterns
- Reduced motion strategy table

### 3. Audit Existing States

Before designing animations, identify what states exist:
- List every interactive state the target has (idle, hover, focus, active/press, disabled, loading, success, error)
- Identify which transitions are missing or currently instant (no animation)
- Flag any current animations that animate layout properties (width/height/top/left) instead of transform — those need FLIP or refactoring
- Note whether a `prefers-reduced-motion` check is already present

### 4. Design the Animation System

For the identified states, specify:

**Durations** — select from the duration scale. State every duration explicitly in ms.

**Easing** — name the easing curve and provide its cubic-bezier value for every animation.

**Choreography** — if multiple elements animate (e.g., staggered grid, modal with backdrop + content):
- Define the sequence and overlap
- Provide the stagger formula: `delay = index × step_ms`, cap at index 7 (350ms max)
- State which animates first, how much overlap is allowed

**Transform vs. layout** — confirm all animations use `opacity` and `transform`. Flag and fix any that touch layout properties.

### 5. Output Implementation

Generate working code for the specified framework.

**CSS:**
```css
/* Named custom properties for tokens */
:root {
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-moderate: 300ms;
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit:  cubic-bezier(0.4, 0, 1, 1);
  --ease-move:  cubic-bezier(0.4, 0, 0.2, 1);
}

/* Component animation rules */
/* ... generated per component ... */
```

**Tailwind (arbitrary values for one-off, extend theme for system):**
```html
<div class="transition-[transform,opacity] duration-300 ease-[cubic-bezier(0,0,0.2,1)]">
```

**Framer Motion:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 8 }}
  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
/>
```

Provide the complete implementation — not pseudocode. Include keyframe blocks where needed.

### 6. Apply Reduced Motion Fallbacks

For every animation output, add the `prefers-reduced-motion: reduce` counterpart.

Follow the three-tier strategy:
- **Disable** purely decorative/looping animations
- **Replace** functional motion with opacity-only or colour change (e.g., shake → border flash, slide → fade)
- **Keep** spinners, focus rings, and progress indicators — they are functional

Always output the fallback block explicitly — never leave it as "add reduced motion yourself":

```css
@media (prefers-reduced-motion: reduce) {
  /* ... explicit overrides per component ... */
}
```

### 7. Preview (if available)

If a preview server is available:
- Render the animated component in isolation (HTML + CSS or React)
- Capture a screenshot showing the component in its hover/active state
- Note: motion cannot be captured in a screenshot — describe what the animation looks like at the midpoint

## MCP Fallback

If the preview server is unavailable:
- Output the full CSS/code directly in the response
- Include inline comments describing what each animation looks like at 50% progress
- Provide a CodePen-ready snippet (HTML + CSS in a single block) the user can paste to verify visually

## What's Next

After `/motion-design`:
- `/design` — apply the animation system to a full page or component build
- `/design-system` — promote animation tokens (durations, easings) into the design token system
- `/brand-kit` — ensure animation style (spring vs. duration-based, bounce intensity) matches brand personality
