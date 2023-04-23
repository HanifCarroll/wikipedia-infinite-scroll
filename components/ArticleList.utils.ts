import { useState } from 'react';
import { Article } from '@/lib/domain/Article';
import { ArticleListProps } from '@/components/ArticleList';

export function useArticleListUtils({
  articles,
  articleType,
  language,
}: ArticleListProps) {
  const [allArticles, setAllArticles] = useState<Article[]>(
    articles.articleInfo
  );
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const seenArticleIds = allArticles.map((article) => article.pageId);
  const [rncontinue, setRncontinue] = useState('');
  const getData = async () => {
    setIsError(false);
    fetch(
      `/api/getRandomArticleInfo?&language=${language}&type=${articleType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleType,
          language,
          rncontinue,
          seenArticleIds,
        }),
      }
    )
      .then(async (data) => {
        const { articleInfo: newArticleData, rncontinue: newRncontinue } =
          await data.json();
        if (newArticleData.length === 0) {
          setHasMore(false);
          return;
        }
        setRncontinue(newRncontinue);
        const oldArticleIds = allArticles.map((article) => article.pageId);
        const articlesToAdd = newArticleData.filter(
          (article: Article) => !oldArticleIds.includes(article.pageId)
        );
        setAllArticles([...allArticles, ...articlesToAdd]);
        setIsError(false);
      })
      .catch((e) => {
        setIsError(true);
        console.log('Error: ', e);
      });
  };

  return {
    allArticles,
    getData,
    hasMore,
    isError,
  };
}
