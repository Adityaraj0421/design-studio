# /design-gdpr — Lumina Analytics Consent Flows

**Arguments:** saas EU analytics,marketing,personalization

---

## Section 1: Cookie Banner Variants

Three variants provided. Use the **Standard** variant for most SaaS products. Use **Minimal** only if you have a legitimate interest basis for analytics. Use **Detailed** for high-trust or regulated contexts.

---

### Variant 1: Minimal Banner

```
┌────────────────────────────────────────────────────────┐
│ We use cookies to improve your experience.              │
│ [Learn more]                      [Accept] [Decline]   │
└────────────────────────────────────────────────────────┘
```

**Compliance notes:**
- Acceptable only when: analytics runs on legitimate interest (not consent), no marketing cookies, no personalization
- Must link to full cookie policy
- "Decline" must be equally prominent as "Accept" — GDPR requires no dark patterns

---

### Variant 2: Standard Banner (recommended)

```
┌─────────────────────────────────────────────────────────────┐
│  🍪 We use cookies                                          │
│                                                             │
│  We use cookies for analytics, marketing, and               │
│  personalization. You can customize your preferences below. │
│                                                             │
│  [Manage preferences]    [Reject all]    [Accept all]       │
└─────────────────────────────────────────────────────────────┘
```

**Compliance notes:**
- "Accept all" and "Reject all" must be equal weight — no pre-checked boxes
- "Manage preferences" opens the detailed consent modal
- Banner must appear before any non-essential cookies fire
- Do not pre-populate consent toggles as "on" — default must be off for non-essential categories

---

### Variant 3: Detailed Banner

```
┌─────────────────────────────────────────────────────────────┐
│  Cookie preferences                                         │
│                                                             │
│  ✅ Strictly necessary (always on, cannot be disabled)     │
│                                                             │
│  ○ Analytics cookies        [OFF]  [ON]                    │
│    Help us understand how you use the product               │
│                                                             │
│  ○ Marketing cookies        [OFF]  [ON]                    │
│    Allow us to show you relevant ads                        │
│                                                             │
│  ○ Personalization cookies  [OFF]  [ON]                    │
│    Remember your preferences across sessions                │
│                                                             │
│  [Save my preferences]                 [Accept all]        │
└─────────────────────────────────────────────────────────────┘
```

**Compliance notes:**
- Strictly necessary cookies: cannot be turned off; do not include a toggle
- All toggles default to OFF — explicit opt-in required (GDPR Art. 7)
- IAB TCF v2.2 integration recommended for advertising cookies
- Log consent with timestamp, version, and specific categories accepted

---

## Section 2: Consent Flow Spec

**Consent acquisition flow (pre-session, first visit):**

```
1. User lands on site → block all non-essential cookies
2. Display Standard Banner (bottom of viewport, not full-screen overlay)
3a. User clicks "Accept all" → consent recorded, all cookies fire → banner dismissed
3b. User clicks "Reject all" → rejection recorded, strictly necessary only → banner dismissed
3c. User clicks "Manage preferences" → open Detailed Banner modal
    → User selects categories → clicks "Save" → consent recorded for selected → dismissed
4. Consent stored: localStorage + server-side log (timestamp, version, categories)
5. Banner suppressed on subsequent visits until: consent expires (12 months), policy changes, or user requests update
```

**Consent record format (server-side log):**
```json
{
  "user_id": "anon_abc123",
  "timestamp": "2026-03-16T10:22:00Z",
  "consent_version": "1.3",
  "jurisdiction": "EU",
  "categories": {
    "analytics": true,
    "marketing": false,
    "personalization": true
  },
  "method": "explicit_accept_selected"
}
```

---

## Section 3: Privacy Control Center

Accessible at: Account Settings → Privacy & Data (must be accessible without a cookie banner reappearing).

```
┌────────────────────────────────────────────────────────┐
│  Privacy & Data                                        │
│──────────────────────────────────────────────────────  │
│  Cookie preferences                                    │
│  Analytics: ON  |  Marketing: OFF  |  Personalization: ON │
│  [Update cookie preferences]                           │
│──────────────────────────────────────────────────────  │
│  Your data                                             │
│  [Download my data]  →  Receive a copy of all          │
│                          your account data (JSON/CSV)  │
│  [Delete my account] →  Permanently delete all data    │
│──────────────────────────────────────────────────────  │
│  Data sharing                                          │
│  Share usage data with Lumina Analytics team: [ON/OFF] │
│──────────────────────────────────────────────────────  │
│  Communication preferences                             │
│  Marketing emails:       [ON/OFF]                      │
│  Product updates:        [ON/OFF]                      │
│  Transactional emails:   Always on (cannot be disabled)│
└────────────────────────────────────────────────────────┘
```

---

## Section 4: Data Deletion Request Flow

**5-step deletion flow (GDPR Art. 17 — Right to Erasure):**

```
Step 1: User initiates
  → Account Settings → Privacy & Data → "Delete my account"
  → Confirmation modal: explain what will be deleted + what is retained (legal obligations)

Step 2: Identity verification
  → Re-authenticate (password or magic link to registered email)
  → Prevents accidental or unauthorized deletion

Step 3: Cooling-off period notification
  → "Your deletion request has been received."
  → "Your account will be deleted in 14 days. You can cancel during this period."
  → Email confirmation sent to registered address

Step 4: Processing
  → Day 0–14: account suspended, data queued for deletion
  → User can cancel via email link or account reactivation
  → Day 14: deletion executed across all systems (user data, backups, logs)
  → Legal hold data retained separately per applicable retention requirements

Step 5: Confirmation
  → Email confirmation: "Your data has been deleted."
  → Maximum response time: 30 days from request; extendable by a further 2 months
    (90 days total) for complex requests — user notified of extension before initial month expires
```

---

## Section 5: Compliance Checklist

### EU / GDPR

- [ ] Consent acquired before non-essential cookies fire (GDPR Art. 7)
- [ ] Consent is specific, informed, unambiguous, and freely given — no pre-checked boxes
- [ ] Withdraw consent as easy as giving it (Art. 7(3)) — accessible in Privacy Control Center
- [ ] Privacy policy clearly linked from consent banner (Art. 13/14)
- [ ] Consent records stored with timestamp, version, and categories (Art. 5(2) accountability)
- [ ] DSAR response within 30 days (extendable by 2 further months, 90 days total) (Art. 12(3))
- [ ] Right to erasure implemented (Art. 17) with 14-day cooling-off period
- [ ] Right to portability: data download in JSON/CSV (Art. 20)
- [ ] DPA notification pathway defined for data breaches within 72 hours (Art. 33)
- [ ] IAB TCF v2.2 integrated if advertising cookies are used

### California / CCPA

- [ ] "Do Not Sell or Share My Personal Information" link in site footer (CCPA §1798.135)
- [ ] Global Privacy Control (GPC) signal honored automatically
- [ ] Privacy policy includes CCPA-required disclosures (categories collected, purposes, third parties)
- [ ] DSAR response within 45 days (extendable to 90 days with notice)
- [ ] No discrimination against users who exercise privacy rights (§1798.125)

---

## What's Next

- `/design-compliance --regulation ada` — audit consent banner for ADA accessibility compliance
- `/design-system` — generate CSS custom property tokens for the consent UI components
- `/design-chatbot` — design a privacy preferences assistant for guided consent management
