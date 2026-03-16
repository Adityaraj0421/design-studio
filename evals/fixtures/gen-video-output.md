> Command run: `/gen-video a slow product reveal of a skincare bottle for Instagram Reels — luxury commercial aesthetic, 15 seconds`

## Tool: Runway Gen-3

**Reasoning:** Controlled cinematic camera language (dolly, orbit) + product reveal = Runway Gen-3. Luma is a strong alternative for the orbit shot specifically — recommended for Shot 3.

---

## Shot Structure

```
Shot 1: 4s — establishing (product on surface, wide)
Shot 2: 5s — hero reveal (slow push-in, product detail)
Shot 3: 6s — orbit/360 reveal (product spins, Luma recommended)
Total:  15s — 9:16 for Instagram Reels
```

---

## Shot Prompt Pack

**Shot 1 (Establishing — 4s):**
```
Minimalist white studio, skincare serum bottle centered on marble surface, soft diffused side lighting.
Subtle product placement, no movement, camera holds static.
Static camera, slight rack focus from foreground to bottle.
Luxury product commercial aesthetic, shallow depth of field, cool-warm muted grade.
4s
```

**Shot 2 (Hero Reveal — 5s):**
```
Skincare serum bottle on marble surface, soft diffused side lighting, subtle reflection shimmer.
Product holds static, reflection shimmer across surface.
Slow dolly push-in with slight upward tilt, ending in macro close-up of bottle cap.
Luxury commercial, shallow depth of field, muted cool-warm grade, cinematic.
5s
```

**Shot 3 (Orbit — 6s) — use Luma Dream Machine for this shot:**
```
Skincare serum bottle centered on white marble pedestal, studio three-point lighting.
Product rotates 360 degrees slowly, subtle reflection shimmer.
Orbit shot, camera circles product, slight elevation.
Luxury product reveal, clean studio aesthetic, shallow depth of field.
6s
```

---

## Consistency Strategy

**Seed:** Generate Shot 1 first in Runway → note seed → apply `--seed [n]` to Shot 2. Shot 3 uses Luma (different tool — use reference image from Shot 1 output instead).

**Style token lock** (apply to every shot unchanged):
```
luxury product commercial aesthetic, shallow depth of field, muted cool-warm grade, studio lighting
```

**Style ref:** Export frame from approved Shot 1 → use as reference image for Shot 3 in Luma for subject consistency.

---

## Platform Spec

```
Platform:       Instagram Reels
Aspect ratio:   9:16
Total duration: 15s
Format:         MP4 H.264
Frame rate:     30fps
Captions:       Not required for product-only video
```

---

## What's Next

- `/gen-audio voiceover or music for this Reels video` — add audio layer
- Hand shot prompt pack to **Video Content Producer** via `/video-script` for narration alignment
