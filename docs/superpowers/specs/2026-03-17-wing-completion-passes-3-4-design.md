# v3.16.0 + v3.17.0 — Wing Completion Passes 3 & 4

**Goal:** Add `## Advanced Patterns` + `## Full Coverage` to the 9 role reference files that received only `## Handoffs` in v3.14.0. Also add `## Reference-Sourced Insights` to `deployment.md` (the only role file still missing it), folded into v3.16.0.

**Architecture:** Content-only additions — no new commands, no new agents, no SKILL.md routing changes, no evals, no smoke fixtures. Both releases insert new markdown sections into existing files in `skills/design/references/`. After v3.17.0, every role file in the plugin has full section coverage.

**Tech Stack:** Markdown only. Firecrawl MCP for `deployment.md` Reference-Sourced Insights. Standard 8-file version bump set per release.

---

## Release Split

| Release | Files | Sections Added |
|---------|-------|----------------|
| v3.16.0 | 5 files | `## Advanced Patterns` + `## Full Coverage` (deployment also gets `## Reference-Sourced Insights`) |
| v3.17.0 | 4 files | `## Advanced Patterns` + `## Full Coverage` |

**v3.16.0 files:** `content-designer`, `deployment`, `figma-workflow`, `product-designer`, `social-media-designer`

**v3.17.0 files:** `ui-designer`, `ux-designer`, `ux-researcher`, `video-content-producer`

---

## Section Format Spec

### `## Advanced Patterns`

**Format:** 3–5 named `###` subsections with prose, tables, or code blocks. 25–85 lines total. Covers non-obvious techniques, edge cases, and expert-level workflows specific to the role.

### `## Full Coverage`

**Format:** 2–3 subsections with checklists, matrices, or worked examples. 25–50 lines total. Provides a completeness framework — what "done" looks like for this role's domain.

### `## Reference-Sourced Insights` (deployment.md only)

**Format:** 2–4 named `###` subsections, each with distilled insights from an authoritative source. Each subsection ends with a `> Source: [url] — accessed 2026-03-17` citation. Content must be distilled and paraphrased, never reproduced verbatim.

### Section Placement

New sections insert immediately before `## Reference-Sourced Insights` (if that section exists in the file).

**Special case:** `deployment.md` has no `## Reference-Sourced Insights` — all three new sections (`## Advanced Patterns`, `## Full Coverage`, `## Reference-Sourced Insights`) append at end-of-file, in that order.

---

## v3.16.0 — Content Spec (5 files)

### `content-designer.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### Content Hierarchy Frameworks

Most UI screens fail not from bad copy but from wrong hierarchy — showing too much at once, or burying critical information. Three frameworks to apply:

**F-pattern and Z-pattern reading:** Users scan, not read. F-pattern applies to dense text (start strong in the first two lines, front-load the left margin). Z-pattern applies to sparse layouts (logo → headline → CTA forms a Z). Place the most critical information along the scan path.

**Progressive disclosure:** Surface only what the user needs for the current decision. Details live one level deeper. Apply this at the sentence level (lead with the outcome, follow with the explanation), the component level (tooltip vs. inline vs. modal), and the flow level (wizard steps vs. single long form).

**Layered reading:** Every screen should make sense at three depths — a 2-second skim (headline only), a 10-second scan (headline + subheads + labels), and a full read (all body copy). Write the skim layer first, then fill in the scan layer, then the full layer.

### Localization-Aware Writing

Copy that ignores localization creates expensive rework at launch. Design for translation from the first draft.

**Character expansion budgets:** English is compact. German expands ~30%, Finnish ~50%, Arabic contracts but flips direction. Never lock a button width to its English label — define minimum touch targets and let the container flex. Flag any string over 40 characters as a localization risk.

**Avoid idioms and metaphors:** "Hit the ground running," "boil the ocean," "table an item" — these don't translate. Prefer direct, literal language. Review every metaphor before copy is finalized.

**RTL planning:** In RTL layouts (Arabic, Hebrew, Farsi), UI is mirrored. Directional words ("left panel," "swipe right") become wrong. Write spatially neutral copy: "open the menu," "navigate to settings." Flag directional references during copy review.

**Cultural tone adaptation:** Formal register varies by locale. Japanese business communication is highly formal; US SaaS is casual. Build a locale tone matrix in the content system that maps base tone → locale adjustment rules.

### Content Variation Management

**A/B copy variants:** When running copy experiments, change one variable at a time — headline vs. headline, CTA vs. CTA, not multiple elements simultaneously. Document what's being tested and the success metric before variants go live. Own the copy decision log.

**Feature-flag copy:** When features are flagged on/off by user segment, copy strings must be managed per flag state. Ensure every flag state has a reviewed copy set — there is no "default copy will work fine" situation.

**Multi-audience content branching:** A single UI may serve multiple user types (admin vs. end user, free vs. paid). Maintain a content map that tracks which strings vary by audience and what triggers the variation. Avoid string proliferation — find the most inclusive phrasing before branching.

---

## Full Coverage

### Content Coverage Checklist

Every surface in the product needs reviewed copy before it ships. Use this checklist per feature:

**Core states (required for every screen):**
- [ ] Default / loaded state — primary content and labels
- [ ] Empty state — what does the user see with no data? Includes CTA to fill the empty state
- [ ] Loading state — skeleton label text or loading message if applicable
- [ ] Error state — specific error, not "Something went wrong." Include recovery action
- [ ] Success state — confirm what happened and what's next

**Supporting touchpoints:**
- [ ] Onboarding / first-run experience copy
- [ ] Confirmation dialogs — action verb + object ("Delete project" not "Confirm")
- [ ] Notification and toast messages — past tense for completed actions, present for ongoing
- [ ] Tooltip and help text — one sentence max, no punctuation for short tips
- [ ] Placeholder text — describes the expected input, not the label

**Accessibility:**
- [ ] All images have meaningful alt text (not file names)
- [ ] Form error messages are specific and actionable
- [ ] Aria-labels on icon-only buttons are human-readable

### Copy Quality Matrix

Rate each reviewed copy block before sign-off:

