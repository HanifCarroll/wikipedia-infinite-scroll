import * as z from 'zod';

const Article = z.object({
  pageId: z.string(),
  summary: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  title: z.string(),
  url: z.string(),
});

export type Article = z.infer<typeof Article>;

export function createArticle(data: any) {
  const result = Article.safeParse({
    pageId: String(data.pageid),
    summary: data.extract,
    thumbnailUrl: data.thumbnail?.source ?? '/placeholder.png',
    // Some titles have HTML tags that need to be removed.
    title: data.displaytitle.replace(/<[^>]+>/g, ''),
    url: data.canonicalurl,
  });

  if (!result.success) {
    throw new Error(
      `Can not parse article from invalid data: ${result.error.message}`
    );
  }

  return result.data;
}
