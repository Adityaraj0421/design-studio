# /design-framework react-tailwind — Lumina Landing Page Components

**Input:** `design-output.html` (Lumina SaaS analytics landing page)
**Framework:** React + Tailwind CSS

---

## Files to Create

### src/components/LandingPage.tsx

```tsx
import { HeroSection } from './HeroSection'
import { FeatureGrid } from './FeatureGrid'
import { PricingSection } from './PricingSection'
import { SiteNav } from './SiteNav'
import { SiteFooter } from './SiteFooter'

export function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SiteNav />
      <HeroSection />
      <FeatureGrid />
      <PricingSection />
      <SiteFooter />
    </main>
  )
}
```

### src/components/SiteNav.tsx

```tsx
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
}

function NavLink({ href, children, active }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'text-sm font-medium px-3 py-1.5 rounded-md transition-colors',
        active
          ? 'text-navy-500'
          : 'text-gray-600 hover:text-navy-500'
      )}
    >
      {children}
    </a>
  )
}

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[72px] flex items-center">
      <div className="max-w-[1280px] mx-auto px-6 w-full flex items-center gap-8">
        <a href="/" className="flex items-center" aria-label="Lumina home">
          <img src="/logo.svg" alt="Lumina" width={120} height={32} />
        </a>
        <ul className="flex gap-1 list-none m-0 p-0" role="list">
          <li><NavLink href="/features">Features</NavLink></li>
          <li><NavLink href="/pricing">Pricing</NavLink></li>
          <li><NavLink href="/docs">Docs</NavLink></li>
        </ul>
        <div className="ml-auto flex gap-2 items-center">
          <a href="/login" className="text-sm font-semibold text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Log in
          </a>
          <a href="/signup" className="text-sm font-semibold text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">
            Start Free Trial
          </a>
        </div>
      </div>
    </nav>
  )
}
```

### src/components/HeroSection.tsx

```tsx
interface HeroProps {
  headline?: string
  subtext?: string
  ctaPrimary?: string
  ctaSecondary?: string
}

export function HeroSection({
  headline = 'Your data, made clear',
  subtext = 'Lumina turns complex analytics into dashboards your whole team actually uses.',
  ctaPrimary = 'Start Free Trial',
  ctaSecondary = 'See Live Demo',
}: HeroProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl lg:text-[56px] font-bold text-navy-500 leading-[1.1] text-balance">
          {headline}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
          {subtext}
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href="/signup" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors">
            {ctaPrimary}
          </a>
          <a href="/demo" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
            {ctaSecondary}
          </a>
        </div>
      </div>
      <div className="hidden lg:block">
        <img src="/dashboard-preview.png" alt="Lumina dashboard preview" className="rounded-xl shadow-2xl w-full" />
      </div>
    </section>
  )
}
```

---

## Setup

```bash
npm install clsx tailwind-merge
```

Add to `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          500: '#1E3A5F',
          700: '#102237',
        },
      },
    },
  },
} satisfies Config
```

Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Usage

```tsx
// app/page.tsx (Next.js App Router)
import { LandingPage } from '@/components/LandingPage'

export default function HomePage() {
  return <LandingPage />
}
```

---

## What's Next

- `/design-review` — audit the original HTML for issues before deploying
- `/design-system` — extract tokens into a reusable system
