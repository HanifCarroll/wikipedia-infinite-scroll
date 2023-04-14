import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleSummary } from '@/components/ArticleSummary';
import { Article } from '@/utils/types';
import { Loader } from '@/components/Loader';

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
  const getData = async () => {
    setIsError(false);
    fetch(`/api/getRandomArticleInfo?&language=${language}&type=${articleType}`)
      .then(async (data) => {
        const newArticleData = await data.json();
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
      endMessage={<h1>You win!</h1>}
      hasMore={false}
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
