# /ux-audit — Lumina SaaS Onboarding Flow

**Target:** Lumina SaaS onboarding flow — heuristic evaluation, 3-step wizard (account setup → team invite → workspace config)

---

## Audit Overview

This document presents the findings of a heuristic evaluation of the Lumina SaaS onboarding flow conducted using Nielsen's 10 Usability Heuristics and a WCAG 2.1 AA accessibility review. The audit covered all 3 steps of the onboarding wizard plus loading states and error states.

**Audit method:** Expert heuristic evaluation (1 auditor)
**Scope:** Onboarding wizard — Step 1 (Account Setup), Step 2 (Team Invite), Step 3 (Workspace Config); loading states; error states
**Devices tested:** Desktop Chrome 122 (1280px), Mobile Safari (375px iPhone 14)
**Date:** 2026-03-12
**Auditor:** Lumina design team

### Summary Scorecard

| Severity Level | Count | Examples |
|---------------|-------|---------|
| Critical | 3 | No progress indication, required team invite, password requirements hidden |
| Major | 5 | Non-specific error messages, no undo on team invite, form submit validation only |
| Minor | 4 | Inconsistent CTA labels, missing helper text, avatar upload size limit not communicated |

**Total issues identified: 12**

All critical issues are recommended for resolution before the v3.12.0 launch. Major issues are targeted for the next sprint. Minor issues are tracked in the design system backlog.

---

## Critical Findings

The following three findings are classified as critical. They represent significant usability barriers that directly cause user abandonment, as evidenced by quantitative funnel data and session recordings.

### Finding 1 — No progress indication during account creation

**Heuristic violated:** Nielsen #1 — Visibility of System Status

**Description:** When a user submits the Step 1 form (display name + avatar upload), the system performs a PATCH to the user profile API. During this operation — which takes between 800ms and 2.4s under normal network conditions — the Next button becomes unresponsive but shows no visual change. There is no spinner, no loading label, and no progress indicator. Users who click Next and see nothing happen typically click again, leading to duplicate API submissions.

**Evidence:** Session recordings show 34% of Step 1 completions include 2 or more Next button clicks, indicating users do not understand the first click registered.

**Severity:** Critical — directly causes confusion and duplicate submissions. Must fix before launch.

**Recommendation:** Apply `loading={true}` to the Next button during API submission. This shows a spinner and disables further clicks.

---

### Finding 2 — Team invite required before user has seen the product

**Heuristic violated:** Nielsen #3 — User Control and Freedom; Nielsen #4 — Consistency and Standards

**Description:** Step 2 of the onboarding wizard requires the user to invite at least one teammate before they can proceed to Step 3. The field is marked required with an asterisk, and the Next button is disabled until a valid email is entered. This is the highest-friction point in the entire onboarding flow.

**Evidence:** Funnel data shows 47% of users abandon the onboarding flow at Step 2. Session recordings confirm users spend an average of 43 seconds on Step 2 before leaving — longer than any other step — indicating they are not bouncing immediately but are genuinely stuck. Exit survey response (n=84): "I wasn't sure who to invite yet" was the #2 ranked abandonment reason (n=31).

**Severity:** Critical — responsible for 47% abandonment. Must fix before launch.

**Recommendation:** Make the team invite step optional. Add a "Skip for now" CTA above the navigation row. Do not require a minimum number of invites to proceed.

---

### Finding 3 — Password requirements only shown after failed submission

**Heuristic violated:** Nielsen #9 — Help Users Recognize, Diagnose, and Recover from Errors

**Description:** The account creation form on Step 1 includes a password field. The password must meet the following requirements: minimum 8 characters, at least 1 uppercase letter, at least 1 number, at least 1 special character. None of these requirements are displayed to the user before they type a password. The requirements appear only after the user submits the form with an invalid password and receives the error: "Password does not meet requirements."

**Evidence:** Session recordings show that 58% of users who encounter this error make 2 or more password attempts before succeeding. 12% abandon at this point.

**Severity:** Critical — causes unnecessary friction and abandonment for a required step. Must fix before launch.

**Recommendation:** Display password requirements below the password field on focus (not before — do not overwhelm users before they start typing). Mark each requirement with a check as it is satisfied in real time. This is a standard pattern (used by Google, Atlassian, and Notion).

