# Short checklist

Every check in the ten domain checklists, by label and in checklist order. Use it for a fast scan of what an audit covers, or at the end of an audit to confirm that each applicable check was reported as passed, failed, not verified, or not applicable. The domain checklists explain how to carry out each check and when not to change anything.

## website-ui-accessibility

- Viewports
- Overflow and clipping
- Content extremes
- Visual consistency
- Sticky and layered elements
- Mobile viewport and keyboards
- Zoom and font scaling
- Text direction
- Keyboard operation
- Skip link and semantics
- Menus and dialogs
- Route changes
- Form errors and announcements
- Contrast and targets
- Motion and media
- Time limits
- Accessible authentication
- Dragging alternatives
- Dark mode toggle
- Custom scrollbars
- Print stylesheet
- Documents and downloads
- Accessibility statement

## website-interactions

- Links and destinations
- Mobile menu
- Progressive navigation
- Direct loads and missing routes
- URL design and state
- Returning position
- Back to top
- Button actions
- Control states
- Feedback placement
- Confirmation and undo
- Labels and input types
- Validation
- Success and error states
- Password visibility toggle
- Input extremes
- Uploads
- Slow, failed, and abusive submissions
- Multi-step forms
- Unsaved changes
- State coverage
- Loading indicators
- Error pages and recovery
- Error detail
- Site search
- Search edge cases
- Request timing
- Client state
- Optimistic updates

## website-content-branding

- Placeholder and unsupported content
- Language quality
- Formats
- Translations
- Last updated date
- Factual claims
- FAQs
- Purpose and CTA
- Value proposition
- Pricing clarity
- Signup friction
- First-run experience
- AI-generated content disclosure
- Footer and contact
- Ownership and copyright
- Legal links
- Logo and brand
- Icons
- Sharing artwork
- Asset licensing

## website-seo-discoverability

- Titles and descriptions
- Headings and language
- Rendered content
- Orphans and duplicates
- Sharing metadata
- Canonicals and indexing directives
- Redirects
- Missing pages
- Sitemap
- Robots and crawler access
- Multilingual
- Parameter and pagination URLs
- Internal search results
- Webmaster tools
- Site migration
- Image and video search
- Local business listings
- Structured data
- FAQ markup
- Credibility
- Freshness
- Crawler policy
- llms.txt
- llms.txt contents
- Next.js metadata
- Next.js and Vercel hostnames

## website-performance

- Image delivery
- Formats
- Layout stability and alt text
- Loading priority
- SVG
- Video and embeds
- Bundle contents
- Splitting and deferral
- Fonts
- Runtime work
- Animation cost
- Resource hints
- Caching
- Delivery infrastructure
- Backend coordination
- Server response time
- Back/forward cache
- Next.js rendering and caching
- Next.js client bundle
- Next.js images and fonts

## website-backend-reliability

- Validation and errors
- Timeouts and retries
- Concurrency
- Rate limits
- Resource leaks
- Background jobs and queues
- Upstream dependencies
- Query cost
- Indexes and pooling
- Caching
- Migrations
- Unused code
- TODOs
- Type and lint errors
- Structure
- Hardcoded secrets
- Supabase database access
- Firebase data access

## website-security-auth

- Exposure sweep
- Served files and history
- Public versus privileged configuration
- Prototype leftovers
- AI tooling leftovers
- Intended behavior
- Exposed credentials
- Secret rotation
- Authorization
- Field tampering
- Response contents
- Row-level security
- Data-store and cloud permissions
- Dangling DNS
- Injection
- SSRF
- Uploads
- CSRF and CORS
- GraphQL and real-time channels
- Business-logic abuse
- HTTPS and cookies
- Token storage and JWTs
- HSTS
- Browser policy headers
- Third-party scripts
- Disclosure
- Disclosure contact
- Account journeys
- Password visibility
- Redirects and enumeration
- Rate limits and tokens
- Automated abuse
- Password handling
- MFA and roles
- OAuth and SSO
- Sensitive changes
- Audit records
- Keys and cost
- Prompt injection
- Output handling
- Data exposure
- Next.js public variables
- Next.js server entry points
- Next.js data sent to the client
- Next.js images and redirects
- Vercel environments and previews
- Supabase row-level security
- Supabase keys
- Supabase storage
- Supabase auth settings
- Firebase security rules
- Firebase config and admin credentials
- Firebase functions and App Check
- Clerk sessions
- Auth.js sessions
- Auth0 tokens
- Better Auth configuration

## website-commerce

- Checkout outcomes
- Server-side totals
- Idempotency
- Inventory
- Confirmation integrity
- Card data handling
- Additional authentication
- Promotion and trial abuse
- Pre-purchase information
- Signatures
- Event ordering
- Reconciliation
- Authoritative state
- Stripe keys and modes
- Stripe prices and sessions
- Stripe webhooks
- Stripe portal and subscriptions

## website-privacy-analytics

- Inventory
- Cookie banner
- Consent states
- Working controls
- Persistence
- Dependencies
- Third-party embeds
- Session replay and heatmaps
- Browser privacy signals
- Event accuracy
- Attribution
- Internal traffic
- Sensitive data
- Receipt
- Policy accuracy
- Links and requests
- Drafts
- Account deletion
- Data export
- Age restrictions

## website-operations

- Environments
- Source maps
- Delivery configuration
- Health and shutdown
- Rollout and rollback
- Backups
- Domain and certificate expiry
- Pipeline permissions
- Operator access
- Cost controls
- Load testing
- Dependency updates
- Error tracking and logs
- Monitoring
- Alerts
- Log retention
- Incident readiness
- Status communication
- Contact links
- Form delivery
- Sender authentication
- Transactional messages
- Unsubscribe
- Bounces and complaints
- Email rendering
- Vercel deployment settings
- Supabase project operations
- Firebase project operations