| Criterion | Pass | Needs Work |
|-----------|------|------------|
| Clarity | Understood on first read | Requires re-reading or context |
| Brevity | No unnecessary words | Can be shortened without loss |
| Tone fit | Matches brand voice guidelines | Too formal, too casual, or inconsistent |
| Accessibility | Plain language, no idioms | Jargon, idiom, or complex sentence |
| Localization | Under 40 chars, no directional refs | Long strings or locale-specific phrasing |
```

---

### `deployment.md`

**Placement:** End-of-file (after existing `## Handoffs` section, which is the last section)

```markdown
## Advanced Patterns

### Zero-Downtime Deploy Strategies

Production deploys that take the site offline are avoidable. Three patterns:

**Feature flags:** Ship code before shipping the feature. Wrap new UI behind a flag; enable it per-user or per-percentage. This decouples deploy from release, allows instant rollback without a redeploy, and enables dark launches to internal users before public release. Tools: LaunchDarkly, Unleash, or simple environment-variable flags for smaller projects.

**Staged rollouts (canary deploys):** Route 1–5% of traffic to the new version. Monitor error rate and performance for 15–30 minutes. If metrics hold, expand to 10%, then 25%, then 100%. Most CDN-based hosting providers (Vercel, Netlify, Firebase Hosting) support traffic splitting natively.

**Blue-green deployments:** Maintain two production environments (blue = current, green = next). Deploy to green, run smoke tests, then flip DNS or load balancer. Blue stays warm for instant rollback. Cost: double the infra while both are live. Best for high-stakes releases where rollback must be instantaneous.

**When to choose what:** Feature flags for feature-level risk; canary for infrastructure-level risk; blue-green for complete stack replacements or migrations.

### CI/CD for Design Systems

Design token changes and component updates carry the same deployment risk as code changes. Treat them accordingly.

**Token build pipeline:** Design tokens (Figma Variables → Style Dictionary → CSS/JS/iOS/Android) should be built in CI, not manually exported. On merge to main: run Style Dictionary build → generate platform outputs → run token diff to catch unintended changes → publish to CDN.

**Visual regression gates:** Integrate Percy, Chromatic, or Playwright screenshot comparisons into the PR pipeline. A component change that alters visual output should surface a screenshot diff before merge — not after users report it. Gate merge on visual regression review, not just unit tests.

**Staged token rollouts:** Semantic token changes (e.g., `--color-interactive` shifts from blue-500 to blue-600) affect every component that uses that token. Use feature flags or CSS class overrides to test token changes on a subset of surfaces before global rollout.

### Multi-Environment Config Management

**Environment hierarchy:** Local dev → Preview (per-PR) → Staging → Production. Each environment should have a distinct config set. Never share API keys or feature flag states across environments.

**Preview channels:** Firebase Hosting preview channels, Vercel preview deployments, and Netlify deploy previews all create ephemeral URLs per branch. Use these for design review sign-off. A designer should be able to click a URL and approve without setting up a local environment.

**Staging fidelity requirements:** Staging must mirror production config — same API endpoints (or realistic mocks), same feature flag states as production. A staging environment with relaxed flags or mock data gives false confidence. Document any known staging divergences and who owns closing them.

**Environment variable discipline:** All environment-specific values go in env vars, never hardcoded. Use a `.env.example` file (committed) and a `.env.local` (gitignored). Rotate secrets immediately if they appear in git history.

---

## Full Coverage

### Pre-Deploy Gate Checklist

Run this before promoting any environment (preview → staging, staging → production):

**Performance:**
- [ ] LCP ≤ 2.5s on mobile (measured via Lighthouse CI or PageSpeed Insights)
- [ ] CLS score < 0.1 (no unexpected layout shifts)
- [ ] INP ≤ 200ms for interactive elements
- [ ] Total page weight within budget (define budget per project, e.g., 500KB initial JS)

**Accessibility:**
- [ ] No critical WCAG 2.1 AA violations (axe-core or Lighthouse accessibility audit)
- [ ] All images have alt text
- [ ] Focus order is logical and visible

**Visual:**
- [ ] Design sign-off on staging (product designer or UI designer has reviewed)
- [ ] Visual regression test has no unexpected diffs
- [ ] Renders correctly at 375px, 768px, 1280px, 1440px

**Functional:**
- [ ] Smoke tests pass (critical user paths: login, core action, logout)
- [ ] No console errors in production build
- [ ] Environment variables verified for target environment

**SEO / Social:**
- [ ] `<title>` and `<meta description>` set
- [ ] Open Graph tags populated (og:title, og:description, og:image)
- [ ] `robots.txt` and `sitemap.xml` correct for environment (noindex on staging)

### Environment Coverage Matrix

| Check | Local Dev | Preview (PR) | Staging | Production |
|-------|-----------|--------------|---------|------------|
| Smoke tests | Manual | Auto (CI) | Auto (CI) | Post-deploy |
| Performance budget | — | Lighthouse CI | Lighthouse CI | Monitoring |
| Visual regression | — | Chromatic/Percy | — | — |
| Design sign-off | — | ✓ Required | ✓ Required | — |
| Security headers | — | — | ✓ Check | ✓ Monitor |
| Analytics verified | — | — | ✓ Staging events | ✓ Live events |

---

## Reference-Sourced Insights
```

**Note for implementer:** The `## Reference-Sourced Insights` section content for `deployment.md` must be generated by scraping authoritative sources with Firecrawl, then distilling and paraphrasing (never reproducing verbatim). Do not hard-code the content below — fetch it during task execution.

**Sources to scrape and topics to distill:**

| URL | Topic to distill |
|-----|-----------------|
| `https://web.dev/articles/lcp` | What LCP measures, top causes of poor LCP, resource-level optimizations (preload, priority hints, image sizing) |
| `https://web.dev/articles/cls` | What CLS measures, top sources of layout shift (images without dimensions, dynamic content insertion, web fonts), mitigation techniques |
| `https://web.dev/articles/inp` | What INP measures (replaces FID), interaction phases (input delay, processing time, presentation delay), optimization strategies |
| `https://web.dev/articles/font-best-practices` | `font-display` values and trade-offs, preloading critical fonts, variable fonts for performance, FOUT vs FOIT |

**Format for each subsection:**
```
### [Topic Name] (From [Source Name])

[3–8 bullet points or short paragraphs of distilled, paraphrased insight]

> Source: [exact URL] — accessed 2026-03-17
```

---

### `figma-workflow.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### Branching Strategies in Figma

