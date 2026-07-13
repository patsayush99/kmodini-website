# KMODINI Website

Ready-to-deploy React + Tailwind project.

## 1. Install dependencies (one-time)

Requires Node.js (get it from https://nodejs.org if you don't have it — pick the LTS version).

```
npm install
```

## 2. Preview it locally (optional, to check before going live)

```
npm run dev
```

Opens at http://localhost:5173

## 3. Go live — pick ONE option

### Option A — Vercel (recommended, free, auto-updates on every future edit)

1. Create a free account at https://vercel.com (sign in with GitHub, Google, or email).
2. Create a free GitHub account if you don't have one: https://github.com
3. Create a new empty repository on GitHub (e.g. "kmodini-website").
4. Upload this whole folder to that repository (GitHub's website lets you drag-and-drop files directly — no terminal needed. Use "Add file" → "Upload files").
5. In Vercel, click "Add New Project", pick that GitHub repository, and click Deploy.
6. Vercel auto-detects it's a Vite project — just click Deploy, no settings to change.
7. You'll get a live URL in about a minute (e.g. kmodini.vercel.app). You can later connect your own domain (like kmodini.in) for free in Vercel's project settings.
8. From now on: any time you (or I) edit App.jsx and you re-upload it to the same GitHub repo, Vercel automatically redeploys the live site within a minute or two.

### Option B — Netlify Drop (fastest, zero setup, but manual re-upload for every future edit)

1. Run: `npm run build`
   This creates a `dist` folder with the finished website.
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder into the browser window.
4. Your site is live immediately at a netlify.app address.
5. For any future edit: rebuild (`npm run build`) and drag the new `dist` folder in again.

## 4. Custom domain (kmodini.in / kmodini.com, etc.)

Buy the domain from any registrar (GoDaddy, Namecheap, Google Domains, etc.), then in Vercel or Netlify's project settings there's a "Custom Domain" section — add your domain there and follow the on-screen DNS instructions (usually just adding one or two records at your domain registrar). Takes a few minutes to a few hours to fully activate.

## Before you launch — checklist

- [ ] Replace placeholder product photos in `src/App.jsx` (search for `kmd-fabric-placeholder`) with real product images
- [ ] Confirm WhatsApp number is correct (top of `src/App.jsx`, `WHATSAPP_NUMBER`)
- [ ] Confirm address/contact details in the Contact section
- [ ] Update social links (Instagram, Facebook, Pinterest — currently placeholder `#` links) in the Footer section
