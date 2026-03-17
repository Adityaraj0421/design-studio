# /design-voice-ui — Smart Home Control

**Arguments:** smart-home-control custom hybrid

---

## Section 1: Interaction Flow Diagrams

### Success Flow (intent recognized, action completes)
```
User: "Hey Lumina"
  └─→ SYSTEM: Wake word detected
       └─→ [Earcon: single ascending chime 150ms] + [Listening indicator active]
            └─→ User: "Turn off the living room lights"
                 └─→ SYSTEM: Intent recognized — lights.off (confidence 0.93)
                      └─→ [Processing indicator]
                           └─→ BOT: "Living room lights off."
                                └─→ [Earcon: ascending 2-tone 200ms] + [Screen update: room state → off]
                                     └─→ [END or await follow-up]
```

### Disambiguation Flow (multiple valid responses match)
```
User: "Turn off the lights"
  └─→ SYSTEM: Disambiguation triggered — "living room" vs "bedroom" within 12% confidence
       └─→ BOT: "Which lights — living room or bedroom?"
            └─→ [2 options only]
                 ├─→ User: "Living room" → [proceed with lights.off, zone=living_room]
                 └─→ User: still ambiguous → FALLBACK_1 (not a second disambiguation)
```

### Not-Understood Flow (3-strike model)
```
User: [utterance — intent not recognized]
  └─→ FALLBACK_1: "I didn't catch that. You can say things like
                   'Turn off the lights,' 'Set the thermostat to 70,' or 'Lock the front door.'"
       └─→ User: [still unrecognized]
            └─→ FALLBACK_2: "Let me try a different approach — I can help with
                             lighting, temperature, and security. Which sounds closest?"
                 └─→ User: [third failure]
                      └─→ ESCALATION: "I'm having trouble — try the app for full controls."
                           └─→ [Graceful exit]
```

### Error Flow (service failure → graceful exit)
```
SYSTEM: [lights.off API call fails — hub offline]
  └─→ [Earcon: descending 2-tone 300ms]
       └─→ BOT: "Something went wrong on my end — it's not you.
                 Want me to try again?"
            ├─→ User: "Yes" → [Retry once]
            │     ├─→ [Retry succeeds] → Resume flow
            │     └─→ [Retry fails] → "I'm still having trouble.
            │                          Your hub may be offline — try the Lumina app."
            └─→ User: "No" / silence after 8s → "Okay — just say 'Hey Lumina' anytime."
```

**No-input handling (silence during expected response):**

| Silence duration | Response |
|---|---|
| 4 seconds | "Are you still there? Take your time." |
| 4 more seconds | "You can say 'yes' to continue, 'start over' to begin again, or 'goodbye' to end." |
| Third silence | "I'll end our session now — 'Hey Lumina' anytime." End gracefully. |

---

## Section 2: Confirmation Patterns

### Explicit Confirmation (destructive or high-stakes actions)
- **When:** Locking/unlocking doors, arming security system, adjusting thermostat by large amount (>10°), deleting a scene
- **Pattern:** "You want to [action — exact slot values restated]. Is that right?"
- **SSML:** `<break time="300ms"/>` before the confirmation question; `<emphasis>` on key values
- **Example:** `You want to lock the front door. <break time="300ms"/> Is that right?`

### Implicit Confirmation (low-stakes, reversible actions)
- **When:** Turning lights on/off, adjusting brightness, playing music, setting a timer
- **Pattern:** State the action as it completes — no question asked
- **Example:** "Living room lights set to 40%." [action executes]
- **Rule:** Implicit confirmation only when confidence ≥ 0.85 AND action is trivially reversible

### Timeout Confirmation (silence during expected yes/no)
- After 8 seconds of silence when yes/no is expected: "Are you still there? Just say 'yes' to confirm or 'no' to cancel."
- After another 8 seconds: cancel pending action, notify user: "I've cancelled that — just 'Hey Lumina' when you're ready."

---

## Section 3: Screen Companion Layout (Hybrid)

```
┌─────────────────────────────────────────┐
│  TOP BAR — Always-on listening indicator │
│  [Pulsing Lumina logo when active]       │
│  [Static logo when idle]                 │
│  Lumina Home                             │
├─────────────────────────────────────────┤
│                                          │
│  MAIN AREA — Last 3 conversational turns │
│                                          │
│  [Turn 1: "Turn on the kitchen lights"]  │
│  [Turn 1: "Kitchen lights on."]          │
│  [Turn 2: "Set temperature to 72"]       │
│  [Turn 2: "Thermostat set to 72°F."]     │
│  [Turn 3: "Lock the front door"]         │
│  [Turn 3: "Confirming: lock front door?"]│
│                                          │
├─────────────────────────────────────────┤
│  SUGGESTIONS STRIP — 3 context-aware     │
│  [Lights off]  [Away mode]  [Good night] │
├─────────────────────────────────────────┤
│  BOTTOM BAR                              │
│  [Manual input toggle]  [Mute button]    │
└─────────────────────────────────────────┘
```

**Screen sync rules:**
- Screen must update within 200ms of voice response starting
- When voice unavailable: replace "Say yes to confirm" → "Tap to confirm"

---

## Section 4: Audio Feedback Guidelines

### Earcon Design Spec

| State | Earcon | Duration | Visual Fallback |
|---|---|---|---|
| Wake word detected | Single ascending chime | 150ms | Lumina logo animates to active (pulsing ring) |
| Task completed | Ascending 2-tone | 200ms | Success color flash + check icon on screen |
| Error or failure | Descending 2-tone | 300ms | Warning color + warning icon |
| Waiting / processing | Repeating pulse every 1.5s | Continuous | Spinning indicator on screen |
| Option selected | Soft click | 50–100ms | Button state change |

### SSML Guidelines

```xml
<!-- Confirmation with pause before key value -->
<speak>
  You want to lock the front door. <break time="300ms"/>
  Is that right?
</speak>

<!-- Emphasis on important data -->
<speak>
  Thermostat is currently <emphasis level="moderate">68 degrees</emphasis>.
</speak>

<!-- List of device states with pauses -->
<speak>
  3 devices are active. <break time="300ms"/>
  Living room lights. <break time="300ms"/>
  Kitchen lights. <break time="300ms"/>
  And the bedroom fan.
</speak>
```

**Barge-in rule:** Enable barge-in by default on all prompts. Stop audio within 100ms when user speaks. Resume from current state, not the beginning.

---

## Section 5: Accessibility Notes

### Visual Fallback for All Audio Cues
- Every earcon has a corresponding on-screen visual cue (see earcon table above)
- Caption display: current bot speech shown as on-screen text simultaneously
- Never convey critical information through audio alone

### Motor Accessibility
- Voice is primary — but manual tap/type fallback available for every action
- Mute button reachable in one tap from any state (bottom bar)
- Manual input toggle activates full touch-control mode mirroring all voice capabilities

### Cognitive Load Limits
- Maximum 2 options per disambiguation prompt
- Plain language: ≤15 words per sentence in voice responses
- No back-to-back disambiguation questions
- Slot re-prompts reference the specific issue: "I didn't recognize that room name — which room?"

### Platform Accessibility
- Custom VUI: implement WCAG 2.1 AA for companion screen
- Support device accessibility preferences (volume, caption settings)
- Smart speakers without screens: all interactions must complete via voice alone
