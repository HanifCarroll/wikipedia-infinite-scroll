import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleInfoResponse } from '@/lib/utils/api';
import { ArticleSummary } from '@/components/ArticleSummary';
import { Loader } from '@/components/Loader';
import { NoMoreArticles } from '@/components/NoMoreArticles';
import { useArticleListUtils } from '@/components/ArticleList.utils';

export type ArticleListProps = {
  articles: ArticleInfoResponse;
  articleType: string;
  language?: string;
};
export function ArticleList({
  articles,
  articleType,
  language,
}: ArticleListProps) {
  const { allArticles, hasMore, isError, getData } = useArticleListUtils({
    articles,
    articleType,
    language,
  });

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
