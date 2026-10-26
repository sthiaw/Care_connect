# CareConnect Operations

## Release checklist

1. Run `pnpm install --frozen-lockfile` and `pnpm run check`.
2. Verify that no secrets or environment files are included in the commit.
3. Confirm the target is the isolated `careconnect-homecare` Vercel project and `sthiaw/Care_connect` repository.
4. Verify username creation, exact-case login, refresh restoration, sign-out and re-login in a preview or local build.
5. Confirm the deployed page makes no anonymous Supabase table requests.

## Rollback

If a production change fails, use Vercel's deployment history to roll the production alias back to the last `READY` deployment. Do not change the FinisFlow or FinisPay projects; CareConnect uses its own Vercel project and Supabase project.

## Demo access model

- Users create and reopen browser-local demo profiles with a case-sensitive username.
- The active username is retained across refresh and browser reopening.
- Signing out removes only the active-session marker; the browser-local profile remains available for exact-case re-login.
- This mode is for demonstrations and must not contain real patient or clinical information.
- Clearing site data or using another browser/device removes access to that browser's demo profiles.

## Supabase safety

- The existing Supabase tables remain unchanged with Row Level Security enabled.
- Anonymous access to the existing tables remains revoked.
- The username-only frontend does not query or write those tables.
- Never expose a Supabase service-role key in the browser or repository.

## Healthy production signals

- The production Vercel deployment reports `READY`.
- The login page asks only for a username.
- Exact capitalization restores the correct browser-local dashboard.
- Incorrect capitalization is rejected.
- Refreshing an active dashboard keeps the profile open.

