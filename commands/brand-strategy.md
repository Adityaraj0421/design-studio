---
description: "Define or audit a brand — positioning, visual identity system, voice and tone, and brand architecture."
argument-hint: "[brand name] [mode: define/audit/refresh] [context: startup/rebrand/extension]"
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "mcp__*"]
---

# /brand-strategy

You are running a **brand strategy session** — defining, auditing, or refreshing a brand's positioning, visual identity system, voice and tone, and architecture. The output is a structured brand strategy document or audit report with an implementation checklist.

Input: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/brand-strategist.md` for the full brand strategy framework.

## Process

### 1. Parse Inputs

Extract from the user's request:
- **Brand name**: The brand being defined or audited
- **Mode**: `define` (new brand), `audit` (evaluate existing), or `refresh` (evolve existing)
- **Context**: `startup` (from scratch), `rebrand` (replacing existing identity), or `extension` (adding sub-brand/product line)
- **Industry/category**: Inferred or stated
- **Competitors**: Named or implied
- **Constraints**: Existing assets, colors, or names to preserve (for refresh/audit)

If mode is not specified, infer from context clues (e.g., "new app" → define; "our brand feels outdated" → refresh; "evaluate our brand" → audit).

### 2. Load Brand Strategist Reference

Apply the frameworks from the brand-strategist.md reference:
- Positioning statement formula
- Competitive matrix approach
- Differentiator types (functional/emotional/social)
- Voice & tone model
- Brand audit framework (for audit mode)

### 3. Run Positioning Exercise

**For define/refresh mode:**

1. **Audience definition** — Who is the primary target? Include: demographics, psychographics, primary job-to-be-done, frustration with current alternatives
2. **Category placement** — What category does this brand compete in? What does the customer compare it to?
3. **Differentiator identification** — What does this brand do/be that alternatives don't? Classify as functional, emotional, or social
4. **Reason to believe** — What proof supports the differentiator? (feature, origin story, method, credentials)
5. **Positioning statement** — Write the full "For [audience] who [need]..." statement

**For audit mode:**

1. Review stated positioning (if available)
2. Identify what the brand actually communicates across touchpoints
3. Map the gap between intended and expressed positioning

### 4. Define / Audit Visual Identity System

**For define/refresh:**
- Logo direction: mark style (geometric/organic/letterform/abstract), wordmark style, lockup approach
- Color strategy: primary color role + rationale (emotional association, competitive differentiation), secondary/neutral palette
- Typography direction: heading typeface (personality), body typeface (readability), scale approach
- Visual personality: photography style, illustration/icon style if applicable

**For audit:**
- Score current logo system (versatility, scalability, consistency in use)
- Score color usage (on-brand vs. off-brand applications, accessibility failures)
- Score typography (consistency, hierarchy clarity)
- Flag specific misuse examples

### 5. Define / Audit Voice & Tone

**For define/refresh:**
- Write 3–4 personality dimension pairs ("this, not that")
- Position the brand on the tone dial (formal↔casual, serious↔playful, authoritative↔humble, established↔innovative)
- Provide channel-specific tone adjustments (social vs. product vs. comms)
- Write 2–3 before/after copy examples demonstrating the voice

**For audit:**
- Evaluate sample copy from 3+ touchpoints
- Score voice consistency
- Identify off-brand patterns (too formal, too casual, conflicting personalities)

### 6. Output Brand Strategy Document or Audit Report

**Brand Strategy Document (define/refresh):**
```
# [Brand Name] — Brand Strategy

## Positioning
- Target audience
- Category
- Differentiator (type: functional/emotional/social)
- Reason to believe
- Positioning statement

## Visual Identity Direction
- Logo direction
- Color strategy (primary + palette roles)
- Typography direction
- Visual personality

## Voice & Tone
- Personality dimensions (3–4 pairs)
- Tone dial settings
- Channel adjustments
- Copy examples
```

**Brand Audit Report:**
```
# [Brand Name] — Brand Audit

## Positioning Assessment
- Stated vs. expressed positioning
- Gap analysis

## Visual Identity Scorecard
- Logo: [score]/5 — notes
- Color: [score]/5 — notes
- Typography: [score]/5 — notes
- Overall consistency: [score]/5

## Voice & Tone Assessment
- Current voice pattern
- Inconsistencies found
- Recommended corrections

## Priority Issues (ranked)
1. [Highest priority]
2. ...
```

### 7. Deliver Implementation Checklist

Produce a prioritized checklist tailored to the mode:

**Define:**
- [ ] Finalize positioning statement with team sign-off
- [ ] Develop logo concepts (minimum 3 directions)
- [ ] Build color system (primary + neutral + semantic)
- [ ] Select and pair typefaces
- [ ] Write voice/tone guide with examples
- [ ] Create brand guidelines document
- [ ] Export logo asset package (SVG, PNG, EPS, PDF)

**Audit:**
- [ ] Address highest-priority consistency failures
- [ ] Fix color accessibility violations
- [ ] Standardize logo usage across flagged touchpoints
- [ ] Update voice/tone documentation
- [ ] Schedule 6-month re-audit

**Refresh:**
- [ ] Lock elements to preserve vs. evolve
- [ ] Develop refresh concepts respecting constraints
- [ ] Validate refresh with existing audience before full rollout
- [ ] Create migration guide for existing materials

## MCP Fallback

If Figma Desktop Bridge is unavailable:
- Skip Figma style creation
- Output brand strategy as a structured markdown document with all sections

If Preview server is unavailable:
- Write brand strategy document to disk as `brand-strategy-[brand-name].md`

## What's Next

After defining or auditing a brand:
- `/brand-kit` — generate a complete visual token system (colors, type, spacing) from the brand foundations
- `/design-system` — build component-level tokens from the brand kit
- `/design` — apply brand identity to pages and UI components
