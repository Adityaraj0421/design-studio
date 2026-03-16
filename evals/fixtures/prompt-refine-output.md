> Command run: `/prompt-refine a woman in an office smiling -- tool: midjourney`

## Annotated Critique

**Tool identified:** Midjourney (from `--` flag syntax)

```
Original prompt:
"a woman in an office smiling"

Annotated:
"a woman ← [WEAK: no age, role, context, action — too generic]
 in an office ← [WEAK: no office type, no scene detail, no lighting]
 smiling ← [WEAK: fake-smile risk high — add to negatives; "genuine expression" is better positive]"

Missing: style token ← [MISSING: no visual treatment — editorial? corporate? lifestyle?]
Missing: lighting token ← [MISSING: no light source or quality]
Missing: camera token ← [MISSING: no lens, angle, or framing]
Missing: mood token ← [MISSING: no emotional register]
Missing: negative token ← [MISSING: no negatives — high risk of stock photo output]
Missing: aspect ratio ← [MISSING: no --ar specified]
```

**Issues found (5 of 8 checklist items flagged):**
- Subject too vague → stock photo risk
- Style, lighting, camera, mood tokens all absent
- No negatives → highest single factor in stock-photo-looking output
- No aspect ratio → defaults to square, may not suit intended use

---

## Optimized Prompt

```
## Optimized Prompt (Midjourney)
marketing director in her early 30s reviewing analytics on a laptop at a standing desk, modern open-plan office with plants and natural light, editorial photography, soft diffused window light from the left, 35mm lens slight low angle, focused and confident, genuine engaged expression --ar 16:9 --style raw --no stock photo, fake smile, posed look, harsh flash, watermarks, text, distorted hands

## Changes Made
- **Added:** "marketing director in her early 30s reviewing analytics on a laptop" — specificity eliminates generic stock-photo interpretation
- **Added:** "modern open-plan office with plants and natural light" — scene context replaces the empty "in an office"
- **Replaced:** "smiling" → "genuine engaged expression" + "fake smile" to negatives — smiling-on-command is the #1 stock cliché trigger
- **Added:** "editorial photography, soft diffused window light from the left, 35mm lens slight low angle, focused and confident" — fills all 4 missing token types
- **Added:** "--ar 16:9 --style raw" — LinkedIn/website hero ratio; raw mode prevents over-stylisation
- **Added:** "stock photo, fake smile, posed look, harsh flash, watermarks, text, distorted hands" — negative bank targeting known failure modes
- **Reordered:** Subject first (most weight), then style, then technical — earlier tokens carry more influence in Midjourney
```

---

## Cross-Tool Variant

```
## Cross-Tool Variant (DALL-E 3)
Create an editorial-style photograph of a marketing director in her early 30s, focused and confident, reviewing analytics on a laptop at a standing desk in a modern open-plan office with plants and natural light coming from the left. The lighting should be soft and diffused. Frame as a 16:9 landscape with the subject at slight low angle using a 35mm focal length feel. Do not include: fake smiles, stock photo poses, harsh flash, watermarks, text, or distorted hands.

## Translation Notes
1. No `--no` syntax in DALL-E 3 — negatives converted to natural language exclusions ("do not include")
2. `--style raw` has no DALL-E equivalent — replaced with "editorial-style photograph" instruction
3. `--ar 16:9` not a parameter — replaced with "16:9 landscape" in the instruction text
```
