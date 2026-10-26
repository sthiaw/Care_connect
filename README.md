# CareConnect

CareConnect is a home-healthcare coordination prototype for booking nursing, physiotherapy and attendant services, sharing family updates, and finding local pharmacy support.

## Current production services

- Frontend: Vercel at <https://careconnect-homecare.vercel.app/>
- Demo access: case-sensitive usernames stored in the current browser
- Session behaviour: the active profile survives refresh and reopening; signing out retains that username's demo data for exact-case re-login
- Data storage: demo profiles, tasks, bookings and updates are stored only in browser `localStorage`
- Protected backend: the isolated Supabase project and its existing RLS-protected tables remain unchanged and are not exposed to anonymous users

This username-only mode is intended for demonstrations. It is not secure identity authentication and should not hold real patient information.

## Local checks

```sh
pnpm install --frozen-lockfile
pnpm run check
```

No Supabase credentials are required for the demo frontend. Never commit environment files, access tokens, service-role keys or database passwords.

## Reliability

- Unit tests verify exact-case login, session restoration and data retention after sign-out.
- GitHub Actions builds the project from the lockfile on every push and pull request.
- Vercel retains previous deployments for rollback.
- Supabase Row Level Security remains enabled on the existing database tables.

See [docs/OPERATIONS.md](docs/OPERATIONS.md) for recovery and release checks.

