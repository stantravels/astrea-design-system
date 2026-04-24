# Astrea Design System

React + TypeScript + Vite + Storybook starter for the Astrea design system.

## Scripts

- `npm run dev` starts the local playground
- `npm run storybook` starts Storybook
- `npm run build` builds the package playground
- `npm run test` runs unit and token behavior tests
- `npm run build-storybook` builds the Storybook site
- `npm run tokens:theme-report` verifies theme coverage and key contrast checks
- `npm run figma:parse` validates local Code Connect files
- `npm run figma:publish` publishes Code Connect mappings to Figma
- `npm run figma:unpublish` removes published Code Connect mappings from Figma

## Structure

- `src/tokens` primitive, semantic, and component token references
- `src/foundations` shared layout, typography, and breakpoint definitions
- `src/components` reusable UI components and colocated stories
- `src/styles` global styles and CSS custom properties
- `figma.config.json` Code Connect config for future Figma mappings

## Figma Code Connect

1. Create a Figma personal access token with `File content: Read` and `Code Connect: Write`.
2. Add it to a local `.env` file as `FIGMA_ACCESS_TOKEN=...`.
3. Replace placeholder component node URLs with real Figma component URLs.
4. Run `npm run figma:parse` locally, then `npm run figma:publish`.

## Token Sync From Figma JSON

The project uses a 3-level token hierarchy:
- `primitive` -> base values
- `semantic` -> aliases mapped to primitive tokens
- `component` -> aliases mapped to semantic tokens, currently implemented for `Tab`, `Focus`, `Counter`, and `Link`

Recommended workflow after exporting updated JSON files from Figma:

1. Update the JSON files in `src/tokens/figma`:
   - `primitive_color.json`
   - `primitive_size.json`
   - `primitive_typography.json`
   - `semantic_color.json`
   - `semantic_color_dark.json`
   - `semantic_size.json`
   - `component_tab_color.json`
   - `component_tab_size.json`
   - `component_focus_color.json`
   - `component_focus_size.json`
   - `component_counter_color.json`
   - `component_counter_size.json`
   - `component_link_color_regular.json`
   - `component_link_color_inverse.json`
   - `component_link_size.json`
2. Generate SCSS token files:
   - `npm run tokens:generate`
3. Verify token sync:
   - `npm run tokens:sync-report`
4. Verify theme coverage and core contrast pairs:
   - `npm run tokens:theme-report`
5. Run a visual check in Storybook:
   - `npm run storybook`

Auto-generated files:
- `src/styles/tokens/_primitive.generated.scss`
- `src/styles/tokens/_semantic.generated.scss`
- `src/styles/tokens/_semantic.dark.generated.scss`
- `src/styles/tokens/_component.generated.scss`

Important:
- generated files should not be edited manually;
- `semantic_color.json` is the Light semantic source and `semantic_color_dark.json` is the Dark semantic source;
- `src/tokens/figma/import` contains Figma import copies for Light semantic, Dark semantic, and updated Link Inverse component tokens;
- Link Inverse uses existing brand/grey/data semantic aliases; contrast across themes is controlled by the semantic Light/Dark mode values;
- `src/styles/tokens/_aliases.scss` is intentionally kept as a placeholder for any future runtime alias layer;
- the single entry point for token assembly is `src/styles/tokens.scss`;
- generated variables use concise level prefixes: `--pri-*`, `--sem-*`, `--com-*`;
- components consume generated token variables directly instead of `--astrea-*` aliases.

## Themes

Light mode is the default `:root` theme. Dark mode is enabled by setting `data-theme="dark"` on `:root` or on an `.astrea-theme` container.

Storybook includes a `Theme` toolbar switch for testing components in both modes. The local Vite playground also includes a light/dark toggle for the current component set.
