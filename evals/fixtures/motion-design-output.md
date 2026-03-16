# /motion-design — Lumina SaaS Motion Design System

**Inputs:** Brand "Lumina SaaS", context "product UI + marketing site", constraint "never exceed 400ms for UI transitions"

---

## Motion Principles

Lumina motion is governed by three principles. Every animation decision — whether a button press or a page transition — is evaluated against these principles before shipping.

### 1. Purposeful

Motion exists to communicate, not to entertain. Every animation must serve a clear functional goal:
- Communicate state change (button press, toggle, loading)
- Guide attention (new notification, validation error, onboarding step)
- Establish spatial relationships (panel slide-in, modal overlay, nested navigation)

If an animation cannot answer "what does this help the user understand?", it is removed.

### 2. Fast

**UI motion never exceeds 400ms.** Most interactions complete in 150–250ms. Slow animation in product UI creates the perception of a slow product — even if the underlying operation is fast.

Marketing animations (hero, scroll-triggered) may run up to 800ms when they are purely aesthetic and do not block interaction.

### 3. Consistent

The same user action produces the same animation, every time. A modal always slides in the same direction. A toast always enters from the same edge. Consistency reduces cognitive load — users learn the spatial language of the product and stop noticing motion (which is the goal).

---

## Duration Tokens

All animation durations are defined as CSS custom properties. Engineers must use tokens; no hardcoded millisecond values in component CSS.

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | `100ms` | Micro-feedback — button press scale, focus ring appearance |
| `--duration-fast` | `150ms` | State changes — checkbox, toggle, input focus, tooltip show |
| `--duration-normal` | `250ms` | Standard transitions — modal enter, toast, panel slide |
| `--duration-slow` | `400ms` | Complex entries — page transitions, onboarding steps, data load reveal |

### Duration Decision Guide

```
Is the element already on screen and changing state?
  → Use --duration-instant or --duration-fast

Is a new element entering the screen?
  → Use --duration-normal

Is it a full-screen or multi-element choreographed sequence?
  → Use --duration-slow (max)

Is this marketing/hero animation not blocking interaction?
  → May exceed --duration-slow; evaluate per-case
```

---

## Easing Curves

Lumina defines three easing curves as CSS custom properties. They map to the three fundamental motion intents: standard, enter (decelerate), and exit (accelerate).

| Token | CSS Value | Intent |
|-------|-----------|--------|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default — state changes on existing elements |
| `--ease-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | Enter — elements coming into view (fast start, gentle finish) |
| `--ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | Exit — elements leaving the screen (gradual start, fast finish) |

### Easing Rules

- **Standard easing** is the default. Use it when in doubt.
- **Decelerate** on all enter transitions — modals appearing, panels sliding in, toasts arriving.
- **Accelerate** on all exit transitions — modals closing, panels collapsing, toasts dismissing.
- **Never use `linear`** for UI animation. Linear motion reads as robotic and unnatural.
- **Never use `ease-in-out` (CSS default)** — always use an explicit Lumina easing token.

---

## Transition Types

Lumina defines three primitive transition types. All UI motion is composed from these primitives, either alone or in combination.

### 1. Fade (Opacity)

```css
transition: opacity var(--duration-normal) var(--ease-standard);
```

- **Use for:** Tooltips, overlay backgrounds, disabled states, skeleton loading reveal
- **Enter:** opacity 0 → 1, easing: decelerate
- **Exit:** opacity 1 → 0, easing: accelerate

### 2. Slide (Transform translateY / translateX)

```css
transition: transform var(--duration-normal) var(--ease-decelerate);
```

- **Use for:** Modals (slide up), drawers (slide left/right), toasts (slide up from bottom), dropdown menus (slide down)
- **Enter offset:** 8px in the direction of entry
- **Exit offset:** 8px in the direction of exit
- **Always combine with fade** — slide alone without opacity change reads as mechanical

### 3. Scale (Transform scale)

```css
transition: transform var(--duration-instant) var(--ease-standard);
```

- **Use for:** Button press feedback, card hover lift, avatar expansion
- **Press:** scale(1) → scale(0.97) on mousedown; scale(0.97) → scale(1) on mouseup
- **Hover lift:** scale(1) → scale(1.02) — cards and thumbnails only, not interactive controls