---

## Heuristic Violations

A full heuristic sweep against Nielsen's 10 Usability Heuristics was conducted. Violations are listed with severity and recommendation.

| # | Heuristic | Violation | Severity |
|---|-----------|-----------|----------|
| 1 | Visibility of System Status | No loading state on form submit (all 3 steps) | Critical |
| 3 | User Control and Freedom | Cannot undo a sent team invite during onboarding | Major |
| 5 | Error Prevention | Form validation fires only on submit, not on blur | Major |
| 8 | Aesthetic and Minimalist Design | Step 2 renders 6 help tooltips above the fold, cluttering the layout | Minor |
| 9 | Help Users Recognize, Diagnose, and Recover from Errors | Error message on invalid email entry reads: "Invalid input" — non-specific and non-actionable | Major |

### Detailed Heuristic Notes

**Nielsen #1 — No system status on form submit**
Applies to all 3 wizard steps. The Next and Finish buttons show no loading state during API calls. See Finding 1 above for full detail.

**Nielsen #6 — Cannot undo team invites**
Once a user adds an email to the team invite list and presses Next, the invitation is sent immediately. There is no confirmation dialog, no pending state, and no way to cancel the invitation from within the onboarding flow. Users who add an email by mistake have no recourse until they access the team management settings (which they have not seen yet). Recommendation: send invitations only when the user presses "Finish" at Step 3, and show a pending invite list on Step 2 with remove buttons.

**Nielsen #9 — Non-specific error: "Invalid input"**
Multiple fields across the wizard emit the error message "Invalid input" for different failure modes: invalid email format, password too short, workspace name contains special characters. These are not the same error and should not share the same message. Recommendation: provide field-specific, actionable error messages for each validation rule.

---

## Accessibility Issues

The following accessibility issues were identified during the WCAG 2.1 AA audit. All issues are classified as failures (not warnings) under the referenced success criteria.

### Issue A1 — Form labels missing `for` attributes

**WCAG criterion:** 1.3.1 Info and Relationships (Level A)

**Description:** All form fields in the onboarding wizard render visible label text, but the `<label>` elements do not have `for` attributes linking them to the corresponding `<input>` elements. This means screen readers cannot associate the label with the field, and clicking the label text does not focus the input.

**Affected fields:** Display name, email, password, workspace name, timezone selector (all fields in all 3 steps)

**Finding detail:** Inspected using VoiceOver on macOS. All fields are announced without their label. The user hears "text field" with no context about what to enter.

**Severity:** Major — affects all screen reader users.

**Recommendation:** Add `htmlFor` (React) / `for` (HTML) attribute to each `<label>` matching the `id` of its `<input>`. Alternatively, wrap `<input>` inside `<label>` to achieve implicit association.

### Issue A2 — Placeholder text contrast fails WCAG AA

**WCAG criterion:** 1.4.3 Contrast (Minimum) (Level AA)

**Description:** Placeholder text across all input fields uses `#9CA3AF` on a white (`#FFFFFF`) background. The contrast ratio is **3.2:1**, which falls below the WCAG AA minimum of **4.5:1** for normal-weight text at 16px.

**Affected fields:** All input placeholders in all 3 wizard steps.

**Severity:** Major — fails WCAG AA. Many users with low vision rely on placeholder text as input guidance.

**Recommendation:** Darken placeholder text to `#6B7280` (contrast ratio 5.9:1 on white, passes AA). Update the `--color-text-placeholder` token to this value. Note: placeholder text should not be used as a substitute for visible labels — this fix addresses contrast only; label association (Issue A1) must also be resolved.

### Issue A3 — No keyboard trap prevention on modal dialogs

**WCAG criterion:** 2.1.2 No Keyboard Trap (Level A)

**Description:** The avatar upload component on Step 1 opens a file-picker modal when the user presses Enter or Space on the upload zone. When the modal is open, pressing Escape does not close it. Tab navigation inside the modal eventually exits the modal and focuses elements behind it without closing the overlay.

**Severity:** Critical for keyboard users — they cannot dismiss the modal without using a mouse.

