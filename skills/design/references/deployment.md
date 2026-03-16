# Deployment Reference

Guidance for deploying designed sites and applications via Firebase Hosting, including optimization and preview workflows.

## Table of Contents
1. [Preview Workflow](#preview-workflow)
2. [Firebase Hosting Setup](#firebase-hosting-setup)
3. [Optimization](#optimization)
4. [Production Checklist](#production-checklist)
5. [Advanced Patterns](#advanced-patterns)
6. [Full Coverage](#full-coverage)

---

## Preview Workflow

### Using the Preview Server

The Preview MCP tools let you see designs live as you build. The workflow:

1. **Start the server**: Create a `launch.json` config if needed, then use `preview_start`
2. **Take screenshots**: Use `preview_screenshot` to capture the current state
3. **Inspect elements**: Use `preview_inspect` with CSS selectors to check exact styles
4. **Snapshot accessibility**: Use `preview_snapshot` for an accessibility tree view
5. **Test interactions**: Use `preview_click`, `preview_fill`, `preview_eval`
6. **Responsive testing**: Use `preview_resize` with presets (mobile, tablet, desktop)
7. **Dark mode**: Use `preview_resize` with `colorScheme: "dark"` to test

### launch.json Setup

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "design-preview",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["serve", "."],
      "port": 3000
    }
  ]
}
```

For single HTML files, a simple HTTP server works. For more complex builds:

```json
{
  "name": "vite-dev",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "dev"],
  "port": 5173
}
```

---

## Firebase Hosting Setup

### Initial Setup

Use the Firebase MCP tools to initialize hosting:

1. **Check environment**: `firebase_get_environment` — verify logged in and project active
2. **Initialize hosting**: `firebase_init` with hosting features
3. **Configure**: Set public directory, SPA routing, site ID

### firebase.json for Design Projects

Typical configuration for a static design project:

```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|avif)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      }
    ]
  }
}
```

### Deploy Commands

```bash
# Preview deploy (creates a temporary URL)
firebase hosting:channel:deploy preview

# Production deploy
firebase deploy --only hosting

# Deploy to a specific site (multi-site projects)
firebase deploy --only hosting:site-name
```

---

## Optimization

### Image Optimization

- Use **WebP** or **AVIF** for photos (30–50% smaller than JPEG)
- Use **SVG** for icons, logos, and illustrations
- Lazy-load below-the-fold images (`loading="lazy"`)
- Set explicit `width` and `height` to prevent layout shift
- Use `srcset` for responsive images

### Performance Targets

| Metric | Good | Needs work |
|--------|------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | > 4.0s |
| INP (Interaction to Next Paint) | < 200ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| Total page weight | < 500KB | > 2MB |
| Requests | < 30 | > 80 |

### CSS Optimization

- Inline critical CSS in `<head>` for above-the-fold content
- Load remaining CSS asynchronously
- Remove unused CSS (Tailwind's purge handles this automatically)
- Minify CSS in production builds
- Use `font-display: swap` for custom fonts

### Font Loading

```html
<!-- Preconnect to font CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load font with display swap -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Or self-host for better performance:
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

---

## Production Checklist

Before deploying a design to production:

### Content
- [ ] All placeholder text replaced with real content
- [ ] Images are optimized (WebP/AVIF, properly sized)
- [ ] Links point to correct destinations
- [ ] Forms have proper action URLs

### Visual
- [ ] Tested at mobile (375px), tablet (768px), desktop (1280px)
- [ ] Dark mode works correctly (if applicable)
- [ ] No horizontal scroll at any breakpoint
- [ ] Fonts load correctly (no FOUT/FOIT issues)
- [ ] Favicon and social meta images set

### Technical
- [ ] HTML validates (no major errors)
- [ ] Console is free of errors
- [ ] All assets load (no 404s)
- [ ] Page weight is under budget
- [ ] HTTPS configured

### SEO / Social
- [ ] `<title>` and `<meta description>` set
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Twitter Card meta tags
- [ ] Canonical URL if applicable
- [ ] `robots.txt` and `sitemap.xml` if applicable