Figma branches are powerful but introduce coordination overhead. Use them deliberately.

**When to branch:** Branch for changes that touch shared library components (to avoid disrupting other designers mid-work), for large redesigns that span multiple pages, and for any work requiring stakeholder review before the main file changes.

**When not to branch:** Don't branch for quick explorations on a personal screen file, or for work that won't affect shared components. The overhead of branch management outweighs the benefit for low-risk changes.

**Merge conflict resolution:** Figma's merge UI shows component-level conflicts. Before merging, communicate with teammates about what's changed. Resolve conflicts by keeping the intended version — don't blindly accept "theirs" or "ours." After merging, do a quick visual sweep of the main file to catch any unexpected changes.

**Branch naming convention:** `[type]/[description]` — e.g., `feat/onboarding-redesign`, `fix/button-states`, `refactor/spacing-tokens`. Consistent naming makes the branch list scannable when multiple designers are working in parallel.

### Library Publishing Cadence

Shared library updates propagate to every file that accepts updates. Treat them like a software release.

**Major vs. minor updates:** A major update changes component APIs — renames properties, removes variants, changes layer structure. A minor update adds new variants or fixes visual bugs without breaking existing usage. Label these clearly in the publish notes so subscribers know whether to expect rework.

**Communicating breaking changes:** Before publishing a breaking change, notify all consuming teams via the design system channel. Provide a migration guide: what changed, what to do in each affected file, and a deadline for updating. Don't publish breaking changes without advance notice.

**Publish cadence:** Batch minor fixes into weekly or bi-weekly releases rather than publishing every small change. Frequent publishes train designers to dismiss the update notification — which means they miss important updates. Reserve immediate publishes for critical bug fixes.

### Cross-Team Collaboration Patterns

**Component proposal workflow:** New components should follow a proposal → review → approval → build → publish pipeline before entering the shared library. The proposal includes: use case, where it's needed, rough sketch, and which existing components it replaces or complements. This prevents library sprawl.

**Reviewer roles in shared files:** Assign explicit roles in multi-designer files — who can edit vs. who can comment-only. Editors should be the primary designers; stakeholders and developers get comment-only access. This prevents accidental layer moves during review.

**Design sync rituals:** For teams with 3+ designers sharing a library, a weekly 15-minute sync to review pending library proposals and in-flight branches prevents pile-ups. Decisions made asynchronously (in Figma comments) should be logged in a shared doc for reference.

---

## Full Coverage

### File Hygiene Checklist

Run this before sharing any Figma file with developers or stakeholders:

**Structure:**
- [ ] File has a cover frame on the first page (title, date, status: WIP / Review / Final)
- [ ] Pages are named and ordered logically (e.g., Cover → Flows → Components → Archive)
- [ ] Frames on each page are named (not "Frame 47")
- [ ] Archive page exists for explorations and rejected directions

**Components and styles:**
- [ ] All reusable elements are components (not detached copies)
- [ ] No local styles that duplicate shared library styles
- [ ] All text uses defined text styles (no one-off font sizes)
- [ ] All colors use library color tokens (no hex overrides)

**Auto-layout:**
- [ ] All frames use auto-layout where applicable (no hardcoded spacing values)
- [ ] Constraints set correctly for responsive behavior
- [ ] No invisible spacer layers (use gap instead)

**Handoff readiness:**
- [ ] All layers named semantically (no "Group 12", "Rectangle 3")
- [ ] Export settings configured for assets that need to be exported
- [ ] Prototype connections set for flows being handed off

### Handoff Readiness Matrix

| Deliverable Type | Developer Ready When… |
|-----------------|----------------------|
| Screen specs | All states designed (empty, loading, error, success), auto-layout applied, layers named, tokens used throughout |
| Interactive prototype | Flows connected, transition types specified, starting frame set, shareable link generated |
| Component documentation | All variants present, property names match code props, usage notes added in Figma description field |
| Exported assets | Export presets configured (1×, 2×, SVG where applicable), assets organized in a dedicated export frame |
| Design tokens | Figma Variables match Style Dictionary token names, all semantic tokens assigned to primitive values |
```

---

### `product-designer.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### Hypothesis-Driven Design

Every design decision is a bet. Make the bet explicit.

**The hypothesis format:** "We believe that [design change] will result in [outcome] for [user type], because [assumption]. We'll know we're right when [measurable signal]."

Before opening a design file, write the hypothesis for the feature or change. This forces clarity on what success looks like and prevents scope creep ("while we're here, let's also…").

**Defining success before exploring solutions:** Agree on the metric that will validate the design before presenting any direction. If there's no agreed-on success signal, the design review will devolve into aesthetic preference. "Will users click this?" is testable. "Does this look good?" is not.

**Hypothesis stack:** Features typically require a stack of nested hypotheses — user need hypothesis (do users have this problem?), solution hypothesis (will this design solve it?), and business hypothesis (does solving it move a business metric?). Know which layer you're validating at each stage.

### Design Debt Management

Design debt accumulates when the right solution is deferred in favor of the fast one. Left unmanaged, it slows every future design decision.

**When to ship imperfect:** Ship the imperfect version when: the validated learning outweighs the cost of rework, the imperfect version won't create a confusing precedent in the design system, and there's a committed date for the cleanup sprint.

**Tracking design debt:** Maintain a design debt register — a shared doc or Notion table with entries: what's imperfect, why it was deferred, what the right solution is, and estimated rework effort. Review it in quarterly planning. Invisible debt doesn't get prioritized.

**Communicating debt to engineering:** Frame debt as a future cost, not a past mistake. "We shipped the fast version to validate the hypothesis. Now that it's validated, the investment in the right solution will save X hours of rework over the next year" is more persuasive than "the design is bad."

### Stakeholder Alignment Patterns

