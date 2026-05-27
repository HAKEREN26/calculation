# Hakeren — Worker Rights Calculation Form

Worker rights calculation form for foreign workers in Israel.

## Routes

- `/calculation` — Worker calculation form (public, after payment)
- `/payment-confirm` — Staff payment confirmation (internal use only)

## Deploy

Deployed via Vercel. Connected to this GitHub repo.
Any push to `main` → auto-deploy.

## Tech Stack

- Next.js 14
- React 18
- Deployed on Vercel

## Environment Variables

Set in Vercel dashboard:
- `NEXT_PUBLIC_MAKE_WEBHOOK_URL` — Make.com webhook endpoint
- `NEXT_PUBLIC_FORM_TOKEN` — Optional access token for form protection

## For Hakeren Staff

The `/payment-confirm` route is for internal use only.
Share only the `/calculation` route with workers who have paid.
