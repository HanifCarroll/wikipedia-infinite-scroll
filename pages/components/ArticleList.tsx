import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from '@/pages/components/Article';
import { Article, getRandomArticleInfo } from '@/pages';

type ArticleListProps = {
  articles: Article[];
};
export function ArticleList({ articles }: ArticleListProps) {
  const [allArticles, setAllArticles] = useState<Article[]>(articles);
  const getData = async () => {
    const newArticleData = await getRandomArticleInfo();
    setAllArticles([...allArticles, ...newArticleData]);
  };

  return (
    <InfiniteScroll
      next={getData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      dataLength={allArticles.length}
    >
      <div className="flex flex-col items-center space-y-5">
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
