# Benchmark answer key

Planted defects in the Fernway Plants benchmark site. Keep this file away from the agent under test; `setup.sh` copies only the site.

IDs here start with `B-` so they are not confused with the finding IDs an agent assigns. The severity is the one the planted defect deserves under the skills' own scale. The site has other weaknesses that are not listed: a correct finding outside this key is not a false positive.

## website-security-auth

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-SEC-01 | critical | `server/routes.js` admin routes; `src/pages/Admin.jsx` | `/api/admin/users`, `/api/admin/orders`, and `DELETE /api/admin/products/:id` have no authentication. The only admin check is in the browser, against a role read from `localStorage`. |
| B-SEC-02 | critical | `server/routes.js` `GET /orders/:id` | Any signed-in user can read any order by ID, including the other customer's record and card number. |
| B-SEC-03 | critical | `server/routes.js`, `server/index.js` | SQL built by string concatenation: product search, product by ID, admin product delete, account update, and the payment webhook. |
| B-SEC-04 | high | `server/routes.js` `PUT /account` | Every key in the request body is written to the user row, so a customer can set `role` to `admin` or overwrite `password_hash`. |
| B-SEC-05 | high | `server/db.js` `hash` | Passwords are stored as unsalted MD5. There is no password policy. |
| B-SEC-06 | high | `server/auth.js`, `.env` | The JWT secret is `secret`, tokens never expire, and no algorithm is pinned on verification. |
| B-SEC-07 | high | `src/api.js`, `src/pages/Account.jsx` | The session token and user object are kept in `localStorage`. Logging out removes the user object but leaves the token. |
| B-SEC-08 | high | `src/pages/ProductDetail.jsx`, `server/routes.js` reviews | Reviews are rendered with `dangerouslySetInnerHTML`, and anyone can post one without signing in: stored XSS. |
| B-SEC-09 | high | `.env`, `server/db.js` seed, `src/api.js` | `.env` with credentials is committed; a default admin account `admin@fernway.test` / `admin123` is seeded; the payment key is exposed to the browser through a `VITE_` variable and appears in the built bundle. |
| B-SEC-10 | high | `server/index.js` `/api/debug/env` | A debug route returns the whole process environment. |
| B-SEC-11 | high | `server/index.js` second `express.static` | The project root is served as static files, so the server source, `package.json`, and the database file `data/fernway.sqlite` can be downloaded. |
| B-SEC-12 | high | `server/routes.js` forgot and reset password | The reset token is the current timestamp, is returned in the API response, never expires, and can be reused. |
| B-SEC-13 | medium | `server/routes.js` login and forgot password | Different messages reveal whether an email has an account. There is no rate limiting on login or reset. |
| B-SEC-14 | medium | `server/index.js` CORS | Any origin is reflected with credentials allowed. |
| B-SEC-15 | high | `server/routes.js` `/image-proxy` | The server fetches any URL a caller supplies and returns the response: SSRF and an open proxy. |
| B-SEC-16 | medium | `server/routes.js` login, signup, account, order detail | Responses include the full user row with `password_hash`. |
| B-SEC-17 | medium | `server/index.js` error handler | Errors return a stack trace. No security headers are set. |
| B-SEC-18 | low | `index.html` | jQuery is loaded from a CDN at a floating version without Subresource Integrity, and is not used. |
| B-SEC-19 | medium | `src/pages/Auth.jsx` | Password fields are plain text inputs, and the login form writes the email and password to the browser console. |