### Combining Primitives

Most enter/exit transitions combine slide + fade:

```css
/* Toast enter */
animation: slideInUp var(--duration-normal) var(--ease-decelerate) forwards;

/* Modal enter */
animation: slideInUp var(--duration-normal) var(--ease-decelerate) forwards;

/* Tooltip enter */
animation: fadeIn var(--duration-fast) var(--ease-decelerate) forwards;
```

---

## Micro-Interaction Specs

Precise specifications for the five most common micro-interactions in the Lumina product.

### 1. Button Press

| Property | Value |
|----------|-------|
| Trigger | `mousedown` |
| Property | `transform: scale()` |
| From | `scale(1)` |
| To | `scale(0.97)` |
| Duration | `--duration-instant` (100ms) |
| Easing | `--ease-standard` |
| Release | `scale(0.97)` → `scale(1)` on `mouseup`, same duration |

### 2. Checkbox Animation

| Property | Value |
|----------|-------|
| Trigger | User click |
| Method | SVG path draw — `stroke-dasharray` / `stroke-dashoffset` |
| Duration | `--duration-fast` (150ms) |
| Easing | `--ease-decelerate` |
| Check mark | Path length = 22px; animates from 22 → 0 on check |
| Uncheck | Reverse: 0 → 22, `--ease-accelerate` |

### 3. Form Field Focus

| Property | Value |
|----------|-------|
| Trigger | `focus` event |
| Properties animated | `border-color`, `box-shadow` |
| Duration | `--duration-fast` (150ms) |
| Easing | `--ease-standard` |
| Focus border | `--color-primary` (`#4F46E5`) |
| Focus ring | `0 0 0 3px rgba(79, 70, 229, 0.2)` |
| Blur | Reverse, same duration |

### 4. Toast Notification

| Property | Value |
|----------|-------|
| Trigger | Programmatic show |
| Method | slide up + fade (combined) |
| Enter offset | `translateY(8px)` → `translateY(0)` |
| Opacity | `0` → `1` |
| Duration | `--duration-normal` (250ms) |
| Easing | `--ease-decelerate` |
| Auto-dismiss | After 4000ms, exit: `translateY(-8px)` + opacity `0`, `--duration-fast`, `--ease-accelerate` |

### 5. Dropdown Menu

| Property | Value |
|----------|-------|
| Trigger | Click or keyboard |
| Method | slide down + fade |
| Enter offset | `translateY(-4px)` → `translateY(0)` |
| Opacity | `0` → `1` |
| Duration | `--duration-fast` (150ms) |
| Easing | `--ease-decelerate` |
| Exit | Reverse, `--ease-accelerate`, `--duration-instant` (100ms) |

---

## Keyframe Examples

Production-ready `@keyframes` declarations for the four most-used animation patterns.

### slideInUp — Standard enter animation

```css
@keyframes slideInUp {
  from {
    transform: translateY(8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Usage:** `.toast { animation: slideInUp var(--duration-normal) var(--ease-decelerate) forwards; }`

### slideOutUp — Standard exit animation

```css
@keyframes slideOutUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-8px);
    opacity: 0;
  }
}
```

### fadeIn — Fade-only enter

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

**Usage:** `.tooltip { animation: fadeIn var(--duration-fast) var(--ease-decelerate) forwards; }`

### scaleIn — Modal/dialog enter with subtle scale

```css
@keyframes scaleIn {
  from {
    transform: scale(0.96) translateY(8px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
```

**Usage:** `.modal { animation: scaleIn var(--duration-normal) var(--ease-decelerate) forwards; }`

### Reduced Motion

All keyframe animation must be wrapped in a motion preference check:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

This ensures users who prefer reduced motion are not forced to watch animations.

---

## Delivered Files

- `motion-tokens.css` — CSS custom properties for all duration and easing tokens
- `keyframes.css` — All production keyframe definitions
- `motion-spec.figma` — Figma prototype file with all interactions demonstrated
- `motion-guide.pdf` — Quick reference for designers and engineers

---

## What's Next

- `/illustration-system` — add motion specs for animated spot illustrations
- `/design-system` — integrate motion tokens into component library
- `/video-script` — apply motion principles to product demo video

---
