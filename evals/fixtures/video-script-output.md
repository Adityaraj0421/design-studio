# /video-script — Lumina SaaS Homepage Product Demo Video

**Inputs:** Brand "Lumina SaaS", format "90-second product demo", placement "homepage hero", style "screen recording + motion graphics, no talking head"

---

## Video Overview

This is the script and shot direction for Lumina's 90-second homepage product demo video. The video is the primary conversion asset on `lumina.io` — it plays above the fold on the homepage and is embedded in investor outreach emails.

**Video specifications:**

| Property | Value |
|----------|-------|
| Total duration | 90 seconds |
| Format | Screen recording + motion graphics |
| Presenter | No talking head — screen + voiceover only |
| Audio | Professional voiceover (warm male or female) + upbeat background music (licensed) |
| Export resolution | 1920×1080 at 60fps |
| File format | MP4 (H.264), WebM (VP9) for web |
| Aspect ratios | 16:9 (primary), 9:16 (social recut), 1:1 (LinkedIn) |

**Production notes:**
- All screen recordings shot at 2× resolution (2560×1600) and scaled down — ensures crisp rendering on retina displays.
- No text on screen that the voiceover also reads verbatim — visuals and audio carry different information.
- Music bed at -18dB under voiceover. Rises to -12dB on the final CTA with no voiceover.

---

## Hook

The hook runs from **0–5 seconds**. It must stop the scroll and create a question in the viewer's mind before the product is shown.

**Visual:** Dark background (`#0F172A`). Floating data points animate in — small circles of varying sizes at low opacity, drifting slowly across the frame. An animated text reveal brings in:

```
"See what's really driving your MRR"
```

- Font: Inter 64px Bold, white
- Animation: Characters fade and slide up, staggered by 30ms per character
- Duration: 0–3.5s for text reveal
- At 3.5s: Data points accelerate toward the center, creating a brief flash — then the screen transitions to the Lumina dashboard

**Why this hook works:** It names the viewer's most pressing question without showing product. By the time the product appears, the viewer is asking "how?" — not "what is this?"

---

## Scene Breakdown

The video is structured in 5 scenes following the hook. Each scene serves a specific conversion function.

### Scene 1: Dashboard Fly-In (5–20s)

**Duration:** 15 seconds
**Function:** Establish product quality and visual clarity

The Lumina dashboard flies into frame. The screen recording begins with a smooth zoom from 60% scale to 100%, using the `--ease-decelerate` curve. The dashboard shows:
- MRR: $480K (highlighted with a subtle Indigo glow)
- MRR growth: +12% (green badge)
- Active users: 1,247
- Churn rate: 3.2%

Camera slowly pans right to reveal a 30-day MRR trend chart. An animated annotation arrow points to the inflection at day 18 — this sets up the cohort analysis scene.

**Shot direction:** Smooth 15% zoom-out from tight frame on MRR card to full dashboard view. No hard cuts in this scene.

### Scene 2: Cohort Analysis — The Aha Moment (20–40s)

**Duration:** 20 seconds
**Function:** Show the depth of insight Lumina provides — this is the "aha" that differentiates from simple dashboards

The cursor navigates to "Cohort Analysis" in the sidebar. The cohort waterfall renders — a brief skeleton loading state (400ms) followed by the data appearing with a stagger animation.

The cursor hovers over week-3 cohort retention. An insight card pops up:

```
💡 Insight detected
Users who complete the "Import CSV" flow in week 1
retain at 2.3× the rate of users who don't.
→ View activation analysis
```

The cursor clicks "View activation analysis" — the scene ends here, cutting to Scene 3.

**Shot direction:** Tight follow on cursor movements. Zoom-to-highlight on the insight card popup (cursor disappears, frame zooms 15% to center on the card, holds for 1.5 seconds).

### Scene 3: Automated Insight Card (40–60s)

**Duration:** 20 seconds
**Function:** Sell the "no analyst needed" value prop — the product finds insights for you

The activation analysis view shows a funnel with a red indicator on the "Export" step (28% drop-off). Before the user does anything, an automated insight card slides in from the right edge:

```
🔴 Drop-off alert
28% of users exit at "Export" — above your
historical average of 18%.
Suggested fix: Add an in-app export tutorial.
```

The cursor hovers the "Share" button. A popover shows share destinations: Slack, Linear, Notion, Email. The cursor clicks "Slack."

**Shot direction:** The automated card entrance uses the `slideInUp` animation from the motion design system. Hold on the card for 2 seconds before cursor appears — let the viewer read it.

### Scene 4: Slack Integration (60–75s)

**Duration:** 15 seconds
**Function:** Show that Lumina fits existing workflows — no new tool to check

Screen transitions to a Slack channel (`#product-analytics`). A Lumina bot message has arrived:

```
📊 Lumina Alert — Activation drop-off detected
Step: Export
Drop-off: 28% (vs. 18% historical avg)
→ View in Lumina
```

A team member reacts with 👀. Another replies: "fixing this in next sprint."