## website-commerce

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-PAY-01 | critical | `server/routes.js` `POST /orders`; `src/pages/Cart.jsx` | The server stores the total the browser sends. Prices are never recomputed. |
| B-PAY-02 | critical | `src/pages/CheckoutSuccess.jsx`; `POST /orders/:id/confirm` | The success page marks an order paid because the URL says `paid=true`. The confirm route needs no sign-in and accepts any order ID. |
| B-PAY-03 | critical | `server/index.js` `/api/webhooks/payment` | The webhook marks an order paid with no signature check. |
| B-PAY-04 | critical | `src/pages/Cart.jsx`, `server/routes.js`, `src/pages/Account.jsx` | The site's own form collects the card number and CVC, sends them to its API, stores the card number in plain text, shows it on the account page, and includes it in an analytics event. |
| B-PAY-05 | high | `src/pages/Cart.jsx` `applyCoupon` | The coupon is applied only in the browser and can be applied again with every click. The server stores the code without checking it. |
| B-PAY-06 | high | `src/pages/Cart.jsx` quantity; `POST /orders` | Quantities can be negative, zero, or fractional, which lowers the total and raises stock. |
| B-PAY-07 | high | `server/routes.js` `POST /orders` | Stock is read and then written with no check and no transaction, so it can go negative and concurrent orders oversell. A product with zero stock can be ordered. |
| B-PAY-08 | medium | `src/pages/Cart.jsx` `pay` | Nothing prevents a double submission; two clicks create two orders. |
| B-PAY-09 | medium | `src/pages/CheckoutSuccess.jsx`, `src/pages/Cart.jsx` | The page says a receipt was emailed, but no email is ever sent. Tax, shipping, and return terms are not shown before payment. |

## website-backend-reliability

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-REL-01 | medium | `server/routes.js` `GET /orders` | One query per order for its items and one more per item for its product. |
| B-REL-02 | medium | `server/routes.js`, `server/auth.js` | Failures, including a missing sign-in, return HTTP 200 with an `error` field. |
| B-REL-03 | medium | `server/routes.js` signup, orders, reviews, contact | No request validation. A missing `items` array or password crashes the handler. |
| B-REL-04 | medium | `server/db.js` schema; signup | No unique constraint on email, so the same address can sign up repeatedly. |
| B-REL-05 | medium | `server/routes.js` `/shipping-quote` | The outbound call has no timeout and parses the response without guarding against bad JSON. |
| B-REL-06 | low | `server/routes.js` `GET /products` | The list is unpaginated and returns the internal `cost_price` field. |
| B-REL-07 | medium | `src/pages/ProductDetail.jsx` | The stock label is inverted: a product with zero stock shows "In stock". |
| B-REL-08 | medium | `package.json`, `server/legacy.js` | There are no tests and `npm test` always fails. `server/legacy.js` is dead code, and `axios` is installed but unused. |
| B-REL-09 | medium | `server/db.js` `save`; `POST /orders` | Every write rewrites the whole database file synchronously, and an order is written in several steps with no transaction. |
| B-REL-10 | low | `server/index.js` | The JSON body limit is 50 MB. |

## website-interactions

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-UX-01 | high | `server/index.js` | There is no fallback for client routes. Loading or refreshing `/products`, `/products/1`, or `/cart` directly returns "Cannot GET". |
| B-UX-02 | medium | `src/App.jsx` | An unknown route renders an empty page. The footer links to `/terms`, which does not exist. |
| B-UX-03 | medium | `src/App.jsx`, `src/pages/Home.jsx` | Blog, Care guides, Twitter, Instagram, and "Click here" all link to `#`. |
| B-UX-04 | medium | `src/pages/Products.jsx` | "Add to wishlist" only writes to the console. |
| B-UX-05 | medium | `src/pages/Home.jsx` `subscribe` | The newsletter form shows success after a timer and sends nothing. |
| B-UX-06 | high | `src/pages/Static.jsx` `Contact` | The contact form says "Message sent!" whatever the result. |
| B-UX-07 | medium | `src/pages/Auth.jsx`, `src/pages/ProductDetail.jsx` | A failed login shows an alert and clears both fields. The review form clears before the request finishes. |
| B-UX-08 | medium | `src/pages/Products.jsx`, `src/api.js` | Search sends a request on every keystroke with no debounce and no protection against out-of-order responses. No page has a loading, empty, or error state, and a failed request is never handled. |
| B-UX-09 | low | `src/pages/ProductDetail.jsx` `addToCart` | Adding to the cart gives no feedback, and adding the same product again creates a duplicate line. |
| B-UX-10 | medium | `src/App.jsx`, `src/pages/Products.jsx` | Navigation items and product cards are `div` elements with click handlers instead of links, the logo does not link home, and the current page is not marked. |
| B-UX-11 | medium | `src/pages/Auth.jsx` `Signup` | Signup has no error handling; a failed request does nothing visible. |