### Accessibility
- [ ] Color contrast passes WCAG AA
- [ ] All images have alt text
- [ ] Page is keyboard navigable
- [ ] Screen reader announces content correctly
- [ ] Focus order is logical

---

## Advanced Patterns

### LCP Optimisation

LCP (Largest Contentful Paint) measures when the largest visible element loads. Target: < 2.5s.

**Identify the LCP element first:**
```javascript
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP element:', entry.element, entry.startTime);
  }
}).observe({type: 'largest-contentful-paint', buffered: true});
```
Usually: hero image, H1, or above-the-fold card image.

**Optimisation techniques by cause:**
| Cause | Fix |
|---|---|
| Large unoptimised image | WebP/AVIF, correct dimensions, `srcset` for responsive |
| Image not preloaded | `<link rel="preload" as="image" href="hero.webp">` |
| Render-blocking resources above fold | Move CSS inline for above-fold, defer non-critical JS |
| Slow server response | CDN, edge caching, server-side render above-fold content |
| Client-rendered LCP element | SSR or SSG the above-fold content — don't wait for JS hydration |

---

### CLS Optimisation

CLS (Cumulative Layout Shift) measures visual stability. Target: < 0.1.

**Reserve space for images — always:**
```html
<img src="hero.jpg" width="1200" height="600" alt="...">
<!-- or -->
<img style="aspect-ratio: 2/1" src="hero.jpg" alt="...">
```

**Font-caused CLS — use size-adjust:**
```css
@font-face {
  font-family: 'CustomFont';
  font-display: swap;
}
/* Fallback metrics matching — reduces FOUT layout shift */
@font-face {
  font-family: 'CustomFontFallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}
```

**Never insert content above existing content** after load — ads, banners, cookie notices that push content down are the #1 source of CLS. Use reserved space or overlay patterns instead.

---

### INP Optimisation

INP (Interaction to Next Paint) measures responsiveness. Target: < 200ms.

**The root cause:** Long tasks blocking the main thread. Any task >50ms can cause a bad INP.

**Break up long tasks — yield to the main thread:**
```javascript
// Instead of one long synchronous operation:
async function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    // Yield every 50 items to let the browser respond to input
    if (i % 50 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
}
```

**Defer non-critical JS:**
```html
<script src="analytics.js" defer></script>
<script src="chat-widget.js" defer></script>
```

**Use web workers for heavy computation** (JSON parsing, image processing, search indexing) — moves work off the main thread entirely.

**Optimise event handler duration:**
- Event handler itself should be fast (<50ms)
- Move heavy work to `requestAnimationFrame` or `requestIdleCallback`
- Debounce/throttle: search inputs (300ms), scroll handlers (16ms), resize (150ms)

---

### Font Loading Strategy

**The order of operations:**
```html
<!-- 1. Preconnect to font CDN (DNS + TLS ahead of time) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 2. Preload the critical weight (the one used above the fold) -->
<link rel="preload" as="font" href="/fonts/inter-400.woff2" crossorigin>

<!-- 3. Use font-display: swap with fallback metrics -->
```

