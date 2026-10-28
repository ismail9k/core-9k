import { queryCollection } from '@nuxt/content/server'

const SITE_URL = 'https://ismail9k.com'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog').order('date', 'DESC').all()
  const escape = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const items = posts.map(p => `
    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE_URL}${p.path}</link>
      <guid>${SITE_URL}${p.path}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escape(p.description)}</description>
    </item>`).join('')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Abdelrahman Ismail</title>
    <link>${SITE_URL}</link>
    <description>Personal blog</description>${items}
  </channel>
</rss>`
})
