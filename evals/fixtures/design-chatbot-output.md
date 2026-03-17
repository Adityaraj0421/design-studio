# /design-chatbot — Lumina Support Assistant

**Arguments:** support web "Aria — warm, direct, efficient"

---

## Section 1: Persona & Voice Spec

| Dimension | Value |
|---|---|
| **Name** | Aria |
| **Platform context** | Customer support assistant on web |
| **Avatar style** | Abstract shape — soft gradient circle with stylized "A" — approachable without implying human |
| **Language register** | Casual-professional — contractions used, no corporate jargon |
| **Vocabulary level** | Grade 8 reading level; no abbreviations spoken aloud; plain language throughout |
| **Emoji use** | Sparingly — 1 per message maximum; used for positive confirmations only (✅) |

**Tone adjectives:** warm, direct, efficient, clear, empathetic

**Personality spectrum position:**
```
Formal     ←——[●]————————————→ Casual
Verbose    ←——————[●]————————→ Concise
Serious    ←——[●]————————————→ Playful
```

**Prohibited language patterns:**
- Never claim to be human if directly asked ("Are you a bot?" → "Yes, I'm Aria, a virtual assistant")
- Never use hedging on factual questions ("I think," "I believe") — use "I don't have that information"
- Never apologize more than once per error
- Never use passive voice for error messages ("An error was encountered" → "Something went wrong on our end")
- Never expose raw error codes or system messages to the user

---

## Section 2: Dialog Flow Map

### Happy Path (user resolved in ≤3 turns)
```
User: "I can't find my invoice from last month"
  └─→ BOT: "Hi, I'm Aria! Let me help you find that invoice.
            Can you confirm the email address on your account?"
       └─→ User: "it's alex@company.com"
            └─→ BOT: [slot-fill: email confirmed, confidence ≥0.85]
                     "Got it. Your March invoice (#INV-2847) was sent to
                      alex@company.com on March 1st. I'm resending it now."
                 └─→ BOT: "Done! ✅ You should see it in your inbox within 2 minutes."
                      └─→ [END]
```

### Escalation Path (bot cannot resolve → human handoff)
```
User: "Your system charged me twice and I want a refund"
  └─→ BOT: FALLBACK_1 — "I hear you — a duplicate charge is frustrating.
                         I can look up your account. Can I get your email or order number?"
       └─→ User: [still unresolved after 2 attempts]
            └─→ BOT: FALLBACK_2 — "I want to make sure this gets resolved properly.
                                   Would you like to: chat with billing, or email support?"
                 └─→ User: "I want to talk to a person"
                      └─→ BOT: ESCALATION — "Connecting you with our billing team now.
                                             I've shared our conversation so you won't need to repeat yourself."
                           └─→ [HUMAN HANDOFF — session_id, summary, transcript]
```

### Out-of-Scope Path
```
User: "Can you help me build a website?"
  └─→ BOT: "That's outside what I can help with — I'm here for Lumina account
            and billing questions. Can I help you with your account,
            invoices, or subscription?"
       └─→ [Quick reply chips: "Account settings" / "Billing" / "Cancel subscription"]
```

### Error Recovery Path
```
BOT: [action attempted — account lookup API returns 503]
  └─→ BOT: "Something went wrong on our end — it's not you."
       └─→ BOT: "Trying again..." [auto-retry in 3s]
            ├─→ [Retry succeeds] → Resume flow
            └─→ [Retry fails] → "I'm still having trouble.
                                  Want me to have support email you instead?"
```

**Confidence threshold routing:**

| Confidence | Threshold | Action |
|---|---|---|
| High | ≥ 0.85 | Proceed; implicit confirmation for reversible actions |
| Medium | 0.60–0.84 | "Just to confirm, you want to [action]?" |
| Low | 0.40–0.59 | Disambiguation: top 2 intents as quick replies |
| Very low | < 0.40 | FALLBACK_1 flow |

---

## Section 3: Message UI Spec

