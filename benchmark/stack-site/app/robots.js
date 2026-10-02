const base = `https://${process.env.VERCEL_URL || 'localhost:3000'}`;

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: base + '/sitemap.xml',
  };
}
