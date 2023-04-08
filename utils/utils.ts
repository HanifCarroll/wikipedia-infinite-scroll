import { sampleSize } from 'lodash';
import { Article, Params } from '@/utils/types';
import languageArticleInfo from './languageArticleInfo.json';

type RandomArticleArguments = {
  language?: 'en';
  limit?: number;
  type?: ArticleCategory;
};

export type ArticleCategory = 'featured' | 'good' | 'both';

async function getRandomArticleIdsFromLocal({
  language = 'en',
  limit,
  type = 'featured',
}: RandomArticleArguments) {
  const featuredFileName = './featured/' + language + '-featured.json';
  const goodFileName = './good/' + language + '-good.json';
  // TODO: Check to see if they exist before trying to import
  const articlesMap = {
    featured: await import(`${featuredFileName}`),
    good: await import(`${goodFileName}`),
  };
  const articleIds =
    type === 'featured' || type === 'good'
      ? articlesMap[type]
      : [
          ...Object.values(articlesMap.featured),
          ...Object.values(articlesMap.good),
        ];

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
  const articleData = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log('err', err));

  return Object.values(articleData?.query?.pages);
}

export async function getRandomArticleInfo({
  language = 'en',
  type = 'featured',
}: RandomArticleArguments) {
  let articles: Article[] = [];
  const limit = 10;

  while (articles.length < limit) {
    const randomArticleIds = await getRandomArticleIdsFromLocal({
      language,
      // Retrieve more IDs than we need to show so that we don't have to make
      // many requests if the results don't have thumbnails.
      limit: limit * 3,
      type,
    });
    if (!randomArticleIds.length) {
      console.log('something went wrong');
      return [];
    }
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

// Desired format:
// {
//    language: 'English',
//    code: 'en',
//    featuredCount: 10,
//    goodCount: 10
//  }
export function getLanguageTableData() {
  const { featured, good } = languageArticleInfo;
  const result = featured.map((language) => ({
    language: language.language,
    code: language.code,
    featuredCount: language.count,
    goodCount: 0,
    featuredUrl: `/random?&language=${language.code}&type=featured`,
    goodUrl: `/random?&language=${language.code}&type=good`,
    bothUrl: `/random?&language=${language.code}&type=both`,
    bothCount: 0,
  }));
  good.forEach((language) => {
    const objectToUpdate = result.find((lang) => lang.code === language.code);
    if (objectToUpdate) {
      objectToUpdate.goodCount = language.count;
      objectToUpdate.bothCount = objectToUpdate.featuredCount + language.count;
    }
  });

  return result;
}
