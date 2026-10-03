const base = `https://${process.env.VERCEL_URL || 'localhost:3000'}`;

export default function sitemap() {
  return ['', '/tips', '/login', '/notes', '/admin'].map((path) => ({
    url: base + path,
    lastModified: new Date(),
  }));
}
