# /design-handoff — Lumina SaaS Onboarding Flow

**Target:** Lumina SaaS onboarding wizard — 3-step flow: account setup → team invite → workspace config

---

## Handoff Overview

This document provides the full engineering handoff spec for the Lumina SaaS onboarding redesign. The onboarding flow is a 3-step wizard that takes a new user from account creation to their first configured workspace. It is the first experience a user has after email verification and directly impacts activation rate.

**Design file:** Figma — `Lumina / Onboarding / v3.2 — Redesign`
**Screens in scope:** 3 wizard steps + loading states + error states
**Target release:** v3.12.0
**Designed by:** Lumina design team
**Developer handoff date:** 2026-03-20

### Step Summary

| Step | Screen Name | Primary Action |
|------|-------------|----------------|
| 1 | Account Setup | Enter display name, upload avatar |
| 2 | Team Invite | Invite teammates by email (optional) |
| 3 | Workspace Config | Name workspace, select timezone, choose plan |

Navigation pattern: Back/Next button pair at the bottom of each step. A "Skip" option is available on Step 2 (Team Invite). A step indicator at the top of the card shows current progress.

---

## Design Tokens

All colours, radii, and spacing values in the onboarding flow reference the following tokens from the Lumina design system. Do not hardcode values — reference the token names so that future theme changes propagate automatically.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand-primary` | `#2563EB` | Next button background, step indicator active dot |
| `--color-surface-page` | `#F9FAFB` | Page background behind the card |
| `--color-surface-card` | `#FFFFFF` | Wizard card background |
| `--color-border-default` | `#E5E7EB` | Card border, input borders |
| `--color-border-focus` | `#2563EB` | Input focus ring |
| `--color-text-primary` | `#111827` | Heading and body text |
| `--color-text-secondary` | `#6B7280` | Helper text, labels |
| `--color-text-placeholder` | `#9CA3AF` | Input placeholder text |
| `--color-error` | `#DC2626` | Inline validation error text and border |
| `--color-success` | `#16A34A` | Successful field validation indicator |
| `--radius-card` | `12px` | Wizard card border radius |
| `--radius-input` | `6px` | Input field border radius |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)` | Wizard card elevation |

---

## Spacing & Layout

The onboarding flow uses an 8px base grid throughout. All measurements are in pixels. Do not use arbitrary values — all spacing must be a multiple of 8.

### Page Layout

- Page background: full viewport, `--color-surface-page`
- Card: centered horizontally and vertically on the page
- Card width: 480px (tablet and desktop); 100% minus 32px margin on mobile (375px viewport → card is 343px)

### Card Internal Spacing

| Region | Spacing |
|--------|---------|
| Card padding (top) | 48px |
| Card padding (sides) | 40px |
| Card padding (bottom) | 40px |
| Section gap (between major regions) | 32px |
| Form field gap (between inputs) | 16px |
| Label-to-input gap | 8px |
| Button row top gap | 32px |

### Step Indicator

- Positioned at the top of the card, above the step heading
- 3 dots with connecting lines; active dot: 10px circle, `--color-brand-primary`; inactive dot: 8px circle, `--color-border-default`; completed dot: 10px circle with checkmark icon, `--color-brand-primary`
- Gap between dots: 40px (including the connecting line)

### Navigation Buttons

- "Back" button: ghost variant, left-aligned
- "Next" / "Finish" button: primary variant, right-aligned
- Both buttons occupy the same 48px-tall row
- On mobile, both buttons stack vertically with "Next" on top, full-width

### Page Padding

- Mobile (375px): 16px horizontal page padding
- Tablet (768px): card is centered with auto margins
- Desktop (1280px): card is centered with auto margins

---

## Component Inventory

The following components from `@lumina/ui` are used in the onboarding flow. Refer to component-docs for prop details.

| Component | Source | Used In |
|-----------|--------|---------|
| `StepIndicator` | `@lumina/ui` | All 3 steps — top of card |
| `FormField` | `@lumina/ui` | Step 1 (display name), Step 3 (workspace name, timezone) |
| `AvatarUpload` | `@lumina/ui` | Step 1 — profile photo upload |
| `TeamMemberRow` | `@lumina/ui` | Step 2 — one row per invited email |
| `EmailTagInput` | `@lumina/ui` | Step 2 — bulk email entry |
| `WorkspaceCard` | `@lumina/ui` | Step 3 — workspace preview |
| `Select` | `@lumina/ui` | Step 3 — timezone selector |
| `Button` | `@lumina/ui` | All 3 steps — Back, Next, Skip |
| `InlineError` | `@lumina/ui` | All 3 steps — field-level validation messages |

### Component-Specific Notes

**StepIndicator:** Pass `currentStep` (1-indexed) and `totalSteps={3}`. Completed steps are inferred automatically.

**AvatarUpload:** Accepts JPEG and PNG only. Max file size 5MB. Crop UI is built into the component — do not implement a separate cropper.

**TeamMemberRow:** Renders email, avatar (initials fallback), and a remove button. Pass `onRemove` to handle removal from the invite list.

**EmailTagInput:** Validates email format on blur and on Enter keypress. Emits `onTagAdd` and `onTagRemove` events.

---

## Breakpoint Specs

The onboarding wizard is designed across 3 breakpoints. Use `min-width` media queries matching the values below.

| Breakpoint | Min Width | Layout |
|------------|-----------|--------|
| Mobile | 0px | Single column, full-width card minus 32px margin, bottom-sheet feel |
| Tablet | 768px | Centered 480px card with vertical centering on page |
| Desktop | 1280px | Centered 600px card with vertical centering on page (wider for Step 3 which has a 2-column form layout) |

### Mobile-Specific Adjustments

- Step indicator dots reduce to 8px active / 6px inactive to fit 343px card width
- Avatar upload area reduces from 120×120px to 96×96px
- Navigation buttons stack vertically: Next on top (full width), Back below (full width, ghost)
- Step 3 form fields stack to single column (no 2-column layout on mobile)

### Tablet and Desktop

- Card is centered both horizontally and vertically using flexbox on the page container
- On desktop (1280px), Step 3 uses a 2-column grid for form fields: workspace name (full width top) → timezone selector (left) and plan selector (right) on the second row

---

## Developer Notes

### Step Transitions

Animate between steps using a horizontal slide transition:

- Forward (Next): slide current step out to the left, slide next step in from the right
- Back: slide current step out to the right, slide previous step in from the left
- Duration: 250ms, easing: `ease-in-out`
- Implement using CSS `transform: translateX()` — do not use `margin` or `left` for animation
- Respect `prefers-reduced-motion`: when set, skip the slide and use an instant swap instead

### Form State Preservation

- Preserve form field values when the user navigates back to a previous step
- Use a top-level wizard state object (e.g. via `useReducer`) to hold the accumulated form data across all 3 steps
- Do not reset step state on unmount — the wizard components should stay mounted and hidden, not destroyed

### Validation

- Validate all fields on blur (not on change) to avoid premature error messages
- Re-validate on Next button press before advancing
- If validation fails on Next press, focus the first invalid field and scroll it into view
- Display errors using the `InlineError` component directly below each invalid field
- Step 2 (Team Invite) is fully optional — "Skip" advances to Step 3 without validating the email input

### API Calls

- Step 1 "Next" press: PATCH `/api/users/me` with `displayName` and `avatarUrl`
- Step 2 "Next" press: POST `/api/invitations/bulk` with array of email addresses (skip if list is empty)
- Step 3 "Finish" press: POST `/api/workspaces` with `name`, `timezone`, `plan`; on success, redirect to `/dashboard`
- Show a loading state on the Next/Finish button during each API call
- On API error, display an inline banner at the top of the card (use `AlertBanner` component with `variant="error"`)

### Skip Option

The "Skip" link on Step 2 is positioned above the Back/Next button row, right-aligned, using `Button variant="ghost" size="sm"`. It advances the wizard to Step 3 without triggering API calls for invitations.

---
