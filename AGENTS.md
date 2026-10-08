# AGENTS.md

SuuntoPlus sports app: an interval workout chart on Suunto watches. No build, no tests, no lint — nothing to run locally. Verification happens on-device: deploy via **SuuntoPlus Editor** (Windows/macOS desktop app, USB or Bluetooth) and start an exercise. Don't add tooling.

## Files

The app is exactly these files (all deployed to the watch):

- `manifest.json` — metadata, `in` resource subscriptions, `out` outputs, `settings` schema, `template` list
- `main.js` — lifecycle callbacks fired by the watch's ESW runtime
- `interval-chart.html` — `<uiView>` DSL template with inline canvas drawing
- `data.json` — optional; initial values for settings (values are stored as strings)

Not deployed: `reference.html` (gitignored local copy of the **SuuntoPlus API reference** — authoritative for resources, DSL, formatters, display specs; consult it instead of inventing APIs), `pre-q.c64.png` (design mockup only).

## Settings flow (non-obvious)

Three places must stay in sync:

1. `manifest.json` `settings[]` — schema shown in the Suunto mobile app (`path`, `type`, `maxLength`, ...)
2. `data.json` — initial values, keyed by the same `path`
3. Code reads values via `localStorage.getItem('<path>')` (only `localStorage` exists; `setObject`/`getObject` for objects)

The `Intervals` setting is `duration:pace;duration:pace;...` (seconds each), parsed in `interval-chart.html` `onLoad`. The hardcoded fallback default there should match `data.json`.

## Data flow gotcha

The chart's live time comes from `$.subscribe('/Activity/Move/-1/Duration/Current', ...)` in the template's `onActivate` — **not** from `evaluate()` in `main.js`. Currently unused: the state tracked in `main.js`, the manifest `out` entries (`currentInterval`, `progressPercentage`), and the `Speed` input. Wire new live data through template subscriptions, not `evaluate()`.

## Template DSL gotchas

- Never subscribe in `onLoad` (there is no `onUnload`); subscribe in `onActivate`, `$.unsubscribe(token)` in `onDeactivate`.
- Canvas `build="ctx => ..."` runs on refresh only; after data changes call `control('#id', 'REFRESH')` to redraw.
- Positioning is percentage-based via `style`; `calc(50% - 50%e)` centers an element (`%e` = percent of the element's own size).
- Plain ES5-style JS (`var`, loops as written) — no DOM, modules, or fetch. Available globals are the DSL: `$`, `setText`, `control`, `localStorage`, `setTimeout`.
- `getUserInterface` returns the template name **without** extension; `manifest.json` `template` lists the filename **with** extension.

## manifest.json notes

- Bump `modificationTime` (Unix timestamp, seconds) when releasing a version.
- Max 10 `in` resources. Paths are `/Activity/{Window}/{WindowIndex}/{Parameter}/{Aggregate}`; windows `Move`, `Activity`, `Lap`, `AutoLap`; index `-1` = current, `-2` = previous.

## Displays

Primary target is Display ID `q` (466×466 px, UI version 2): Suunto Race, Race S, Race 2, Vertical 2, Ocean, Ocean Lite. Layout is percentage-based so it scales; per-display code/templating can use the compile-time `DISPLAY_ID` token (see `reference.html`).