**Design review rituals:** Weekly or bi-weekly design reviews with a fixed format reduce decision latency. Format: 5 minutes context-setting (problem, constraints, what's being decided) → 15 minutes presentation → 10 minutes discussion → 5 minutes decision capture. Don't present without a clear ask.

**Async vs. sync review:** Async review (Loom + Figma comments) works for low-stakes directional checks. Sync review is required when: the decision is reversible but expensive to redo, stakeholders have conflicting requirements, or the design is politically sensitive. Don't async a conversation that will take 10 back-and-forth comment threads.

**Decision capture format:** Every design review ends with a written decision record: what was decided, who decided it, what was explicitly out of scope, and what the open questions are. This prevents "I thought we agreed on X" six weeks later. One paragraph in the project doc is enough.

---

## Full Coverage

### Design Decision Log

One entry per significant design decision. Maintain in the project doc or Figma file description.

**Entry format:**

```
Decision: [What was decided — one sentence]
Date: [YYYY-MM-DD]
Deciders: [Names or roles]
Problem: [What problem was being solved]
Constraints: [Technical, timeline, resource, or scope constraints]
Options considered: [2–3 alternatives evaluated]
Decision rationale: [Why this option over others]
Success metric: [How we'll know this worked]
Open questions: [What remains unresolved]
```

Maintain one log per feature or project phase. Archive, don't delete — rejected directions from six months ago are often relevant when revisiting a problem.

### Feature Completeness Checklist

Before calling a feature design complete:

**User coverage:**
- [ ] Primary user type (most common case) fully designed
- [ ] Secondary user types identified and accommodated or explicitly excluded
- [ ] New user (first-run) experience designed
- [ ] Returning user (subsequent visits) experience designed
- [ ] Power user edge cases considered (high data volume, complex configurations)

**State coverage:**
- [ ] Empty state (no data yet)
- [ ] Loading state (data fetching)
- [ ] Error state (something went wrong — specific, actionable message)
- [ ] Partial success state (some data loaded, some failed)
- [ ] Success / confirmation state

**Platform coverage:**
- [ ] Mobile (375px) — layout, touch targets, truncation
- [ ] Tablet (768px) — layout reflow
- [ ] Desktop (1280px+) — full layout
- [ ] Dark mode (if applicable)

**Accessibility:**
- [ ] Focus order logical
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] No information conveyed by color alone
- [ ] All interactive elements keyboard-accessible
```

---

### `social-media-designer.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### Template Systems at Scale

Social media design at volume requires a template system, not one-off designs.

**Master template architecture:** Build one master template per format (1:1, 4:5, 9:16, 16:9) that contains all possible layout zones. Lock brand elements (logo zone, color fields, typography styles). Mark flexible zones — the areas where content varies per post. Export locked zones as components; flexible zones accept swapped content.

**Locked vs. flexible zones:** Locked zones enforce brand consistency and should never be modified outside of a brand refresh cycle. Flexible zones are designed to accommodate variation — different images, different copy lengths, different CTAs. Define the min/max content for each flexible zone and test edge cases (short copy vs. maximum copy).

**Template versioning:** When templates are updated (brand refresh, format change, new campaign family), maintain previous versions in an archive folder with a clear deprecation date. Designers referencing old templates need to know when they were retired and what replaced them.

**Variant generation workflow:** From a master template, generate variants systematically: swap the image → adjust copy → apply campaign color → export. Document this workflow as a Figma or Notion SOP so anyone on the team can generate on-brand assets without designing from scratch.

### Platform-Specific Visual Optimization

Each platform has different consumption patterns. Design for each, not one-size-fits-all.

**Thumb-stop hierarchy:** The first frame (video) or the dominant image area (static) must stop the scroll. Place the highest-contrast or most emotionally engaging element in the top third of the frame — this is what's visible before a user decides to pause. Text below the fold of a static post is often unread.

**Safe zone management:** Every platform crops or overlays UI on content. Instagram Stories has a bottom action zone; TikTok has a right-side interaction column. Define safe zones per format and mark them in your templates. No critical copy or logo should sit in unsafe areas.

**Aspect ratio strategy:** Maintain a platform-format matrix per campaign type. A single campaign may need: 1:1 (feed), 4:5 (feed, better reach), 9:16 (Stories/Reels), 16:9 (YouTube). Build these as a template family from the start rather than adapting after the fact.

### Brand Flexibility Within Constraints

**Acceptable variation range:** Define explicitly what can vary without brand team approval. Typically safe: image choice within a defined style, copy within approved tone guidelines, color usage within the palette. Typically requires approval: new typographic treatments, colors outside the palette, logo lockup changes.

**On-brand experimentation:** Social is the fastest feedback loop for brand expression. Propose visual experiments to the Brand Strategist with a clear hypothesis ("we believe warmer image tones will increase engagement on LinkedIn by 15%"). Run experiments with explicit approval and a defined test window. Document what worked and why — this becomes the brief for the next generation of templates.

**Escalation criteria:** Escalate to Brand Strategist when: a request requires a new brand touchpoint not covered by existing guidelines, a client or stakeholder requests a treatment that conflicts with brand standards, or an experiment produced a direction worth formalizing into templates.

---

## Full Coverage

### Asset Delivery Matrix

Define required exports per campaign type before starting design:

| Platform | Format | Dimensions | File Type | Notes |
|----------|--------|-----------|-----------|-------|
| Instagram Feed | Square | 1080×1080 | JPG/PNG | Max 2MB |
| Instagram Feed | Portrait | 1080×1350 | JPG/PNG | Better reach |
| Instagram Stories | Vertical | 1080×1920 | JPG/PNG/MP4 | Safe zone: top/bottom 14% |
| LinkedIn Feed | Landscape | 1200×627 | JPG/PNG | — |
| LinkedIn Feed | Square | 1080×1080 | JPG/PNG | Better mobile engagement |
| Twitter/X | Landscape | 1200×675 | JPG/PNG | — |
| TikTok / Reels | Vertical | 1080×1920 | MP4 | Safe zone: right side 13% |
| YouTube Thumbnail | Landscape | 1280×720 | JPG | Readable at 120px wide |

Review and update this matrix per campaign brief — not every campaign requires every format.

### Brand Compliance Checklist

Run before delivering any asset:

**Color:**
- [ ] All colors are from the approved brand palette (no off-palette hex values)
- [ ] Text meets contrast requirements against its background
- [ ] Campaign accent color (if applicable) approved by Brand Strategist

**Typography:**
- [ ] Only approved brand typefaces used
- [ ] Font sizes match the brand type scale
- [ ] No unlicensed fonts introduced

**Logo and marks:**
- [ ] Logo placed in the designated logo zone
- [ ] Minimum clear space around logo maintained
- [ ] No logo distortion, rotation, or color modification