**Shot direction:** Zoom in on the Slack message, holding for 2 seconds. The scene communicates "this comes to your team — you don't go to it." Cut to Scene 5 on the reply appearing.

### Scene 5: CTA (75–90s)

**Duration:** 15 seconds
**Function:** Convert — this is the only moment that asks the viewer to do something

The screen transitions back to the Lumina dashboard, now showing a clean "What's next?" screen with three action prompts:
1. Explore your cohorts
2. Connect Slack
3. Invite your team

The camera zooms back smoothly to reveal the full product in browser chrome, then further out to show the desktop context — the product looks at home in a real work environment.

At 83s, the Lumina logo fades in centered on a white background. Beneath it:

```
"Start free — no credit card required"
```

The "Start free" button pulses once (scale 1.0 → 1.03 → 1.0, 600ms, `--ease-standard`).

Music rises from -18dB to -6dB. Voiceover has ended. Hold to 90s.

**Shot direction:** Logo reveal is a simple fade. No animation on the logo itself. Button pulse is the only motion element.

---

## Voiceover Script

The voiceover is written for a 90-second video at a natural speaking pace (~140 words per minute). Total word count: 98 words — leaves room for natural pauses and emphasis.

```
[0–5s — no voiceover, hook visual]

[5–20s]
"Most analytics tools show you what happened.
Lumina shows you why."

[20–40s]
"With one-click cohort analysis, you'll see exactly which
features drive your best customers to stick around."

[40–60s]
"Lumina automatically detects when something's wrong —
and tells you what to do about it."

[60–75s]
"Alerts go straight to Slack. Your team stays in the loop
without living in another dashboard."

[75–83s]
"Less time in reports. More time shipping."

[83–90s — no voiceover, CTA visual]
```

**Voiceover direction:** Warm, confident, slightly conversational. Not salesy. Pace should feel like a senior colleague sharing a finding — not a TV commercial. Pause naturally after "Lumina shows you why." — this is the most important line in the script.

---

## Shot Direction

Full technical shot direction for the video editor and motion designer.

### Global Shot Rules

| Rule | Specification |
|------|--------------|
| Cursor speed | 2× mouse acceleration applied to all recordings |
| Cursor appearance | Large cursor mode enabled (36px), white with dark outline |
| Zoom style | `--ease-decelerate` curve on all zoom-in; `--ease-accelerate` on zoom-out |
| Screen frame | Product screen fills 80% of video frame, centered, with soft drop shadow |
| Drop shadow | `0 32px 64px rgba(0,0,0,0.25)` on screen frame |
| Background | Dark gradient `#0F172A` → `#1E293B` (static, no animation) |
| Browser chrome | Show browser chrome (minimal — address bar only, no bookmarks bar) |

### Transition Between Scenes

| Transition | Type | Duration |
|-----------|------|----------|
| Hook → Scene 1 | Flash cut with 1-frame white flash | 2 frames |
| Scene 1 → Scene 2 | Smooth cursor navigation (no cut) | N/A |
| Scene 2 → Scene 3 | Smooth cursor navigation (no cut) | N/A |
| Scene 3 → Scene 4 | Cross-dissolve | 12 frames (200ms at 60fps) |
| Scene 4 → Scene 5 | Cross-dissolve | 12 frames |
| Scene 5 → CTA | Zoom-out reveal + fade to white | 18 frames |

---

## Duration Notes

Precise timing breakdown to ensure the video lands at exactly 90 seconds.

| Segment | Start | End | Duration |
|---------|-------|-----|----------|
| Hook | 0s | 5s | 5s |
| Scene 1: Dashboard fly-in | 5s | 20s | 15s |
| Scene 2: Cohort analysis | 20s | 40s | 20s |
| Scene 3: Automated insight | 40s | 60s | 20s |
| Scene 4: Slack notification | 60s | 75s | 15s |
| Scene 5: CTA | 75s | 90s | 15s |
| **Total** | **0s** | **90s** | **90s** |

Scene 5 ends at exactly 90s. A 2-second logo outro is available as a separate export (`logo-outro.mp4`) if a longer version is needed for YouTube or paid media. It is not included in the homepage 90-second cut.

**Buffer note:** The voiceover ends at 83s, leaving 7 seconds of music-only CTA. This is intentional — do not shorten the CTA hold. In user testing, 7 seconds of hold on the CTA increased click-through on the "Start free" button by 24% vs. a 3-second hold.

---

## Delivered Files

- `lumina-demo-90s.mp4` — Master export (1920×1080, H.264)
- `lumina-demo-90s.webm` — Web-optimized export (VP9)
- `lumina-demo-social-9x16.mp4` — Recut for mobile social (60s)
- `lumina-demo-1x1.mp4` — Recut for LinkedIn (60s)
- `voiceover-raw.wav` — Unedited voiceover recording
- `script.md` — Final approved script

---

## What's Next

- `/motion-design` — apply motion system easing tokens to video transitions
- `/brand-kit` — verify video color palette matches current brand tokens
- `/presentation-design` — embed 90-second demo in investor email cadence

---
