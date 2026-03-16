# /design-present — Lumina SaaS Q1 2026 Design Review

**Target:** Onboarding redesign presentation — product stakeholders, Q1 2026 design review

---

## Presentation Overview

This document outlines the structure and talking points for the Lumina SaaS onboarding redesign presentation to product stakeholders. The session is scheduled for 60 minutes: 30 minutes presenting, 15 minutes for questions, 15 minutes for decision-making and next-step alignment.

**Audience:** VP Product, Head of Engineering, Head of Customer Success, 2× Product Managers
**Goal:** Secure sign-off on the recommended onboarding redesign approach and book an engineering scoping session
**Format:** 12-slide deck with live Figma prototype walkthrough between slides 7 and 8
**Date:** 2026-03-24

---

## Slide Deck Structure

The deck contains 12 slides. Each slide maps to a specific narrative beat. Do not skip slides — each one is load-bearing for the stakeholder decision.

| Slide | Title | Type |
|-------|-------|------|
| 1 | Lumina Onboarding Redesign — Q1 2026 | Title slide |
| 2 | The Problem: 43% Drop-off at Step 2 | Problem statement |
| 3 | Research: What We Heard From Users | Research finding 1 |
| 4 | Research: Where Users Stall and Why | Research finding 2 |
| 5 | Research: Competitive Landscape | Research finding 3 |
| 6 | Design Concepts Explored | Exploration overview |
| 7 | Concept A vs Concept B vs Concept C | Side-by-side comparison |
| 8 | Recommended Solution — Live Prototype | Prototype walkthrough |
| 9 | Implementation Plan | Engineering + timeline |
| 10 | Metrics: How We Will Know It Worked | Success criteria |
| 11 | Next Steps | Action items |
| 12 | Q&A | Open discussion |

### Slide Timing Guide

- Slides 1–2: 3 minutes (context setting)
- Slides 3–5: 8 minutes (research synthesis)
- Slides 6–8 (inc. prototype): 10 minutes (design reveal)
- Slides 9–10: 6 minutes (implementation and measurement)
- Slides 11–12: 3 minutes (close and Q&A prompt)

---

## Key Narratives

Each narrative below maps to a slide range and should be delivered conversationally — the slide supports the story, not the other way around.

### Narrative 1 — The Problem (Slides 1–2)

"Today, 43% of new Lumina users abandon our onboarding flow at Step 2. That is the team invite step. Nearly half of every new user we acquire never reaches their first workspace — they leave before they have seen the product. This is not a retention problem; it is an activation problem, and it starts on day one."

Supporting data on slide 2:
- Onboarding funnel: Step 1 completion 94%, Step 2 completion 57%, Step 3 completion 81% of those who reach it
- Cohort analysis: users who skip Step 2 and reach Step 3 have a 12-week retention rate of 71%; users who abandon at Step 2 never return

### Narrative 2 — Research (Slides 3–5)

"We ran 12 moderated usability sessions and reviewed 6 months of session recordings. Three things are clear: users want to see value before they commit to inviting their team; the current required team invite step is a blocker, not a feature; and our top competitors — Notion, Linear, and Figma — all make team invite optional and post-value."

Key research findings delivered across slides 3–5:
- Slide 3: Direct user quotes — "I didn't know what Lumina even did yet, so I had no one to invite."
- Slide 4: Session recording heatmap showing 47% of users who reach Step 2 click away within 8 seconds
- Slide 5: Competitor table — Notion (team invite optional, step 4), Linear (invite optional, step 3), Figma (invite optional, step 5)

### Narrative 3 — The Recommended Solution (Slides 6–8)

"We explored three approaches. The first added a preview mode before the invite step. The second removed the invite step entirely and added it to the dashboard. The third — our recommendation — delays the invite to Step 3 but adds a 'value moment' at Step 2: the user names and configures their first workspace, which gives them something concrete to invite teammates into."

The live prototype walkthrough happens here. Presenter switches to Figma prototype and walks through the 3-step revised flow.

---

