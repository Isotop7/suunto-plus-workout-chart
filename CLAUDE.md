# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A **SuuntoPlus sports app** that displays an interval workout chart on Suunto watches. The app is deployed via the SuuntoPlus Editor desktop application to the watch over USB or Bluetooth.

## Project Structure

A SuuntoPlus app consists of exactly three file types:

- **`manifest.json`** — App metadata, input resource subscriptions (`in`), computed output variables (`out`), and the list of HTML templates used.
- **`main.js`** — JavaScript logic with lifecycle callbacks fired by the watch's ESW (Exercise Software). No build step; runs directly on the watch.
- **`interval-chart.html`** — UI template using the SuuntoPlus `<uiView>` DSL with inline canvas drawing via a `build` attribute.

`reference.html` is a local copy of the SuuntoPlus API reference — consult it for available resources, UI components, formatters, and display specs. It is gitignored implicitly (not deployed to the watch).

## Key Concepts

### main.js Lifecycle Callbacks
- `onLoad` — called once when the app is loaded
- `onExerciseStart` / `onExercisePause` / `onExerciseContinue` / `onExerciseEnd` — exercise state transitions
- `evaluate(input, output)` — called ~once/second during exercise; `input` contains subscribed resources by name (e.g., `input.Duration`)
- `getUserInterface` — returns `{ template: 'name-without-extension' }` to select which HTML template to show
- `getSummaryOutputs` — returns array of outputs shown in exercise summary

### HTML Templates (`<uiView>`)
- The `onLoad` attribute runs JS once to define functions/variables available to the template
- Canvas elements use a `build="ctx => ..."` attribute for drawing; `ctx` has `width`, `height`, and a Canvas 2D-like API
- Live data is accessed via `<eval input="/resource/path" outputFormat="..." />` or `input.ResourceName` in `build` expressions
- Positioning uses percentage-based CSS-like `style` attributes

### Input Resources (manifest.json `in`)
Resources follow the path pattern `/Activity/{Window}/{WindowIndex}/{Parameter}/{Aggregate}`.
Key windows: `Move`, `Activity`, `Lap`, `AutoLap`. WindowIndex `-1` = current, `-2` = previous.
Max 10 input resources per app.

### Watch Display Targets
The primary target is **Display ID `q`** (466×466px, UI version 2) used in Suunto Race, Race S, Race 2, Vertical 2, Ocean, and Ocean Lite.

## Development Workflow

There is no build system. Edit files directly, then deploy to the watch using **SuuntoPlus Editor** (Windows/macOS desktop app). Testing on-device is the primary way to verify the UI.

The `modificationTime` field in `manifest.json` should be updated (Unix timestamp in seconds) when releasing a new version.
