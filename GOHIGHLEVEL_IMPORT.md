# GoHighLevel AI Studio handoff

## What this repository contains

This is the original Lovable TanStack Start source for Empowering Athletes Legacy, not a finished GoHighLevel website. Use the code and a working public Lovable page together as references. The homepage is `src/routes/index.tsx`; shared components are in `src/components/site`, styling in `src/styles.css`, and copy in `src/content`.

The homepage is an eight-chapter cinematic football locker room journey, including the review-room film and the interactive EA Legacy Player Builder. Preserve the structure, copy, visual hierarchy, gold accents, crest placement, mobile layout, and interactions. Interior routes are in `src/routes`: athlete pathway, programs, who we are, impact, partners, get involved, contact, portal, privacy, and terms.

## Required assets before claiming a faithful rebuild

The four original binary files below were restored from the Lovable codebase ZIP and are present in this repository:

- `public/favicon.png`
- `src/assets/eal-family.jpg`
- `src/assets/eal-hero.jpg`
- `src/assets/eal-pathway.jpg`

The original favicon contains the approved EA Legacy mark and is used as a portable crest fallback in `src/content/media.ts`. It is 64×64 pixels; obtain the full resolution `EA-Legacy-logo.png` for the intended quality. The `*.asset.json` files are Lovable-specific pointers, not media bytes. Three video pointers are used by the UI: `Eagles_Practice_Hero.webm`, `Eagles_Practice_Web_Clean.mp4`, and `Eagles_Practice_V1.mp4`; `Eagles_Practice_Web.mp4` remains in the project as an unused original asset. Upload the exact videos to durable media hosting and replace active pointers with public URLs. Confirm playback on desktop and mobile.

## Forms and access

`src/lib/legacy-access.functions.ts` and the Supabase integration implement validated server-side submissions and protected storage. A visual clone of the public URL does not transfer this backend. Recreate the form fields, validation, consent, confirmation states, and lead routing in the intended GoHighLevel account, or configure the existing Supabase integration securely. Never put `SUPABASE_SERVICE_ROLE_KEY` or `EA_LEGACY_ACCESS_LINK_SECRET` in browser code. Only variable names appear in `.env.example`.

## Build verification

Run `npm ci && npm run verify:portable` first. The preflight prints the missing original image paths and Lovable-only media pointers. It must pass before calling this an exact portable clone. Then run `npm run build` and check the rendered preview. The restored source passes `npm run build` with the original images, but is not yet portable because the video pointers still use Lovable-only media URLs and the full resolution crest is missing. The source requires `@supabase/supabase-js`, now declared in `package.json` and pinned in `package-lock.json`. Verify all routes, imagery, film playback, player builder, and form submissions in the destination before publishing.

Do not treat the reserved Lovable URL `https://ea-legacy.lovable.app` as a live reference until it renders the actual site; its publication was still pending when this file was written.
