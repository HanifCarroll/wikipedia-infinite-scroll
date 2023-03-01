import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from '@/pages/components/Article';
import { Article } from '@/types';

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
      loader={<h4>Loading...</h4>}
      dataLength={allArticles.length}
    >
      <div className="flex flex-col items-center space-y-5 mt-10">
        {allArticles.map((article) => (
          <ArticleSummary
            key={article.pageid}
            thumbnail={article.thumbnail?.source}
            title={article.displaytitle.replace(/<[^>]+>/g, '')}
            summary={article.extract}
            url={article.canonicalurl}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
