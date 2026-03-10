---
description: "Guided design sprint methodology — problem framing, ideation, decision matrix, rapid prototyping, and testing plan in a structured 5-phase workflow."
argument-hint: "[problem statement or product brief]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /design-sprint

You are facilitating a **design sprint** — a structured, time-boxed process for rapidly solving design problems. Adapted from the Google Ventures design sprint methodology for AI-assisted design.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/product-designer.md` for product strategy, `${CLAUDE_PLUGIN_ROOT}/skills/design/references/ux-designer.md` for UX methodology, and `${CLAUDE_PLUGIN_ROOT}/skills/design/references/ux-researcher.md` for research frameworks.

## The 5 Phases

```
Phase 1: UNDERSTAND    → Map the problem space
Phase 2: DIVERGE       → Generate multiple solutions
Phase 3: DECIDE        → Pick the strongest direction
Phase 4: PROTOTYPE     → Build a testable solution
Phase 5: VALIDATE      → Create a testing plan
```

---

## Phase 1: UNDERSTAND (Map the Problem)

### 1.1 Problem Statement

Structure the user's input into a clear problem statement:

```markdown
## Problem Statement

**Who**: [Target users]
**What**: [The problem they face]
**Where**: [Context — when/where does this happen]
**Why it matters**: [Business/user impact]
**Current state**: [How it's handled today, if at all]

### Long-Term Goal
"In [timeframe], [users] will be able to [outcome] instead of [current pain]."

### Sprint Question
"Can we [specific hypothesis to test]?"
```

### 1.2 User Journey Map

Map the current user experience:

```markdown
### User Journey: [Persona Name]

| Stage | Action | Thinking | Feeling | Pain Points |
|-------|--------|---------|---------|-------------|
| Discover | [how they find the product] | | | |
| Evaluate | [how they assess value] | | | |
| Onboard | [first experience] | | | |
| Use | [core task flow] | | | |
| Return | [what brings them back] | | | |
```

### 1.3 Opportunity Map

Identify the highest-impact areas:

```markdown
### Opportunity Mapping

| Opportunity | User Impact | Business Impact | Effort | Score |
|-------------|------------|-----------------|--------|-------|
| [Opp 1] | High | High | Medium | ⭐⭐⭐ |
| [Opp 2] | Medium | High | Low | ⭐⭐⭐ |
| [Opp 3] | High | Medium | High | ⭐⭐ |

**Selected Focus**: [highest-scored opportunity]
```

---

## Phase 2: DIVERGE (Generate Solutions)

### 2.1 Crazy 8s — Rapid Ideation

Generate 8 distinct solution approaches in rapid succession:

```markdown
### Solution Sketches

| # | Concept | Key Insight | Risk |
|---|---------|------------|------|
| 1 | [Name] — [one-line description] | [why it might work] | [main risk] |
| 2 | [Name] — [one-line description] | | |
| 3 | [Name] — [one-line description] | | |
| 4 | [Name] — [one-line description] | | |
| 5 | [Name] — [one-line description] | | |
| 6 | [Name] — [one-line description] | | |
| 7 | [Name] — [one-line description] | | |
| 8 | [Name] — [one-line description] | | |
```

Each solution should be different enough to be worth comparing — not minor variations.

### 2.2 Solution Detail

For the top 3-4 most promising solutions, sketch the key screen/interaction:

```markdown
### Solution 1: [Name]

**Core Concept**: [2-3 sentences]

**Key Screens**:
1. [Screen 1] — [what the user sees and does]
2. [Screen 2] — [what happens next]
3. [Screen 3] — [outcome]

**User Flow**:
[Entry point] → [Action 1] → [Action 2] → [Outcome]

**Why it might win**: [competitive advantage]
**Biggest risk**: [what could go wrong]
```

---

## Phase 3: DECIDE (Choose Direction)

### 3.1 Decision Matrix

Score each solution against weighted criteria:

```markdown
### Decision Matrix

| Criteria (Weight) | Solution 1 | Solution 2 | Solution 3 | Solution 4 |
|--------------------|-----------|-----------|-----------|-----------|
| User value (3x) | ⭐⭐⭐ (9) | ⭐⭐ (6) | ⭐⭐⭐ (9) | ⭐⭐ (6) |
| Feasibility (2x) | ⭐⭐ (4) | ⭐⭐⭐ (6) | ⭐ (2) | ⭐⭐⭐ (6) |
| Novelty (1x) | ⭐⭐⭐ (3) | ⭐ (1) | ⭐⭐ (2) | ⭐⭐⭐ (3) |
| Alignment (2x) | ⭐⭐ (4) | ⭐⭐⭐ (6) | ⭐⭐ (4) | ⭐⭐ (4) |
| **Total** | **20** | **19** | **17** | **19** |

**Winner**: Solution [N] — [Name]
```

### 3.2 Storyboard

Create a step-by-step storyboard for the chosen solution:

```markdown
### Storyboard: [Solution Name]

**Panel 1 — Trigger**
[What prompts the user to start this experience]

**Panel 2 — Entry**
[First screen/touchpoint — what do they see?]

**Panel 3 — Core Action**
[The main interaction — what do they do?]

**Panel 4 — Feedback**
[System response — what happens after their action?]

**Panel 5 — Progression**
[Next step or deeper engagement]

**Panel 6 — Outcome**
[The successful end state — what did they achieve?]
```

---

## Phase 4: PROTOTYPE (Build It)

### 4.1 Prototype Scope

Define the minimal prototype:

```markdown
### Prototype Specification

**Fidelity**: [Low-fi wireframe / Mid-fi gray / Hi-fi polished]
**Screens**: [N screens]
**Interactive**: [Yes — with prototype connections / No — static]

| Screen | Purpose | Key Elements |
|--------|---------|-------------|
| 1. [Name] | [what it demonstrates] | [list of elements] |
| 2. [Name] | | |
| 3. [Name] | | |
```

### 4.2 Build the Prototype

Based on the fidelity level, choose the output:

**Option A: Figma Wireframes** (if Figma connected)
```
→ Use /figma-create to build screens in Figma
→ Use /figma-prototype to add interactions
```

**Option B: HTML Prototype** (for quick iteration)
```
→ Build interactive HTML with the design team
→ Preview with the preview server
```

**Option C: Static Screens** (for fast feedback)
```
→ Generate screen descriptions
→ Screenshot or wireframe each screen
```

### 4.3 Validate the Prototype

```
Screenshot each screen
Check flow makes sense
Verify key interactions work
```

---

## Phase 5: VALIDATE (Testing Plan)

### 5.1 Test Script

```markdown
### Usability Test Plan

**Objective**: Validate that [specific hypothesis from Sprint Question]

**Participants**: 5 users matching [persona description]
**Duration**: 30 minutes per session
**Method**: Moderated think-aloud, remote

### Tasks

| # | Task | Success Criteria | Time Limit |
|---|------|-----------------|------------|
| 1 | [Task description] | [what "success" looks like] | 3 min |
| 2 | [Task description] | | 5 min |
| 3 | [Task description] | | 3 min |

### Interview Questions

**Before Tasks** (context):
1. Tell me about the last time you [relevant activity]
2. What's the most frustrating part of [problem area]?

**After Tasks** (reaction):
1. On a scale of 1-5, how easy was it to [core task]?
2. What was confusing, if anything?
3. Would you use this? Why or why not?

### Observation Guide

Watch for:
- [ ] Where do users hesitate? (indicates confusion)
- [ ] What do they click first? (indicates expectations)
- [ ] Do they complete the task without help?
- [ ] What words do they use to describe the experience?
- [ ] Where do they express frustration or delight?
```

### 5.2 Success Metrics

```markdown
### Success Criteria

| Metric | Target | Measured By |
|--------|--------|-------------|
| Task completion rate | ≥ 80% (4/5 users) | Observation |
| Time to complete core task | < [X] seconds | Timer |
| System Usability Scale (SUS) | ≥ 68 (above average) | Post-task survey |
| Net Promoter Score | ≥ 0 (more promoters) | Post-session question |
| Qualitative satisfaction | "Easy" or "intuitive" | Interview themes |

### Decision Framework
- **Go**: ≥ 4/5 metrics met → proceed to production
- **Iterate**: 2-3 metrics met → refine and re-test specific areas
- **Pivot**: ≤ 1 metric met → revisit Phase 2 with new solutions
```

---

## Sprint Output Summary

At the end of the sprint, deliver:

```markdown
# Design Sprint Summary

## The Problem
[1-2 sentence problem statement]

## The Solution
[1-2 sentence solution description]

## Key Decisions
1. [Decision 1 — why]
2. [Decision 2 — why]
3. [Decision 3 — why]

## Prototype
[Link or reference to screens]

## Next Steps
1. [ ] Recruit 5 test participants matching [persona]
2. [ ] Conduct usability tests using the test script
3. [ ] Analyze results against success criteria
4. [ ] Make Go/Iterate/Pivot decision
5. [ ] If Go → move to production design with /design command
```

## Notes

- **Adapt the process** — not every sprint needs all 5 phases. A focused UX problem might skip Phase 1 if the problem is well-understood.
- **Time-box** — each phase should take roughly equal time. Don't let understanding consume the whole sprint.
- **Diverge before converging** — Phase 2 should generate genuinely different ideas, not variations of the same idea.
- **One sprint, one question** — keep the scope tight. Multiple questions = multiple sprints.
- **Real decisions** — the decision matrix should produce a clear winner. If it's a tie, the user breaks it.

## MCP Fallback

This command works without MCP servers for Phases 1-3 and 5 (text-based outputs).

If Figma Desktop Bridge is available in Phase 4:
- Build the prototype directly in Figma using `/figma-create` and `/figma-prototype`

If Figma is unavailable in Phase 4:
- Output the prototype as interactive HTML wireframes for browser viewing

## What's Next

After completing a design sprint:
- `/design` — build the production design from the validated prototype
- `/figma-create` — create hi-fi Figma screens from the sprint's winning solution
- `/figma-prototype` — add interactive connections to the prototype
- `/design-present` — present sprint findings and recommendations to stakeholders
