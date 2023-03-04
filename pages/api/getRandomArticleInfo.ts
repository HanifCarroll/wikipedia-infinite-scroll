import type { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '@/utils/types';
import { getRandomArticleInfo } from '@/utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article[]>
) {
  const language = String(req.query.language);
  return res.status(200).json(await getRandomArticleInfo(language));
}
