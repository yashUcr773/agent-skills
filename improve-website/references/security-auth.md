# Security, authentication, and prototype leaks

Source checklist sections: 16 (security), 17 (authentication), 31 (common prototype/vibe-coded leaks).

## Establish the trust boundaries

Map public, authenticated, administrative, tenant-specific, storage, and server-only surfaces. Identify the session/auth provider and actual authorization model. Inspect source and configuration and use controlled test accounts for runtime checks. Active attack probes against a live site require an authorized target and scope; prefer local/test environments. Missing credentials or inaccessible code means not verified, not secure.

## Secrets and prototype artifacts

- Inspect source, relevant build output, public environment variables, debug/dev routes, configuration, and applicable repository history for unintended exposure. Redact values; report a file/route and credential category rather than copying the secret.
- Distinguish intentionally public client configuration from privileged material. Firebase/Supabase-style client configuration is not automatically a leaked secret; evaluate server/service keys, key restrictions, data rules, and effective permissions. `NEXT_PUBLIC_*` and equivalent variables reach the browser and must not carry server credentials.
- Look for demo/placeholder keys, hardcoded admin identities, localhost/example domains and contacts, fake search/login/checkout/newsletter flows, mock API responses, fixture arrays, sample avatars, debug panels, unprotected admin pages, remote image mistakes, permissive CORS, and wildcard OAuth/redirect rules.
- Confirm intended production behavior before replacing mocks, deleting fixtures, removing unsupported claims, or changing identity providers. Content authenticity belongs to content review; nonfunctional actions to interactions; exploitable exposure to this audit.
- If a real credential is exposed, identify the affected system without revealing the value, recommend revocation/rotation, and prepare scoped source/configuration fixes. Deleting the current source value does not revoke a credential or erase history. Live rotation and history rewrites require scope for those actions and coordination of dependent services.

## Server-side access and injection defenses

- Verify authentication and object/action authorization on the server for every sensitive operation. Test cross-user and cross-role access with safe fixtures, including IDs supplied by the browser. Hidden buttons are not enforcement.
- Check tenant boundaries and database row-level security when the architecture relies on it. Do not assume every backend requires RLS or that enabling it alone establishes a complete policy.
- Inspect parameterized database access, context-appropriate output encoding, unsafe HTML/DOM operations, shell invocation, path construction, and upload/storage paths for SQL injection, XSS, command injection, and traversal. Do not equate generic input sanitization with protection in every context.
- Verify upload limits and content validation, executable-content handling, storage/serving isolation, and authorization to download private files. Do not trust client MIME/type declarations alone.
- Inspect CSRF protections in the context of the session and credential transport. Review CORS origin/credentials behavior and redirect/callback allowlists; avoid broad wildcards and unvalidated destinations.

## Transport, cookies, and browser policy

- Check HTTPS and redirects, TLS evidence where available, and secure cookie flags suited to the session: Secure, HttpOnly where script access is unnecessary, and intentional SameSite behavior. Test login, embedded flows, and cross-site callbacks affected by changes.
- Evaluate HSTS deliberately, especially long lifetimes, `includeSubDomains`, and preload implications. Do not enable irreversible/broad transport commitments before verifying affected hosts and operational intent.
- Review Content Security Policy, content-type sniffing protection, frame/embed controls, and referrer policy against actual resource/embed needs. Develop and verify policy changes without blindly breaking scripts, login, payments, or intentional embedding.
- Reduce unnecessary server/version disclosure and raw internal errors where practical. Hiding a header does not remediate an underlying vulnerable component.

## Account and session journeys

- Test signup, login, incorrect credentials, logout, duplicate signup, email verification, expired verification links, password reset/change, expired reset links, session expiry, refresh behavior, and protected routes where present.
- For password visibility toggles, check that intentional reveal affects only the relevant field, starts masked on a fresh form, preserves password-manager/autofill behavior, and does not submit or duplicate the secret into logs, analytics, clipboard, persistent client state, or print output. Masking is a display choice, not encryption or authorization.
- Verify safe login/logout redirects and intended-destination preservation without open redirects. Check enumeration risk in visible messages, status codes, and materially observable timing without destructive bulk tests.
- Review rate limits for login and reset, secure random reset/verification tokens, appropriate expiry and single use, and session invalidation after relevant password/security changes. Redact tokens in logs and artifacts.
- Evaluate MFA according to account risk and product requirements; adding a new auth capability needs a product decision. Test role changes, concurrent sessions, multi-tab logout, and sensitive-state cleanup.

## Dependencies and verification

Use the existing ecosystem's audit tools and current primary advisories to assess affected versions, reachable code, and available fixes. Explain breaking changes before major updates; remove packages only after verifying they are unused.

For each fix, verify both denied and allowed behavior: unauthorized access is rejected and legitimate users can still finish their journey. Add targeted tests for trust boundaries where practical. Report the tested roles, endpoints, environment, and remaining unknowns; do not certify the entire site as secure from a limited scan.