## website-ui-accessibility

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-UI-01 | high | `src/styles.css` | The layout is a fixed 1200 pixels with no breakpoints, the product grid never wraps, and `overflow-x: hidden` on `html` hides the resulting horizontal overflow. |
| B-UI-02 | medium | `index.html` viewport | `user-scalable=no` and `maximum-scale=1` disable zoom. |
| B-UI-03 | high | `src/styles.css` `* { outline: none }` | Focus indicators are removed everywhere. |
| B-UI-04 | high | `src/App.jsx`, `src/pages/*.jsx` | Clickable `div` and `span` elements cannot be reached or activated from the keyboard: navigation, product cards, Quick view, Apply, the cookie OK control, and the modal close. |
| B-UI-05 | medium | `src/styles.css` | Low contrast and very small text: muted text, navigation, footer, and white text on the light green button. |
| B-UI-06 | medium | `img` elements in `src/App.jsx` navigation and `src/pages/*.jsx` | No informative image has alternative text: the logo, hero, product photos, and avatars. |
| B-UI-07 | medium | all forms | Inputs have placeholders and no labels. |
| B-UI-08 | medium | `src/pages/Products.jsx`, `.modal` | The Quick view modal has no dialog semantics, focus handling, or Escape key, is 900 pixels tall at a fixed position, and closes only through a tiny "x". |
| B-UI-09 | medium | `index.html`, all pages | No `lang` attribute, no headings (titles are `div` elements), and no landmarks. |
| B-UI-10 | low | `src/styles.css` `.btn`, `.cookie-banner` | Buttons are 22 pixels tall, and the cookie banner covers the bottom of every page above the modal. |
| B-UI-11 | low | `src/styles.css` `.hero` | The hero image is stretched to a fixed box. |
| B-UI-12 | medium | `src/App.jsx` | The document title never changes between routes and focus is not managed on navigation. |

## website-content-branding

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-CON-01 | medium | `src/pages/Home.jsx`, `src/pages/Static.jsx` | Lorem ipsum on the home and about pages. |
| B-CON-02 | high | `src/pages/Home.jsx`, `src/pages/Static.jsx` | Invented testimonials with stock avatars, unsupported statistics, a randomly generated "people are shopping right now" counter, and placeholder team members. |
| B-CON-03 | medium | throughout | The brand is written as Fernway, FernWay, Plantify, and Acme. |
| B-CON-04 | medium | `src/App.jsx` footer; `src/pages/Static.jsx` contact | "© 2019 Plantify Inc.", `example@email.com`, and a placeholder phone number. The contact page's `mailto:` and `tel:` targets differ from the text shown. |
| B-CON-05 | medium | `src/pages/Home.jsx` | Four calls to action of equal weight, one labeled "Click here". |
| B-CON-06 | high | `src/pages/Static.jsx` `Privacy`; `src/App.jsx` | The privacy policy is another company's boilerplate dated "today", and there is no terms page. |
| B-CON-07 | low | `index.html` | No favicon, the title is "Vite App", and the social image file does not exist. |
| B-CON-08 | low | `src/pages/Products.jsx`, `ProductDetail.jsx`, `Cart.jsx` | Prices appear as `$34.5`, `34.50 USD`, and an unrounded cart total. |
| B-CON-09 | low | `src/pages/Auth.jsx` `Signup` | Signup asks for phone, birthday, and company, none of which is needed or stored. |

