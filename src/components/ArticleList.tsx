import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from './ArticleSummary.js';
import { Loader } from './Loader.js';
import { NoMoreArticles } from './NoMoreArticles.js';
import { useArticleListUtils } from './ArticleList.utils.js';
import { ArticleCategory } from '../lib/utils/utils.ts';
import { useEffect } from 'react';

export type ArticleListProps = {
  articleType: ArticleCategory;
  language: string;
};
export function ArticleList({ articleType, language }: ArticleListProps) {
  const { allArticles, hasMore, isError, getData } = useArticleListUtils({
    articleType,
    language,
  });

  useEffect(() => {
    getData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
