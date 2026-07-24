# top50campaign — Build Rules (binding)

This project follows **`HCP_MARKETING_PAGES_DEV_RULES (2).md`** in this folder. That
document is the contract with the Housecall Pro engineering team. Read it fully; the
points below are the load-bearing constraints that must never be violated.

## What we are building
A single, self-contained marketing landing page: **one folder** containing one complete
HTML5 document + its CSS + optional vanilla JS + local assets. It gets dropped into a
WordPress plugin that renders it literally. The main HTML file's basename must match the
folder name (lowercase, hyphenated slug).

## Hard NOs (zero exceptions)
- ❌ **No build step, ever** — no Vite, webpack, rollup, parcel, esbuild, `npm install`, `node_modules`.
- ❌ **No frameworks** — no React, Vue, Svelte, Astro, Next, Alpine, htmx, Lit, Preact.
- ❌ **No TypeScript / JSX** — plain `.js` only (ES2020+, `<script type="module">` OK for splitting files with relative imports inside the folder).
- ❌ No PHP, no WordPress URLs (`/wp-content/…`, `/wp-admin/…`), no `<base>` tag, no server-side data assumptions.
- ❌ No Google Fonts `<link>` — self-host fonts in `assets/fonts/`.
- ❌ No shared/common folder across pages — duplicate instead. Pages are isolated by design.

## Must-haves
- ✅ **The acceptance test:** double-clicking the HTML file (no server) must render the full working page — images, fonts, scripts, no console errors.
- ✅ All asset paths **relative** (no leading `/`, no `https://` for shipped assets). In CSS use `url('assets/…')`.
- ✅ Complete HTML5 document with `<title>` and `<meta name="description">` (≤160 chars) written directly in the HTML.
- ✅ CDN CSS/JS libraries are *allowed but discouraged* — the page pays the full payload alone, so hand-written CSS + vanilla JS almost always wins. Justify any library with a comment.
- ✅ Accessibility: passes basic `axe` — real `<button>`/`<form>`/`<label>` semantics, `alt` on images, one `<h1>`, good contrast, keyboard-navigable.
- ✅ Mobile-first responsive; test 320 / 768 / 1280 / 1920. Set explicit image `width`/`height` (no layout shift).
- ✅ Optimize images (WebP/AVIF, SVG icons). Page weight target < 500 KB excluding hero imagery.
- ✅ Browser support: latest 2 of Chrome/Safari/Firefox/Edge, iOS Safari ≥ 16. Modern CSS/JS is fine.

## Delivery shape
The deliverable is **exactly the `{slug}/` folder**: HTML + CSS + JS + `assets/`. No
`package.json`, `node_modules/`, `dist/`, build config, or extra READMEs inside that folder.
(This repo's root files — `CLAUDE.md`, `README.md`, the rules doc — live *outside* the
deliverable `{slug}/` folder and are for our workflow only.)

## Local preview
Develop as plain files. Preview by opening the HTML directly, or run `python3 -m http.server`
in the folder (needed only so ES-module imports work over http://). No build tooling.
