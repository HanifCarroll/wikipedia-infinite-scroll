import { Article, Params } from '@/utils/types';
import enFeatured from '../utils/en-featured.json';
import enGood from '../utils/en-good.json';
import { sampleSize } from 'lodash';

type RandomArticleArguments = {
  language?: 'en';
  limit?: number;
  type?: ArticleCategory;
};

const articlesMap = {
  en: {
    featured: enFeatured,
    good: enGood,
  },
};

export type ArticleCategory = 'featured' | 'good' | 'both';

function getRandomArticleIdsFromLocal({
  language = 'en',
  limit,
  type = 'featured',
}: RandomArticleArguments) {
  const articleIds =
    type === 'featured' || type === 'good'
      ? articlesMap[language][type]
      : Object.values(articlesMap[language]).flat();

  return sampleSize(articleIds, limit);
}

export async function getArticleInfoFromIds({
  articleIds,
  language = 'en',
}: {
  articleIds: number[];
  language?: string;
}): Promise<Article[]> {
  const infoQueryParams: Params = {
    action: 'query',
    format: 'json',
    exintro: 'true',
    explaintext: 'true',
    inprop: 'url|displaytitle|preload',
    pageids: articleIds.join('|'),
    pithumbsize: '150',
    prop: 'extracts|pageimages|info',
    redirects: '1',
  };
  const params = new URLSearchParams(infoQueryParams).toString();
  const url = `https://${language}.wikipedia.org/w/api.php?origin=*&${params}`;
  const articleData = await fetch(url).then((res) => res.json());

  return Object.values(articleData.query.pages);
}

export async function getRandomArticleInfo({
  language = 'en',
  type = 'featured',
}: RandomArticleArguments) {
  let articles: Article[] = [];
  const limit = 10;

  while (articles.length < limit) {
    const randomArticleIds = getRandomArticleIdsFromLocal({
      language,
      // Retrieve more IDs than we need to show so that we don't have to make
      // many requests if the results don't have thumbnails.
      limit: limit * 3,
      type,
    });
    const articlesInfo = await getArticleInfoFromIds({
      articleIds: randomArticleIds,
      language,
    });
    articles = articles
      .concat(articlesInfo)
      .filter((article) => article.thumbnail && article.extract);
  }

  return articles.slice(0, limit);
}
