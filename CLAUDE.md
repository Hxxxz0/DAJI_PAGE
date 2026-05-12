# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static academic project page for **DAJI** (Dynamics-Aligned Joint Intent), a paper on language-conditioned humanoid control. The site is a single HTML page deployed via GitHub Pages to `nerfies.github.io` — the repo name reflects the original Nerfies paper; the content has since been repurposed for DAJI.

No build system, bundler, or test framework. Edits are made directly to the static files.

## File map

- `index.html` — single-page site: hero, teaser image, abstract, paradigm cards, framework diagram, results tables/metrics, BibTeX
- `static/css/index.css` — all custom styles (CSS custom properties, Bulma overrides, scroll-reveal animations, responsive breakpoints)
- `static/js/index.js` — mobile nav toggle (`aria-expanded` management) and IntersectionObserver-based scroll reveal (`.reveal` → `.is-visible`)
- `static/images/` — teaser, pipeline diagram, qualitative result figures, favicon SVG
- `static/videos/` — mp4 assets referenced by the page
- `static/interpolation/stacked/` — 240 sequentially numbered JPG frames for a stacked interpolation visualization

## Key dependencies (CDN, no package manager)

- **Bulma** (CSS framework): `bulma.min.css`, `bulma-carousel.min.css`, `bulma-slider.min.css`
- **Font Awesome 6** (icons): `fontawesome.all.min.css` + JS
- **Google Fonts**: Cormorant Garamond (headings), Space Grotesk (body)

## Local development

Open `index.html` directly in a browser, or serve the repo root with any static server:

```sh
python3 -m http.server 8080
# then open http://localhost:8080
```

There are no lint, build, or test commands.

## Things to know

- The two large zip files (`real.zip`, `sim(3).zip`) in the repo root are untracked — do not commit them.
- The `.gitignore` only ignores `.DS_Store` and `.idea`; add patterns if new tooling creates artifacts.
- BibTeX and author blocks use placeholder values (`XXX XXX`); these are meant to be filled in before publication.
- Mobile nav is hidden behind a hamburger toggle at ≤820px; the scroll-reveal animation uses `IntersectionObserver` with `threshold: 0.18`.