## website-seo-discoverability

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-SEO-01 | high | `index.html`, `public/robots.txt` | `noindex, nofollow` on every page and `Disallow: /` for all crawlers. |
| B-SEO-02 | medium | `index.html` | Every route has the title "Vite App" and no description. |
| B-SEO-03 | medium | `index.html`, `public/sitemap.xml` | The canonical URL and sitemap use `localhost:3000`. The sitemap lists `/admin`, `/account`, and a page that does not exist, all dated 2019. |
| B-SEO-04 | high | `server/index.js`, `src/main.jsx` | Pages are rendered only in the browser and direct requests for any route but `/` return 404, so no page other than the home page can be fetched by a crawler. |
| B-SEO-05 | medium | `index.html`, all pages | No headings, no structured data, and Open Graph values that are generic or point to a missing image. |
| B-SEO-06 | medium | `src/App.jsx` | Main navigation uses click handlers instead of links, so there is nothing for a crawler to follow. |

## website-performance

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-PERF-01 | high | `src/pages/Home.jsx`, `server/db.js` seed | The hero is a hotlinked 4000-pixel image at full quality with `loading="lazy"`. Product images request 3000 pixels and avatars 600 pixels for small boxes. |
| B-PERF-02 | medium | `src/pages/Home.jsx` | All of `lodash` and `moment` are imported for one random number, one loop, and one date. The page ships a single 300 kB script. |
| B-PERF-03 | medium | `src/pages/Home.jsx` `useEffect` | A timer re-renders the home page every 100 ms and is never cleared. |
| B-PERF-04 | medium | `index.html` | Render-blocking font CSS for twelve weights, plus blocking jQuery and analytics scripts in the head. |
| B-PERF-05 | medium | `server/index.js` | `Cache-Control: no-store` on every response, including hashed assets. |
| B-PERF-06 | low | all `img` elements | No image dimensions, so content shifts as images load. |

## website-privacy-analytics

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-PRIV-01 | high | `index.html`, `src/App.jsx` `CookieBanner` | Analytics loads on every page before any choice. The banner offers only "OK" and controls nothing. |
| B-PRIV-02 | critical | `src/pages/Cart.jsx` `pay` | The purchase event sends the customer's email and card number to analytics. |
| B-PRIV-03 | high | `src/pages/Static.jsx` `Privacy` | The policy says there are no cookies, analytics, or third parties and that payment data is never stored. All four statements are false. |
| B-PRIV-04 | medium | `index.html`, `src/pages/*.jsx` | Fonts, a script CDN, and two image hosts are contacted on page load. |
| B-PRIV-05 | high | `server/index.js` request logger; `server/routes.js`; `src/pages/Auth.jsx` | Every request body is logged, including passwords, card numbers, and contact messages. |
| B-PRIV-06 | low | `src/pages/Auth.jsx` `Signup` | Phone, birthday, and company are collected without a purpose. |
| B-PRIV-07 | medium | whole site | There is no way to delete an account or export data. |

## website-operations

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-OPS-01 | high | `src/api.js`, `server/index.js` | The API address `http://localhost:4000/api` and the port are hardcoded, so `PORT` has no effect. The server never loads `.env`. |
| B-OPS-02 | medium | `vite.config.js` | Source maps are built and served publicly. |
| B-OPS-03 | medium | `server/index.js` | No health endpoint, graceful shutdown, or error tracking. Logs are unstructured and contain secrets. |
| B-OPS-04 | high | `server/routes.js` contact and forgot password | No email is ever sent: contact messages, reset links, and receipts go nowhere. |
| B-OPS-05 | high | `server/db.js`, `server/index.js` | All data is one SQLite file inside a publicly served folder, with no backup and no separation between environments. |
| B-OPS-06 | medium | repository | No lock file, no `.gitignore`, and no CI. |

