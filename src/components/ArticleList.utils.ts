import { useState } from 'react';
import { Article } from '../lib/domain/Article';
import { ArticleListProps } from './ArticleList.tsx';
import { getRandomArticleInfo } from '../lib/utils/utils.ts';

export function useArticleListUtils({
  articleType,
  language,
}: ArticleListProps) {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const seenArticleIds = allArticles.map((article) => article.pageId);
  const [rncontinue, setRncontinue] = useState('');
  const getData = async () => {
    setIsError(false);
    try {
      const data = await getRandomArticleInfo({
        language,
        rncontinue,
        seenArticleIds,
        type: articleType,
      });
      const { articleInfo: newArticleData, rncontinue: newRncontinue } =
        await data;
      if (newArticleData.length === 0) {
        setHasMore(false);
        return;
      }
      setRncontinue(newRncontinue ?? '');
      const oldArticleIds = allArticles.map((article) => article.pageId);
      const articlesToAdd = newArticleData.filter(
        (article: Article) => !oldArticleIds.includes(article.pageId)
      );
      setAllArticles([...allArticles, ...articlesToAdd]);
      setIsError(false);
    } catch (e) {
      setIsError(true);
      console.log('Error: ', e);
    }
  };

  return {
    allArticles,
    getData,
    hasMore,
    isError,
  };
}
