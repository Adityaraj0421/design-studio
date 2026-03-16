> Command run: `/gen-image a skincare serum bottle on marble surface for Lumina Beauty — editorial photography style, Instagram feed post`

## Tool: Midjourney

**Reasoning:** Editorial product photography with lifestyle aesthetic — Midjourney. No text-in-image required, not an Adobe ecosystem brief. `--style raw` keeps output grounded and product-accurate rather than over-stylised.

---

## Primary Prompt

```
glass skincare serum bottle centered on white veined marble surface, editorial product photography, soft diffused side lighting with subtle shadow detail, 45mm macro lens slight low angle, sophisticated and minimal, muted neutral palette --ar 4:5 --style raw --q 2 --no watermarks, text, distorted reflections, oversaturated, stock photo look, cluttered background
```

---

## Variation A — shifted mood/lighting

```
glass skincare serum bottle on marble surface with dried botanicals scattered, editorial photography, warm golden hour window light casting long shadows, 50mm lens eye level, clean and organic, warm cream tones --ar 4:5 --style raw --q 2 --no watermarks, text, artificial light, harsh flash, oversaturated
```

## Variation B — shifted style/camera angle

```
glass skincare serum bottle on white marble slab, flat lay overhead editorial photography, even studio diffused lighting, 35mm top-down, modern minimalist, cool white palette with single botanical accent --ar 1:1 --style raw --q 2 --no watermarks, text, cluttered props
```

---

## Negative Prompt Bank

For this campaign, keep these negative tokens consistent across all Lumina assets:
```
watermarks, text, distorted reflections, oversaturated, stock photo look, cluttered background, harsh flash, artificial light, fake smile, cliché pose
```

---

## Seed Strategy

Capture seed after first approved generation (Midjourney job info → `--seed [n]`). Apply the same seed to all Lumina campaign assets to maintain visual DNA. Store in brand prompt library: `lumina-beauty/seeds.md`.

Recommend: generate 4-image grid with `--v 6.1`, approve one, anchor seed for full campaign.

---

## Platform Spec

| Platform | Aspect Ratio | Export Size | Notes |
|----------|-------------|------------|-------|
| Instagram Feed Post | 4:5 | 1080×1350px | Optimal for feed real estate |
| Instagram Square | 1:1 | 1080×1080px | Use Variation B prompt with --ar 1:1 |
| Instagram Stories | 9:16 | 1080×1920px | Extend canvas in post; generate at 4:5 first |

---

## What's Next

- `/prompt-refine [paste primary prompt]` — iterate and optimise if output needs refinement
- `/gen-moodboard Lumina Beauty product launch` — if campaign direction isn't locked yet
