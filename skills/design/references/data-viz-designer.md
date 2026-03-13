# Data Visualization Designer

Specializes in translating raw data into clear, accurate, and beautiful visualizations. Selects the right chart type, applies perceptually safe color systems, handles edge cases, and ensures accessibility across all chart formats.

---

## Chart Type Selection Guide

Choosing the wrong chart is the most common data viz mistake. Match the chart to the data relationship being communicated.

| Relationship | Chart type | When to use |
|-------------|-----------|-------------|
| **Change over time** | Line chart | Continuous time series, trends |
| **Change over time** | Bar chart (vertical) | Discrete time periods (months, quarters) |
| **Change over time** | Area chart | Cumulative values, emphasize magnitude |
| **Part-to-whole** | Donut/Pie | Max 5 slices, percentages sum to 100 |
| **Part-to-whole** | Stacked bar | Part-to-whole across multiple categories |
| **Part-to-whole** | Treemap | Hierarchical proportions |
| **Comparison** | Grouped bar | Compare multiple series side-by-side |
| **Comparison** | Bullet chart | Single metric vs. target |
| **Distribution** | Histogram | Frequency distribution of one variable |
| **Distribution** | Box plot | Distribution with outliers |
| **Correlation** | Scatter plot | Relationship between 2 numeric variables |
| **Correlation** | Bubble chart | Relationship between 3 variables |
| **Ranking** | Horizontal bar | Ranked categories with long labels |
| **Geographic** | Choropleth map | Regional data with color encoding |
| **Flow/Process** | Sankey diagram | Flow quantities between stages |
| **KPI snapshot** | Stat card | Single metric with trend indicator |

**Anti-patterns to avoid:**
- 3D charts (distort perception of area/angle)
- Pie charts with > 5 slices (use bar instead)
- Dual Y-axes (misleading scale comparisons — use separate charts)
- Truncated Y-axes (starting at non-zero amplifies differences)
- Too many data series on one line chart (> 5–7 lines = spaghetti)

---

## Color System for Data

**Never use default chart library colors** — they're rarely accessible or brand-consistent.

### Sequential palette (one variable, increasing value)
```css
/* Single-hue ramp — works for choropleth, heatmaps */
--data-seq-1: #dbeafe;  /* lightest */
--data-seq-2: #93c5fd;
--data-seq-3: #3b82f6;
--data-seq-4: #1d4ed8;
--data-seq-5: #1e3a8a;  /* darkest */
```

### Diverging palette (values diverge from a midpoint)
```css
/* Red-to-Blue through neutral — for profit/loss, sentiment */
--data-div-neg-2: #dc2626;
--data-div-neg-1: #fca5a5;
--data-div-mid:   #f3f4f6;
--data-div-pos-1: #93c5fd;
--data-div-pos-2: #1d4ed8;
```

### Categorical palette (distinct series — up to 8)
```css
/* Colorblind-safe 8-color categorical palette */
--data-cat-1: #2563eb;   /* blue */
--data-cat-2: #16a34a;   /* green */
--data-cat-3: #dc2626;   /* red */
--data-cat-4: #d97706;   /* amber */
--data-cat-5: #7c3aed;   /* violet */
--data-cat-6: #0891b2;   /* cyan */
--data-cat-7: #db2777;   /* pink */
--data-cat-8: #4b5563;   /* gray */
```

### Accessibility rules
- Minimum 3:1 contrast between adjacent categorical colors
- **Never rely on color alone** — add pattern fills, labels, or icons as redundant encoding
- Test in deuteranopia/protanopia simulation: red-green pairs are inaccessible (use blue-orange or use patterns)
- Label data points directly on the chart when possible (reduces dependency on color legend)

---

## Chart Annotation Patterns

Annotations turn charts from "here's data" into "here's the story."

**Annotation types:**
- **Reference line**: "Average", "Target", "Previous period"
- **Event marker**: "Product launch", "Policy change" with vertical line + label
- **Callout**: Arrow pointing to outlier or interesting data point with text
- **Range highlight**: Shaded band for a significant time period
- **Threshold**: Horizontal line at a critical value (e.g., "Capacity limit")

**Annotation placement rules:**
- Avoid overlapping data — place annotations outside the chart area or use leader lines
- Use a muted annotation color (gray) so it doesn't compete with the data
- Keep annotation text concise: 3–5 words maximum

---

## Responsive Chart Patterns

Charts break on mobile because of fixed pixel widths, small font sizes, and dense axes.

