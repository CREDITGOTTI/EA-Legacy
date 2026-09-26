# GoHighLevel AI Studio handoff

## What this repository contains

This is the original Lovable TanStack Start source for Empowering Athletes Legacy, not a finished GoHighLevel website. Use the code and a working public Lovable page together as references. The homepage is `src/routes/index.tsx`; shared components are in `src/components/site`, styling in `src/styles.css`, and copy in `src/content`.

The homepage is an eight-chapter cinematic football locker room journey, including the review-room film and the interactive EA Legacy Player Builder. Preserve the structure, copy, visual hierarchy, gold accents, crest placement, mobile layout, and interactions. Interior routes are in `src/routes`: athlete pathway, programs, who we are, impact, partners, get involved, contact, portal, privacy, and terms.

## Required assets before claiming a faithful rebuild

The four original binary files below are absent from this repository because the source connector did not return intact bytes:

- `public/favicon.png`
- `src/assets/eal-family.jpg`
- `src/assets/eal-hero.jpg`
- `src/assets/eal-pathway.jpg`

Restore the original files from a Lovable codebase ZIP. Do not silently substitute unrelated stock images. The `*.asset.json` files contain Lovable-specific paths for the approved EA Legacy logo and organization videos. They are pointers, not the media bytes. In a GoHighLevel-hosted rebuild, upload the original logo and videos to a durable media library and replace these pointers with the new public media URLs. Confirm playback on desktop and mobile.

## Forms and access

`src/lib/legacy-access.functions.ts` and the Supabase integration implement validated server-side submissions and protected storage. A visual clone of the public URL does not transfer this backend. Recreate the form fields, validation, consent, confirmation states, and lead routing in the intended GoHighLevel account, or configure the existing Supabase integration securely. Never put `SUPABASE_SERVICE_ROLE_KEY` or `EA_LEGACY_ACCESS_LINK_SECRET` in browser code. Only variable names appear in `.env.example`.

## Build verification

After restoring the missing images, `npm ci && npm run build` should complete. The source requires `@supabase/supabase-js`, now declared in `package.json` and pinned in `package-lock.json`. Verify all routes, imagery, film playback, player builder, and form submissions in the destination before publishing.

Do not treat the reserved Lovable URL `https://ea-legacy.lovable.app` as a live reference until it renders the actual site; its publication was still pending when this file was written.
