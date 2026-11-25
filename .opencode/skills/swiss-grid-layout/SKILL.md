---
name: Swiss Grid Layout
description: Use when creating or refactoring any portfolio section layout, grid columns, text spans, alternating positions, or mobile stacking behavior
---

## Purpose

Apply the portfolio's mobile-first Swiss grid rules to a section without changing its user-visible labels or text.

## Workflow

1. Identify every visible text block and every decorative/SVG block in the section.
2. Build the section as a grid; even small sections use a grid rather than ad-hoc spacing.
3. On desktop:
   - Use a 4-column grid for sections with several text pieces.
   - A text block takes 3/4 of the row (3 of the 4 columns).
   - Alternate the starting column of consecutive text components: col 1, then col 2, then col 1, and so on.
   - A 2-column grid is fine when the section only needs to split text into two pieces.
4. On mobile:
   - Rows containing more than one text block: each block takes the whole width, stacked.
   - Rows containing one text block plus empty space: keep the same positional behavior as desktop, but reduce the horizontal margin.
5. Do not add, remove, rename, or rewrite any label or text while restructuring the layout.
6. Report which components were changed and whether any visible copy stayed identical.

## Checklist

- [ ] Section is a grid.
- [ ] Desktop text spans 3/4 and alternates start column 1 / 2.
- [ ] Mobile stacking and reduced margin follow the rule above.
- [ ] No label or text was added or changed.
