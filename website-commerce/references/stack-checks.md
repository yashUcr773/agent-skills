# Stack-specific commerce checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Stripe keys and modes.** Check that only the publishable key reaches the browser, that the secret key is server-only and preferably a restricted key scoped to what the integration needs, and that test and live keys, webhook secrets, and price IDs are not mixed between environments.
- **Stripe prices and sessions.** Create Checkout Sessions and Payment Intents on the server from server-held price IDs or amounts. Do not accept an amount, price ID, or success flag from the browser without checking it against the catalog, and fulfill from the verified event or a server-side retrieval of the session, not from the success URL.
- **Stripe webhooks.** Verify the signature against the raw request body with the endpoint's signing secret. Handle the events the integration depends on, such as completed, failed, refunded, and disputed payments and subscription changes; record processed event IDs so retries are idempotent; and return success only after the work is durably recorded.
- **Stripe portal and subscriptions.** Check that portal sessions and subscription changes are created only for the signed-in customer's own Stripe customer ID, and that entitlements follow the subscription status delivered by webhooks instead of a value stored at signup.
