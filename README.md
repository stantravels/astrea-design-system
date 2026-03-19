# Astrea Design System

React + TypeScript + Vite + Storybook starter for the Astrea design system.

## Scripts

- `npm run dev` starts the local playground
- `npm run storybook` starts Storybook
- `npm run build` builds the package playground
- `npm run build-storybook` builds the Storybook site
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
- `component` -> aliases mapped to semantic tokens, currently implemented for `Tab` and `Focus`

Recommended workflow after exporting updated JSON files from Figma:

1. Update the JSON files in `src/tokens/figma`:
   - `primitive_color.json`
   - `primitive_size.json`
   - `primitive_typography.json`
   - `semantic_color.json`
   - `semantic_size.json`
   - `component_tab_color.json`
   - `component_tab_size.json`
   - `component_focus.json`
2. Generate SCSS token files:
   - `npm run tokens:generate`
3. Verify token sync:
   - `npm run tokens:sync-report`
4. Run a visual check in Storybook:
   - `npm run storybook`

Auto-generated files:
- `src/styles/tokens/_primitive.generated.scss`
- `src/styles/tokens/_semantic.generated.scss`
- `src/styles/tokens/_component.generated.scss`

Important:
- generated files should not be edited manually;
- developer-friendly aliases and composed runtime variables live in `src/styles/tokens/_aliases.scss`;
- the single entry point for token assembly is `src/styles/tokens.scss`;
- generated variables use concise level prefixes: `--pri-*`, `--sem-*`, `--com-*`.