## modernize-old-repo

The security defects above also belong in this audit's security phase. The items below are specific to reviving the repository.

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-MOD-01 | high | `README.md` | The README describes a different project: the name Plantify, MongoDB, `yarn run serve`, port 3000, Stripe, "100% test coverage", and Heroku are all wrong. |
| B-MOD-02 | high | `package.json` | Old versions, most with published advisories: `express` 4.16.4, `jsonwebtoken` 8.5.1, `lodash` 4.17.15, `axios` 0.19.2, `moment` 2.24.0, and Vite 4. |
| B-MOD-03 | medium | `package.json` | `request` is deprecated, `moment` is in maintenance mode, and `body-parser` duplicates what Express provides. |
| B-MOD-04 | medium | `package.json` | `axios` is unused, and the build tools are listed as runtime dependencies. |
| B-MOD-05 | medium | `package.json`, repository | `engines` claims Node 10, and there is no lock file, `.gitignore`, or license. |
| B-MOD-06 | medium | `server/db.js`, `src/main.jsx` | Deprecated or legacy APIs: `new Buffer()`, the `ReactDOM.render` root API, React 17, and React Router 5. |
| B-MOD-07 | medium | `package.json` | `npm test` is the placeholder that exits with an error. There are no tests. |
| B-MOD-08 | low | `server/legacy.js` | Dead code with a commented-out MongoDB version, a default database credential, and stale TODOs. |
| B-MOD-09 | high | `.env`, git history | Credentials are committed and remain in history, while the server never reads the file. |
| B-MOD-10 | low | `server/routes.js`, `server/db.js`, `public/sitemap.xml` | A shipping service at a host that does not exist, and hardcoded 2019 dates. |

## review-changes

Apply the change with `setup.sh <dir> --with-change` and give the agent the description in `changes/001-order-notes.md`.

| ID | Severity | Location | Planted defect |
| --- | --- | --- | --- |
| B-REV-01 | critical | `server/routes.js` notes routes | The new routes have no authentication or ownership check: anyone can read or change the notes on any order. |
| B-REV-02 | critical | `server/routes.js` notes routes | Both new queries are built by string concatenation: SQL injection. |
| B-REV-03 | high | `src/pages/Account.jsx` `OrderNotes` | Notes are rendered with `dangerouslySetInnerHTML`: stored XSS. |
| B-REV-04 | high | `server/db.js` `init` | The migration adds a `NOT NULL` column with no default and runs on every start. The server fails to start as soon as a database file exists; the author only tested a fresh one. |
| B-REV-05 | high | `server/routes.js` `GET /orders`; `src/pages/Account.jsx` | The response field `items` was renamed to `lines`, but the account page still reads `order.items` and crashes. |
| B-REV-06 | high | `server/routes.js` `POST /orders`; `src/pages/Cart.jsx` | The loyalty discount is whatever percentage the customer types, with no upper bound: 100 makes the order free and more makes the total negative. |
| B-REV-07 | medium | `server/routes.js`, `src/pages/Account.jsx` | The Authorization header is written to the log, and a test login is left in a comment. |
| B-REV-08 | medium | `src/pages/Account.jsx` | Notes are fetched with one request per order. |
| B-REV-09 | medium | `src/pages/Account.jsx` `OrderNotes` | The notes field has no label, and "Save notes" is a `div` that cannot be used from the keyboard. Saving has no success or failure feedback. |
| B-REV-10 | low | `package.json`, `src/styles.css` | Unrelated changes are bundled in as "small cleanup": an unused `left-pad` dependency, and a smaller button height that affects every page. |

### Clean change

Apply it with `setup.sh <dir> --clean-change` and give the agent the description in `changes/002-stock-label.md`. The change fixes the inverted stock label and disables "Add to cart" for a product with no stock. It is correct and introduces nothing.

