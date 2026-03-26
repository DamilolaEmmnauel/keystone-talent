# Keystone Talent Website

## Overview
Static marketing website for **Keystone Talent** — an external people operations firm for early-stage and scaling startups. Based in Kampala, Uganda.

## Origin
Recreated from a Webflow export (`keystonetalent.webflow/` folder kept as reference). All external CDN dependencies (jQuery, images, SVGs) were downloaded and localized for fully self-contained hosting.

## Hosting & Deployment
- **Host:** Vercel (https://keystone-talent.vercel.app)
- **Repo:** https://github.com/DamilolaEmmnauel/keystone-talent
- **Deploy flow:** Push to `main` on GitHub → auto-deploys to Vercel
- **Vercel account:** dammyakins9-9089
- **GitHub account:** DamilolaEmmnauel
- **Clean URLs:** Enabled via `vercel.json` (`cleanUrls: true`) — no `.html` extensions in URLs

## URL Routing
- `/` → index.html (homepage)
- `/privacy-policy` → privacy-policy.html
- `/terms-of-service` → terms-of-service.html
- Vercel auto-redirects `.html` URLs to clean versions
- All internal links use clean paths (`/privacy-policy`, `/terms-of-service`, `/`)
- Subpage nav links use `/#section` format (e.g., `/#reality`, `/#services`)

## Project Structure
```
├── index.html              # Main single-page site (all sections)
├── privacy-policy.html     # Privacy Policy page
├── terms-of-service.html   # Terms of Service page
├── 401.html                # Password-protected page
├── 404.html                # Not found page
├── style-guide.html        # Webflow style guide reference
├── vercel.json             # Vercel config (cleanUrls)
├── css/
│   ├── normalize.css
│   ├── webflow.css
│   └── keystonetalent.webflow.css
├── js/
│   ├── jquery-3.5.1.min.js    # Downloaded locally (was CDN)
│   ├── webflow.js             # Webflow runtime (interactions, nav, slider)
│   └── cookie-consent.js      # Custom cookie consent popup
├── fonts/                     # Satoshi font family (10 variants, .otf)
├── images/                    # All site images, icons, favicons
└── keystonetalent.webflow/    # Original Webflow export (reference, gitignored)
```

## Tech Stack
- Pure HTML/CSS/JS (no build step, no framework)
- jQuery 3.5.1 (required by webflow.js)
- Webflow runtime JS for interactions, animations, nav, slider

## Design System

### Fonts
- **Body:** Satoshi (custom, loaded from /fonts/) — `font-family: Satoshi, Verdana, sans-serif`
- **Headings:** Georgia — `font-family: Georgia, Times, "Times New Roman", serif`

### Colors
| Role                | Value      |
|---------------------|------------|
| Dark background     | `#1d1d1d`  |
| Warm/light bg       | `#f2eee5`  |
| Gold accent         | `#c9a87f`  |
| Body text (light bg)| `black`    |
| Body text (dark bg) | `#fff`     |
| Muted text          | `#7b7b7b`  |
| Secondary text      | `#444`     |
| Borders/dividers    | `#e5decf`  |

### Tagline Pill Variants
- **Default** (`.tagline`): beige bg `#f2eee5`, dark dot `#050e15` — used on white background sections
- **Header** (`.tagline.is-header`): white bg `#fff`, gold dot `#c9a87f` — used on beige background sections (hero, legal page headers)
- **Services** (`.tagline.is-services`): darker beige bg `#e5decf` — used on services section

### Spacing Pattern
All sections follow: `.padding-global > .container-large > .padding-section-large`

### Button Style
Pill-shaped (`border-radius: 90px`), hover lifts up (`translateY(-8px)`). Variants: `.is-icon`, `.is-secondary`, `.is-alternate`

## Page Sections (index.html)
1. **Navbar** — sticky nav with logo SVG, anchor links, mobile hamburger
2. **Hero Header** (`#header`) — tagline, h1, description, CTAs, hero images
3. **The Reality** (`#reality`) — problem statement with decorative SVG illustration
4. **Who We Serve** (`#who`) — 4 cards (Tech Startups, Founder-Led, Remote Teams, 5-40 People)
5. **Services** (`#services`) — 3 accordions (Foundation, Fractional People Lead, Global Contractor Desk)
6. **Why Keystone Talent** (`#why`) — image with overlay text + highlight quote
7. **Testimonials** (`#testimonials`) — slider with Maxwell Obi / Waza quote
8. **FAQ** (`#faq`) — 10 expandable accordion items
9. **CTA** (`#cta`) — "Book a Conversation" call-to-action
10. **Footer** (`#footer`) — nav links, email, social icons, address, legal links

## Legal Pages
- `privacy-policy.html` and `terms-of-service.html` were created manually (not from Webflow)
- They share the same navbar and footer as index.html
- Navbar and footer links use `/#section` format for homepage anchors
- Active legal page is highlighted with white bold text in footer (`.footer_legal-link.is-active` class)
- Both pages use `.legal-page_header-content` wrapper for centered headers
- Tagline pill uses `.is-header` variant (white bg, gold dot) to contrast with beige section background
- The `color: inherit` global style override is included inline (required for footer icon/link colors on dark bg)

## Cookie Consent
- `js/cookie-consent.js` — standalone, no dependencies beyond vanilla JS
- Triggered by clicking the "Cookies" footer link (`.cookie-trigger` class)
- Centered modal (vertically and horizontally) with dark backdrop overlay
- 4 categories: Essential (always on), Analytics, Functional, Marketing
- Toggle switches with gold active state (`#c9a87f`)
- 3 buttons: Decline All, Save Preferences, Accept All (gold accent)
- Preferences saved to `localStorage` under key `kt_cookie_preferences`
- Loaded on all pages via `<script src="js/cookie-consent.js">`

## Important Notes
- The Webflow export uses `data-w-id` + `style="opacity:0"` for scroll-triggered animations. These are only in index.html. New pages omit them intentionally (Webflow's JS won't recognize new pages, so opacity:0 elements would stay invisible).
- `webflow.js` handles: navbar toggle, slider, accordion open/close, scroll animations
- Contact email: info@keystonetalent.xyz
- Address: The Offices 4, One Central, 8th Floor, Trade Center - Dubai, United Arab Emirates
- Site credit: "Created by DEA" linking to https://damilola-emmanuel-a.webflow.io/
