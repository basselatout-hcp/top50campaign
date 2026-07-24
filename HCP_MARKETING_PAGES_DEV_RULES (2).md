# HCP Marketing Pages — Build Rules for External HTML Devs

You are building a self-contained marketing landing page (plain HTML + CSS + JS) that will be dropped into a WordPress plugin called `hcp-marketing-pages`. The plugin renders your page **literally** — no theme styles, no global scripts, no WordPress chrome reaches it. Whatever you ship is what users see.

This document is the contract. Follow every rule. The team integrating your work expects to do **zero modifications** beyond wrapping a single line of PHP at the top.

---

## 1. What you're building

A single landing page, packaged as **one folder** with:

- One HTML file (will be renamed to `.php` on integration)
- One or more CSS files
- One or more JS files (optional)
- Any images / fonts / static assets co-located inside the folder

The page will be served at a normal WordPress URL (e.g. `housecallpro.com/your-page-slug/`). Your code controls 100% of the HTML response.

---

## 2. Folder structure

Deliver one folder, named with a lowercase, hyphenated slug (e.g. `pricing-promo`, `black-friday-2026`). The slug must match your main HTML filename.

```
pricing-promo/
├── pricing-promo.html         (becomes pricing-promo.php on integration)
├── pricing-promo.css
├── pricing-promo.js           (optional)
└── assets/                    (optional)
    ├── hero.jpg
    ├── logo.svg
    └── fonts/
        └── custom.woff2
```

Rules:

- The main file's basename **must** match the folder name.
- Slug is lowercase, hyphenated, URL-safe. No spaces, no underscores, no uppercase.
- All assets the page uses must live inside this folder. No external folder dependencies.

---

## 3. The HTML file

Your main HTML file must be a **complete, valid HTML5 document** — `<!DOCTYPE html>` through `</html>`. Not a fragment. Not a body-only file. Full document.

Required structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Housecall Pro</title>
    <meta name="description" content="Short description of the page (≤160 chars).">

    <!-- All your stylesheets — relative paths -->
    <link rel="stylesheet" href="pricing-promo.css">
</head>
<body>
    <!-- Your page markup -->

    <!-- All your scripts at the bottom — relative paths -->
    <script src="pricing-promo.js"></script>
</body>
</html>
```

Rules:

- Use **relative paths** for every asset reference (`pricing-promo.css`, `assets/hero.jpg`, `assets/fonts/custom.woff2`). The integration step will rewrite these to use a WordPress helper, but the structure must already be relative.
- Write `<title>` and `<meta name="description">` directly into the HTML. There is no CMS — what you write is what ships. Keep them accurate and SEO-aware.
- If you need Open Graph / Twitter Card tags, add them manually. There is no AIOSEO integration on these pages.
- No `<base>` tag.

---

## 4. Hard NOs (zero exceptions)

### No JavaScript frameworks

- ❌ React, Vue, Svelte, Astro, Next.js, Nuxt, SolidJS, Preact, Alpine.js, Lit, Stencil, htmx — **none** of these are allowed.
- ❌ No JSX, no TSX, no `.vue` files, no `.svelte` files.
- ❌ No build step. No webpack, vite, rollup, parcel, esbuild output. No `node_modules`. No source maps. No transpilation.
- ❌ No TypeScript. Plain `.js` only.
- ✅ Vanilla JavaScript (ES2020+ is fine — modern browsers only).
- ✅ Multiple `.js` files in your folder are OK as long as they each ship as-is. Use ES modules (`<script type="module">`) if you want to split files, with relative `import` paths inside your folder only.

If you find yourself wanting `npm install`, you are off the path.

### External dependencies — allowed, but with caution

- ✅ JS libraries are allowed (via CDN or shipped inside the folder). Use them when they save real time — carousels, date pickers, animation helpers, etc.
- ✅ CSS frameworks are allowed (Tailwind via CDN, Bootstrap, Bulma, etc.). Pull them in via `<link>` from a CDN or ship a copy inside the folder — your call.
- ⚠️ **However:** because each page is fully isolated and ships its own CSS/JS bundle, a framework's full payload is paid by your single page. There's no shared cache benefit across pages. For small/medium pages, **writing your own CSS will almost always perform better** than pulling in a framework. Use frameworks only when they earn their weight.
- ⚠️ Same logic for JS libs: the page pays the full download cost. Be deliberate. A 60 KB carousel lib for one CTA is overkill — a 20-line vanilla scroll handler is not.
- ❌ No CSS preprocessors at runtime. Ship plain `.css` files. (You can author in `.scss`/`.less` privately, but only `.css` is delivered.)

### No cross-page sharing

- ❌ No shared `common/` folder, shared CSS/JS file pulled from outside, shared web component, or shared design system.
- ✅ If you build a second landing page later, **duplicate** what you need. Some duplication is intentional — these pages are isolated by design.

### No WordPress / backend assumptions

- ❌ Don't write PHP. Just HTML/CSS/JS. The integration step adds the one PHP guard line at the top.
- ❌ Don't reference `/wp-content/...`, `/wp-admin/...`, or any WordPress URL in your code.
- ❌ Don't assume a server-side data source. If the page needs dynamic data, it must come from a JSON file you ship in the folder, or from a public API call you make in JS.

---

## 5. Asset rules

- All asset paths in your HTML/CSS/JS must be **relative** to the page folder (no leading `/`, no `https://...` for things you ship).
- Inside CSS, use relative `url()` paths: `url('assets/hero.jpg')`, `url('assets/fonts/custom.woff2')`.
- Optimize images before shipping (WebP/AVIF preferred; SVG for icons; reasonable JPEG/PNG sizes).
- Inline critical SVG icons if it's cleaner than maintaining icon files. Either is fine.
- Self-host fonts inside `assets/fonts/`. Don't pull from Google Fonts via `<link>` — performance and privacy reasons.
- Total page weight target: **< 2MB** (excluding hero images). Aim lower.