| ID | Expected outcome |
| --- | --- |
| B-CLEAN-01 | The report finds no defect introduced by this change and says so plainly. |
| B-CLEAN-02 | Weaknesses that were already there, such as the server still accepting an order for a product with no stock and the absence of tests, may be mentioned only as pre-existing or as optional suggestions. |
| B-CLEAN-03 | Reporting any of those as a regression caused by this change, or inventing a defect in the changed lines, counts as a false positive. |

## Stack site: Next.js, Vercel, Supabase, and Firebase

The second fixture, `stack-site/`, exercises the stack-specific checks. Set it up with `setup.sh <dir> --stack`. Score a `website-security-auth` or `fix-website` run against the security rows, and the performance, SEO, and backend skills against their rows.

| ID | Severity | Check it tests | Location | Planted defect |
| --- | --- | --- | --- | --- |
| B-STACK-01 | critical | Next.js public variables; Supabase keys | `lib/supabase-admin.js`, `.env.example`, `components/AdminTable.js` | The service-role key is read from a `NEXT_PUBLIC_` variable, and the admin client is imported by a client component, so the key is in the browser bundle. |
| B-STACK-02 | critical | Next.js server entry points | `app/notes/actions.js` | Server actions use the service-role client with no session check: `deleteNote` deletes any note by ID, and `addNote` trusts the `user_id` sent in the form. |
| B-STACK-03 | critical | Next.js server entry points | `app/api/notes/route.js`, `app/api/cron/digest/route.js` | Route handlers need no authentication. One returns every member's notes; the scheduled one returns every member's email address and has no scheduler secret. |
| B-STACK-04 | high | Next.js server entry points; Supabase auth settings | `middleware.js` | Middleware is the only protection for `/notes` and `/admin`. It decodes the token without verifying its signature and grants admin from user-editable metadata, so a forged cookie opens the admin page. |
| B-STACK-05 | high | Next.js data sent to the client | `app/admin/page.js`, `components/AdminTable.js` | The server component passes complete user and profile records, including `internal_notes`, to a client component. |
| B-STACK-06 | medium | Next.js images and redirects | `next.config.js`, `app/go/route.js` | Remote images are allowed from any host, and `/go?to=` redirects to any URL. |
| B-STACK-07 | medium | Token storage and JWTs | `app/login/page.js` | The access token is copied into a cookie by script, without `HttpOnly`, `Secure`, or `SameSite`, valid for a week. |
| B-STACK-08 | critical | Supabase row-level security | `supabase/migrations/20240101000000_init.sql`, `app/notes/page.js` | `care_notes` has no row-level security. The page loads every member's notes with the public key and filters them in the browser. |
| B-STACK-09 | critical | Supabase row-level security | same migration, `profiles` policies | Select and update policies use `true`, and the update policy has no `WITH CHECK`, so anyone holding the public key can change any profile, including its role. |
| B-STACK-10 | high | Supabase row-level security | same migration, `all_reminders()` | A `SECURITY DEFINER` function, executable by anonymous callers, returns every member's reminders and bypasses the correct policies on that table. |
| B-STACK-11 | high | Supabase storage | same migration, `plant-photos` | The bucket is public, and anyone can upload to it or delete from it. Uploads use the original file name with overwrite enabled. |
| B-STACK-12 | medium | Supabase auth settings | `supabase/config.toml` | The redirect allow list contains `https://*`, email confirmation is off, the minimum password length is 6, and sessions last a week. |
| B-STACK-13 | critical | Firebase security rules | `firestore.rules` | `tips` is readable and writable by anyone, `members` documents by any signed-in user, and a catch-all rule leaves everything open until 2030. |
| B-STACK-14 | high | Firebase config and admin credentials | `serviceAccount.json`, `lib/firebase-admin.js` | A service-account file is committed to the repository and imported by the code. |
| B-STACK-15 | medium | Firebase data access | `app/tips/page.js`, `components/Shell.js` | The tips listener reads the whole collection and is never unsubscribed, every page load reads the whole collection again for a count, and a like is a read followed by a write with no transaction. |
| B-STACK-16 | medium | Next.js metadata; Next.js and Vercel hostnames | `app/layout.js`, `app/sitemap.js`, `app/robots.js` | Every page has the default "Create Next App" title and description with no `metadataBase`. The sitemap is built from the deployment hostname, lists `/notes` and `/admin`, and stamps every entry with the current time. |
| B-STACK-17 | medium | Next.js rendering and caching; client bundle; images and fonts | `app/page.js`, `components/Shell.js`, `app/layout.js` | The static home page is forced dynamic. A client component wraps every page and pulls the Supabase and Firebase SDKs into each one. The hero is a raw 4000-pixel `img`, and fonts load through a blocking stylesheet with nine weights. |

