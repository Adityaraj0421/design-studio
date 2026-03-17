# /design-ar-overlay — Product Assembly Instructions

**Arguments:** instructions ARKit

---

## Section 1: Anchor Strategy

**Recommended anchor type: Object Anchor (ARKit Object Scanning)**

| Anchor Type | Use Case | Fit for This Use Case |
|---|---|---|
| **Object Anchor** ✅ | Anchoring to a specific physical product | ✅ Best — anchors to the scanned 3D model of the product |
| **Image Anchor** | Anchoring to a printed QR code or marker | ✓ Fallback — use if object scanning unavailable |
| **Plane Anchor** | Anchoring to horizontal/vertical surface | ✗ Too generic — instructions would float on the table, not on the product |
| **World Anchor** | Fixed position in space | ✗ Not appropriate — product may be moved or rotated |

**Anchor strategy:**
1. Scan the product model at initialization — prompt user to hold device steady and rotate around the product
2. Once anchor established, all instruction cards are placed relative to the product's coordinate space, not world space
3. If tracking is lost (rapid movement, occlusion): display "Scanning…" overlay; do not hide instructions abruptly — fade to 50% opacity during reacquisition, then restore

**Fallback hierarchy:**
- Object anchor not available → image anchor (print QR label, include in packaging)
- Image anchor not visible → world anchor placed at last known product position + warning banner

---

## Section 2: World Tracking UI

Three tracking states — each with distinct visual treatment:

### State: Searching
```
[Full-screen dimmed overlay: 40% black]
[Centered panel — white card, 320px wide]
┌──────────────────────────────┐
│  🔍  Finding your product    │
│  Point your camera at the    │
│  [Product Name]              │
│                              │
│  ████████░░░░  Scanning...   │
└──────────────────────────────┘
```
- Animate scanning progress indicator (indeterminate)
- Show animated outlines sweeping across camera view to communicate "active scanning"
- Camera passthrough remains visible — do not black out the view

### State: Found (Tracking Active)
```
[Anchor confirmed — product outline flashes green for 500ms]
[Instruction cards appear: fade in over 300ms, ease-out]
[Tracking indicator: small green dot in top-right of instruction panel]
```
- Product silhouette briefly highlighted in brand primary color on recognition
- Earcon: single ascending chime (150ms) on successful anchor
- Instruction panel appears above the tracked object — positioned in scene space so it moves with the product

### State: Tracking Lost
```
[Instruction cards fade to 50% opacity]
[Top-of-panel banner: amber background]
┌─────────────────────────────────┐
│  ⚠️  Keep product in view      │
└─────────────────────────────────┘
[Auto-recovers when product re-enters frame]
```
- Do not dismiss instructions on tracking loss — user may be mid-step
- If tracking lost for >5s: show "Tap to restart scan" button below the amber banner
- On recovery: fade instructions back to full opacity over 200ms

---

## Section 3: Instruction Card Patterns

**Instruction card anatomy:**

```
┌──────────────────────────────────────┐
│  STEP 3 OF 8  ●●●○○○○○              │
├──────────────────────────────────────┤
│                                      │
│  [Component illustration or photo]   │
│                                      │
├──────────────────────────────────────┤
│  Attach the bracket to the           │
│  mounting plate using the M4 bolts.  │
│  Tighten to hand-tight only.         │
│                                      │
│  ⚠️  Do not overtighten             │
├──────────────────────────────────────┤
│  ◀ Previous        Next ▶           │
└──────────────────────────────────────┘
```

**Card positioning:**
- Place card above the tracked object in scene space, within the user's comfortable vertical gaze range (±20° from eye level)
- Card faces toward the camera at all times (billboard behavior) — use `BillboardComponent` in RealityKit
- Minimum distance from surface: 15cm (prevents card from intersecting the physical object)
- If multiple assembly points on same object: show numbered hotspot dots on the product; tapping a dot expands that card

**Card dimensions:**
- Width: 300–360pt (physical)
- Height: auto (content-driven, max 480pt)
- Corner radius: 16pt
- Background: white at 90% opacity (allows product to show through subtly)
- Shadow: 0 8pt 24pt rgba(0,0,0,0.15) — depth cue

---

## Section 4: Scan State Designs

Full scan state sequence for onboarding a new product object:

| Phase | Duration | Visual | Instruction copy |
|---|---|---|---|
| **Initialize** | 0–2s | Camera view, no overlay | "Point at your [Product Name]" |
| **Detecting** | 2–8s | Animated point cloud on detected surfaces | "Move slowly around the product" |
| **Recognizing** | 8–15s | Progress ring filling | "Almost there — keep going" |
| **Confirmed** | ~15s | Green outline flash + success earcon | "Product found! Your instructions are ready." |
| **Failed (timeout)** | >20s | Amber banner | "Couldn't find it. Try better lighting or tap to use the marker instead." |

**Lighting guidance prompt:**
If scan fails on first attempt, show an inline tip: "Good lighting helps — try near a window or turn on a lamp."

---

## Section 5: Confirmation Overlays

Required before any irreversible action (marking a step complete, resetting progress, submitting completion):

```
[Semi-transparent full-screen dimmer: 50% black]
┌─────────────────────────────────┐
│                                 │
│   Mark Step 3 as complete?      │
│                                 │
│   You won't be able to undo     │
│   this without restarting.      │
│                                 │
│   [Cancel]        [Confirm ✓]  │
└─────────────────────────────────┘
```

**Overlay specs:**
- Width: 320pt; Corner radius: 20pt; Background: white
- Primary action (Confirm): brand accent fill, 44pt height, full-width
- Secondary action (Cancel): ghost button, brand accent border
- Dimmer behind overlay: tap to dismiss = Cancel action
- Haptic feedback on Confirm: `.impact(.medium)` (ARKit/RealityKit)

---

## Section 6: Occlusion Handling

**Physical occlusion (hand or arm covers instruction card):**
- Use ARKit's people occlusion (`ARWorldTrackingConfiguration.frameSemantics = .personSegmentation`) — instruction card naturally appears behind the user's arm
- Do not fight occlusion — it is physically correct and expected behavior
- If card is occluded for >3s: auto-reposition card 30pt in the opposite direction of detected occlusion

**Object occlusion (product blocks part of the card):**
- Cards are positioned above the product to minimize overlap
- If the assembly point requires viewing the underside: provide a "Flip view" button that repositions the card to 0.5m in front of the user at eye level (decoupled from the product anchor)

**Depth conflict with nearby objects:**
- RealityKit handles z-fighting for registered anchors automatically
- For world-anchored fallback: add 5cm z-offset from surface to prevent clipping
