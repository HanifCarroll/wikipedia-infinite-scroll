import { ArticleSummary } from '@/pages/components/Article';
import { Article } from '@/pages';

type ArticleListProps = {
  articles: Article[];
};
export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="flex flex-col items-center space-y-5">
      {articles.map((article) => (
        <ArticleSummary
          key={article.pageid}
          thumbnail={article.thumbnail?.source}
          title={article.displaytitle.replace(/<[^>]+>/g, '')}
          summary={article.extract}
          url={article.canonicalurl}
        />
      ))}
    </div>
  );
}