Decoys in the stack site:

| ID | Location | Why it is fine |
| --- | --- | --- |
| B-DECOY-07 | `lib/supabase-browser.js`, `.env.example` | The Supabase URL and anon key in `NEXT_PUBLIC_` variables are public by design. |
| B-DECOY-08 | `lib/firebase.js` | The Firebase web API key and project ID are public by design. |
| B-DECOY-09 | migration, `reminders` policies | The four policies on `reminders` are correct. The leak is the function in B-STACK-10. |

## Subtle defects

Added after the first benchmark run, which showed that a plain request with no skill finds most of the obvious defects. Each of these looks correct on a first reading: the code checks a session, a parameter, or a count, but the check is incomplete. Score them separately from the sections above so earlier runs stay comparable.

Score a whole-site run (`fix-website` or a control) on the shop against rows 01 to 05, and a run on the stack site against rows 06 to 08. Score a focused skill against the rows whose Area names it.

| ID | Severity | Fixture | Area | Location | Planted defect |
| --- | --- | --- | --- | --- | --- |
| B-SUB-01 | high | shop | commerce | `server/store.js` `POST /orders/:id/cancel` | Cancelling checks that the order belongs to the customer but not its state. A paid order can be cancelled with no refund, and every repeated cancel puts the items back in stock again, so stock grows without limit. |
| B-SUB-02 | high | shop | security | `server/store.js` `POST /account/verify-password` and `POST /account/password`; `src/pages/Settings.jsx` | Re-entering the current password is enforced only by the settings page. The password route accepts any signed-in token without proof that the first step happened, so a stolen token is enough to take over the account. |
| B-SUB-03 | critical | shop | security | `server/store.js` `GET /track/:id`; `src/pages/Track.jsx` | Order tracking compares the email only when one is sent. Without the parameter, anyone can read the customer's name, address, and order status for any order number. The page always sends the email, so the flaw does not show in the interface. |
| B-SUB-04 | medium | shop | security | `server/store.js` `GET /products/bestsellers` | The public bestsellers response lists its columns explicitly but includes each product's margin, which reveals cost prices. The home page shows only the name and price. |
| B-SUB-05 | high | shop | commerce, backend-reliability | `server/store.js` `POST /gift-cards/redeem` | Redemption checks that a code is unused, waits for the issuer check, and only then marks it used. Two requests sent together both pass the check, so one card is credited twice. A second request sent later is correctly refused. |
| B-SUB-06 | critical | stack site | security | `app/notes/reminder-actions.js` | The reminder actions verify the session, then update and delete by ID with the service-role client and no owner check, so any member can move or delete another member's reminders. The table's own policies are correct (B-DECOY-09); the service role bypasses them. |
| B-SUB-07 | medium | stack site | security, backend-reliability | `app/api/kit/route.js`, `supabase/migrations/20240301000000_care_kits.sql` | One free kit per member is enforced by a count followed by an insert, with no unique constraint on `kit_claims.user_id`. Two requests sent together both succeed. |
| B-SUB-08 | critical | stack site | security, performance | `app/summary/page.js` | `unstable_cache` wraps a function that uses the signed-in member but is keyed only by `care-summary`. The first member's email, note count, and next reminder are served to every member for an hour. |

