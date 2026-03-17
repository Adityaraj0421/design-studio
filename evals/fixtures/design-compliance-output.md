# /design-compliance --regulation hipaa — Healthcare Portal

**Arguments:** --regulation hipaa "patient portal — appointment scheduling, medical record access, secure messaging"

Regulation detected: **HIPAA**
Mode: Generate (no existing file provided for audit)

---

## HIPAA Compliance Design Specification

Jurisdiction: United States — HIPAA Privacy Rule (45 CFR Part 164) + Security Rule
PHI in scope: Appointment details, medical records, provider messages, patient identifiers

---

## Section 1: PHI Field Marking and Handling

**Definition for this context:** PHI includes any individually identifiable health information — patient name, DOB, appointment dates, diagnosis codes, provider names, messages containing health information.

### Field-Level Classification

| Field | PHI Level | UI Treatment |
|---|---|---|
| Patient full name | High | Mask after 3s idle (show "J. Smith") |
| Date of birth | High | Masked by default; reveal on explicit tap |
| Appointment date/type | Medium | Visible in authenticated context; redacted in previews/notifications |
| Diagnosis / ICD codes | High | Never shown in list view; detail view only + explicit expansion |
| Prescription information | High | Pharmacy-context only; masked outside that flow |
| Provider name | Low | Visible — not individually sensitive in isolation |
| Secure message content | High | Preview truncated to 60 chars; full content requires explicit open |

### PHI Display Rules

```
1. Auto-masking: PHI fields auto-mask after 60 seconds of no interaction
   Implementation: CSS blur + JS timer; unmasked on user interaction
   ARIA: aria-label="Patient name — tap to reveal"

2. Notification redaction: Push/email notifications MUST NOT include PHI in subject or preview
   ✅ "You have a new message from your care team"
   ❌ "Dr. Smith replied: Your diabetes test results are..."

3. Screenshot protection: On iOS, trigger UIScreen.isCaptured check; blur PHI when screen recording active
   On Android: FLAG_SECURE on windows containing PHI

4. Clipboard: Never auto-copy PHI fields; warn user when they manually copy PHI
```

---

## Section 2: Session Timeout Design

**HIPAA Security Rule requirement (45 CFR §164.312(a)(2)(iii)):** Automatic logoff after a period of inactivity.

**Required timeout: 15 minutes of inactivity** (industry standard for healthcare portals; NIST recommends ≤15 minutes for PHI access)

### Timeout Warning Flow

```
[Inactivity timer: 15 minutes]
  ├─→ At 14:00 (1 minute remaining):
  │     Show warning banner: "Your session will expire in 1 minute due to inactivity."
  │     [Stay signed in]  [Sign out now]
  │     Banner: non-dismissable; yellow background; aria-live="assertive"
  │
  ├─→ User interacts → timer resets to 15:00
  │
  └─→ At 15:00 (timeout reached):
        Clear all PHI from memory and DOM
        Redirect to login page
        Show message: "Your session expired to protect your information."
        [Sign in again]
```

### Session Lock Screen (alternative to full logout)

For desktop/tablet contexts: show a lock screen overlay instead of full redirect.

```
[Full-screen overlay: blur + darken background]
┌────────────────────────────────────────┐
│                                        │
│  🔒 Session locked                     │
│                                        │
│  Your session was locked after         │
│  15 minutes of inactivity.             │
│                                        │
│  [Enter PIN]  or  [Sign in again]      │
└────────────────────────────────────────┘
```

---

## Section 3: Audit Log Display

**HIPAA Security Rule (45 CFR §164.312(b)):** Implement audit controls — hardware, software, or procedural mechanisms to record and examine activity in systems containing PHI.

### Audit Log UI (visible to patient)

Patient-facing "Access History" in Privacy Settings:

```
┌──────────────────────────────────────────────────────────┐
│  Your Record Access History                              │
│  Showing activity for the last 90 days                   │
├────────────────┬──────────────────────────────────────────┤
│  Date & Time   │  Action                                  │
├────────────────┼──────────────────────────────────────────┤
│  Mar 16, 10:22 │  You viewed your appointment history     │
│  Mar 15, 14:05 │  Dr. Chen accessed your medical record   │
│  Mar 15, 08:31 │  You sent a message to care team         │
│  Mar 12, 16:44 │  Lab results added to your record        │
├────────────────┴──────────────────────────────────────────┤
│  [Download full history (PDF)]  [Report suspicious access]│
└──────────────────────────────────────────────────────────┘
```

**Admin-facing audit log** (for covered entity compliance):
- Log entries: user_id, role, timestamp, action, record_accessed, IP address, session_id
- Retention: minimum 6 years (HIPAA §164.316(b)(2))
- Export: CSV + JSON for compliance reporting
- Anomaly alerts: flag access patterns outside normal hours or from new IP ranges

---

## Section 4: Access Control Display

**Role-based access visible to patients:**

```
Who can see your information:
├── Your Care Team
│   ├── Dr. Sarah Chen (Primary Care) — Full record access
│   ├── Dr. Michael Torres (Specialist) — Limited: referral records only
│   └── Nurse Practitioner Kim Davis — Schedule and vitals access
├── Billing Department — Insurance and payment data only
└── You — Full access to your own record
```

**Minimum necessary access principle (HIPAA):**
- Role definitions must enforce minimum necessary access — no "view all" roles in production
- Access requests beyond role scope require documented justification + approval workflow
- Role assignments visible to patients; patients can request access review

---

## Section 5: HIPAA Compliance Checklist

### Technical Safeguards (45 CFR §164.312)

- [ ] Unique user identification — no shared login credentials (§164.312(a)(2)(i))
- [ ] Automatic session logoff at 15 minutes of inactivity (§164.312(a)(2)(iii))
- [ ] Encryption of PHI in transit: TLS 1.2+ minimum, TLS 1.3 recommended (§164.312(e)(2)(ii))
- [ ] Encryption of PHI at rest: AES-256 minimum (§164.312(a)(2)(iv))
- [ ] Audit log records: all PHI access and disclosure events (§164.312(b))
- [ ] Audit log retention: minimum 6 years (§164.316(b)(2))
- [ ] Access control: role-based, minimum necessary principle (§164.312(a)(1))
- [ ] PHI redacted from push notifications and email previews
- [ ] Screenshot/screen recording protection on PHI-bearing screens
- [ ] Auto-masking of PHI after 60 seconds of inactivity in view

### Administrative Safeguards

- [ ] Business Associate Agreements (BAA) with all vendors processing PHI
- [ ] Breach notification procedure: patient + HHS notification within 60 days (§164.404)
- [ ] Workforce training documented for all staff with PHI access
- [ ] Sanctioning policy for workforce members who violate HIPAA
- [ ] Risk analysis conducted and documented (§164.308(a)(1))

### UI/UX Safeguards

- [ ] PHI auto-masking implemented on all patient-facing PHI fields
- [ ] Session timeout warning shown 1 minute before expiry
- [ ] Session lock screen for desktop/tablet contexts (blur overlay)
- [ ] Audit log accessible to patients in privacy settings
- [ ] Access revocation: patients can request removal of authorized access
- [ ] Secure messaging: end-to-end encrypted, no PHI in notification preview

---

## What's Next

- `/design-compliance --regulation pci` — design payment form isolation for in-portal billing
- `/design-compliance --regulation ada` — audit this portal against ADA/Section 508 requirements
- `/design-gdpr` — if serving EU patients, layer GDPR consent requirements onto this HIPAA baseline