**Imagery:**
- [ ] Images match the approved visual style (subject, lighting, color grade)
- [ ] All images are licensed for commercial use in social media
- [ ] No competitor products visible in imagery

**Copy and tone:**
- [ ] Copy reviewed by Social Media Copywriter or Content Designer
- [ ] Tone matches platform-specific guidelines
- [ ] No claims that require legal review have been added
```

---

## v3.17.0 — Content Spec (4 files)

### `ui-designer.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### State-Driven Component Design

Visual polish is wasted if a component doesn't handle all its states. Map states before picking colors.

**The complete state set for interactive components:**

| State | Description | Common failure mode |
|-------|-------------|---------------------|
| Default | Resting, unfocused, unselected | Over-designed; this is the baseline |
| Hover | Cursor over element (desktop only) | Forgotten on touch-first designs |
| Focus | Keyboard/programmatic focus | Invisible or same as hover — fails WCAG 2.1 |
| Active / pressed | Mid-click or touch | Omitted entirely |
| Disabled | Not interactive in current context | Same as default but grey — no affordance |
| Loading | Async operation in progress | Blocking the whole page instead of the component |
| Error | Validation failure or operation error | Generic message, no recovery path |
| Success | Operation completed | Forgotten — confirmation builds trust |
| Empty | No data to display | Missed; users see raw structure with no content |

Work through this matrix for every interactive component before visual polish begins.

**Component state organization in Figma:** Name each state as a variant property (State=Default, State=Hover, etc.). Use boolean properties for modifiers that apply across states (HasIcon=True/False). This keeps the component compact and makes dev handoff straightforward.

### Responsive Design Decision Framework

Responsive design has three strategies. Choose deliberately rather than defaulting to "just make it smaller."

**Reflow:** Content reorganizes to fit the viewport. A two-column layout becomes one column. Best for content-heavy screens where all content remains relevant at every breakpoint. Most common approach.

**Hide and reveal:** Some elements are hidden at smaller viewports and revealed at larger ones (or vice versa). Use when an element genuinely adds no value at a given viewport — not as a shortcut. Always verify that hidden content doesn't break user flows.

**Adapt:** The component changes behavior, not just size. A data table becomes a card list on mobile; a sidebar becomes a bottom sheet. Higher-effort but better UX when the original pattern fundamentally doesn't work at small sizes.

**Breakpoint philosophy:** Use content breakpoints, not device breakpoints. The right breakpoint is where the layout breaks, not where an iPhone ends. Design at 375px (small phone), 768px (tablet/large phone), 1280px (laptop), 1440px (desktop). Test in between.

### Accessibility-First Visual Design

Accessibility isn't a final audit — it's a design input.

**Contrast systems:** Build contrast into the color palette, not as an afterthought. WCAG 2.1 AA requires 4.5:1 for normal text, 3:1 for large text (18px bold or 24px regular). Use a tool like Figma's contrast plugin or Contrast.app during palette construction. Never use two mid-tones together (grey on grey, blue on purple).

**Focus indicator design:** The default browser focus ring is ugly, so developers remove it. Replace it with a visible, branded focus indicator — typically a 2–3px solid ring in the interactive color with sufficient contrast against both light and dark backgrounds. This is a WCAG 2.1 AA requirement (Success Criterion 2.4.7).

**Non-color information encoding:** Never use color as the only indicator of meaning. An error field that turns red is invisible to users with red-green colorblindness. Pair color with: an icon (✕ for error, ✓ for success), a label ("Error:"), or a pattern. Apply this to status indicators, chart colors, form validation, and notification types.

---

## Full Coverage

### Component State Matrix

For each interactive component in the design system, verify all applicable states are designed:

| Component | Default | Hover | Focus | Active | Disabled | Loading | Error | Success | Empty |
|-----------|---------|-------|-------|--------|----------|---------|-------|---------|-------|
| Button (primary) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| Input field | ✓ | ✓ | ✓ | — | ✓ | — | ✓ | ✓ | — |
| Dropdown | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ |
| Checkbox | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — |
| Card | ✓ | ✓ | ✓ | — | — | ✓ | ✓ | — | ✓ |
| Modal | ✓ | — | ✓ | — | — | ✓ | ✓ | ✓ | — |
| Table row | ✓ | ✓ | ✓ | — | — | — | — | — | ✓ |
| Toast/notification | — | — | — | — | — | ✓ | ✓ | ✓ | — |

Adapt this matrix to the project's actual component set. Any "—" that should be "✓" is a design gap.

### Responsive Coverage Checklist

Verify at each breakpoint before handoff:

**375px (small phone):**
- [ ] No horizontal scroll
- [ ] Touch targets ≥ 44×44px
- [ ] No text overlap or truncation (unless intentional with ellipsis)
- [ ] Navigation is accessible (hamburger or bottom nav)
- [ ] Tables adapted (card view or horizontal scroll with sticky column)

**768px (tablet / large phone):**
- [ ] Layout reflow looks intentional (not just stretched mobile)
- [ ] Multi-column layouts begin where content benefits from them
- [ ] Touch targets still appropriate (mixed touch/cursor device)

**1280px (laptop):**
- [ ] Primary design canvas; all features fully accessible
- [ ] Sidebars and panels have appropriate widths
- [ ] Line length for body text: 45–75 characters

**1440px (desktop):**
- [ ] Layout doesn't stretch uncomfortably wide
- [ ] Max-width container defined and applied
- [ ] No accidental full-width elements (images, cards) that look wrong at wide viewport
```

---

### `ux-designer.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### Progressive Disclosure Architecture

Not all information belongs on screen at the same time. Progressive disclosure reduces cognitive load by surfacing information when it's needed.

**Three-level model:**

1. **Always visible:** Critical to the current task. The user cannot proceed without it. Examples: primary form fields, main navigation, key status information.
2. **On demand:** Helpful but not required. Revealed by explicit user action. Examples: tooltip explanations, advanced filter options, secondary settings.
3. **Never surfaced proactively:** Available but not pushed. User must seek it out. Examples: detailed logs, system configuration, admin tools for non-admin users.

**Common pitfalls:** Progressive disclosure becomes patronizing when too much is hidden (users can't find features). It becomes overwhelming when too much is shown (users don't know where to start). The calibration requires research — ask users what they expected to find and where.

