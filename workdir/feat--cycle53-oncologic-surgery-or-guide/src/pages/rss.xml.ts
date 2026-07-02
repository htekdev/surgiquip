import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '~/data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allPosts = await getCollection('blog', ({ data }) => !data.draft);
  const posts = allPosts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: `${site.brand} — Surgical Equipment Insights`,
    description:
      "Expert insights on surgical equipment, OR installation planning, and healthcare facility management from Houston's authorized Skytron dealer since 1983.",
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
      content: post.data.description,
    })),
    customData: [
      '<language>en-us</language>',
      `<managingEditor>info@surgiquipsolutions.com (${site.brand})</managingEditor>`,
      `<webMaster>info@surgiquipsolutions.com (${site.brand})</webMaster>`,
      `<copyright>© ${new Date().getFullYear()} ${site.brand}. All rights reserved.</copyright>`,
      '<ttl>1440</ttl>',
    ].join('\n'),
  });
}
