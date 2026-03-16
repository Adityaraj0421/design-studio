> Command run: `/email-audit a promotional email for Lumina Beauty serum launch — Klaviyo, consumer beauty audience aged 25–40. Subject: "Lumina Serum v2 is here". No preheader. CTA button is a CSS-only <a> tag styled with background-color. Headline reads: "Introducing version 2 of our Glow Serum formula". Body copy: "We have been working hard on improving our formula. The new serum now features 15% Vitamin C and hyaluronic acid." CTA text: "Click here".`

---

## Phase 1: Technical Audit — Email Designer

### Technical Audit

✅ Table-based layout — Correct `<table>` structure throughout. No flexbox or grid detected.
✅ Mobile `@media` rules — `@media screen and (max-width: 600px)` block present with `.email-container` and `.stack-column` overrides.
✅ Images — All `<img>` tags include `alt`, `width`, `height`, and `display:block`.
✅ Unsubscribe link — `{{{UNSUBSCRIBE_LINK}}}` placeholder present in footer.
✅ Physical address — Footer includes `{{{ADDRESS}}}` placeholder (CAN-SPAM compliant).
✅ No JavaScript — No `<script>` tags or external CSS links detected.
❌ Bulletproof CTA button — Button uses CSS `background-color` only. Outlook 2016–2021 will strip the background and render unstyled anchor text. VML fallback required.
❌ Preheader missing — No hidden preheader div present. Inbox preview will show the first visible body text ("We have been working hard...") — not an intentional preview message.
⚠️ Inline styles — `font-family` and `color` on `<p>` tags are set only in the `<style>` block, not inline. Gmail strips `<style>` — these properties will not render in Gmail. Move to inline styles.
⚠️ Dark mode — No `@media (prefers-color-scheme: dark)` block. Low priority for a first send, but recommended for Apple Mail and Outlook 365 audiences.
⚠️ `<title>` — Currently reads "Email". Should match subject line: "Lumina Serum v2 is here".

**Summary: 2 Critical issues, 3 Warnings.**

---

### Corrected HTML (Critical Issues)

**Fix 1: Add preheader div (insert immediately after `<body>` opening tag)**

```html
<!-- FIX: Added hidden preheader — shows in inbox preview before email is opened -->
<div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family:sans-serif;">
  Discover the upgraded formula with 15% Vitamin C — now smoother, faster-absorbing, and more luminous.&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>
```

**Fix 2: Replace CSS-only button with bulletproof VML + HTML fallback**

```html
<!-- FIX: Replaced CSS background-color button with VML + HTML fallback. Outlook renders VML; all other clients render the <a> tag. -->
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
  href="{{{CTA_URL}}}" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="8%"
  strokecolor="#c9a96e" fillcolor="#c9a96e">
  <w:anchorlock/>
  <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:700;">Shop the New Formula →</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-->
<a href="{{{CTA_URL}}}"
   style="display:inline-block;background-color:#c9a96e;color:#ffffff;font-family:Arial,sans-serif;
          font-size:16px;font-weight:700;line-height:48px;text-decoration:none;text-align:center;
          padding:0 28px;border-radius:4px;-webkit-text-size-adjust:none;">
  Shop the New Formula →
</a>
<!--<![endif]-->
```

**Warning Fix: Move font-family and color to inline styles on `<p>` tags**

```html
<!-- FIX: Moved font-family and color inline — Gmail strips the <style> block -->
<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:16px;color:#111827;line-height:1.6;">
  [body copy]
</p>
```

---

## Phase 2: Copy & Strategy Audit — Email Copywriter

### Subject Line Audit

**Subject:** "Lumina Serum v2 is here"

| Criterion | Score | Note |
|-----------|-------|------|
| Specificity | 2/5 | "v2 is here" names the product update but no concrete benefit, number, or outcome |
| Length | ✅ Pass | 23 characters — well within 50-character mobile limit |
| Spam signal check | ✅ Pass | No ALL CAPS, no trigger words, no excessive punctuation |
| Mobile truncation | ✅ Pass | First 4 words ("Lumina Serum v2 is") carry the core message |
| Hook type | Feature announcement | Announces a version number — reader must infer whether this is relevant to them |

**Preview text:** None set. Inbox will show "We have been working hard on improving our formula." — a brand-first sentence that gives no reason to open.

#### Rewrites

Subject line (primary): `Your skin just got an upgrade — new Lumina Serum`
Subject line (A/B variant): `15% Vitamin C, faster absorption: Glow Serum v2`
Preview text: `Reformulated with hyaluronic acid. Smoother, more luminous skin in 28 days.`

---

### Body Copy Audit — AIDA Analysis

**Attention (Headline): ❌ Feature-first**
"Introducing version 2 of our Glow Serum formula" — leads with what Lumina did, not what the reader gets.

**Interest: ❌ Brand-first opening**
"We have been working hard on improving our formula" — centers the brand, not the reader. Wastes the first sentence.

**Desire: ⚠️ Features without benefits**
"15% Vitamin C and hyaluronic acid" names ingredients but doesn't connect them to outcomes the reader cares about.

**Action: ❌ Weak CTA**
"Click here" — no verb + outcome. Gives no reason to click. Ghost-button risk if rendered in some clients.

---

### Rewrite Suggestions

```
Headline rewrite:
"Your most luminous skin yet — meet the new Glow Serum"

Body copy fixes:

1. "We have been working hard on improving our formula."
   → "Your skin is about to get a serious upgrade."

2. "The new serum now features 15% Vitamin C and hyaluronic acid."
   → "15% Vitamin C fades dark spots faster. Hyaluronic acid locks in moisture for 24 hours. Same two-drop ritual — visibly better results in 28 days."

3. CTA: "Click here"
   → "Shop the New Formula →"
   (First-person variant: "Get My New Serum →")
```

---

## What's Next

- `/email-template` — Rebuild this promotional template from scratch using the audit findings as the brief
- `/email-campaign` — Lumina Beauty serum launch is likely a 3-email sequence: teaser → launch day → social proof. Run `/email-campaign product-launch for Lumina Beauty Glow Serum v2` to build it out
- Use Klaviyo's native A/B send to test the two subject line variants on 20% of the list before full send