#### User Bubble
| Property | Value |
|---|---|
| Alignment | Right-aligned |
| Max width | 320px (or 80% of container) |
| Background | `var(--color-brand-accent)` — indigo |
| Text color | White (verify ≥ 4.5:1 contrast) |
| Border radius | 16px all corners, 4px bottom-right |
| Padding | 12px 16px |
| Timestamp | Show on hover/tap |

#### Bot Bubble
| Property | Value |
|---|---|
| Alignment | Left-aligned |
| Max width | 320px (or 80% of container) |
| Background | `var(--color-surface)` — gray-50 |
| Text color | `var(--color-text-primary)` |
| Border radius | 16px all corners, 4px bottom-left |
| Padding | 12px 16px |
| Avatar | Show on first bubble of each bot turn only |
| Timestamp | Show on hover/tap |

**Spacing rules:**
- 4px between consecutive bubbles from same sender
- 16px between turns (user → bot transition)
- 24px above system messages

---

## Section 4: Component Library

### Typing Indicator
- Three-dot animated pulse: dots sequentially grow and fade in a loop
- **Show after:** 300ms of no response since the user's message
- If no response within 1.5s of indicator appearing: show "still thinking…" label below dots
- Accessible label: `aria-label="Assistant is typing"`

### Quick Reply Chips
- Pill buttons below the triggering bot message
- Height: 36px; padding: 8px 16px; border-radius: 999px; max 5 visible
- **Disappear after tap** — ephemeral, not persistent navigation
- Tapped option appears as user bubble to keep conversation log coherent
- Keyboard: Tab to focus, Enter or Space to select

### Input Bar
| Element | Spec |
|---|---|
| Height | 56px minimum |
| Text input | Flexible width; placeholder: "Type a message…" |
| Send button | Paper plane icon; disabled when empty; activates on Enter or tap |
| Persistent menu | ☰ left of input; contains top capabilities + restart + talk to human |

### Empty State (first visit)
- Welcoming illustration: soft gradient circle (Aria avatar), brand-consistent
- Bot intro: "Hi, I'm Aria. I can help with account questions, billing, and subscription changes."
- 4 suggested prompt chips: "Find my invoice" / "Change my plan" / "Cancel subscription" / "Talk to a person"

---

## Section 5: Error States

| Error Type | User-Facing Message | UI Treatment | Next Step |
|---|---|---|---|
| Out-of-scope request | "That's outside what I can help with, but I can assist with [account/billing/subscriptions]." | Inline bot bubble | 3 in-scope quick reply chips |
| API failure / 5xx | "Something went wrong on our end — it's not you." | Error state bubble + warning icon | Retry button + escalation link |
| Escalation trigger | "I'm connecting you with someone who can help. I've shared our conversation so you won't need to repeat yourself." | System message + agent avatar | Estimated wait or async alternatives |
| Session expired | "Your session timed out — let's start fresh." | Full-screen message | Restart button |
| Rate limit hit | "You're moving fast! Give me just a moment to catch up." | Inline bot bubble | Auto-retry in 3s |

**Escalation threshold:** 2 consecutive failed intents OR any message containing "human," "agent," "person," or explicit frustration signals.

---

## Section 6: Accessibility Notes

#### ARIA Roles and Live Regions
- Chat history container: `role="log"` + `aria-live="polite"` + `aria-label="Conversation"`
- New bot messages: announced after current speech completes (polite, not assertive)
- Error messages: `aria-live="assertive"` — interrupts current screen reader activity
- Typing indicator: `aria-label="Assistant is typing"` + `aria-live="polite"`
- Quick reply chips: `role="button"` + descriptive `aria-label`

#### Keyboard Navigation
- Tab order: persistent menu → text input → send button → quick reply chips (left to right)
- Enter or Space: activates focused chip or button
- Escape: closes open overlays
- No keyboard trap: Tab must never get stuck inside the chat widget

#### Touch Targets
- All interactive elements: minimum 44×44px tap target
- Quick reply chips: 36px height — pad to 44px with invisible hit area
- Spacing between targets: minimum 8px to prevent accidental activation
