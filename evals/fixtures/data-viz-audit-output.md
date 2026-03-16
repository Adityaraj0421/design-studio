# /data-viz-audit output — Lumina SaaS Revenue by Channel

**Input:** Pie chart showing "Revenue by Channel" — 8 slices (Direct, SEO, Paid Search, Referral, Social, Email, Affiliate, Other). Provided dashboard context: SaaS analytics dashboard with MRR, churn, and active users KPI row.

---

## Phase 1 — Chart Quality Audit

### chart-type

**chart-type:** ❌ Anti-pattern detected — pie chart with 8 slices exceeds the 5-slice limit.

With 8 categories, a pie chart cannot be read accurately. Slices below ~5% are visually indistinguishable. The data relationship is a **part-to-whole comparison across many categories** — the correct chart is a **horizontal bar chart**, sorted descending by revenue.

**Recommended replacement:** Horizontal bar chart (Chart.js `type: 'bar'` with `indexAxis: 'y'`)

### palette

**palette:** ❌ colorblind-unsafe palette detected — the current chart uses red (#e74c3c) at position 3 (Paid Search) and green (#2ecc71) at position 5 (Email) without any redundant encoding (no patterns, no direct labels on slices).

This red-green pair is the most common form of colorblind inaccessibility (affects ~8% of male users). Fix: replace with the categorical colorblind-safe palette, or add direct value labels to each bar so color is not the sole encoding.

Corrected CSS:
```css
--data-cat-1: #2563eb; --data-cat-2: #16a34a; --data-cat-3: #dc2626;
--data-cat-4: #d97706; --data-cat-5: #7c3aed; --data-cat-6: #0891b2;
--data-cat-7: #db2777; --data-cat-8: #4b5563;
```

### annotation

**annotation:** ❌ No annotation present — the largest revenue channel (Direct, 34%) is not called out.

Add a callout annotation on the top bar: **"Direct: 34% — largest channel"**. In Chart.js this can be achieved with `chartjs-plugin-annotation` or a custom `afterDraw` hook.

### anti-pattern

**anti-pattern:** ❌ Two anti-patterns flagged:
1. Pie chart with > 5 slices (8 slices) — use horizontal bar instead
2. Red-green color pair without redundant encoding — colorblind accessibility failure

---

## Phase 2 — dashboard-fit

**dashboard-fit:** Dashboard context provided (SaaS analytics: MRR, churn, active users KPI row).

- **Hierarchy placement:** Level 2 (chart area) — this is a supporting breakdown, not a primary KPI. Correct level.
- **Slot recommendation:** Secondary slot (1/3 width) — "Revenue by Channel" supports the MRR KPI card; the primary (2/3) slot should show the MRR trend line over time.
- **Filter bar alignment:** The date range filter on the dashboard should control this chart's data window. Ensure the chart re-fetches when the global date range changes — do not add a standalone date picker to this chart.
- **KPI coordination:** The MRR KPI card and this chart are well-coordinated (both show revenue). No conflicts detected.

---

## rewrite

**rewrite:** Corrected Chart.js config replacing the pie chart with an accessible horizontal bar:

```js
// FIX: pie → horizontal bar chart (anti-pattern: 8-slice pie)
// FIX: colorblind-unsafe palette → categorical colorblind-safe palette
const revenueByChannelChart = {
  type: 'bar',
  data: {
    labels: ['Direct', 'SEO', 'Paid Search', 'Referral', 'Social', 'Email', 'Affiliate', 'Other'],
    datasets: [{
      label: 'Revenue by Channel',
      data: [34, 22, 18, 10, 7, 5, 3, 1],
      backgroundColor: [
        '#2563eb', '#16a34a', '#dc2626', '#d97706',
        '#7c3aed', '#0891b2', '#db2777', '#4b5563'
      ],
    }]
  },
  options: {
    indexAxis: 'y',  // FIX: horizontal bar for ranking with long labels
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.x}% of total revenue`
        }
      }
    },
    scales: {
      x: { title: { display: true, text: '% of Total Revenue' } }
    }
  }
};
```
