import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from '@/components/ArticleSummary';
import { Article } from '@/utils/types';
import { Loader } from '@/components/Loader';
import { NoMoreArticles } from '@/components/NoMoreArticles';

type ArticleListProps = {
  articles: Article[];
  articleType: string;
  language?: string;
};
export function ArticleList({
  articles,
  articleType,
  language,
}: ArticleListProps) {
  const [allArticles, setAllArticles] = useState<Article[]>(articles);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const seenArticleIds = allArticles.map((article) => article.pageid);
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
          seenArticleIds,
        }),
      }
    )
      .then(async (data) => {
        const newArticleData = await data.json();
        if (newArticleData.length === 0) {
          setHasMore(false);
          return;
        }
        const oldArticleIds = allArticles.map((article) => article.pageid);
        const articlesToAdd = newArticleData.filter(
          (article: Article) => !oldArticleIds.includes(article.pageid)
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
            key={article.pageid}
            thumbnail={article.thumbnail?.source}
            // Some titles have HTML tags that need to be removed.
            title={article.displaytitle.replace(/<[^>]+>/g, '')}
            summary={article.extract}
            url={article.canonicalurl}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
