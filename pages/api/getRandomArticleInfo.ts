import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '@/utils/types';
import { ArticleCategory, getRandomArticleInfo } from '@/utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article[]>
) {
  const language = String(req.query.language);
  const type = String(req.query.type) as ArticleCategory;
  return res.status(200).json(await getRandomArticleInfo({ language, type }));
}
