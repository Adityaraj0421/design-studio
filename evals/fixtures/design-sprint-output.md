# /design-sprint — Lumina SaaS Checkout Friction

**Target:** Lumina SaaS checkout flow — 5-day design sprint targeting 67% cart abandonment at payment step

---

## Sprint Overview

This document captures the output of a 5-day design sprint run by the Lumina product and design team to address the 67% cart abandonment rate at the payment step. The sprint goal is to identify the primary causes of abandonment and produce a testable prototype that could reduce abandonment to under 40% within 30 days of launch.

**Sprint dates:** 2026-03-10 to 2026-03-14
**Sprint team:** 1 design lead, 1 product manager, 1 front-end engineer, 1 UX researcher, 1 customer success representative
**Sprint method:** Google Ventures 5-day sprint (adapted)
**Challenge statement:** How do we reduce payment step abandonment from 67% to under 40% in 30 days?

### Day-by-Day Summary

| Day | Focus | Output |
|-----|-------|--------|
| Monday | Understand + Map | Problem map, long-term goal, sprint questions |
| Tuesday | Sketch | Individual sketches, crazy 8s, solution sketches |
| Wednesday | Decide | Storyboard, voting, prototype plan |
| Thursday | Prototype | High-fidelity prototype (guest checkout flow) |
| Friday | Test | 5 moderated usability sessions, synthesis |

---

## Problem Map

The problem map traces the user journey from cart to confirmation and identifies the specific friction hotspots where abandonment concentrates.

### Full Journey

```
Cart → Checkout Entry → Form Fill → Payment → Confirmation
```

### Step-by-Step Detail

| Step | Screen | Abandonment Rate | Key Friction |
|------|--------|-----------------|--------------|
| 1 | Cart review | 8% | Minor — users understand what they are buying |
| 2 | Checkout entry | 34% | Required account creation before proceeding |
| 3 | Address / billing form | 12% | Form is long; no autofill prompts |
| 4 | Payment | 67% | No guest checkout; errors appear only on submit; no trust signals |
| 5 | Confirmation | <1% | Users who reach here almost always complete |

### Friction Hotspots

**Hotspot 1 — Required account creation (Checkout Entry)**
The current flow requires users to create a Lumina account before they can proceed to payment. First-time users hit a wall immediately. There is no "continue as guest" option and no social sign-in.

**Hotspot 2 — No guest checkout**
78% of abandoners at the payment step are first-time users. Session recordings show these users arrive at the account creation gate, fill in a few fields, and leave. The map reveals that the product is treating payment as a loyalty moment rather than a transaction.

**Hotspot 3 — Inline errors missing**
Errors on the payment form (invalid card number, expired date, CVV mismatch) are displayed only after the user presses "Pay now." There is no inline validation on individual fields. Users who make a typo in their card number discover this only after the full submission fails.

**Hotspot 4 — No trust signals above the fold**
The payment form renders without any visible security badges, SSL indicators, or money-back guarantee copy until the user scrolls below the fold. On mobile, these signals are never seen.

---

## How Might We Questions

HMW questions were generated on Monday afternoon following the map exercise. 24 HMW questions were written; 12 were voted through to the shortlist; the 3 below received the highest vote counts.

### Top HMW Questions

**HMW 1 — Voted #1 (8 votes)**
HMW make checkout work for first-time users without requiring them to create an account?

This hmw question directly addresses the biggest identified friction. It invites solutions ranging from guest checkout to social sign-in to deferred account creation.

**HMW 2 — Voted #2 (7 votes)**
HMW reduce form errors at the payment step so users do not discover mistakes only after pressing submit?

This hmw question targets the inline validation gap. Solutions include field-by-field validation, card type detection, and real-time card formatting.

**HMW 3 — Voted #3 (6 votes)**
HMW build trust at the payment step so users feel confident completing their transaction?

This hmw question addresses the absence of trust signals. Solutions include inline security badges, money-back guarantee copy, real-time SSL indicator, and customer review snippets.

### Additional HMW Questions (Shortlisted, Not Prototyped This Sprint)

- HMW make the checkout form shorter without removing necessary fields?
- HMW use autofill to speed up address and card entry?
- HMW show users how close they are to completing checkout?
- HMW let users save progress if they need to leave mid-checkout?

---

## Insights