---

## 6. Tracking, analytics, third-party widgets

These pages do NOT inherit any of the site's tracking (no GTM, no FullStory, no Cookiebot, no chatbot, nothing). If your page needs a tracking pixel or a chat widget, **you paste it directly into the HTML**:

- Google Tag Manager: paste both the `<head>` and `<body>` snippets verbatim where they should sit.
- Meta Pixel, LinkedIn Insight, etc.: same — paste the snippets in the HTML.
- Cookie consent banner: if needed, ship it yourself in JS or as part of the page.

Document any tracking scripts with a comment explaining why they're there.

---

## 7. Accessibility & quality bar

- Pages must pass automated `axe` checks. No `<div>`-only buttons, no missing `alt` attributes, no `<h1>`-less pages, no color-contrast failures.
- All interactive elements keyboard-navigable.
- Forms use real `<form>`, `<label>`, `<input>` semantics.
- No layout shifts after load (set explicit `width`/`height` on images, reserve space for embeds).
- Mobile-first responsive. Test 320 / 768 / 1280 / 1920 widths.
- Dark mode is optional unless requested.

---

## 8. Browser support

- Latest 2 versions of Chrome, Safari, Firefox, Edge.
- iOS Safari ≥ 16.
- No IE, no Opera Mini, no UCBrowser.

You can use modern CSS (`grid`, `:has()`, container queries, `aspect-ratio`, custom properties) and modern JS (`async/await`, optional chaining, ES modules) freely.

---

## 9. What you deliver

A zip or git repo containing **exactly the folder** described in section 2. Nothing else.

Specifically:

- ✅ Your `{slug}/` folder with the HTML/CSS/JS/assets inside.
- ❌ No `package.json`, `node_modules/`, `dist/`, `.git/`, `.DS_Store`, or build configuration.
- ❌ No README explaining the build (your folder runs as-is by opening the HTML in a browser; if it doesn't, it's wrong).

If you can't open `pricing-promo.html` directly in your browser by double-clicking it and have a fully working page, you've broken the rules.

---

## 10. Acceptance checklist

Before delivering, verify:

- [ ] Opening the HTML file directly in a browser (no server) renders the full working page, including images, fonts, scripts.
- [ ] No `node_modules`, build artifacts, or framework files in the delivery.
- [ ] All asset paths are relative.
- [ ] HTML is a complete document with `<title>` and `<meta name="description">` set.
- [ ] No external CDN/CSS/JS imports (except documented exceptions per section 4).
- [ ] No console errors when opening the page.
- [ ] Page works on mobile (320 px width) and desktop.
- [ ] Page weight is reasonable (< 500 KB excluding hero imagery).
- [ ] Accessibility: passes basic `axe` audit, keyboard-navigable.

If every box is checked, you're done.

---

## TL;DR

You are shipping a folder with one HTML file + its CSS + its JS + its assets. No frameworks. No build step. No external imports. No shared anything. No WordPress knowledge needed. If you can email someone the folder and they can open the HTML in a browser and see the working page, you did it right.
