# Payments and commerce

Source checklist section: 18 (payments/ecommerce).

## Confirm the commercial rules and test environment

Establish the provider/integration, one-time versus subscription billing, order states, currencies, authoritative prices, discounts, tax/shipping rules, inventory rules, and entitlement lifecycle. Ask about missing business rules; do not invent refund policy, tax rates, subscription behavior, or prices.

Use provider-supported test mode, isolated orders, test payment instruments, and sandbox webhooks. Never make a real purchase, refund, cancellation, customer notification, or inventory change just to complete an audit unless that exact live action is authorized. With no safe test access, inspect code and document the runtime gap.

## Checkout and order integrity

- Exercise successful, declined, cancelled, abandoned, expired-session, and duplicate/retried checkout. Check recoverability, visible status, retained basket data, and appropriate error handling.
- Verify prices, currency, quantities, discounts, taxes, shipping, and totals against trusted server-side/provider data. Do not trust client-calculated totals, product descriptions, coupon eligibility, or success flags.
- Inspect idempotency across create-payment, order creation, retries, and concurrent submissions. Browser button disabling alone does not prevent duplicate charges or orders.
- Check out-of-stock behavior, concurrent inventory changes, reservation expiry where used, and overselling protections consistent with the product's fulfillment model. Do not impose stock reservations on products that do not need them.
- Ensure confirmation pages obtain authoritative status and ownership. A URL parameter, client redirect, or local state must not fabricate payment success or unlock another user's order.

## Webhooks and delayed outcomes

- Verify signatures using the provider's documented raw-payload requirements, trusted endpoint configuration, and applicable freshness/replay defenses. Do not log full sensitive payloads or secrets for debugging.
- Test duplicate, delayed, retried, and out-of-order events. Processing should be idempotent at the business-effect boundary, with durable handling of concurrent deliveries.
- Check reconciliation after partial failure: provider success followed by a database failure, delayed confirmation, repeated fulfillment, or missing events. Avoid acknowledging events before required durable handling unless a reliable queueing design makes that safe.
- Validate state transitions against authoritative provider data when needed. Do not grant access or ship goods solely from an unverified browser callback.

## Post-purchase behavior

Exercise test-mode refunds, partial refunds where supported, subscription cancellation and its effective date, expiry, and resulting entitlements/order status. Check receipts, approved test delivery destinations, links, amounts/currency, and correspondence with the actual payment state. Ask about ambiguous proration, renewal, cancellation, or fulfillment behavior before changing it.

## Evidence and verification

Record redacted test event/order references, expected and observed state transitions, and outcomes for successful and failed paths. Add focused integration/regression tests for price trust, duplicate processing, and access to paid resources. Report gaps in provider test coverage and any live validation still awaiting authorization. Never use a test checkout result to claim a real settlement or payout succeeded.