Insights were synthesised from five data sources: session recordings (n=200), exit survey responses (n=84), customer success call notes (n=12), usability session findings from a prior study, and a heuristic audit of the current payment form.

### Insight 1 — The account wall is the primary abandonment driver

**Finding:** 78% of users who abandon at the payment step are first-time visitors who have never created a Lumina account. Of these, 61% leave within 30 seconds of reaching the account creation screen. Exit survey data confirms: "I didn't want to create an account just to buy something" was the top-ranked reason for abandonment (n=47 of 84 responses).

**Implication:** Removing the account creation requirement for payment — or deferring it to post-purchase — is the single highest-impact intervention available.

### Insight 2 — Errors appear too late

**Finding:** Payment form errors are shown only on submit. Session recordings show an average of 1.8 submission attempts per user who encounters a card error. After the second failed submission, 54% of users abandon. Inline card validation is the standard in competitive checkouts (Stripe, Shopify, Apple Pay) and its absence creates a jarring experience.

**Implication:** Implementing field-level inline validation — especially on the card number field (which should detect card type and validate Luhn) — would reduce error-driven abandonment significantly.

### Insight 3 — Trust signals are below the fold

**Finding:** On mobile (375px viewport), the SSL badge, security copy, and money-back guarantee are all below 800px from the top of the payment step. The average mobile user scrolls to 480px before reaching the CTA. These signals are not seen by the majority of mobile users.

**Implication:** Trust signals must move above the fold — specifically, directly above or below the "Pay now" button — on mobile. A compact trust badge strip (lock icon + "256-bit SSL" + "30-day money back") can fit in 32px of vertical space.

### Insight 4 — Guest checkout is the competitive norm

**Finding:** Competitive review of 8 comparable SaaS checkout flows (Notion, Linear, Webflow, Framer, Loom, Canva, Pitch, Miro) found that 7 of 8 offer guest checkout or social sign-in at the payment step. Lumina is the only product in this set that requires account creation before payment.

---

## Prototype Plan

Based on Thursday's storyboard and the voting results (see below), the team built a high-fidelity prototype of the guest checkout flow on Day 4.

### Prototype Scope

The prototype covers the full guest checkout path from cart to confirmation. Account-based checkout is not prototyped — the existing flow handles that and was not the sprint focus.

### Prototype Screens

| Screen | Description |
|--------|-------------|
| 1 | Cart review — no change from current |
| 2 | Checkout entry — email field + "Continue as guest" CTA; account creation moved to post-purchase |
| 3 | Address form — autofill-enabled, single-column, inline validation on blur |
| 4 | Payment form — inline card validation (card type detection, Luhn check, CVV length), sticky order summary sidebar (desktop), trust badge strip above CTA |
| 5 | Confirmation — "Create an account to track your order" prompt (deferred account creation) |

### Prototype Fidelity

- Desktop (1280px) and mobile (375px) frames
- All form fields interactive (Figma prototype interactions)
- Error states for card number and CVV included
- Trust badge strip included in above-the-fold region on mobile

### What the Prototype Does Not Cover

- Actual payment processing (prototype simulates success only)
- Edge cases: international addresses, prepaid cards, corporate billing
- The full account-based checkout path (existing flow)

---

## Voting Results

On Wednesday afternoon the team voted on the solution sketches using dot voting. Each team member had 5 votes. The sprint facilitator had 2 bonus votes (supervote).

### Solution Areas Voted On

| Solution | Votes | Proceed? |
|----------|-------|----------|
| Guest checkout (email → address → card) | 8/10 | Yes — core prototype |
| Inline card validation | 7/10 | Yes — included in prototype |
| Trust badge placement above fold | 6/10 | Yes — included in prototype |
| Deferred account creation (post-purchase) | 6/10 | Yes — included as confirmation screen prompt |
| Progress indicator on checkout steps | 4/10 | Partial — shown as a bar, not full step labels |
| Social sign-in (Google, GitHub) | 3/10 | No — out of scope for this sprint, revisit in v3.13 |
| Checkout form shortening (remove fields) | 2/10 | No — legal/compliance requires current fields |

### Vote Rationale

The guest checkout solution received the highest vote count because it directly addresses the insight with the largest potential impact. The team chose to build a single focused prototype rather than a split prototype across multiple solutions, to ensure the Friday usability sessions would produce clear directional signal rather than diluted feedback.

---
