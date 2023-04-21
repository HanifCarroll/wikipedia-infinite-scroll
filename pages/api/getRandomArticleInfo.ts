import type { NextApiRequest, NextApiResponse } from 'next';
import { ArticleCategory, getRandomArticleInfo } from '@/utils/utils';
import { ArticleInfoResponse } from '@/utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleInfoResponse>
) {
  if (req.method !== 'POST') {
    return res.status(501);
  }

  const language = String(req.body.language) as never;
  const type = String(req.body.articleType) as ArticleCategory;
  const seenArticleIds: string[] = req.body.seenArticleIds.map(String);
  const rncontinue = req.body.rncontinue;
  const articleInfo = await getRandomArticleInfo({
    language,
    rncontinue,
    seenArticleIds,
    type,
  });
  return res.status(200).json(articleInfo);
}
