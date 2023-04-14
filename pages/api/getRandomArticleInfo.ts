import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '@/utils/types';
import { ArticleCategory, getRandomArticleInfo } from '@/utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article[]>
) {
  if (req.method !== 'POST') {
    return res.status(501);
  }

  const language = String(req.body.language) as never;
  const type = String(req.body.articleType) as ArticleCategory;
  const seenArticleIds: string[] = req.body.seenArticleIds.map(String);
  const articleInfo = await getRandomArticleInfo({
    language,
    type,
    seenArticleIds,
  });
  return res.status(200).json(articleInfo);
}
