# Website audit findings

- Target: Fernway Plants shop (this repository)
- Last updated: 2026-09-12
- Mode and depth: audit only, quick
- Scope: security, checkout, routing, and indexing of the public shop
- Not covered: accessibility, performance, privacy, operations, email delivery

| ID | Severity | Status | Location | Problem | Proposed change | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | critical | open | `server/routes.js` admin routes | Admin routes need no sign-in | Require an admin session on every admin route | fix |
| SEC-002 | critical | open | `server/routes.js` `GET /orders/:id` | Any signed-in user can read any order | Check that the order belongs to the caller | fix |
| SEC-003 | high | open | `src/pages/ProductDetail.jsx` | Reviews are rendered as HTML | Render review text as text | fix |
| SEC-004 | high | fixed and verified | `server/index.js` | Debug route returned the process environment | Remove the route | fix |
| PAY-001 | critical | open | `server/routes.js` `POST /orders` | Server stores the total sent by the browser | Compute the total on the server | fix |
| UX-001 | high | open | `server/index.js` | Direct loads of client routes return 404 | Serve the app shell for client routes | fix |
| SEO-001 | high | open | `index.html`, `public/robots.txt` | The whole site is blocked from indexing | Remove the noindex tag and the blanket Disallow | fix |
| CONTENT-001 | medium | deferred | `src/pages/Home.jsx`, `src/pages/Static.jsx` | Lorem ipsum on the home and about pages | Replace with real copy | defer |

## SEC-001

- Confidence: high
- Evidence: `GET /api/admin/users`, `GET /api/admin/orders`, and `DELETE /api/admin/products/:id` respond without an Authorization header.
- Impact: anyone can list every user and order and delete products.
- Pass criteria: each of the three routes returns 401 or 403 without an admin token and works with one.
- Verification: not yet re-checked.

## SEC-002

- Confidence: high
- Evidence: signed in as `maya@example.test`, `GET /api/orders/2` returns Leo's order.
- Impact: any customer can read other customers' orders and addresses.
- Pass criteria: a customer receives 403 or 404 for an order that is not theirs and still sees their own.
- Verification: not yet re-checked.

## SEC-003

- Confidence: high
- Evidence: a review containing markup is inserted into the page as HTML.
- Impact: stored cross-site scripting on every product page.
- Pass criteria: markup in a review is displayed as text.
- Verification: not yet re-checked.

## SEC-004

- Confidence: high
- Evidence: `GET /api/debug/env` returned every environment variable.
- Impact: secrets disclosed to any visitor.
- Pass criteria: the route returns 404.
- Verification: 2026-09-12, route removed and 404 confirmed.

## PAY-001

- Confidence: high
- Evidence: `POST /api/orders` with `total: 0.01` creates an order for that amount.
- Impact: customers choose their own price.
- Pass criteria: the stored total equals the sum of stored prices times quantities whatever the request says.
- Verification: not yet re-checked.

## UX-001

- Confidence: high
- Evidence: requesting `/products` or `/cart` directly returns "Cannot GET".
- Impact: shared links and refreshes fail.
- Pass criteria: every client route loads directly and on refresh.
- Verification: not yet re-checked.

## SEO-001

- Confidence: high
- Evidence: `noindex, nofollow` in `index.html` and `Disallow: /` in `robots.txt`.
- Impact: nothing can be indexed.
- Pass criteria: neither the meta tag nor the robots rule blocks the public pages.
- Verification: not yet re-checked.

## CONTENT-001

- Confidence: high
- Evidence: placeholder paragraphs on the home and about pages.
- Impact: the site looks unfinished.
- Pass criteria: no placeholder text remains.
- Verification: deferred by the owner until the copy is written.