**Progressive disclosure in forms:** Multi-step forms are a type of progressive disclosure. Only show fields relevant to the current step. Conditional fields (show Field B if Field A = "Yes") should appear and disappear fluidly — not on a separate page unless the decision genuinely branches the flow.

### Mental Model Alignment

A mental model is what the user believes the system does. Mismatches cause confusion and errors.

**Identifying mismatches:** In usability testing, a mental model mismatch shows up as: the user describes what they want to do correctly but performs the wrong action; the user expresses surprise at a result they didn't expect; the user tries the same incorrect path multiple times. These are signals, not user errors.

**Adapt vs. educate:** When a mental model mismatch is found, the team faces a choice: adapt the UI to match the user's model, or educate the user to adopt the system's model. Adapt is almost always cheaper and more effective. Educate only when: the user's model is genuinely unsafe (security misunderstanding), or adapting would require a complete architecture rethink with no viable path.

**Vocabulary alignment:** The words the UI uses should match the words users use to describe the task. In user research, note which terms participants use naturally. Replace system-internal vocabulary ("record," "entity," "object") with user vocabulary ("contact," "customer," "order") wherever possible.

### Error Prevention Over Recovery

The best error message is the one that never appears.

**Error taxonomy:** Errors are either slips (user knew the right action but executed incorrectly — typos, accidental clicks) or mistakes (user had incorrect understanding and took deliberate wrong action). Prevention strategies differ.

**Preventing slips:** Confirmation dialogs for destructive actions; undo for reversible ones (undo is almost always better than "Are you sure?"); auto-save to reduce the cost of navigation errors; input masks and format hints for structured fields.

**Preventing mistakes:** Clear labeling and terminology; progressive disclosure that limits the action space to relevant options; inline guidance at decision points; onboarding that builds correct mental models before users take consequential actions.

**When recovery is unavoidable:** Design recovery flows with the same care as happy paths. Error messages must: identify what went wrong (not "Error occurred"), explain why if useful, and give a specific next action ("Check your network connection and try again" not "Please try again").

---

## Full Coverage

### Flow Completeness Checklist

For every user flow in the design:

**Path coverage:**
- [ ] Happy path — user completes the task successfully with valid inputs
- [ ] Validation error path — user submits invalid input; error is specific and recoverable
- [ ] System error path — something fails server-side; user is informed and can retry or exit
- [ ] Empty state path — user arrives at a screen with no data; shown what to do next
- [ ] Permission / access error path — user lacks access; explained what to do (request access, contact admin)

**User type coverage:**
- [ ] First-time user (no prior context, may need onboarding hints)
- [ ] Returning user (familiar with the flow, wants speed)
- [ ] User resuming an interrupted task (partial completion, saved state)

**Edge cases:**
- [ ] Concurrent session (same user, two tabs)
- [ ] Long / unusual inputs (very long names, special characters, emoji)
- [ ] Slow network (loading states designed and tested)
- [ ] Session timeout mid-flow (work preserved or clearly communicated as lost)

### Usability Criteria Matrix

Define measurable success criteria per usability dimension before testing begins:

| Dimension | Definition | Target | Measurement Method |
|-----------|-----------|--------|-------------------|
| Learnability | First-time task completion rate | ≥ 80% without assistance | Moderated usability test, task 1 |
| Efficiency | Time on task for experienced users | Define per task (e.g., < 90s) | Moderated test, repeated task |
| Memorability | Task completion after 2-week gap | ≥ 70% without re-learning | Longitudinal study or diary study |
| Error rate | Tasks completed without error | ≥ 75% error-free completion | Task observation |
| Satisfaction | Perceived ease of use | SUS score ≥ 68 (above average) | Post-test SUS questionnaire |

Set targets before testing — don't define "success" after seeing results.
```

---

### `ux-researcher.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### Research Methodology Selection

The right method depends on what you're trying to learn, not on what's familiar or convenient.

**Qual vs. quant decision tree:**

- Need to know *what* is happening or *how often*? → Quantitative (analytics, surveys with representative samples, A/B tests)
- Need to know *why* it's happening or *how* users think about it? → Qualitative (interviews, usability tests, diary studies, contextual inquiry)
- Need to validate that a solution works before building? → Qualitative (usability test on prototype)
- Need to measure whether a shipped change worked? → Quantitative (A/B test, analytics change detection)

**Method-to-question mapping:**

| Research Question | Best Method | Minimum Sample |
|-------------------|------------|----------------|
| What are users' main pain points? | Semi-structured interviews | 5–8 (per segment) |
| Can users complete this task? | Moderated usability test | 5 per design variant |
| What do users do in real context? | Contextual inquiry / diary study | 5–10 |
| How widespread is this behavior? | Survey (quantitative) | 100+ (for ±10% margin) |
| Which version performs better? | A/B test | Calculate via MDE formula |
| What do users think of this concept? | Concept test / desirability study | 8–12 |

**When to use multiple methods:** Triangulation — using 2–3 methods to answer the same question — increases confidence. An interview reveals the why; an analytics pull confirms the how often. Don't rely on a single method for a high-stakes decision.

### Recruiting and Screener Design

A study with the wrong participants produces wrong conclusions. Recruiting quality is a research quality issue.

**Screener question design:** Screeners should identify participants, not train them. Avoid leading questions ("Do you frequently shop online?") — bias towards yes. Use behavioral questions ("How often did you make an online purchase in the last 30 days? — Never / 1–2 times / 3–5 times / More than 5 times") and set your qualification criteria based on the response.

