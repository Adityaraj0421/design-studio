---
description: "Design GDPR/CCPA-compliant consent flows — cookie banners, consent hierarchy, privacy controls, and data deletion request UI."
argument-hint: "[product type] [jurisdiction: eu|ca|both] [consent categories: analytics|marketing|personalization]"
allowed-tools: ["Read", "Write", "mcp__*"]
---

# /design-gdpr

You are designing a complete GDPR/CCPA-compliant consent and privacy control system. Your output is a single structured spec covering cookie banner variants, consent flow, privacy control center wireframe, data deletion request flow, and a jurisdiction-specific compliance checklist.

## Input

Arguments: **$ARGUMENTS**

Parse the following from `$ARGUMENTS`:
- **Product type**: the type of product (e.g., e-commerce, SaaS, media, healthcare portal)
- **Jurisdiction**: `eu` (GDPR) / `ca` (CCPA) / `both` (default: `both`)
- **Consent categories**: one or more of `analytics`, `marketing`, `personalization` (default: all three)

---

## Step 1: Load Knowledge Base

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/compliance-designer.md` to apply the full Compliance Designer knowledge base to every section below.

**MCP Fallback**: If the file cannot be read, proceed using inline knowledge. The inline knowledge for this command covers: GDPR Article 7 conditions for consent (affirmative action, freely given, withdrawal as easy as giving), EDPB Guidelines 03/2022 dark patterns (pre-ticked boxes, nudge colors, unequal button prominence, multiple-click rejection), IAB TCF v2.2 Purpose IDs 1–10 (all off by default), CCPA opt-out requirement ("Do Not Sell or Share My Personal Information" footer link, 15-day response window), DSAR flow (identity verification, 30-day response window, extendable by 2 further months for complex requests = 90 days total), and data portability (GDPR Art. 20, machine-readable JSON/CSV).

---

## Step 2: Generate the Spec

Produce all five sections below as a single continuous output. Do not pause or ask for confirmation between sections.

---

### Section 1: Cookie Banner Variants

Generate three cookie banner variants. For each: layout dimensions, typography, button hierarchy, and ARIA requirements. Tailor to the parsed product type and jurisdiction.

#### Variant A: Minimal

**Use case:** Low-risk products, returning-user re-consent, supplementary notice layer.

| Property | Spec |
|---|---|
| Position | Fixed, bottom of viewport |
| Height | Single line (~56px) or two lines max |
| Layout | Text left — action buttons right |
| Typography | Body 14px; button labels 14px medium weight |
| Buttons | "Accept" and "Decline" — equal visual weight (same background color, same border radius, same font size) |
| Category detail | None — summary only ("We use cookies to improve your experience.") |
| Privacy link | Underline text link to full privacy policy |
| ARIA | `role="dialog"`, `aria-label="Cookie consent"`, `aria-modal="false"`, focus on first button on appear |

**Dark pattern check:** "Accept" and "Decline" must share identical button styling. A colored Accept with a greyed Decline is an EDPB violation — do not use nudge colors.

---

#### Variant B: Standard (IAB TCF Compliant)

**Use case:** General web products serving EU users; required baseline for IAB TCF signal transmission.

| Property | Spec |
|---|---|
| Position | Fixed, bottom of viewport or centered modal on first visit |
| Width | 100% viewport width (bottom bar) or 480–560px (modal) |
| Layout | Purpose summary (top) — button row (bottom) |
| Buttons | "Accept All" / "Manage Preferences" / "Reject All" — left to right, equal prominence |
| Button sizing | All three buttons same height (44px min), same border weight, same font size |
| Category summary | Brief 1-line descriptions of categories present: Analytics, Marketing, Personalization |
| TCF compliance | IAB TCF v2.2 signal emitted on Accept All and Reject All; Manage Preferences opens preference center |
| Privacy link | Visible text link before buttons: "Privacy Policy" |
| ARIA | `role="dialog"`, `aria-labelledby="banner-heading"`, `aria-describedby="banner-body"`, focus trap within banner until dismissed |

**EDPB violations to avoid:**
- Pre-ticked category toggles — all non-strictly-necessary purposes must default off
- "Accept" button in brand color with "Reject" in grey — equal visual prominence is required
- Hiding "Reject All" behind a secondary modal while "Accept All" is primary — both must be one click away

---

#### Variant C: Detailed (Expandable Category Toggles)

**Use case:** High-compliance products, EU enterprise, products with legitimate interest processing.

| Property | Spec |
|---|---|
| Position | Centered modal overlay with backdrop |
| Width | 560–640px; max-height 80vh with internal scroll |
| Layout | Header (purpose statement) → toggle list → button row |
| Toggle groups | Grouped by category: Strictly Necessary (locked on, no toggle) / Analytics / Marketing / Personalization |
| IAB TCF Purpose IDs | Labeled inline with each toggle: e.g., "Analytics — IAB TCF Purposes 7, 8, 9" |
| Legitimate interest | Where LI is the legal basis, show "(Legitimate Interest)" tag + expandable "Why?" section linking to the LIA |
| Consent record indicator | Footer line: "Your preferences will be recorded with a timestamp. You can change them at any time." |
| Buttons | "Save My Preferences" (primary) / "Accept All" (secondary) / "Reject All" (tertiary text link) |
| ARIA | `role="dialog"`, `aria-modal="true"`, focus trap, `aria-label` per toggle: "[Purpose name], toggle, [on/off]" |

**Toggle specification:**
- Height: 24px (thumb 20px); track width 44px
- Label text left-aligned; toggle right-aligned
- All non-strictly-necessary toggles default to off (GDPR opt-in) — no exceptions
- Strictly necessary section is informational only: grey locked toggle with tooltip "Required for the site to function"

---

### Section 2: Consent Flow UI Spec

Step-by-step consent journey from initial trigger through ongoing preference management.

#### 2.1 Banner Trigger Conditions

| Trigger | Condition | UI Behavior |
|---|---|---|
| First visit | No consent signal in storage | Show Variant B or C banner immediately; do not load non-essential scripts |
| Session start (returning, consent expired) | Consent timestamp older than consent version TTL | Show Variant A (minimal re-consent) or Variant B if purposes changed |
| Cookie expiry | Consent cookie expires (max 12 months per EDPB recommendation) | Re-show banner as first visit |
| Consent version change | New TCF string version or new purposes added | Show re-consent banner: "We've updated our privacy practices. Please review your preferences." |
| Jurisdiction change | IP geolocation detects user moved from non-EU to EU | Upgrade to GDPR-compliant banner if not already shown |

**Do not load non-essential JavaScript** (analytics, marketing pixels, personalization scripts) before consent is given. Gate script loading on the consent state machine signal.

#### 2.2 Preference Center

The preference center is a persistent, fully accessible page — not a modal. Accessible from:
- "Manage Preferences" link in every cookie banner variant
- Footer link: "Cookie Settings" or "Privacy Preferences" — present on every page, no authentication required
- Privacy policy page

**Preference center layout spec:**
```
┌─────────────────────────────────────────────────────┐
│  Privacy Preferences                    [Last saved: date] │
├─────────────────────────────────────────────────────┤
│  Strictly Necessary Cookies              [Always On] │
│  Required for login, security, and page load.        │
├─────────────────────────────────────────────────────┤
│  Analytics Cookies                          [○ Off]  │
│  Help us understand how you use our product.         │
│  > Learn more (IAB Purposes 7, 8, 9)                │
├─────────────────────────────────────────────────────┤
│  Marketing Cookies                          [○ Off]  │
│  Used to show you relevant ads.                      │
│  > Learn more (IAB Purposes 2, 3, 4)                │
├─────────────────────────────────────────────────────┤
│  Personalisation Cookies                    [○ Off]  │
│  Personalise your content experience.                │
│  > Learn more (IAB Purposes 5, 6)                   │
├─────────────────────────────────────────────────────┤
│  [Save My Preferences]  [Accept All]  Reject All     │
└─────────────────────────────────────────────────────┘
```

On save: confirmation toast — "Your preferences have been saved." Preferences take effect immediately; pages reload to flush rejected scripts if necessary.

#### 2.3 Confirmation States

| State | UI Treatment |
|---|---|
| Accepted All | Banner dismissed; no UI change; preference center shows "All preferences: On" |
| Partially Accepted | Banner dismissed; preference center shows each toggle's state; "Last updated: [date]" visible |
| Rejected All | Banner dismissed; preference center shows "All non-essential cookies: Off"; no analytics/marketing scripts active |
| Re-consent Required | Banner re-shown with header: "We've updated our privacy practices. Please review." Old preferences shown as pre-filled starting state |

#### 2.4 Re-Consent Trigger (Purpose Change Notification)

When new consent purposes are added or the TCF version changes:
- Show a notice banner (not a full blocking modal): "We've updated our cookie policy. [Review Changes]"
- "Review Changes" opens preference center with new/changed purposes highlighted with a "New" badge
- Old accepted purposes remain accepted; new purposes default to off
- Consent is not re-collected for unchanged purposes

---

### Section 3: Privacy Control Center Wireframe

Text-based structural wireframe for the Privacy Control Center (full page, not modal). Accessible via Account Settings → Privacy, or a direct /privacy URL.

```
┌─────────────────────────────────────────────────────────┐
│  Account Settings  >  Privacy                           │
│                                                         │
│  Privacy Control Center                                 │
│  Manage how we use and store your personal data.        │
│                                                         │
├──────────────────────────┬──────────────────────────────┤
│  SIDEBAR NAV             │  MAIN CONTENT AREA           │
│  ─────────────────       │                              │
│  > View My Data          │  [Section loads here]        │
│    Download My Data      │                              │
│    Delete My Data        │                              │
│    Manage Consents       │                              │
│    Withdraw Consent      │                              │
└──────────────────────────┴──────────────────────────────┘
```

#### Section: View My Data (GDPR Art. 15 — Right of Access)

```
┌─────────────────────────────────────────────────────────┐
│  View My Data                        Status: Available  │
│                                                         │
│  Categories of data we hold about you:                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Account Data      Name, email, password hash     │   │
│  │ Usage Data        Page views, session events     │   │
│  │ Purchase History  Orders, invoices, amounts      │   │
│  │ Preferences       Cookie settings, UI choices    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  [Request Full Data Report]                             │
│  We'll prepare your report within 30 days.              │
└─────────────────────────────────────────────────────────┘
```

#### Section: Download My Data (GDPR Art. 20 — Data Portability)

```
┌─────────────────────────────────────────────────────────┐
│  Download My Data                    Status: Ready / —  │
│                                                         │
│  Request a machine-readable export of your data.        │
│  Format: JSON or CSV (your choice)                      │
│  Includes: data you provided + data we observed         │
│  Excludes: inferred/derived data                        │
│                                                         │
│  File name: user_data_export_{id}_{YYYYMMDD}.zip        │
│  Download link expires 72 hours after generation.       │
│                                                         │
│  [Request Export — JSON]  [Request Export — CSV]        │
│                                                         │
│  Last export: [date] — [Download] (expires [date])      │
└─────────────────────────────────────────────────────────┘
```

#### Section: Delete My Data (GDPR Art. 17 — Right to Erasure)

```
┌─────────────────────────────────────────────────────────┐
│  Delete My Data                      Status: No request │
│                                                         │
│  Request deletion of your personal data.                │
│                                                         │
│  ⚠ Some data may be retained under legal obligations:   │
│  Transaction records retained 7 years (tax law).        │
│  Fraud prevention records retained as required by law.  │
│                                                         │
│  [Start Deletion Request]                               │
│                                                         │
│  DSAR response time: 30 days (extendable by 2 months    │
│  for complex requests; you'll be notified in advance).  │
└─────────────────────────────────────────────────────────┘
```

#### Section: Manage Consents

Links to the full Preference Center page (Section 2.2). Displays a summary card showing current consent state and date last updated.

#### Section: Withdraw Consent

One-click full withdrawal: "Withdraw all optional consents" — triggers the REJECTED_ALL state in the consent state machine. Confirmation modal: "Are you sure? This will turn off all optional cookies and data processing. Your strictly necessary cookies will remain active." Two buttons: "Withdraw All Consents" (destructive, red outline) / "Cancel".

---

### Section 4: Data Deletion Request Flow

Five-step deletion request UI (GDPR Art. 17 — Right to Erasure).

#### Step 1: Authentication (Re-confirm Identity)

```
Delete My Data  ●○○○○

Confirm it's you before we process this request.

[Re-enter your password]
[Password field]

Or: [Send me a verification code to my email]

[Continue]  [Cancel]
```

- Required for all deletion requests — prevents unauthorized account deletion
- High-risk users (payment data present): email verification code required in addition to password

#### Step 2: Scope Selection

```
Delete My Data  ●●○○○

What would you like us to delete?

☐  Account Data           (name, email, profile)
☐  Purchase History       (orders, invoices)
☐  Behavioral Data        (page views, session events)
☑  All Personal Data      (selects all above + any other categories)

Note: Selecting "All Personal Data" will close your account permanently.

[Continue]  [Back]
```

#### Step 3: Confirmation (Plain-Language Summary)

```
Delete My Data  ●●●○○

Review what will be deleted:

WILL BE DELETED within 30 days:
  • Account profile (name, email, password)
  • [Selected categories from Step 2]

WILL BE RETAINED (legal obligation):
  • Transaction records — required for 7 years under tax law
  • Fraud prevention records — retained as legally required

By proceeding, your account will be permanently closed.
You have 24 hours to cancel this request.

[Confirm Deletion Request]  [Back]
```

#### Step 4: Verification Email

Sent immediately after Step 3 confirmation:

```
Subject: Confirm your data deletion request — [Reference #DEL-XXXXXXXX]

You submitted a request to delete your personal data on [date/time UTC].
Reference: #DEL-XXXXXXXX

If this was you: no action needed. We'll complete your request within 30 days.
(For complex requests, we may take up to 90 days total — we'll notify you before the initial 30-day window closes.)

Changed your mind? [Cancel this request] (link active for 24 hours)

This link expires: [date/time UTC + 24 hours]
```

#### Step 5: Completion Notice

```
Delete My Data  ●●●●●

Your data has been deleted.

Reference: #DEL-XXXXXXXX
Completed: [date UTC]

What was deleted: [list of categories]
What was retained: [list with legal basis for each]

[Download Certificate of Deletion (PDF)]

Thank you. If you have questions, contact privacy@[company].com
```

- Certificate of deletion: timestamped PDF, includes reference number, categories deleted, categories retained with legal basis, completion date
- Account access is terminated immediately upon completion; login attempts return: "No account found. Please sign up to create a new account."

---

### Section 5: Compliance Checklist

Jurisdiction-specific checklist. Complete only the sections matching the parsed jurisdiction.

#### EU / GDPR Checklist

- [ ] Cookie banner has equal-prominence "Accept All" and "Reject All" buttons (same size, same visual weight, same color treatment)
- [ ] No pre-ticked consent boxes anywhere in the product
- [ ] Rejecting cookies requires the same number of clicks as accepting (IAB TCF v2.2, EDPB Guidelines 03/2022)
- [ ] All TCF Purpose toggles default to off in the preference center; strictly necessary cookies are disclosed but not toggled
- [ ] Preference center is accessible without authentication (anonymous consent withdrawal must be possible)
- [ ] Consent timestamp, version ID, and signal source recorded for every consent event
- [ ] Consent withdrawal is as easy as giving consent (GDPR Art. 7) — one action from the preference center
- [ ] Legitimate interest toggles link to the Legitimate Interest Assessment (LIA) summary and GDPR Art. 21 objection form
- [ ] DSAR submission flow: identity verification, reference number, status tracker, 30-day SLA with 90-day extension notice
- [ ] Data deletion flow includes retention exception disclosure before user confirms
- [ ] Data portability export: machine-readable format (JSON or CSV), contents manifest (README.txt), 72-hour download link
- [ ] Re-consent banner shown when consent version changes or new purposes are added
- [ ] IAB TCF v2.2 consent string emitted and stored correctly by the CMP

#### CA / CCPA Checklist

- [ ] "Do Not Sell or Share My Personal Information" link present in the footer of every page (CCPA § 1798.120)
- [ ] Opt-out honored within 15 business days of request (CCPA § 1798.135)
- [ ] Opt-out preference signal (OOPS) logged with timestamp for each CA resident who opts out
- [ ] Global Privacy Control (GPC) signal detected and honored automatically if browser sends it
- [ ] Privacy policy discloses categories of personal information sold or shared, and the right to opt out
- [ ] Under-16 users require opt-in consent before personal information is sold or shared (CPRA amendment)
- [ ] "Limit the Use of My Sensitive Personal Information" link present if sensitive PI is processed (CPRA)

#### Both Jurisdictions: Mobile Accessibility of Consent UI

- [ ] Cookie banner tap targets minimum 44×44px on mobile
- [ ] Preference center is usable on 320px minimum viewport width (no horizontal scroll)
- [ ] Consent banner does not cover the entire viewport or prevent page interaction on mobile
- [ ] Focus management: banner/modal opens with focus on first interactive element; Escape closes; focus returns to trigger on close
- [ ] `role="dialog"` with `aria-label` on cookie banner; toggles have descriptive `aria-label` values
- [ ] Color contrast of all consent UI elements meets WCAG 2.1 AA (4.5:1 text, 3:1 UI components)

---

## MCP Fallback

If any MCP tool call fails during execution of this command, continue using inline compliance knowledge. All GDPR, CCPA, IAB TCF, and EDPB references cited above are embedded in this command and do not require an external tool call to apply.

---

## What's Next

After generating this GDPR/CCPA consent spec, consider these follow-up commands:

- `/design-compliance` — audit or generate HIPAA, PCI DSS, or ADA/Section 508 compliant UI patterns for a specific regulation
- `/accessibility-audit` — run a deep accessibility audit against the consent UI components generated above
- `/design-review` — critique the visual design of the banner and preference center against design system standards