**Mobile adjustments:**
- Switch to `width: 100%; height: auto` (percentage-based sizing)
- Reduce tick density: every 3rd label on x-axis at mobile width
- Simplify legends: move from side legend to bottom legend at < 600px
- Switch horizontal bar chart labels to abbreviations on small screens
- Hide secondary series on very small screens (show top 3 of 8 series)

**Implementation pattern (Chart.js):**
```javascript
const chart = new Chart(ctx, {
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: window.innerWidth < 600 ? 'bottom' : 'right'
      }
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: window.innerWidth < 600 ? 4 : 8,
          font: { size: window.innerWidth < 600 ? 10 : 12 }
        }
      }
    }
  }
});
```

---

## Library Recommendations

| Library | Best for | Bundle size | Notes |
|---------|---------|-------------|-------|
| **Chart.js** | General purpose, quick setup | ~200KB | Canvas-based, responsive, easy to customize |
| **D3.js** | Complex custom viz, animations | ~300KB | SVG-based, steep learning curve, full control |
| **Recharts** | React projects | ~300KB | React components, composable API |
| **Visx** | React + D3 hybrid | ~100KB+ | Low-level, high performance |
| **Highcharts** | Enterprise, accessibility | ~400KB | WCAG compliant, many chart types |
| **Vega-Lite** | Declarative grammar | ~500KB | JSON-spec based, great for exploration |

**Rule:** Match the library to the project. For simple dashboards, Chart.js is the right choice. For custom interactive visualizations, D3. For React component libraries, Recharts or Visx.

**Vanilla/CSS charts (no library):**
- Bar charts: CSS `height` percentage on divs
- Sparklines: SVG `<polyline>` with calculated points
- Progress bars: `<progress>` element or width: X%
- Stat cards: No library needed

---

## Chart Accessibility

Charts must be accessible to users who cannot perceive the visual.

**Required for every chart:**
```html
<!-- SVG charts: title + description -->
<svg role="img" aria-labelledby="chart-title chart-desc">
  <title id="chart-title">Monthly Revenue — 2026</title>
  <desc id="chart-desc">
    Line chart showing monthly revenue from Jan to Dec 2026.
    Revenue grew from $42K in January to $89K in December,
    with a dip in March following the product relaunch.
  </desc>
  ...
</svg>

<!-- Canvas charts: provide a data table fallback -->
<figure>
  <canvas id="revenue-chart" aria-labelledby="chart-title"></canvas>
  <figcaption id="chart-title">Monthly Revenue 2026</figcaption>
  <details>
    <summary>View data table</summary>
    <table>...</table>
  </details>
</figure>
```

**Additional requirements:**
- Color is never the only differentiator (use labels, patterns, or shapes)
- Interactive tooltips must be keyboard accessible
- Minimum 14px font size for chart labels and tick marks
- Sufficient contrast for grid lines (at least 1.5:1 against background)

---

## Empty States and Loading

Charts need thoughtful empty and loading states.

**Empty state (no data yet):**
- Show chart skeleton at correct dimensions
- Message: "No data yet — [action to generate data]"
- Never show an empty chart area with no explanation

**Loading state:**
- Animated shimmer/skeleton at chart dimensions (prevents layout shift)
- Skeleton should match the general shape of the loaded chart

**Error state:**
- "Unable to load data" with retry button
- Show stale data with warning if available (prefer showing something over nothing)

**Zero/negative data:**
- Y-axis must start at zero for bar charts showing amounts
- Explicitly handle negative values in scales and colors (diverging palette)

---

## QA Checklist

- [ ] Correct chart type for the data relationship
- [ ] Accessible color palette (colorblind-safe, not color-only encoding)
- [ ] Chart has title, axis labels, and units
- [ ] Legend is readable (position, font size, color swatches)
- [ ] Tooltips work on hover and keyboard focus
- [ ] ARIA title/description on SVG charts; data table for canvas charts
- [ ] Responsive at 375px, 768px, 1280px (tick density, legend position)
- [ ] Empty state, loading state, and error state designed
- [ ] No 3D charts, no dual Y-axes, no truncated Y-axis without explicit justification
- [ ] Annotations explain key insights in the data

---

## Handoffs

- **To Dashboard Architect**: Provide chart type, data schema, and color palette before layout work begins
- **To UI Designer**: Chart components should use design system color tokens, not hardcoded hex values
- **To Content Designer**: Axis labels, tooltips, and chart titles need review for clarity and plain language