**Sample size reasoning:** For qualitative studies, 5–8 participants per distinct user segment is typically sufficient to identify major themes (Nielsen's law of diminishing returns). For quantitative studies, calculate required sample size from: desired confidence level (typically 95%), margin of error, and expected effect size. Don't arbitrarily pick "we'll do 20 interviews."

**Bias mitigation:** Recruit from multiple acquisition channels — users recruited only from your most-engaged customer list will over-represent enthusiasts. Include non-users or churned users when studying retention or adoption problems. Blind participants to the company behind the study when testing against competitors.

### Synthesis-to-Recommendation Pipeline

Raw research data is not insight. The pipeline from data to design recommendation requires active synthesis.

**Step 1 — Data organization:** Immediately after sessions, dump observations, quotes, and behavioral notes into a synthesis workspace (Miro board, FigJam, Dovetail). Don't let raw notes sit for more than 24 hours — detail fades.

**Step 2 — Affinity mapping:** Cluster observations thematically. Don't start with predetermined categories — let themes emerge from the data. Each cluster becomes a candidate theme.

**Step 3 — Theme to insight:** A theme is a pattern ("users frequently clicked the wrong button"). An insight is what that pattern means ("users expected the primary action to be on the left, not the right, based on their web browsing mental model"). Don't stop at themes.

**Step 4 — Insight to design implication:** Each insight should map to a specific design implication ("Move the primary action to the left side of the button group" or "Run a preference test to confirm which side users expect"). Vague implications ("improve the layout") are not actionable.

**Step 5 — Prioritization:** Not all insights are equal. Prioritize by: frequency (how many participants showed this?), severity (does it cause task failure?), and business relevance (does it affect the metric we care about?).

---

## Full Coverage

### Research Plan Completeness Checklist

Before beginning fieldwork, every item must be defined:

**Scope:**
- [ ] Research objectives stated (what decisions will this research inform?)
- [ ] Research questions listed (2–5 specific questions the study will answer)
- [ ] Out of scope explicitly noted (prevents scope creep during analysis)

**Methodology:**
- [ ] Method selected and rationale documented
- [ ] Session format defined (moderated/unmoderated, remote/in-person, length)
- [ ] Session guide / survey / tasks drafted and piloted with 1 internal participant

**Participants:**
- [ ] Target participant profile defined (behaviors, attributes, exclusions)
- [ ] Sample size reasoned and documented
- [ ] Screener written and reviewed
- [ ] Recruiting channel and timeline confirmed
- [ ] Incentive type and value determined

**Analysis:**
- [ ] Analysis approach defined (thematic analysis, affinity mapping, task success rate, etc.)
- [ ] Who will analyze (solo or team synthesis session?)
- [ ] Deliverable format defined (slide deck, Notion doc, Dovetail report)

**Logistics:**
- [ ] Recording consent process confirmed
- [ ] Tools set up and tested (Zoom, UserTesting, Lookback, etc.)
- [ ] Observers briefed on protocol (camera off, questions in chat only, etc.)

### Findings Report Completeness

A findings report is only useful if it drives decisions. Check all elements are present:

- [ ] **Background** — why this research was done, what decisions it informs
- [ ] **Methodology** — method, sample size, recruitment approach, dates conducted
- [ ] **Participant overview** — anonymized profiles (not PII) of who participated
- [ ] **Key findings** — 3–7 numbered insights, each with a descriptive title
- [ ] **Supporting evidence** — quotes, video clips, or data for each finding (not just claims)
- [ ] **Design implications** — specific, actionable recommendation per finding
- [ ] **Severity / priority** — which findings are highest impact?
- [ ] **Open questions** — what this study didn't answer; recommended follow-up
- [ ] **Appendix** — full session guide, screener, raw data location
```

---

### `video-content-producer.md`

**Placement:** Before `## Reference-Sourced Insights`

```markdown
## Advanced Patterns

### Pre-Production-to-Post Workflow

Video produced without a pre-production process wastes shoot time and compounds in the edit. Every stage has a gate.

**Stage 1 — Brief (gate: approved brief):** Capture: objective, audience, platform, format, length, tone, key message, call to action, success metric. Don't shoot without an approved brief. Brief changes after shoot = expensive reshoots.

**Stage 2 — Script (gate: approved script):** Write audio-first. Script should be read aloud at the intended pace to time it. Reviewers approve before storyboarding begins. Scripts that feel good on paper often feel awkward spoken — read every draft aloud.

**Stage 3 — Storyboard / shot list (gate: approved storyboard):** Map every scene to the script line. Include: shot type (wide / medium / close-up / B-roll), camera movement (static / pan / handheld), and any required text overlay zones. The shot list is the shoot day checklist.

**Stage 4 — Shoot (gate: footage review same day):** Review all footage on the day it's shot. Confirm you have clean takes for every required shot. Don't leave a location assuming "it'll be fine in the edit" — cutaways and B-roll are cheap to shoot but expensive to recreate.

**Stage 5 — Edit (gate: rough cut approval before fine cut):** Present the rough cut (structure and timing locked, no color grade, no music mix) for story approval before investing in fine cut polish. One round of rough cut notes is cheaper than three rounds of fine cut revisions.

**Stage 6 — Review and delivery (gate: client/stakeholder sign-off before export):** Final review against the original brief, not personal preference. Export per the platform delivery matrix.

### Platform Encoding and Delivery Matrix

Export settings are not optional details — wrong encoding causes quality loss, upload failures, or platform rejections.

| Platform | Recommended Format | Resolution | Frame Rate | Audio | Max Length | Captions |
|----------|-------------------|-----------|-----------|-------|------------|---------|
| YouTube | MP4 (H.264) | 1920×1080 | 24/30fps | AAC, 320kbps | Unlimited | SRT or YouTube auto |
| Instagram Reels | MP4 (H.264) | 1080×1920 | 30fps | AAC, 128kbps+ | 90 sec (feed Reels) | Hardcoded or SRT |
| Instagram Feed (video) | MP4 (H.264) | 1080×1080 or 1080×1350 | 30fps | AAC | 60 sec | Hardcoded preferred |
| TikTok | MP4 (H.264) | 1080×1920 | 30fps | AAC | 10 min | Auto + manual review |
| LinkedIn | MP4 (H.264) | 1920×1080 | 30fps | AAC | 10 min | SRT required |
| Twitter/X | MP4 (H.264) | 1280×720 | 30fps | AAC | 2 min 20 sec | SRT preferred |

**Thumbnail requirements:** Every video needs a custom thumbnail. Design at 1280×720px minimum. Thumbnail must be readable at 120px wide (how it appears in search results). Use consistent thumbnail design system per channel.

### Interview and Talking-Head Production

Poor audio kills a video that looks beautiful. Poor framing makes a credible speaker look amateur. Invest in these elements before investing in camera gear.

**Audio (highest impact):** A mid-range lapel or directional microphone dramatically outperforms any built-in camera or laptop mic. Record a test clip and listen through headphones before the session starts. Room acoustic treatment: avoid spaces with hard parallel walls (echo). If outdoors, use a windscreen. Rule: if the audio is bad, don't use the take.

**Lighting (three-point setup):** Key light (45° to subject, slightly above eye level) → Fill light (opposite side, 50–70% intensity of key, reduces harsh shadows) → Backlight / rim light (behind subject, separates them from background, adds depth). Natural window light can serve as key light — position the subject facing the window, not with the window behind them.

**Background selection:** The background should be clean, uncluttered, and subtly on-brand (brand color in the background, branded item in the frame). Avoid busy bookshelves or open-plan offices — they draw the eye. Virtual backgrounds are acceptable for internal comms; avoid for external brand content.

**On-camera coaching:** Most non-presenters look at the camera lens, not the interviewer — coach participants to maintain eye contact with the lens for direct-to-camera pieces. Keep takes short (one thought per take) to reduce fatigue and simplify editing. Pause before and after each statement — this gives the editor clean cut points.

---

## Full Coverage

### Production Quality Checklist

Run before publishing any video:

**Audio:**
- [ ] No background noise or hum in dialogue sections
- [ ] Consistent audio levels throughout (peaks around -6dBFS, no clipping)
- [ ] Music / SFX balanced against dialogue (dialogue intelligible throughout)
- [ ] Clean start and end (no mic noise, chair scrape, or "action" audible)

**Visual:**
- [ ] Color grade applied consistently across all footage
- [ ] No jump cuts without intentional B-roll coverage
- [ ] Text overlays readable at intended display size
- [ ] Logo / watermark placement correct per brand guidelines
- [ ] Safe zones respected for mobile viewing (no critical content in bottom 20%)

**Captions:**
- [ ] Captions generated and reviewed for accuracy (auto-captions always have errors)
- [ ] Caption timing synced to speech
- [ ] Caption style matches brand guidelines (font, color, placement)
- [ ] Captions enabled by default on platform where possible

**Technical:**
- [ ] Exported at correct specs per platform (see matrix above)
- [ ] File size within platform limits
- [ ] Thumbnail designed and uploaded
- [ ] Metadata complete (title, description, tags) before scheduling

### Content Coverage Matrix

Track content produced vs. gaps per quarter:

| Content Type | LinkedIn | Instagram | YouTube | TikTok | Notes |
|-------------|---------|-----------|---------|--------|-------|
| Awareness / brand storytelling | | | | | |
| Educational / how-to | | | | | |
| Testimonial / social proof | | | | | |
| Product demo / feature highlight | | | | | |
| Behind-the-scenes / culture | | | | | |
| Campaign / promotional | | | | | |

Mark each cell: ✓ produced this quarter / — not applicable / ⚠ gap to fill. Review monthly with Social Media Strategist.
```

---

## Version Bump

### v3.16.0 (3.15.0 → 3.16.0)

| File | Change |
|------|--------|
| `.claude-plugin/plugin.json` | `3.15.0` → `3.16.0` |
| `.claude-plugin/marketplace.json` | `3.15.0` → `3.16.0` |
| `meta/stats.json` | `{"version":"3.16.0","roles":23,"commands":46,"knowledge_lines":13200,"reference_files":29}` |
| `CHANGELOG.md` | Prepend `## [3.16.0] — 2026-03-17` entry |
| `README.md` | Inline version references |
| `docs/plugin-directory-submission.md` | version → 3.16.0 |
| `MCP-SETUP.md` | version → 3.16.0 |
| `CONTRIBUTING.md` | version → 3.16.0 |

CHANGELOG entry:
```markdown
## [3.16.0] — 2026-03-17

Wing Completion Pass 3 — adds ## Advanced Patterns + ## Full Coverage to 5 role
reference files; adds ## Reference-Sourced Insights to deployment.md.

### Added
- `## Advanced Patterns` + `## Full Coverage` to: content-designer, deployment,
  figma-workflow, product-designer, social-media-designer
- `## Reference-Sourced Insights` to: deployment

### Updated
- `meta/stats.json` — knowledge_lines ~12,500 → ~13,200

---
```

### v3.17.0 (3.16.0 → 3.17.0)

| File | Change |
|------|--------|
| `.claude-plugin/plugin.json` | `3.16.0` → `3.17.0` |
| `.claude-plugin/marketplace.json` | `3.16.0` → `3.17.0` |
| `meta/stats.json` | `{"version":"3.17.0","roles":23,"commands":46,"knowledge_lines":13700,"reference_files":29}` |
| `CHANGELOG.md` | Prepend `## [3.17.0] — 2026-03-17` entry |
| `README.md` | Inline version references |
| `docs/plugin-directory-submission.md` | version → 3.17.0 |
| `MCP-SETUP.md` | version → 3.17.0 |
| `CONTRIBUTING.md` | version → 3.17.0 |

CHANGELOG entry:
```markdown
## [3.17.0] — 2026-03-17

Wing Completion Pass 4 — adds ## Advanced Patterns + ## Full Coverage to the
final 4 role reference files. All 23 role files now have full section coverage.

### Added
- `## Advanced Patterns` + `## Full Coverage` to: ui-designer, ux-designer,
  ux-researcher, video-content-producer

### Updated
- `meta/stats.json` — knowledge_lines ~13,200 → ~13,700

---
```

---

## Task Execution Order

### v3.16.0
1. **Tasks 1–5 (parallel):** Add sections to each of the 5 files (content-designer, deployment, figma-workflow, product-designer, social-media-designer). For deployment: use Firecrawl to fetch Reference-Sourced Insights sources before writing that section.
2. **Task 6 (sequential, after 1–5):** Version bump

### v3.17.0
1. **Tasks 1–4 (parallel):** Add sections to each of the 4 files (ui-designer, ux-designer, ux-researcher, video-content-producer)
2. **Task 5 (sequential, after 1–4):** Version bump

---

## Constraints & Conventions

- Section placement: immediately before `## Reference-Sourced Insights` if present; end-of-file for `deployment.md`
- Advanced Patterns: 3–5 `###` subsections, 25–85 lines total
- Full Coverage: 2–3 subsections with checklists/matrices, 25–50 lines total
- deployment.md Reference-Sourced Insights: Firecrawl-sourced, distilled and paraphrased, cited with `> Source: [url] — accessed 2026-03-17`
- No new commands, evals, smoke fixtures, or SKILL.md changes in either release