**Recommendation:** Implement focus trap inside the modal (retain Tab/Shift+Tab within modal elements while open). Bind Escape key to close the modal. On modal close, return focus to the element that opened it (the upload zone).

### Issue A4 — Step indicator not exposed to assistive technology

**WCAG criterion:** 4.1.2 Name, Role, Value (Level A)

**Description:** The step indicator dots at the top of the wizard card are implemented as styled `<div>` elements with no ARIA attributes. Screen readers announce nothing when the user advances between steps — there is no indication of current step or total steps.

**Severity:** Major — screen reader users have no awareness of their position in the wizard.

**Recommendation:** Add `role="status"` to a visually hidden live region that announces step changes (e.g. "Step 2 of 3: Team Invite"). Add `aria-label` to each dot indicating its state.

---

## Recommendations

The following recommendations are prioritised by impact and implementation effort. All critical and major recommendations should be completed before the v3.12.0 launch.

### Priority 1 — Critical (must fix before launch)

1. **Add loading state to all Next/Finish buttons** — apply `loading={true}` during API calls. Estimated effort: 0.5 days.
2. **Make team invite optional** — add "Skip for now" CTA, remove required validation from email field on Step 2. Estimated effort: 1 day.
3. **Show password requirements on focus** — render requirements below password field on focus; validate in real-time. Estimated effort: 1 day.
4. **Fix keyboard trap on avatar upload modal** — implement focus trap, bind Escape to close, restore focus on close. Estimated effort: 1 day.

### Priority 2 — Major (next sprint)

5. **Add `for` attributes to all form labels** — link all labels to their inputs. Estimated effort: 0.5 days.
6. **Fix placeholder text contrast** — update `--color-text-placeholder` token to `#6B7280`. Estimated effort: 0.25 days.
7. **Send team invites deferred to wizard completion** — move invitation API call to Step 3 Finish; show pending invite list with remove buttons on Step 2. Estimated effort: 2 days.
8. **Replace non-specific error messages** — write field-specific error copy for each validation rule. Estimated effort: 0.5 days.
9. **Add ARIA live region for step indicator** — announce step changes to screen readers. Estimated effort: 0.5 days.

### Priority 3 — Minor (backlog)

10. **Remove excess help tooltips on Step 2** — reduce from 6 tooltips to 2; move help content to a single "?" icon with a popover. Estimated effort: 0.5 days.
11. **Standardise CTA labels** — align "Next", "Continue", and "Proceed" labels to a single term ("Continue") across all steps. Estimated effort: 0.25 days.
12. **Add avatar upload size limit copy** — display "Max 5MB, JPEG or PNG" below the upload zone. Estimated effort: 0.25 days.

---

## Severity Matrix

The severity matrix maps each finding to a severity level, owner, and target sprint.

| Issue | Description | Severity | Owner | Target Sprint |
|-------|-------------|----------|-------|---------------|
| F1 | No loading state on form submit | Critical | Engineering | v3.12.0 |
| F2 | Team invite required before value | Critical | Product + Design | v3.12.0 |
| F3 | Password requirements hidden | Critical | Engineering | v3.12.0 |
| A3 | Keyboard trap on modal | Critical | Engineering | v3.12.0 |
| A1 | Form labels missing `for` | Major | Engineering | v3.13.0 |
| A2 | Placeholder contrast 3.2:1 | Major | Design (token update) | v3.13.0 |
| H6 | Cannot undo team invites | Major | Engineering | v3.13.0 |
| H9 | Non-specific error messages | Major | Content + Engineering | v3.13.0 |
| A4 | Step indicator not accessible | Major | Engineering | v3.13.0 |
| H8 | Excess help tooltips | Minor | Design | Backlog |
| M1 | Inconsistent CTA labels | Minor | Design + Content | Backlog |
| M2 | Avatar upload size not shown | Minor | Engineering | Backlog |

### Severity Definitions

- **Critical:** Directly causes task failure or user abandonment for a significant proportion of users. Must be resolved before the associated feature ships to production.
- **Major:** Causes significant friction or excludes a class of users (e.g. screen reader users, keyboard-only users). Must be resolved within the next sprint following identification.
- **Minor:** Causes minor friction or inconsistency. Does not block task completion. Tracked in the design backlog and resolved when adjacent work is scheduled.

---
