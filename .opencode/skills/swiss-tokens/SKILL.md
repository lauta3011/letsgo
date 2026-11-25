---
name: Swiss Design Tokens
description: Use when adding or changing colors, typography, visual styling, or token usage in the portfolio
---

## Purpose

Keep all visual styling tied to the shared Swiss design tokens instead of local hardcoded values.

## Sources of truth

- `tailwind.config.js`: `theme.extend.colors.swiss` and `theme.extend.fontFamily.sans`.
- `src/layouts/Layout.astro`: CSS custom properties `--swiss-meeple`, `--swiss-olive`, `--swiss-plum`, `--swiss-lime`, and `--font-swiss`.

## Workflow

1. Read both sources above before writing any color or font declaration.
2. Reference tokens in code, e.g. `text-swiss-lime`, `bg-swiss-meeple`, `var(--swiss-olive)`, `var(--font-swiss)`.
3. Never hardcode a hex color or declare a per-component `font-family`; Michroma comes from `fontFamily.sans` / `--font-swiss`.
4. Use the palette by dominance: meeple most, olive next, plum next, lime least. Reserve lime for floating SVG figures/accents.
5. If the Tailwind values and the CSS custom properties disagree, flag the mismatch to the user. Do not "fix" it by hardcoding a color in a component.
6. Do not change token definitions unless the user explicitly asks.

## Checklist

- [ ] No new hex color or local font family in the component.
- [ ] Color usage follows the 60-30-10 dominance rule.
- [ ] Lime is only used for SVG accents.
- [ ] Any token mismatch was reported, not worked around.
