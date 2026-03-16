# /component-docs — Lumina SaaS Button Component

**Target:** `Button` — `@lumina/ui` design system, v2.4.0

---

## Component Overview

The `Button` component is the primary interactive element in the Lumina design system. It handles all call-to-action, form submission, and navigation trigger use cases across the Lumina SaaS product. The component is polymorphic and can render as a `<button>`, `<a>`, or any custom element via the `as` prop.

**Package:** `@lumina/ui`
**Import path:** `import { Button } from '@lumina/ui'`
**Storybook:** `https://storybook.lumina.design/components/button`
**Figma:** `Lumina Design System / Components / Button`

The component wraps all standard HTML button attributes and forwards them to the underlying element. It handles focus management, loading states, disabled states, and icon placement internally, so consumers do not need to manage these concerns themselves.

---

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive'` | `'primary'` | Controls visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls padding, font size, and min touch target |
| `disabled` | `boolean` | `false` | Disables interaction and applies muted visual treatment |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction, sets `aria-busy` |
| `leftIcon` | `React.ReactNode` | `undefined` | Icon node rendered to the left of the label |
| `rightIcon` | `React.ReactNode` | `undefined` | Icon node rendered to the right of the label |
| `as` | `React.ElementType` | `'button'` | Polymorphic root element |
| `fullWidth` | `boolean` | `false` | Stretches button to 100% of its container width |

### Size Reference

| Size | Height | Padding (H) | Font Size | Min Touch Target |
|------|--------|-------------|-----------|-----------------|
| `sm` | 32px | 12px | 14px | 44px (via `min-height`) |
| `md` | 40px | 16px | 16px | 44px |
| `lg` | 48px | 24px | 18px | 48px |

### Polymorphic Usage

When `as="a"` is passed, the component renders an anchor element and accepts all anchor attributes (`href`, `target`, `rel`). The visual appearance remains identical to the button variant.

---

## Usage Examples

### Basic Primary Button

```tsx
import { Button } from '@lumina/ui'

// Primary CTA — default usage
<Button variant="primary" onClick={handleStartTrial}>
  Start free trial
</Button>
```

### Secondary and Ghost Variants

```tsx
// Secondary — less prominent actions
<Button variant="secondary" onClick={handleLearnMore}>
  Learn more
</Button>

// Ghost — low-emphasis actions, often used in toolbars
<Button variant="ghost" onClick={handleCancel}>
  Cancel
</Button>
```

### Destructive Variant

```tsx
// Destructive — irreversible actions (delete, remove)
<Button variant="destructive" onClick={handleDeleteWorkspace}>
  Delete workspace
</Button>
```

### Icon Button

```tsx
import { Button } from '@lumina/ui'
import { PlusIcon } from '@lumina/icons'

// Left icon — the most common icon usage pattern
<Button variant="primary" leftIcon={<PlusIcon />} onClick={handleAddMember}>
  Add member
</Button>

// Right icon — used for "expand" or "navigate" affordances
<Button variant="secondary" rightIcon={<ChevronRightIcon />}>
  View details
</Button>
```

### Loading State

```tsx
// Loading — disable while async action is in progress
<Button variant="primary" loading={isSubmitting} onClick={handleSubmit}>
  Save changes
</Button>
// Renders: spinner + "Save changes" text, aria-busy="true", click blocked
```

### Polymorphic Link Button

```tsx
// Renders as <a> — use for navigation that looks like a button
<Button as="a" href="/dashboard" variant="primary">
  Go to dashboard
</Button>
```

### Full Width

```tsx
// Full width — common in mobile forms and card footers
<Button variant="primary" fullWidth onClick={handleContinue}>
  Continue
</Button>
```

---

## Accessibility

The Button component is built to meet WCAG 2.1 AA requirements. The following accessibility behaviours are handled automatically by the component.

### Role and Semantics

- When `as="button"` (default), the element has an implicit `role="button"` and participates correctly in the accessibility tree
- When `as="a"` with an `href`, the element has an implicit `role="link"` — do not use a `<Button as="a">` for triggering actions; reserve it for navigation only
- When `as` is set to a non-interactive element (e.g. `div`), the component automatically adds `role="button"` and `tabIndex={0}` so the element is reachable and announced correctly by screen readers

### Focus Management

- A visible focus ring is applied on `:focus-visible` using the design token `--focus-ring-color` (a 2px solid offset ring)
- Focus ring offset is 2px to ensure the ring is not clipped by container overflow
- The focus ring is suppressed on mouse click (via `:focus-visible` selector) to avoid visual clutter for pointer users

### Disabled and Loading States

- `disabled={true}` applies the HTML `disabled` attribute (for `<button>`) and `aria-disabled="true"` (for polymorphic elements)
- `loading={true}` applies `aria-busy="true"` and `aria-label="Loading"` on the spinner icon; the button text remains visible so sighted users see what is loading
- In both states, click events are suppressed at the component level

### Minimum Touch Target

All sizes meet the 44×44px minimum touch target recommendation from WCAG 2.5.5. The `sm` size achieves this via a transparent `min-height: 44px` without altering the visual height.

### Keyboard Interaction

| Key | Behaviour |
|-----|-----------|
| `Enter` | Activates the button |
| `Space` | Activates the button (native `<button>` only) |
| `Tab` | Moves focus to next focusable element |
| `Shift+Tab` | Moves focus to previous focusable element |

---

## Variants

Each variant communicates a distinct level of emphasis and intent. Only one primary button should appear per section to maintain a clear visual hierarchy.

### Primary

- Background: `--color-brand-primary` (`#2563EB`)
- Text: white
- Hover: `--color-brand-primary-hover` (`#1D4ED8`)
- Use for: the single most important action on a page or card

### Secondary

- Background: `--color-surface-raised` (`#F3F4F6`)
- Border: 1px `--color-border-default` (`#D1D5DB`)
- Text: `--color-text-primary` (`#111827`)
- Hover: `--color-surface-hover` (`#E5E7EB`)
- Use for: supporting actions that are important but not the primary CTA

### Ghost

- Background: transparent
- Text: `--color-text-primary`
- Hover: `--color-surface-hover` with 50% opacity
- Use for: low-emphasis actions in toolbars, inline lists, or when visual weight must be minimal

### Destructive

- Background: `--color-error` (`#DC2626`)
- Text: white
- Hover: `--color-error-hover` (`#B91C1C`)
- Use for: irreversible actions (delete, remove, revoke). Always pair with a confirmation dialog.

---

## Design Tokens

The following design tokens are consumed by the Button component. Override these tokens in your theme to customise the component without touching component code.

| Token | Default Value | Usage |
|-------|--------------|-------|
| `--color-brand-primary` | `#2563EB` | Primary variant background |
| `--color-brand-primary-hover` | `#1D4ED8` | Primary variant hover background |
| `--color-error` | `#DC2626` | Destructive variant background |
| `--color-error-hover` | `#B91C1C` | Destructive variant hover background |
| `--color-surface-raised` | `#F3F4F6` | Secondary variant background |
| `--color-border-default` | `#D1D5DB` | Secondary variant border |
| `--color-text-primary` | `#111827` | Secondary and ghost variant text |
| `--color-text-disabled` | `#9CA3AF` | Disabled state text |
| `--radius-md` | `6px` | Button border radius (sm and md sizes) |
| `--radius-lg` | `8px` | Button border radius (lg size) |
| `--spacing-2` | `8px` | Internal icon gap |
| `--font-weight-semibold` | `600` | Button label font weight |
| `--focus-ring-color` | `#2563EB` | Focus ring colour |
| `--transition-fast` | `150ms ease` | Hover and active transitions |

---