**Variable fonts over multiple weights:** One file vs. 4–6 files. Significant HTTP request reduction.
```css
/* Instead of: inter-400.woff2, inter-500.woff2, inter-700.woff2 */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

**Self-hosting vs. CDN:**
- Self-hosting: better privacy (no third-party requests), controlled caching, no GDPR concerns
- CDN (Google Fonts): easier setup, but adds DNS lookup + potential GDPR issue in EU
- **For performance-critical sites:** self-host with preload

---

### Bundle Splitting Decisions

**Always split by route:**
```javascript
// Next.js — automatic. React Router:
const Dashboard = React.lazy(() => import('./Dashboard'));
const Settings = React.lazy(() => import('./Settings'));
```

**Component-level splitting (only for large components not needed on initial load):**
- Rich text editors (ProseMirror, Tiptap): ~200kb+ — always lazy load
- Chart libraries (Recharts, Chart.js): ~100kb+ — lazy load unless chart is above fold
- Date pickers, complex form components — evaluate size with `webpack-bundle-analyzer`

**Vendor chunk strategy:**
- Keep framework (React, Vue) in its own chunk — long-lived cache
- Group stable dependencies (lodash, date-fns) together
- Don't split everything — too many small chunks = too many HTTP requests

**What NOT to split:**
- Anything used above the fold (increases time to interactive)
- Small utilities (<10kb) — the request overhead outweighs the savings
- Code used on every page — no benefit to lazy loading universal code

---

## Full Coverage

### Performance Budget Framework

Set budgets before building, not after:

| Metric | Good | Needs work | Poor |
|---|---|---|---|
| LCP | < 2.5s | 2.5–4s | > 4s |
| CLS | < 0.1 | 0.1–0.25 | > 0.25 |
| INP | < 200ms | 200–500ms | > 500ms |
| Total JS (gzipped) | < 200kb | 200–400kb | > 400kb |
| Total page weight | < 1MB | 1–3MB | > 3MB |

**Enforcing budgets in CI:**
```javascript
// next.config.js — fail build if bundle exceeds budget
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// Or use bundlesize / size-limit package:
// "size-limit": [{ "path": ".next/static/chunks/main.js", "limit": "100 kB" }]
```

**What to do when you're over budget:**
1. Identify the largest contributors: `ANALYZE=true npm run build`
2. Are any large dependencies replaceable? (`moment.js` → `date-fns`, `lodash` → native)
3. Is anything being imported that isn't used? (tree-shaking, named imports)
4. Can any large component be lazy-loaded?

---

### Post-Deploy Monitoring Checklist

Run this after every production deploy:

- [ ] **Core Web Vitals (field data):** Check Google Search Console → Core Web Vitals (next day for fresh data)
- [ ] **Error rate baseline:** Compare error rate for 24h before vs. 24h after deploy
- [ ] **API response times:** P50, P95, P99 for key endpoints — look for regressions
- [ ] **404 check:** Any linked pages returning 404? (broken by redirect or rename)
- [ ] **Accessibility regression:** Run axe or Lighthouse accessibility audit on 3 key pages
- [ ] **Mobile check:** Test on a real device or BrowserStack, not just resized desktop
- [ ] **Monitoring alert thresholds:** LCP alert if > 4s, error rate alert if > 2%, set in your monitoring tool

---

### A/B Testing Infrastructure

**Three splitting methods:**
| Method | How it works | CLS risk | Best for |
|---|---|---|---|
| Client-side | JS loads, decides variant, renders | High (flash of wrong variant) | Quick experiments, low-traffic pages |
| Server-side | Server decides variant before HTML | None | High-traffic, conversion-critical pages |
| Edge (CDN) | Edge function decides before response | None | Best performance, requires edge-compatible infra |

**Flicker prevention for client-side:**
```javascript
// Anti-flicker snippet — hide body until variant is determined
document.documentElement.style.opacity = '0';
// (After variant assigned and applied:)
document.documentElement.style.opacity = '1';
```

**Holdout groups:** Keep 5–10% of users out of all experiments. This measures the cumulative effect of all your tests combined — your "total experimentation lift."

**Variant pollution prevention:** Use the same user → same variant mapping across sessions. A user who saw variant B on Monday should see variant B on Thursday. Inconsistency contaminates results.

---

## Handoffs

- **Framework Specialist** — Build configuration, environment variable specs, and CI pipeline requirements handed off before first deploy attempt
- **Product Designer** — Staging environment URL and deploy checklist handed off when staging is ready for visual sign-off
- **UI Designer** — Deploy-gated visual verification tasks (check production renders correctly at all breakpoints) handed off post-deploy
- **Design System Lead** — Token file build artifacts and CDN paths handed off when design tokens are published to production
- **UX Researcher** — Production analytics access and event tracking confirmation handed off when instrumentation is verified live