## Design Decisions & Rationale

Each design decision was evaluated against the core principle: users should experience value before being asked to invest social capital.

### Decision 1: Delay team invite to Step 3

**Rationale:** Research shows the primary reason users abandon at Step 2 is that they have not yet seen the product and have no context to justify an invitation. Moving the invite to Step 3 — after the user has named and configured their workspace — gives them something concrete to invite people into. This decision is supported by competitor analysis and direct user feedback.

**Trade-off considered:** Delayed team invite may reduce the proportion of users who invite teammates at all, which could affect team plan conversion. Mitigation: Step 3 will have a persistent "Invite your team" prompt in the dashboard sidebar post-onboarding, ensuring the invite opportunity is not lost.

### Decision 2: Add a step progress bar

**Rationale:** User testing showed that users who did not know how many steps remained in onboarding were more likely to abandon. A visible progress bar with 3 labelled steps ("Account", "Workspace", "Invite") reduces anxiety and sets accurate expectations. This decision is a low-effort, high-confidence change with no trade-offs.

### Decision 3: Add a "Skip for now" option at every step

**Rationale:** Removing blockers is the single most effective way to increase funnel completion. A skip option on every step removes the feeling of being trapped. Data from Session 2 (research slide) shows that 68% of users who abandon cite "not ready to do this yet" as the reason — skip gives them a way forward without feeling like they failed.

**Trade-off considered:** Users who skip everything may have lower activation. Mitigation: track skip rates per step and monitor activation rate by skip cohort in the first 2 weeks post-launch.

---

## Anticipated Stakeholder Questions

Prepare answers to the following questions. The most likely challenger is the Head of Customer Success, who has historically prioritised team adoption metrics.

### "Will this hurt team adoption?"

Prepared answer: "It may reduce same-session team invite rates, but we are not removing the invite capability — we are moving it to Step 3 and keeping it prominent in the post-onboarding dashboard. Our hypothesis is that users who invite after seeing value are more likely to have their invitations accepted, because the context is richer. We will track team invite completion rate as a secondary metric."

### "How long will this take to implement?"

Prepared answer: "We have estimated 3–4 weeks for engineering, assuming we scope this as a wizard refactor using existing component primitives. We are proposing an engineering scoping session this week to firm up the estimate. The design handoff spec is ready today."

### "What is the rollback plan if metrics regress?"

Prepared answer: "We will run a feature flag gating the new onboarding flow, initially to 10% of new signups. If Step 2 abandonment does not improve after 2 weeks we will revert to 0% and conduct a post-mortem. No data migration is required — the rollback is a single flag flip."

### "Why not just remove the team invite step entirely?"

Prepared answer: "We explored this in Concept B. The concern is that removing the invite opportunity from onboarding entirely would require users to discover the invite feature independently, and our data shows only 34% of solo-activated users ever return to invite a teammate. Keeping invite in onboarding — just later — is the better outcome balance."

---

## Desired Outcomes

At the end of the 60-minute session, the following outcomes should be secured before the meeting closes.

### Primary Outcome

**Sign-off on the recommended approach** — VP Product approves moving forward with Option 3 (delay invite to Step 3, add progress bar, add skip option). Presenter should ask for explicit verbal approval and note it in the follow-up meeting summary.

### Secondary Outcomes

1. **Engineering scoping session booked** — calendar invite sent before the end of the meeting for a 90-minute scoping session with the lead engineer and PM within the next 5 business days
2. **Metrics baseline agreed** — stakeholders align on the primary metric (Step 2 completion rate, currently 57%) and the success threshold (target: 75% or above after 30 days)
3. **Feature flag rollout plan agreed** — 10% → 50% → 100% rollout over 3 weeks, with a review gate at each stage

### If Sign-Off Is Not Reached

If the stakeholder group wants more time or has unresolved concerns, propose a follow-up async review: share the Figma prototype link and a 3-minute Loom walkthrough, and schedule a 30-minute decision meeting for 48 hours later. Do not extend the current meeting past 75 minutes.

---
