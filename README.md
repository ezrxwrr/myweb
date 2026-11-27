# Ezra — Digital Portfolio

A lightweight, static portfolio built with Vue 3, TypeScript, Vite, and plain CSS. It includes Indonesian/English copy, a saved light/dark theme, CSS motion with `IntersectionObserver`, and a click-to-zoom image gallery.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Update content and assets

- Edit labels and interface copy in `src/data/translations.ts`.
- Edit projects, university/high-school entries, years, and gallery paths in `src/data/portfolio.ts`.
- Real INTERFACE screenshots, SMA basketball photos, five SMA certificates, and four university certificates are already in `public/image/kuliah/` and `public/image/sma/`. University PDFs open in the built-in document preview.
- Replace remaining SVG placeholders (such as the DaVinci Resolve timeline previews) or update `imageSrc` / `galleryImages` in `portfolio.ts`.
- Contact email and Instagram profile are configured in `src/components/FooterSection.vue`; update the LinkedIn URL there if needed.
- The public license-plate project repository was not identifiable in the public repositories returned for `ezrxwrr`; its card currently links to the account's repository list until its exact URL is available.

The public A* repository is named `Bi-LSTMxA_Star_For_Pathfinding`; CofWeb is available at `https://github.com/ezrxwrr/CofWeb`.
