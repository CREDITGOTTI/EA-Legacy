# Empowering Athletes Legacy

Source snapshot of the Legacy Weaver website built in Lovable.

- Lovable project: https://lovable.dev/projects/7ddc1879-7170-44b7-b572-1c79decbb44c
- Public reference URL requested for GoHighLevel AI Studio: https://ea-legacy.lovable.app
- Publication status as of September 26, 2026: pending. Verify that the page loads before using it as a URL reference.
- Homepage source: [src/routes/index.tsx](src/routes/index.tsx)
- Other pages: [src/routes](src/routes)
- Site content and media references: [src/content](src/content)

## Source export status

This repository contains the Lovable project's text source at commit `9c6dcfbce7c4a59ab705d495bcaf96ce30d7abe6`. The Lovable connector did not provide intact bytes for four binary files: `public/favicon.png`, `src/assets/eal-family.jpg`, `src/assets/eal-hero.jpg`, and `src/assets/eal-pathway.jpg`. Add those originals from a Lovable codebase download before building this repository independently. The `*.asset.json` files reference media hosted by Lovable and are not the media files themselves.

The Lovable project is not connected to this repository for automatic sync. Future Lovable edits will need a new export or a separate Git sync setup.

## Secrets

Do not commit `.env` or any credentials. The original `.env` file was excluded, and `.gitignore` excludes environment files. Configure required Supabase variables in the hosting platform's secret settings.

## Development

After restoring the missing images and configuring environment variables:

```sh
npm install
npm run dev
```

Built with TanStack Start, TypeScript, React, and Tailwind CSS.
