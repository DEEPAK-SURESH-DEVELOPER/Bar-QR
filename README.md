# BarMenu · Blue Lounge

Premium QR-powered digital menu frontend built with React and Vite. The admin workspace and public guest menu share one local mock-data store.

## Run locally

```sh
npm install
npm run dev
```

Open `/admin` for the workspace or `/menu/blue-lounge` for the public guest experience. The admin opens behind a local demo sign-in; the public QR menu remains accessible without signing in. Admin changes persist in this browser with localStorage and immediately update the customer menu. Use the profile page to edit bar details and the QR page to set the public HTTPS base domain.

Local demo sign-in: `admin@bluelounge.demo` / `BlueLoungeDemo2026!`.

## Build and lint

```sh
npm run build
npm run lint
```

## Notes

- This frontend uses mock data and browser-local persistence. It is not connected to the Express backend and does not provide server-side validation, authentication, authorization or database storage.
- The admin sign-in is a browser-only demo gate, not production security. Replace it with server-side authentication and authorization before deploying real business data.
- The QR starts at `https://yourdomain.com/menu/blue-lounge`. Configure the real deployed HTTPS domain on the QR page before printing. The bar slug is fixed so the public menu path remains stable.
- Image uploads are validated and stored as browser-local data URLs; large numbers of images can exceed browser storage limits. Keep uploads concise and optimized.
- Vercel deployments use the root `vercel.json` rewrite so direct visits and refreshes on client routes such as `/admin/menu` resolve through `index.html`. Other production hosts need the equivalent SPA fallback.
- The public menu is browsing only; it has no ordering, cart or payment flow.
