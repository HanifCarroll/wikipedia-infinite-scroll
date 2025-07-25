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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <InfiniteScroll
        next={getData}
        endMessage={<NoMoreArticles />}
        hasMore={hasMore}
        loader={<Loader handleReload={getData} isError={isError} />}
        dataLength={allArticles.length}
      >
        {allArticles.map((article, index) => (
          <div
            key={article.pageId}
            className="animate-fade-in mb-6"
            style={{
              animationDelay: `${(index % 10) * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <ArticleSummary
              thumbnailUrl={article.thumbnailUrl}
              title={article.title}
              summary={article.summary}
              url={article.url}
              pageId={article.pageId}
            />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
