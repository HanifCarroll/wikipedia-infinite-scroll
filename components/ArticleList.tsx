import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from '@/components/Article';
import { Article } from '@/utils/types';

type ArticleListProps = {
  articles: Article[];
  language?: string;
};
export function ArticleList({ articles, language }: ArticleListProps) {
  const [allArticles, setAllArticles] = useState<Article[]>(articles);
  const getData = async () => {
    const newArticleData = await fetch(
      `/api/getRandomArticleInfo?&language=${language}`
    ).then((data) => data.json());
    setAllArticles([...allArticles, ...newArticleData]);
  };

  return (
    <InfiniteScroll
      next={getData}
      hasMore={true}
      loader={<h3 className="text-center text-2xl my-10">Loading...</h3>}
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