# CareConnect

CareConnect is a home-healthcare coordination prototype for booking nursing, physiotherapy and attendant services, sharing family updates, and finding local pharmacy support.

## Current production services

- Frontend: Vercel at <https://careconnect-homecare.vercel.app/>
- Authentication and database: isolated Supabase project `careconnect-production`
- Authentication: email and password; confirmation email is disabled for the presentation prototype
- Data isolation: every dashboard query is scoped to the authenticated user and protected by Row Level Security

## Local checks

```sh
pnpm install --frozen-lockfile
pnpm run check
```

Copy `.env.example` to `.env.local` and provide the CareConnect Supabase URL and publishable key. Never commit environment files, access tokens, service-role keys, or database passwords.

## Reliability

- GitHub Actions builds the project from the lockfile on every push and pull request.
- CI checks the production Vercel site and Supabase Auth health endpoint.
- Vercel retains previous deployments for immediate rollback.
- Database tables use Row Level Security so one account cannot read another account's dashboard.

See [docs/OPERATIONS.md](docs/OPERATIONS.md) for the recovery procedure and production-readiness checklist.
