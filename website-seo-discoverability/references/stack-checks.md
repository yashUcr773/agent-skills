# Stack-specific SEO checks

Apply only the bullets for a stack the site actually uses. Platform defaults change between versions; confirm against the current documentation for the installed version.

- **Next.js metadata.** Check that each indexable route sets its own title, description, canonical, and Open Graph values through the Metadata API or the document head, that `metadataBase` is the production origin so generated URLs do not point at localhost or a preview host, and that client-only rendering does not leave metadata or primary content out of the server HTML.
- **Next.js and Vercel hostnames.** Check generated `sitemap` and `robots` routes against the production origin, and that preview deployments and the default `vercel.app` hostname are not indexed, linked, or used as canonicals in place of the custom domain.
