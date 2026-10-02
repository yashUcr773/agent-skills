# Stack-specific security checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

## Next.js and Vercel

- **Next.js public variables.** Variables prefixed `NEXT_PUBLIC_` are inlined into the client bundle at build time. Check that none carries a secret, and that server-only values are not passed to client components as props or imported into client modules.
- **Next.js server entry points.** Treat every Server Action, Route Handler, and API route as a public endpoint. Each must authenticate and authorize the caller and validate its input itself; a check in middleware, a layout, or the page that renders the form does not protect the action or handler behind it.
- **Next.js data sent to the client.** Check what Server Components pass to Client Components and what route handlers return. Whole database records often carry fields the user should not receive.
- **Next.js images and redirects.** Check `images.remotePatterns` or the older `domains` setting for wildcards, and `redirects`, `rewrites`, and any post-login redirect parameter for open-redirect or open-proxy risk.
- **Vercel environments and previews.** Check which variables are exposed to the Preview and Development environments, whether preview deployments are publicly reachable, and whether they read or write production data.

## Supabase

- **Supabase row-level security.** Every table reachable through the API needs RLS enabled with a policy for each operation; a table with RLS disabled is readable and writable with the public key. Look for policies whose condition is always true, insert and update policies without a `WITH CHECK` clause, and views or `SECURITY DEFINER` functions that bypass RLS. Test with the public key and with two user sessions.
- **Supabase keys.** The anon or publishable key is meant to be public. The service-role or secret key bypasses RLS and must exist only on a server; search the client bundle, public environment variables, and browser-executed code for it.
- **Supabase storage.** Check bucket visibility and storage policies. A public bucket serves every object to anyone with the URL; a private bucket needs policies that scope upload, read, and delete to the owner.
- **Supabase auth settings.** Check the Site URL and redirect allow list for wildcards, email confirmation and password requirements, and any authorization decision that reads user-editable metadata, which a signed-in user can change for themselves.

## Firebase

- **Firebase security rules.** Check Firestore, Realtime Database, and Storage rules for test-mode or expiring open rules, rules that allow all reads or writes, rules that only require a signed-in user where per-user ownership is needed, and missing validation of written fields. Test with the emulator or rules unit tests, not against production data.
- **Firebase config and admin credentials.** The web app config, including its API key, is public by design; protection comes from security rules and App Check. Service-account keys and Admin SDK credentials must never reach the client or the repository. Check API key restrictions in the cloud console where they apply.
- **Firebase functions and App Check.** Check that callable and HTTP functions verify authentication and authorization themselves and validate input, that App Check is enforced where the owner intends it, and that custom claims used for roles are set only by trusted server code.

## Sign-in providers

- **Clerk sessions.** Verify the session on the server, with the provider's server helpers, for every protected page, route handler, and server action. Check which routes the middleware actually protects, since hiding UI in client components or relying on middleware alone is not enforcement. Organization and role checks must read verified session claims, and webhooks must verify their signature.
- **Auth.js sessions.** Check that the auth secret is a strong server-only value in every environment, that IDs or roles added in the `jwt` and `session` callbacks come from the database and not from client input, that protected routes and handlers check the session on the server, and that automatic account linking by email is not enabled for providers that do not verify email addresses.
- **Auth0 tokens.** Check that APIs validate the access token's signature, issuer, audience, and expiry, not only its presence; that allowed callback, logout, and web-origin URLs carry no broader wildcard than needed; that roles and permissions come from verified token claims set by a trusted Action; and that ID tokens are not used to authorize API calls.
- **Better Auth configuration.** Check that the secret and base URL are set per environment, that trusted origins are listed explicitly, that protected routes and handlers check the session on the server, that email verification and rate limiting are enabled where the product needs them, and that role or admin checks are enforced server-side.
