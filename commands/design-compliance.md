---
description: "Audit or generate regulation-specific UI patterns for HIPAA, PCI DSS, or ADA compliance. Use --regulation <hipaa|pci|ada> to target a specific standard."
argument-hint: "--regulation <hipaa|pci|ada> [file to audit OR brief to generate from]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "mcp__*"]
---

# /design-compliance

You are performing a targeted compliance audit or generating regulation-specific UI patterns. Your output is scoped to a single regulation — HIPAA, PCI DSS, or ADA/Section 508 — based on the `--regulation` flag. You do not output all three branches; you output only the branch matching the requested regulation.

## Input

Arguments: **$ARGUMENTS**

Parse the following from `$ARGUMENTS`:
- **Required flag**: `--regulation <hipaa|pci|ada>`
- **Mode**: if a file path is provided after the flag, run in **audit mode** (read and scan that file). If a text brief is provided, run in **generate mode** (produce a compliant UI spec from the brief).

**If `--regulation` is missing or the value is not one of `hipaa`, `pci`, or `ada`:**

Output the following error and stop:

```
Error: --regulation flag is required.

Usage: /design-compliance --regulation <hipaa|pci|ada> [file path or brief]

Valid values:
  --regulation hipaa   Audit or generate HIPAA-compliant PHI UI patterns
  --regulation pci     Audit or generate PCI DSS-compliant payment form patterns
  --regulation ada     Audit or generate ADA/Section 508 accessible component patterns

Examples:
  /design-compliance --regulation hipaa src/components/PatientRecord.tsx
  /design-compliance --regulation pci "Design a checkout form for a SaaS subscription product"
  /design-compliance --regulation ada src/pages/onboarding.html
```

---

## Step 1: Load Knowledge Base

Read `${CLAUDE_PLUGIN_ROOT}/skills/design/references/compliance-designer.md` to apply the full Compliance Designer knowledge base to the active regulation branch.

**MCP Fallback**: If the file cannot be read, proceed using inline knowledge. Inline knowledge for this command covers:

