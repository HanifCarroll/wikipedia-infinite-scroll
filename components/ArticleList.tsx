import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from '@/components/ArticleSummary';
import { Article } from '@/utils/types';
import { Loader } from '@/components/Loader';

type ArticleListProps = {
  articles: Article[];
  language?: string;
};
export function ArticleList({ articles, language }: ArticleListProps) {
  const [allArticles, setAllArticles] = useState<Article[]>(articles);
  const [isError, setIsError] = useState(false);
  const getData = async () => {
    setIsError(false);
    fetch(`/api/getRandomArticleInfo?&language=${language}`)
      .then(async (data) => {
        const newArticleData = await data.json();
        setAllArticles([...allArticles, ...newArticleData]);
        setIsError(false);
      })
      .catch(() => setIsError(true));
  };

  return (
    <InfiniteScroll
      next={getData}
      hasMore={true}
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