## Decoys

These look like defects and are not. Reporting one as a finding is a false positive; noting it as checked and acceptable is correct.

| ID | Location | Why it is fine |
| --- | --- | --- |
| B-DECOY-01 | `server/routes.js` `GET /products`, `ORDER BY` | The sort clause is concatenated into the SQL, but its value comes from a fixed server-side list, never from the request. The search term in the same statement is the real injection (B-SEC-03). |
| B-DECOY-02 | `server/routes.js` `GET /products`, `ETag` | MD5 is used to build a cache validator, not to protect anything. The real MD5 problem is password hashing (B-SEC-05). |
| B-DECOY-03 | `src/pages/Static.jsx` `CARE_TIPS` | `dangerouslySetInnerHTML` renders a constant written in the source, with no user input. The real XSS is in reviews (B-SEC-08). |
| B-DECOY-04 | `index.html` | The analytics measurement ID is public by design and is not a leaked secret. Loading analytics before consent is the real problem (B-PRIV-01). |
| B-DECOY-05 | `server/routes.js` `GET /products`, `GET /products/:id` | The catalog is readable without signing in on purpose. |
| B-DECOY-06 | `src/App.jsx` footer | The decorative logo has an empty `alt` and `aria-hidden`, which is correct for a decorative image. |

## Questions the agent should ask

The skills tell the agent to ask instead of inventing an answer. In review-first or audit-only mode, a good report raises these as open questions and does not settle them itself.

| ID | Question | A wrong move |
| --- | --- | --- |
| B-ASK-01 | Which name is correct: Fernway, FernWay, or Plantify? | Picking one and rewriting the copy. |
| B-ASK-02 | Are the testimonials and statistics real, and what is the source? | Rewriting them into different unsupported claims. |
| B-ASK-03 | What are the real contact email, phone number, and company details? | Inventing contact details or a company name. |
| B-ASK-04 | Should search engines and AI crawlers be allowed, and which? | Opening the site to every crawler without asking. |
| B-ASK-05 | Which payment provider is intended, and what are the tax, shipping, and returns rules? | Choosing a provider or writing a returns policy. |
| B-ASK-06 | What should the privacy policy say, and for which markets? | Writing a final legal policy from guesswork. |

## Re-audit

Set up with `setup.sh <dir> --reaudit`. The copy contains the owner's fixes as a commit and the earlier `website-audit-findings.md`. Ask for a re-audit of that file.

| Finding | Expected status | Why |
| --- | --- | --- |
| SEC-001 | still open | Two admin routes now require an admin, but `DELETE /api/admin/products/:id` still needs no sign-in. A request with no token also receives HTTP 200 with an error body, not 401 or 403, so the pass criteria are not met. |
| SEC-002 | fixed and verified | A customer receives 404 for another customer's order and can still read their own. |
| SEC-003 | fixed and verified | Reviews are rendered as text. |
| SEC-004 | regressed | Recorded as fixed, but `/api/debug/env` exists and returns the environment. |
| PAY-001 | fixed and verified | The stored total is computed from stored prices. Quantity validation is still missing, which is a separate problem. |
| UX-001 | fixed and verified | Client routes load directly. The fix has a side effect worth a new finding: unknown `/api/` paths and missing files now return the app shell with HTTP 200. |
| SEO-001 | still open | The `noindex` tag is gone, but `robots.txt` still disallows everything. |
| CONTENT-001 | deferred, unchanged | The placeholder text is still there and the owner's decision stands. |

A good re-audit also keeps the original IDs, does not repeat the whole audit, changes no application files, and numbers any new finding after the highest existing ID in its area.
