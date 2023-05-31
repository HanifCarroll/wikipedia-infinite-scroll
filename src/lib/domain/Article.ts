import * as z from 'zod';

const Article = z.object({
  canonicalurl: z.string(),
  displaytitle: z.string(),
  extract: z.string().optional(),
  pageid: z.number(),
  thumbnail: z.object({ source: z.string() }).optional(),
});

export type Article = {
  pageId: string;
  summary: string;
  thumbnailUrl: string;
  title: string;
  url: string;
};

export function createArticle(data: unknown): Article {
  const result = Article.safeParse(data);

  if (!result.success) {
    throw new Error(
      `Can not parse article from invalid data: ${result.error.message}`
    );
  }

  return {
    pageId: String(result.data.pageid),
    summary: result.data.extract ?? '',
    thumbnailUrl: result.data.thumbnail?.source ?? '/placeholder.png',
    // Some titles have HTML tags that need to be removed.
    title: result.data.displaytitle.replace(/<[^>]+>/g, ''),
    url: result.data.canonicalurl,
  };
}
