# /design-spatial — Lumina Analytics visionOS

**Arguments:** productivity visionOS "Lumina Analytics dashboard"

---

## Section 1: Window Type Selection

**Recommended primary window type: Window (bounded)**

| Window Type | Recommended Use | Rationale |
|---|---|---|
| **Window** ✅ | Main dashboard, data views, settings | Familiar frame; user can reposition; scales to content |
| **Volume** | 3D KPI chart (optional enhancement) | Appropriate for 3D bar/scatter charts; avoid for tables |
| **Immersive Space** | Not recommended for productivity app | Immersive spaces replace the physical environment — not appropriate for a data tool users need to reference alongside physical work |

**Rationale for Window:** A productivity analytics tool is used alongside physical work — the user needs to see their desk, keyboard, and other windows. Bounded windows respect the user's environment and allow repositioning to comfortable working depth.

---

## Section 2: Depth Hierarchy Document

**4-Layer Depth System for Lumina Analytics**

| Layer | Depth Range | Content | Recommended Text Size |
|---|---|---|---|
| **Background** | 2–4m | Ambient context, non-interactive decorations, background charts | 44pt × 2.5m ≈ 110pt |
| **Content** | 1–2m | Main dashboard window, data tables, chart panels | 44pt × 1.5m ≈ 66pt |
| **Foreground** | 0.5–1m | Active selection, focused card, inline tooltip | 44pt × 0.75m ≈ 33pt minimum |
| **Overlay** | < 0.5m | Modal confirmations, alert dialogs | 44pt × 0.4m ≈ 18pt (physical 44pt) |

**Size formula:** `recommended_size = 44pt × distance_in_meters`

Minimum angular size ≈ recommended × 0.82. Never place interactive elements beyond 5m — legibility and pointing accuracy degrade significantly beyond this distance.

**Depth rule:** Place the main window at 1.5–2m from the user's head pose origin. Never force content closer than 0.5m — this causes eye strain and vergence-accommodation conflict.

---

## Section 3: Ornament Placement Spec

Ornaments are secondary UI elements that attach to the main window frame and present supporting controls outside the main content area.

**Ornament use cases for Lumina Analytics:**
- **Filter control panel** — date range, metric selection
- **Quick action bar** — export, share, refresh
- **Legend panel** — chart series labels and toggles

**Placement guidance:**
- Position ornaments using `attachmentAnchor` on the ornament view and `contentAnchor` on the parent window — the system handles z-separation and depth positioning automatically
- Do not hard-code point offsets — anchor-based placement adapts to window repositioning and user movement
- Ornaments should remain within arm's reach of the parent window; avoid placing ornaments more than 30° from the center of the main window's facing direction
- Keep ornaments below or to the side of the main window; ornaments above the window create neck strain

**Example attachment (SwiftUI):**
```swift
RealityView { ... }
  .ornament(
    visibility: .visible,
    attachmentAnchor: .scene(.bottom),
    contentAlignment: .top
  ) {
    FilterControlPanel()
  }
```

---

## Section 4: Spatial Typography Scale

| Role | Recommended Size | Minimum Size | Notes |
|---|---|---|---|
| Window title | 22pt | 18pt | System title bar — follow HIG defaults |
| Section header | 20pt | 16pt | |
| Data label / metric | 18pt | 15pt | High-frequency scan target |
| Body copy | 17pt | 14pt | SwiftUI default body |
| Caption / axis label | 13pt | 11pt | Use only for secondary data |
| KPI headline | 36–48pt | 30pt | Large display number |

**Dynamic Type:**
```swift
Text("Revenue").font(.headline)  // respects user's type size preference
Text("$42,500").font(.largeTitle)
  .dynamicTypeSize(.xSmall ... .accessibility2)  // cap at accessibility2 to prevent layout breakage
```

All text must use Dynamic Type — do not set fixed `pt` values in production. The system scales based on the user's preferred size, viewing distance, and headset calibration.

---

## Section 5: Interaction Model

**Primary input method: Look + Pinch (visionOS standard)**

| Input | Action | Use |
|---|---|---|
| Look + Pinch | Primary tap — select, activate | Buttons, cards, table rows |
| Look + Pinch-drag | Scroll, resize | Table scroll, window resize handle |
| Two-handed pinch | Zoom | Chart zoom in/out |
| Indirect touch | Tap on surface near the window | Familiar touchpad-style for users in seated position |
| Voice | Quick commands | "Show last 7 days," "Export to PDF" |

**Hover feedback:**
- All interactive elements respond to gaze hover with a subtle highlight (system-provided `hoverEffect`)
- Do not build custom hover effects — the system effect is calibrated for visionOS input precision
- Minimum interactive target: 44×44pt physical (at content layer depth)

---

## Section 6: Comfort Guidelines Checklist

- [ ] Main window placed at 1.5–2m depth from head pose origin
- [ ] No interactive content closer than 0.5m (vergence-accommodation conflict zone)
- [ ] Session designed for ≤20 minute continuous use; include natural break points
- [ ] No persistent UI requiring upward gaze above 35° — causes neck fatigue
- [ ] Ornaments within 30° horizontal arc of main window
- [ ] Chart animations: ≤400ms, ease-in-out; no looping animations in peripheral view
- [ ] All colors tested in simulated passthrough lighting conditions
- [ ] Dynamic Type enabled — no fixed font sizes in production
- [ ] Reduced Motion respected: `@Environment(\.accessibilityReduceMotion)` checked before all animations
- [ ] Window has visible close/minimize affordance (system chrome — do not hide)
