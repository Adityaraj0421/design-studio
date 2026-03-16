# /design-critique — Lumina SaaS Onboarding Screens

## Summary

**Overall Assessment**: Good — strong visual design with 3 usability gaps to address
**Screens Reviewed**: Welcome, Account Setup, Team Invite, First Dashboard
**Critique Method**: Nielsen's 10 Heuristics + Visual Design Audit

## Strengths

1. **Clear visual hierarchy** — The step indicator communicates progress effectively
2. **Consistent component usage** — Buttons, inputs, and cards use the design system throughout
3. **Welcoming tone** — Illustration and copy create a warm first impression

## Issues Found

### Critical (Must Fix)

| # | Issue | Heuristic | Location | Recommendation |
|---|-------|-----------|----------|----------------|
| 1 | No visibility of save state | H1: Visibility of system status | Account Setup step | Add autosave indicator: "Changes saved" toast after each field blur |
| 2 | Team Invite error message too vague | H9: Help users recognize and recover from errors | Team Invite screen | Replace "Invalid entry" with "That email is already part of a team — try a different address" |

### Major (Should Fix)

| # | Issue | Heuristic | Location | Recommendation |
|---|-------|-----------|----------|----------------|
| 1 | No escape route from required steps | H3: User control and freedom | All onboarding steps | Add "Skip for now" link below primary CTA on all non-critical steps |
| 2 | Feedback delay — no loading state | H1: Visibility of system status | "Create workspace" CTA | Add spinner + "Creating your workspace…" state during async call |

### Minor (Nice to Fix)

| # | Issue | Heuristic | Location | Recommendation |
|---|-------|-----------|----------|----------------|
| 1 | Icon-only social login buttons | H6: Recognition over recall | Welcome screen | Add provider name label below each icon |

## Visual Design Score

| Criterion | Score (1–5) | Notes |
|-----------|-------------|-------|
| Typography hierarchy | 5 | Clean H1/H2/body/caption system |
| Color consistency | 4 | One off-brand purple on step 3 |
| Spacing rhythm | 4 | Mostly 8px grid; 3 odd values |
| Visual balance | 5 | Illustration + form well balanced |
| Information density | 4 | Step 2 slightly dense on mobile |

## Missing States

- Team Invite: no "email sending" loading state
- Account Setup: no field-level validation feedback on blur

## Top Recommendations for Usability

1. **Add system status feedback** — Every async action needs a loading + success/error state
2. **Provide escape routes** — Users must be able to skip or defer non-critical setup steps
3. **Improve error messages** — Error text should explain what happened and what to do next

---
