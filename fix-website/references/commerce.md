# Payments and commerce

Quick pass: Server-side totals; Idempotency; Confirmation integrity; Card data handling; Signatures.

Severity examples: critical — a customer can pay less than the price or obtain goods without paying, or the site handles or stores card data itself; high — duplicate charges or orders, or stock that can be oversold; medium — a misleading confirmation or missing pre-purchase information; low — receipt formatting.

## Confirm the commercial rules and test environment

Establish the provider/integration, one-time versus subscription billing, order states, currencies, authoritative prices, discounts, tax/shipping rules, inventory rules, and entitlement lifecycle. Ask about missing business rules; do not invent refund policy, tax rates, subscription behavior, or prices.

Use provider-supported test mode, isolated orders, test payment instruments, and sandbox webhooks. Never make a real purchase, refund, cancellation, customer notification, or inventory change just to complete an audit unless that exact live action is authorized. With no safe test access, inspect code and document the runtime gap.

## Checkout and order integrity

- **Checkout outcomes.** Exercise successful, declined, cancelled, abandoned, expired-session, and duplicate/retried checkout. Check recoverability, visible status, retained basket data, and appropriate error handling.
- **Server-side totals.** Verify prices, currency, quantities, discounts, taxes, shipping, and totals against trusted server-side/provider data. Do not trust client-calculated totals, product descriptions, coupon eligibility, or success flags.
- **Idempotency.** Inspect idempotency across create-payment, order creation, retries, and concurrent submissions. Browser button disabling alone does not prevent duplicate charges or orders.
- **Inventory.** Check out-of-stock behavior, concurrent inventory changes, reservation expiry where used, and overselling protections consistent with the product's fulfillment model. Do not impose stock reservations on products that do not need them.
- **Confirmation integrity.** Ensure confirmation pages obtain authoritative status and ownership. A URL parameter, client redirect, or local state must not fabricate payment success or unlock another user's order.
- **Card data handling.** Check that card numbers and security codes go directly to the payment provider through its hosted fields, redirect, or SDK, and never pass through or get stored or logged by the site's own servers, analytics, error tracking, or session replay. Handling raw card data changes the site's PCI obligations and is the owner's decision, not an implementation detail.
- **Additional authentication.** Exercise payments that require strong customer authentication or 3-D Secure using the provider's test instruments: completed, failed, and abandoned challenges, and off-session renewals that need the customer to return.
- **Promotion and trial abuse.** Check server-side enforcement of coupon eligibility, single use, stacking, expiry, and minimum spend; negative or fractional quantities and manipulated line items; and repeated free trials or sign-up credits through new accounts. Match controls to observed risk, and ask before adding friction for legitimate customers.
- **Pre-purchase information.** Check that the total price including taxes, shipping, and fees, the delivery estimate, and the returns, cancellation, and renewal terms are shown before the customer commits, and that they agree with what is charged. Legal requirements vary by market; ask the owner which apply instead of asserting compliance.

## Webhooks and delayed outcomes

- **Signatures.** Verify signatures using the provider's documented raw-payload requirements, trusted endpoint configuration, and applicable freshness/replay defenses. Do not log full sensitive payloads or secrets for debugging.
- **Event ordering.** Test duplicate, delayed, retried, and out-of-order events. Processing should be idempotent at the business-effect boundary, with durable handling of concurrent deliveries.
- **Reconciliation.** Check reconciliation after partial failure: provider success followed by a database failure, delayed confirmation, repeated fulfillment, or missing events. Avoid acknowledging events before required durable handling unless a reliable queueing design makes that safe.
- **Authoritative state.** Validate state transitions against authoritative provider data when needed. Do not grant access or ship goods solely from an unverified browser callback.

## Post-purchase behavior

Exercise test-mode refunds, partial refunds where supported, subscription cancellation and its effective date, expiry, and resulting entitlements/order status. Check receipts, approved test delivery destinations, links, amounts/currency, and correspondence with the actual payment state. Ask about ambiguous proration, renewal, cancellation, or fulfillment behavior before changing it.

For subscriptions, check failed-renewal handling: the retry schedule, customer notification, grace period, and when access is actually removed and restored. Check that dispute and chargeback events update the order and its entitlements as the owner intends. Ask for the intended dunning and grace rules instead of inventing them.

## Stack-specific checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Stripe keys and modes.** Check that only the publishable key reaches the browser, that the secret key is server-only and preferably a restricted key scoped to what the integration needs, and that test and live keys, webhook secrets, and price IDs are not mixed between environments.
- **Stripe prices and sessions.** Create Checkout Sessions and Payment Intents on the server from server-held price IDs or amounts. Do not accept an amount, price ID, or success flag from the browser without checking it against the catalog, and fulfill from the verified event or a server-side retrieval of the session, not from the success URL.
- **Stripe webhooks.** Verify the signature against the raw request body with the endpoint's signing secret. Handle the events the integration depends on, such as completed, failed, refunded, and disputed payments and subscription changes; record processed event IDs so retries are idempotent; and return success only after the work is durably recorded.
- **Stripe portal and subscriptions.** Check that portal sessions and subscription changes are created only for the signed-in customer's own Stripe customer ID, and that entitlements follow the subscription status delivered by webhooks instead of a value stored at signup.

## Evidence and verification

Record redacted test event/order references, expected and observed state transitions, and outcomes for successful and failed paths. Add focused integration/regression tests for price trust, duplicate processing, and access to paid resources. Report gaps in provider test coverage and any live validation still awaiting authorization. Never use a test checkout result to claim a real settlement or payout succeeded.
