# CareConnect operations

## Routine release

1. Create a branch and make the change.
2. Run `pnpm run check`.
3. Push the branch and review the CI result.
4. Deploy a Vercel preview and verify login, dashboard restoration and data isolation.
5. Promote the verified preview to production.

## Fast recovery

If a production change fails, use Vercel's deployment history to roll the production alias back to the last `READY` deployment. Avoid changing the FinisFlow or FinisPay projects; CareConnect uses its own Vercel project and Supabase project.

## Authentication

Email confirmation is disabled for the presentation prototype because the current Resend account is in testing mode and rejects recipients outside the verified owner address. Password login remains enabled.

Before a public launch:

1. Verify a sending domain in Resend.
2. Configure the verified sender under Supabase Authentication SMTP settings.
3. Re-enable **Confirm email** in Supabase Authentication providers.
4. Test sign-up, confirmation, password reset and returning login with a non-owner address.

## Data protection

- Never expose the Supabase service-role key in the browser or repository.
- Keep `.env*` files out of Git.
- Keep Row Level Security enabled on every exposed table.
- Run Supabase security and performance advisors after schema changes.
- Review authentication and database logs after failed sign-in or save operations.

## Monitoring checklist

- Vercel production deployment is `READY`.
- The public website returns HTTP 200.
- Supabase project reports `ACTIVE_HEALTHY`.
- Supabase Auth health endpoint responds successfully.
- CI builds from the committed lockfile.
