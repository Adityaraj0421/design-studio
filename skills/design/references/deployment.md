# Deployment Reference

Guidance for deploying designed sites and applications via Firebase Hosting, including optimization and preview workflows.

## Table of Contents
1. [Preview Workflow](#preview-workflow)
2. [Firebase Hosting Setup](#firebase-hosting-setup)
3. [Optimization](#optimization)
4. [Production Checklist](#production-checklist)

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
