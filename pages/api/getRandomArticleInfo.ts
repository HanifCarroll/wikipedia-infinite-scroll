import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '@/utils/types';
import { ArticleCategory, getRandomArticleInfo } from '@/utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article[]>
) {
  const language = String(req.query.language) as never;
  const type = String(req.query.type) as ArticleCategory;
  const articleInfo = await getRandomArticleInfo({ language, type });
  return res.status(200).json(articleInfo);
}