- **HIPAA**: PHI field ★ indicator (gold #B8860B, tooltip "This is Protected Health Information (PHI). Access is logged."), session timeout (warning at T−2 min, forced logout at T=0, no "remember me" bypass), audit log required columns (user ID, timestamp, resource type, action, outcome, IP), role badges (Attending/Resident/Nurse/Admin/Auditor/BTG), break-the-glass flow (6 steps, free-text justification min 20 chars, supervisor alert within 15 min, persistent red banner), 45 CFR §164.312.
- **PCI**: card fields must be in processor iframe (never merchant DOM), SAQ-A scope reduction, masked PAN display (first 6 / last 4 shown as `•••• •••• •••• XXXX`), CVV never stored or masked for saved cards (field absent until re-entry), 3DS v2 challenge modal spec, error message standards (never expose internal codes, processor error categories, always include user-actionable next step), PCI DSS v4.0 Req 3.3.1 and 4.2.1.
- **ADA / Section 508**: skip-nav link (visually hidden, visible on focus, `href="#main-content"`), form inputs need programmatic label + hint text + error state (all announced by screen reader), modal focus trap + return focus on close, data table `scope` attributes, WCAG 2.1 AA (4.5:1 text contrast, 3:1 UI component contrast), `aria-live` regions, keyboard trap audit protocol (Tab, Shift+Tab, Esc, Arrow keys), `outline: none` prohibition.

---

## Step 2: Execute the Active Regulation Branch

Based on `--regulation`, execute exactly one of the three branches below. Do not output the other two branches.

---

## Branch: HIPAA

### Audit Mode (file path provided)

Read the provided file. Scan for the following HIPAA UI violations. Report each finding with: file location (line number if possible), violation description, the specific HIPAA requirement violated, and a recommended fix.

**Scan checklist:**

| Check | Violation Pattern | HIPAA Requirement |
|---|---|---|
| PHI fields without ★ indicator | Input labels or field wrappers containing PHI categories (name, DOB, SSN, MRN, address, phone, email, health plan number, device ID) without a ★ marker or `data-phi` attribute | 45 CFR §164.312 — PHI must be visually identified |
| Session timeout > 15 minutes or absent | `sessionTimeout`, `SESSION_TIMEOUT`, `inactivityTimeout` values > 900000ms (15 min), or no timeout configured | 45 CFR §164.312(a)(2)(iii) — automatic logoff required |
| Audit log missing required columns | Audit log table or log object missing any of: user ID, timestamp, resource type, action, outcome, IP address | 45 CFR §164.312(b) — audit controls required |
| Access control missing role indicators | Header or nav components lacking role badge or role display; user context object lacking `role` property rendered in UI | 45 CFR §164.312(a)(1) — access control required |
| "Remember me" bypassing timeout | `rememberMe`, `stayLoggedIn`, `keepMeSignedIn` options that extend session beyond 15-min inactivity rule | 45 CFR §164.312(a)(2)(iii) |
| Break-the-glass missing justification | BTG flows lacking a free-text justification field or minimum character validation | 45 CFR §164.312(b) — audit controls |

Output a findings table followed by a prioritized remediation list (Critical → High → Medium).

---

### Generate Mode (brief provided)

Generate a complete HIPAA-compliant UI spec covering all components below. Apply the Compliance Designer knowledge base throughout.

#### 1. PHI Field Component Spec

Every field displaying or collecting Protected Health Information must carry the ★ indicator.

**Implementation spec:**

```
Label row:
  ★  Date of Birth                        ← ★ is gold (#B8860B)
  [MM]  /  [DD]  /  [YYYY]               ← field inputs
  ℹ  "This field contains Protected Health Information. Access is logged."
     (tooltip on ★ hover/focus; also readable by screen reader via aria-describedby)
```

| Token | Value |
|---|---|
| ★ color | #B8860B (DarkGoldenrod) — verify 4.5:1 against white background |
| ★ font size | Match label font size (typically 14px) |
| ★ position | Left of label text, 4px gap |
| Tooltip trigger | Hover or focus on ★ |
| Tooltip text | "This is Protected Health Information (PHI). Access is logged." |
| ARIA | `aria-describedby` on input pointing to a visually-hidden PHI notice span |
| Read-only views | ★ indicator required even when field is not editable — sensitivity indicator is not an edit indicator |

**PHI field categories requiring ★ marking (per 45 CFR §160.103):**
Names, geographic subdivisions smaller than state, dates (except year) related to individual, phone, fax, email, SSN, MRN, health plan number, account number, certificate/license number, device identifiers, URLs, IP addresses, biometric identifiers, full-face photos, any unique identifying number.

#### 2. Session Timeout Modal Design

Implements 45 CFR §164.312(a)(2)(iii). Industry standard: 15-minute inactivity timeout (NIST SP 800-63B, CMS ARS).

**Warning modal — triggers at T−2 minutes (13:00 of inactivity):**

```
┌──────────────────────────────────────────────────┐
│  ⚠  Session Expiring Soon                        │
│                                                   │
│  Your session will expire due to inactivity in:  │
│                                                   │
│             02:00  (MM:SS countdown)              │
│                                                   │
│  Click anywhere or press any key to stay          │
│  logged in.                                       │
│                                                   │
│  [Stay Logged In]          [Log Out Now]          │
└──────────────────────────────────────────────────┘
```

| Property | Spec |
|---|---|
| Trigger | 13 minutes of inactivity (T−2 from 15-min limit) |
| Countdown | MM:SS live countdown; `aria-live="assertive"` for screen readers — this is a critical alert |
| Dismiss | Any user interaction (click, keypress, scroll, touch) on "Stay Logged In" OR anywhere in the page |
| Forced logout at T=0 | PHI cleared from screen immediately; redirect to login page |
| Login page message | "Your session expired for security reasons. Please log in to continue." |
| Post re-auth | Deep-link user back to exact page (if no PHI pre-populated) |
| No "remember me" | No option to bypass or extend session timeout past 15-minute inactivity limit |
| Timeout reset | Resets on any user interaction — not on background API calls alone |

#### 3. Audit Log Table Design

Implements 45 CFR §164.312(b). Two views: user-facing (PHI portal) and admin view.

**User-facing access log:**

| Column | Content | Notes |
|---|---|---|
| Date & Time | ISO 8601 UTC, displayed in user's local timezone | Example: "Mar 17, 2026, 9:41 AM EST" |
| Action | Viewed / Downloaded / Modified / Shared | Color-coded: Viewed (blue), Modified (amber), Shared (orange) |
| Record | Patient name (last, first) or Record ID | Truncate at 30 chars with tooltip for full name |
| Accessed By | User's own name (self-access log) | "You" for self-access |
| Location | City, Country (from IP) | Never display full IP in user-facing view |

**Admin audit view — additional columns:**

User ID (hashed), Role, IP address (full), User agent string, Session ID, Record type, Field-level changes (before/after values), BTG active flag (amber highlight if true).

**Log UI requirements:**
- Read-only: no edit, delete, or hide controls exposed to any user role
- Tamper-evident: display a "Log integrity: verified" status or equivalent
- Retained minimum 6 years (45 CFR §164.316(b)(2)) — communicate retention period in the UI
- Sortable by: date (default desc), action type, record, actor
- Filterable by: date range, action type, outcome
- Export to CSV is itself an audited action (logged as "AUDIT_LOG_EXPORT")
- Anomaly highlighting: amber `⚠` indicator on rows where BTG was active or access outside normal hours

#### 4. Role Badge Component Spec

Displayed in the application header, top-right, adjacent to user name. Non-interactive (not a dropdown) to prevent accidental role changes.

| Role Badge | Color Token | Hex | Meaning |
|---|---|---|---|
| Attending | Blue-600 | #2563EB | Full PHI access for assigned patients |
| Resident | Blue-300 | #93C5FD | Full PHI access, supervised |
| Nurse | Teal-600 | #0D9488 | Clinical PHI access |
| Admin | Gray-600 | #4B5563 | Administrative access, limited clinical PHI |
| Auditor | Amber-600 | #D97706 | Read-only audit access |
| Break-the-Glass | Red-600 | #DC2626 | Emergency override active — all access logged |

**Badge spec:**
- Height: 24px; padding: 4px 10px; border-radius: 999px
- Font: 12px medium weight; text color white (verify 4.5:1 contrast against badge background)
- Persistent: visible on every authenticated page, refreshes on role context change
- BTG state: red badge replaces normal badge for duration of emergency access session

#### 5. Break-the-Glass Access Flow

Six-step activation flow for emergency PHI access outside assigned care team. Every BTG access triggers mandatory review.

```
Step 1: Access Attempt
User navigates to a patient record outside their assignment.

Modal appears:
┌──────────────────────────────────────────────────────────┐
│  ⛔  Restricted Record                                   │
│                                                           │
│  You are not assigned to this patient.                   │
│  Emergency access requires justification.                │
│  All access will be reviewed by the Privacy Officer.     │
│                                                           │
│  [Cancel]              [Access for Emergency Reason]     │
└──────────────────────────────────────────────────────────┘

Step 2: Justification Entry
If "Access for Emergency Reason" is selected:
┌──────────────────────────────────────────────────────────┐
│  Emergency Access Justification                          │
│                                                           │
│  Reason category: [dropdown]                             │
│    • Emergency care                                      │
│    • Coverage for colleague                              │
│    • Quality review                                      │
│    • Other                                               │
│                                                           │
│  Justification (required, minimum 20 characters):        │
│  [Textarea — character count shown, submit blocked       │
│   until min 20 chars reached]                            │
│                                                           │
│  [Cancel]              [Confirm Emergency Access]        │
└──────────────────────────────────────────────────────────┘

Step 3: Confirmation Screen
"You are now accessing [Patient Name]'s record under
emergency override. This access is being logged and
will be reviewed by the Privacy Officer."
[Continue to Record]

Step 4: Persistent BTG Session Banner
Red full-width banner at top of record throughout session:
┌──────────────────────────────────────────────────────────┐
│  ★ Emergency Access Active — All actions are logged      │
│  Justification: [first 60 chars of justification text]  │
│  Session started: [timestamp]                            │
└──────────────────────────────────────────────────────────┘

Step 5: Role Badge Change
Badge changes from normal role badge to:  [Break-the-Glass] (Red-600 #DC2626)
Badge persists until session ends or user navigates away from the record.

Step 6: Automated Alert
Notification sent to Privacy Officer within 15 minutes of BTG activation.
Alert includes: clinician name, role, patient record accessed, justification text, timestamp, IP.
```

---

## Branch: PCI

### Audit Mode (file path provided)

Read the provided file. Scan for the following PCI DSS UI violations. Report each finding with: file location, violation description, the specific PCI DSS requirement violated, and a recommended fix.

**Scan checklist:**

| Check | Violation Pattern | PCI DSS Requirement |
|---|---|---|
| Card fields in merchant DOM | `<input>` elements with name/id/placeholder containing: "card", "cardNumber", "pan", "cvv", "cvc", "expiry", "expDate" that are NOT inside an iframe src from a known payment processor | Req 4.2.1 — transmit CHD only over strong cryptography; SAQ-A scope |
| CVV stored or masked | Fields showing "•••" or masked value for CVV of a saved card; any reference to storing `cvv`, `cvc`, `cid`, `cvv2` in state, storage, or database calls | Req 3.3.1 — SAD must not be retained after authorization |
| Error messages exposing internal codes | Error strings containing: processor codes, AVS codes, "fraud", "INSUF_FUNDS", "gateway timeout", internal HTTP status codes displayed to user | Req 6.2.4 — protect against information disclosure |
| Missing SAQ-A scope reduction | Custom card input implementation where merchant-side JS handles or reads card data; absence of processor-hosted iframe or hosted fields API | SAQ-A eligibility — all card data must be handled by processor |
| Full PAN displayed | Card numbers shown with more than first 6 / last 4 digits visible in any UI state | Req 3.3.1 — mask PAN; display minimum digits necessary |

Output a findings table followed by a prioritized remediation list.

---

### Generate Mode (brief provided)

Generate a complete PCI DSS-compliant payment form spec for the described product. Apply the Compliance Designer knowledge base throughout.

#### 1. Payment Form Architecture — iframe Isolation

**Why iframe isolation:** Using a payment processor's hosted iframe fields (e.g., Stripe Elements, Braintree Hosted Fields, Adyen Web Components) means the merchant's page DOM never touches raw card data. This reduces PCI scope to SAQ-A (22 requirements) vs. SAQ-D (329 requirements). Any JavaScript on the merchant page that reads card data elevates scope to SAQ-D and requires annual penetration testing.

**Architecture spec:**

```
Merchant Page DOM:
┌────────────────────────────────────────────┐
│  Billing Name: [text input — merchant DOM] │
│  Email:        [text input — merchant DOM] │
│                                            │
│  Card Number:                              │
│  ┌──────────────────────────────────────┐  │  ← iframe src: processor.domain
│  │  [Processor-hosted card number field]│  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Expiry:              CVV:                 │
│  ┌──────────────┐     ┌──────────────┐    │  ← iframes, same processor domain
│  │ [MM / YYYY]  │     │ [CVV field]  │    │
│  └──────────────┘     └──────────────┘    │
│                                            │
│  [Pay $XX.XX]                              │  ← merchant button; triggers tokenization
└────────────────────────────────────────────┘

Flow: Processor iframe posts token to parent frame → merchant JS submits token to server → server charges token via processor API → no raw card data ever touches merchant infrastructure
```

**Styling requirement:** Use the processor's style injection API to match iframe fields to the surrounding form. No visible iframe borders; no z-index gaps; font, color, and padding must match adjacent merchant fields.

#### 2. Masked PAN Display (Saved Cards)

After a card is saved, display only using the format: `•••• •••• •••• XXXX`

```
Saved Payment Methods:

  [Visa logo]   •••• •••• •••• 4242   Expires 12/27   [Remove]
  [Mastercard]  •••• •••• •••• 8210   Expires 03/26   [Remove]

  [+ Add a new card]
```

| Rule | Detail |
|---|---|
| PAN masking | First 6 and last 4 are technically permissible (BIN range + last 4); display format `•••• •••• •••• XXXX` is conservative and preferred |
| Card network logo | Detected from BIN range by the processor; display without requiring user re-entry |
| Expiry | Displayed — not a sensitive authentication element per PCI DSS |
| CVV | Never shown, never stored. No "•••" for saved card CVV — this implies storage. CVV field is absent for saved cards; it only appears when a new card is entered |
| "Remove" action | Confirmation modal: "Remove this card? This cannot be undone." [Remove] / [Cancel] |

#### 3. 3DS v2 Native Challenge UI

**Frictionless flow (no UI change):** Authentication completes in the background. User proceeds directly to the order confirmation page. Do not show a loading state for frictionless flows that complete in < 1 second.

**Challenge flow:**

```
Step 1: Modal / Bottom Sheet Slides In
┌──────────────────────────────────────────────────┐
│  Additional Verification Required                 │
│                                                   │
│  Your bank requires a quick security check        │
│  before completing your payment.                  │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │  ← Bank-hosted ACS iframe
│  │   [Bank's OTP entry / biometric prompt]    │  │     (do not style interior)
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  [Loading spinner while ACS processes...]         │
│                                                   │
│  [Cancel payment]                                 │
└──────────────────────────────────────────────────┘

Step 2a: On Success
Modal closes automatically. Payment proceeds to confirmation.
Show brief transition: "Verification complete. Processing your payment…"

Step 2b: On Failure
┌──────────────────────────────────────────────────┐
│  Verification Unsuccessful                        │
│                                                   │
│  [Bank's error message — bank controls this copy] │
│                                                   │
│  [Try Another Card]     [Cancel]                  │
└──────────────────────────────────────────────────┘
```

| Property | Spec |
|---|---|
| Modal width | 480px desktop; full-width bottom sheet mobile |
| ACS iframe dimensions | Minimum 250×400px (EMVCo 3DS spec requirement for challenge window) |
| Timeout handling | If ACS does not respond in 60s: show "Verification timed out. Please try again or use a different card." |
| Redirect flow fallback | Full-page redirect to bank ACS URL; on return, process MD/PaRes tokens server-side; never show raw redirect URL to user |

#### 4. Error Message Standards Table

All payment errors must help users take corrective action without revealing security-sensitive information about the processing system. The word "fraud" must never appear in user-facing messaging.

| Internal Error | Compliant User-Facing Message | Banned |
|---|---|---|
| Insufficient funds | "Your card was declined. Please try a different card or contact your bank." | "Error: INSUF_FUNDS" |
| Card expired | "This card appears to have expired. Please check the expiry date or use a different card." | "Expiry date mismatch" |
| AVS mismatch | "We couldn't verify your billing address. Please check the details and try again." | "AVS_FAIL: street mismatch" |
| CVV mismatch | "The security code doesn't match. Please check the 3-digit code on the back of your card." | "CVV2 verification failed" |
| Processor timeout | "Something went wrong on our end. Your card has not been charged. Please try again." | "Gateway timeout 504" |
| Suspected fraud | "We weren't able to process this payment. Please contact your bank or try a different card." | "Fraud score exceeded threshold" |
| Card not found | "Payment could not be completed. Please try a different card." | "Card not found in database" |
| 3DS failure | "Your bank was unable to verify this payment. Please try again or contact your bank." | "3DS authentication failed: error code 1001" |

**Error display spec:** Inline form-level error, above the pay button. Red text, warning icon left. Never show error in the browser console or as a visible raw JSON response.

#### 5. SAQ-A Eligibility Checklist

- [ ] All card fields (card number, expiry, CVV) are rendered inside an iframe served from the payment processor's domain
- [ ] Merchant JavaScript has zero access to raw card data — processor iframe posts a token, not card data
- [ ] No custom card input components built by merchant engineering — all card UI is from the processor's SDK
- [ ] CSP (Content Security Policy) headers configured to allow only the processor's domain for payment iframe
- [ ] Merchant page does not store, log, or transmit card data in any form
- [ ] CVV field absent from saved card display — no masked CVV shown for previously saved cards
- [ ] SAQ-A scope formally confirmed with a qualified security assessor (QSA) before go-live
- [ ] Any product requirement to build a custom card input triggers a scope escalation conversation with the compliance officer and QSA before development begins

---

## Branch: ADA / Section 508

### Audit Mode (file path provided)

Read the provided file. Scan for the following ADA / Section 508 / WCAG 2.1 AA failures. Report each finding with: file location, violation description, the WCAG success criterion violated, severity (Critical / High / Medium), and a recommended fix.

**Scan checklist:**

| Check | Violation Pattern | WCAG / Section 508 Criterion |
|---|---|---|
| Missing skip-navigation link | No `<a href="#main-content">` or equivalent skip-nav as the first interactive element in the DOM | WCAG 2.4.1 — Bypass Blocks |
| Form inputs without programmatic labels | `<input>` elements with no associated `<label>` (via `for`/`id` or `aria-label` or `aria-labelledby`); placeholder-only labeling | WCAG 1.3.1 — Info and Relationships; 508 §1194.21(l) |
| Color-only error indicators | Error state conveyed only by red color change with no icon, text change, or `aria-invalid` attribute | WCAG 1.4.1 — Use of Color |
| Keyboard-inaccessible modals | Modal opened without `role="dialog"`, no focus trap implemented, or focus does not move into modal on open | WCAG 2.1.1 — Keyboard; 2.4.3 — Focus Order |
| Missing alt text | `<img>` elements without `alt` attribute, or with `alt=""` on informational images | WCAG 1.1.1 — Non-text Content; 508 §1194.22(a) |
| Focus-order violations | Visual reading order of interactive elements does not match DOM tab order (compare rendered layout vs. source order) | WCAG 2.4.3 — Focus Order |
| `outline: none` without replacement | CSS `outline: none` or `outline: 0` on focusable elements without a visible custom focus indicator | WCAG 2.4.7 — Focus Visible |
| Missing `aria-live` regions | Dynamic content updates (errors, status messages, loading states) injected into the DOM without an `aria-live` region | WCAG 4.1.3 — Status Messages |

Output a severity-ordered findings table. For each finding: file path, line (if determinable), criterion, description, fix.

---

### Generate Mode (brief provided)

Generate accessible component specs for four foundational patterns. Each spec includes HTML structure, ARIA, keyboard behavior, and screen reader announcement.

#### 1. Skip-Navigation Link

Allows keyboard and screen reader users to bypass repeated navigation and jump directly to main content.

```html
<!-- Must be the first interactive element in the DOM -->
<a href="#main-content" class="skip-nav">
  Skip to main content
</a>

<nav>...</nav>

<main id="main-content" tabindex="-1">
  <!-- Page content here -->
</main>
```

**CSS spec (visually hidden until focused):**
```css
.skip-nav {
  position: absolute;
  top: -100%;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  z-index: 9999;
  text-decoration: none;
}
.skip-nav:focus {
  top: 0;  /* visible on focus */
}
```

**Behavior:** Invisible until Tab is pressed; appears in top-left corner on focus; Enter navigates to `#main-content`; `tabindex="-1"` on `<main>` allows programmatic focus without adding it to the tab sequence.

#### 2. Form Field with Label, Hint Text, and Error State

All three states — default, hint, error — must be announced by screen readers. Placeholder text alone is never sufficient as a label.

```html
<!-- Default state -->
<div class="field">
  <label for="email">Email address</label>
  <span id="email-hint" class="hint-text">We'll send your receipt here.</span>
  <input
    type="email"
    id="email"
    name="email"
    aria-describedby="email-hint"
    autocomplete="email"
  />
</div>

<!-- Error state (add aria-describedby to point to error message) -->
<div class="field field--error">
  <label for="email">Email address</label>
  <span id="email-hint" class="hint-text">We'll send your receipt here.</span>
  <input
    type="email"
    id="email"
    name="email"
    aria-describedby="email-hint email-error"
    aria-invalid="true"
    autocomplete="email"
  />
  <span id="email-error" class="error-text" role="alert">
    ⚠ Enter a valid email address (example: name@domain.com)
  </span>
</div>
```

**Screen reader announcement order:** [label] → [hint text] → [field type] → [current value] → [error message if present]

**Visual spec:**
- Label: 14px medium weight, above field, 4px gap to input
- Hint text: 12px, muted color, 2px gap below label
- Error text: 12px, error color (#DC2626 or equivalent, verify 4.5:1 contrast), icon (⚠) before text — color is not the only indicator
- Input border on error: changes from default to error color + thickness increase (not color alone — thickness change is a shape change)
- `aria-invalid="true"` set on the input in error state

#### 3. Modal with Focus Trap and Return Focus on Close

Modal dialogs must trap focus within the dialog while open (correct, per APG modal dialog pattern) and return focus to the triggering element on close.

```html
<!-- Trigger button -->
<button id="open-modal-btn" type="button">Open Settings</button>

<!-- Modal (hidden by default) -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-heading"
  aria-describedby="modal-body"
  id="settings-modal"
  class="modal"
  tabindex="-1"
>
  <h2 id="modal-heading">Settings</h2>
  <p id="modal-body">Adjust your preferences below.</p>

  <!-- Modal content / interactive elements -->

  <button type="button" class="modal-close" aria-label="Close settings modal">
    ✕
  </button>
</div>
<div class="modal-backdrop" aria-hidden="true"></div>
```

**Focus management behavior:**
- On open: move focus to the modal container (`id="settings-modal"`) or its first interactive element
- While open: Tab and Shift+Tab cycle only within the modal — focus must not leave the modal. Implement focus trap by intercepting Tab keydown and wrapping from last to first focusable element
- On close (Esc key, close button, or backdrop click): remove modal from DOM (or `display: none`); return focus to `#open-modal-btn`
- Backdrop click to close: supported; does not count as keyboard trap since keyboard users use Esc
- `aria-modal="true"` signals to screen readers that content outside the modal is inert

**Keyboard behavior:**

| Key | Action |
|---|---|
| Tab | Move to next focusable element within modal; wrap to first if at last |
| Shift+Tab | Move to previous focusable element within modal; wrap to last if at first |
| Esc | Close modal and return focus to trigger |

#### 4. Data Table with Proper Scope Attributes

Tables conveying structured data must use semantic markup so screen readers can announce column and row headers in context.

```html
<table>
  <caption>Quarterly Sales by Region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>$1.2M</td>
      <td>$1.5M</td>
      <td>$1.8M</td>
      <td>$2.1M</td>
    </tr>
    <tr>
      <th scope="row">Europe</th>
      <td>$0.9M</td>
      <td>$1.1M</td>
      <td>$1.3M</td>
      <td>$1.6M</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$2.1M</td>
      <td>$2.6M</td>
      <td>$3.1M</td>
      <td>$3.7M</td>
    </tr>
  </tfoot>
</table>
```

**Key attributes:**
- `scope="col"` on `<th>` in `<thead>` — associates column headers with all cells below
- `scope="row"` on `<th>` in `<tbody>` row — associates row header with all cells in that row
- `<caption>` provides the table's accessible name; do not use `aria-label` on the `<table>` element as a substitute when `<caption>` works
- For complex tables (merged cells, multi-level headers): use `id` + `headers` attribute association instead of `scope`
- Sortable columns: add `aria-sort="ascending|descending|none"` to the active sort column header `<th>`

**Screen reader announcement:** "[Cell value], [column header], [row header]" — e.g., "$1.5M, Q2, North America"

---

## MCP Fallback

If any MCP tool call fails during execution of this command, continue using inline compliance knowledge. All HIPAA, PCI DSS, ADA, Section 508, and WCAG 2.1 references cited above are embedded in this command and do not require an external tool call to apply.

---

## What's Next

After generating or auditing this compliance spec, consider these follow-up commands:

- `/accessibility-audit` — run a deeper accessibility audit beyond the ADA patterns, covering full WCAG 2.1 AA automated and manual checks
- `/design-gdpr` — generate GDPR/CCPA-compliant consent flows, cookie banners, and data deletion request UI
- `/design-review` — critique the visual design of the generated components against design system standards
