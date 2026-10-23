# Sanji's DreamWorld

A bilingual (English / Bangla) art-brand website. Next.js App Router + TypeScript, plain CSS. No checkout, cart, payments or database: visitors look, then contact the seller directly.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

Deploy on Vercel: import the repo, set `NEXT_PUBLIC_SITE_URL` (and optionally `NEXT_PUBLIC_FORM_ENDPOINT`) in Project Settings, deploy.
On Netlify this needs the Next.js runtime (`@netlify/plugin-nextjs`); Vercel is the straightforward option.

## What to edit

| What | Where |
| --- | --- |
| Your real colours | `styles/tokens.css` (copy the hex values from your old `style*.css`) |
| Brand name, currency, **WhatsApp number**, **Messenger page**, email, budget bands | `site.config.ts` |
| Products, photos, prices, sizes | `data/products.ts` |
| Every visible English / Bangla sentence | `messages/en.ts`, `messages/bn.ts` |
| Photos and artwork | copy your old `images/` folder into `public/images/` |
| Old Journey and Certificates pages | put the old `.html` files in `legacy/`, then move their content into `app/[locale]/journey/page.tsx` and `certificates/page.tsx` |

## How the pieces behave

- **WhatsApp / Messenger** stay disabled (buttons greyed, "Not set up yet") until you fill them in `site.config.ts`. The floating contact button stays hidden until at least one is set.
- **Inquiry form**: without `NEXT_PUBLIC_FORM_ENDPOINT` it does *not* send anything. It prepares the message so the visitor can send it by WhatsApp, Messenger (text is copied, since Messenger can't pre-fill), email, or copy it. "Sent" is only shown when your endpoint answers OK.
- **Prices**: a number in `data/products.ts` is shown as the price; `null` shows "Ask for Price".
- **Language**: `/en/...` and `/bn/...`; the last choice is remembered and `/` redirects to it.
- **Journey and Certificates** are not in the main menu; they are linked from the About page.

## Before launch

1. Replace the stand-in palette in `styles/tokens.css`.
2. Add real products and photos; delete the placeholder entries.
3. Fill in WhatsApp / Messenger in `site.config.ts`.
4. Read the Bangla text in `messages/bn.ts` once with your own eyes and adjust the wording you prefer.
5. Run `npm run typecheck`, `npm run lint` and `npm run build`, then test at 320, 375, 390 and 430 px wide.
