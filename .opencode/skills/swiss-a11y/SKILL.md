---
name: Swiss Markup Accessibility
description: Use when writing or reviewing section markup, headings, or visible text labels in the portfolio
---

## Purpose

Keep the Swiss-style refactor accessible and semantically correct.

## Workflow

1. Treat every visible text label as real content, not decoration: use the appropriate heading or text element (`h1`, `h2`, `h3`, `p`, etc.) instead of a styled plain `div`.
2. Keep exactly one `h1` on the page. Do not add a second one for visual reasons.
3. Maintain a logical heading hierarchy: no skipped levels, and section headings sit below the page `h1` in a sensible order.
4. Do not duplicate an existing heading just to achieve a styling effect. Reuse the single semantic element and style it.
5. When refactoring an existing section, preserve the current text and hierarchy unless the user explicitly asks to change them.
6. Summarize the heading outline after the change so the user can verify it.

## Checklist

- [ ] Visible labels use semantic elements.
- [ ] Exactly one `h1` remains on the page.
- [ ] No skipped or duplicated heading levels.
- [ ] No heading was duplicated for styling.
