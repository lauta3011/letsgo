# Hello agentic world.

## Description

This is a website for my portfolio, the work to be done here is a refactor of the UI from the current UI to a mobile first Swiss-style one.

## Approach
The design of every section must be a grid, it can be from different sizes, 2 cols for some components to divide pieces of texts, 4 cols for some others but the texts must take 3/4 of the row switching the position of start from col 1 or col 2 alternating from component to component, when viewport is mobile the rows that has more than a div with texts must taxe the whole columns each div, the rest of them that has only one div with text and then blank space should be following the same behaviour as mentioned with a reduced horizontal margin. 


All new components should be created under /src/components/[component_name]/[component_name].tsx. The color palette to follow is the next for the designs, from use the most to use the least, like a rule of 60-30-10 and a forth color for the svg figures floating around, the colors are: [ #092328, #12544F, #2A835F, #8BBB92 ]

Most text uses the Michroma font. Theme tokens (the swiss color palette and the font) are centralized: the `swiss.*` colors and `fontFamily.sans` (Michroma) live in `tailwind.config.js`, and the same values are mirrored as CSS custom properties (`--swiss-*`, `--font-swiss`) in the global styles of `src/layouts/Layout.astro`. Always reference these shared tokens (e.g. `text-swiss-lime`, `var(--swiss-olive)`) instead of hardcoding hex values or per-component font families.

Accessibility (a11y) matters: use correct semantic markup so the page is accessible. Refer to visual text labels with real heading/tag elements rather than plain divs; keep exactly one `h1` per page and structure headings in a logical hierarchy. Do not duplicate headings just for styling.

## Examples 
- newLabelExample: for example if a component displaying only "web dev" but is a mess and needs refactor, do the refactors but dont change the label or add more, the "information displayed for the user" must remain the same.

## DO NOT LIST
- dont add new libraries.
- dont add new code in terms of labels or texts (if needs example see "newLabelExample") 
- implement only what is asked for. when the user asks for a component, create it; do not wire it into other components or change their code unless explicitly requested.