import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from '@/components/ArticleSummary';
import { Article } from '@/lib/domain/Article';
import { Loader } from '@/components/Loader';
import { NoMoreArticles } from '@/components/NoMoreArticles';
import { ArticleInfoResponse } from '@/lib/utils/api';

type ArticleListProps = {
  articles: ArticleInfoResponse;
  articleType: string;
  language?: string;
};
export function ArticleList({
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

  return (
    <InfiniteScroll
      next={getData}
      endMessage={<NoMoreArticles />}
      hasMore={hasMore}
      loader={<Loader handleReload={getData} isError={isError} />}
      dataLength={allArticles.length}
    >
      <div className="flex flex-col items-center space-y-10">
        {allArticles.map((article) => (
          <ArticleSummary
            key={article.pageId}
            thumbnailUrl={article.thumbnailUrl}
            title={article.title}
            summary={article.summary}
            url={article.url}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
