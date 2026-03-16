# /accessibility-audit — Lumina SaaS Signup Form

**File**: `src/components/SignupForm.html`
**Standard**: WCAG 2.1 AA
**Audit date**: 2026-03-16T11:00:00Z

## Summary

- **Grade**: B
- **WCAG AA Conformance**: Partial
- **Issues Found**: 3 critical, 4 important, 2 recommendations

## Critical (Must Fix)

### 1. Password field missing accessible label

**Criterion**: WCAG 1.3.1 Info and Relationships
**Location**: `<input type="password" placeholder="Enter password">`
**Violation**: `placeholder` is not a valid label substitute — screen readers won't announce the field purpose when focused

**Fix**:
```html
<label for="password">Password</label>
<input id="password" type="password" aria-describedby="password-hint">
<span id="password-hint" class="hint">Min 8 characters, one uppercase</span>
```

### 2. Form error announced by color only

**Criterion**: WCAG 1.4.1 Use of Color
**Location**: Invalid email input (red border only)
**Violation**: Error state relies solely on red border color — color-blind users cannot perceive the error

**Fix**:
```html
<input aria-invalid="true" aria-describedby="email-error">
<span id="email-error" role="alert" class="error-text">
  ⚠ Please enter a valid email address
</span>
```

### 3. Submit button contrast violation

**Criterion**: WCAG 1.4.3 Contrast (Minimum)
**Location**: `.btn-submit` — white text on `#4F7DEB` (3.8:1 ratio, need 4.5:1)
**Violation**: Insufficient contrast for normal-sized text
**Fix**: Change background to `#2F5FC4` (5.1:1 ratio with white text)

## Important (Should Fix)

| # | Issue | Criterion | Fix |
|---|-------|-----------|-----|
| 1 | No visible keyboard focus ring on social login buttons | WCAG 2.4.7 | Add `:focus-visible { outline: 2px solid #2F5FC4; outline-offset: 2px; }` |
| 2 | "Continue with Google" missing semantic role | WCAG 4.1.2 | Change `<div onclick>` to `<button type="button">` with aria-label |
| 3 | Terms checkbox: label not programmatically associated | WCAG 1.3.1 | Add `<label for="terms">` wrapping or `for`/`id` pair |
| 4 | Missing `lang` attribute on `<html>` | WCAG 3.1.1 | Add `<html lang="en">` |

## Recommendations (Best Practice)

1. Add `autocomplete` attributes to name/email fields (`autocomplete="given-name"`, `autocomplete="email"`) — improves UX for users with motor disabilities
2. Group related fields with `<fieldset>` and `<legend>` for the social login section

## Passing Criteria

- ✅ `<form>` uses semantic element with implicit landmark role
- ✅ `<input type="email">` provides built-in validation semantics
- ✅ Page `<title>` is descriptive
- ✅ No content flashes more than 3×/second
- ✅ All images have `alt` text (or are decorative with `alt=""`)

---
