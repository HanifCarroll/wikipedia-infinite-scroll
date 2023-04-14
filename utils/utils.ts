import { sampleSize, shuffle } from 'lodash';
import languageArticleInfo from './articles.json';
import { Article, Params } from '@/utils/types';

type RandomArticleArguments = {
  language?: 'en';
  limit?: number;
  type?: ArticleCategory;
  seenArticleIds: string[];
};

export type ArticleCategory = 'featured' | 'good' | 'both';

export async function getRandomArticleInfo({
  language = 'en',
  type = 'featured',
  seenArticleIds = [],
}: RandomArticleArguments) {
  const limit = 10;
  const languageData = languageArticleInfo.find(
    (lang) => lang.languageCode === language
  );
  if (!languageData) {
    return [];
  }

  const featuredArticleIds = languageData.featuredArticleIds.map(String);
  const goodArticleIds = languageData.goodArticleIds.map(String);
  const articleIds =
    type === 'featured'
      ? featuredArticleIds
      : type === 'good'
      ? goodArticleIds
      : featuredArticleIds.concat(goodArticleIds);
  const unseenArticleIds = articleIds.filter(
    (id) => !seenArticleIds.includes(id)
  );
  if (!unseenArticleIds.length) {
    return [];
  }

  const randomArticleIds = sampleSize(shuffle(unseenArticleIds), limit);

  return await getArticleInfoFromIds({
    articleIds: randomArticleIds,
    language,
  });
}

export function getLanguageTableData() {
  return languageArticleInfo.map((language) => ({
    name: language.languageName,
    code: language.languageCode,
    featuredCount: language.featuredArticleCount,
    goodCount: language.goodArticleCount,
    featuredUrl: `/random?&language=${language.languageCode}&type=featured`,
    goodUrl: `/random?&language=${language.languageCode}&type=good`,
    bothUrl: `/random?&language=${language.languageCode}&type=both`,
    bothCount: language.bothCount,
  }));
}

export const languageCodes = languageArticleInfo.map(
  ({ languageCode, languageName }) => ({
    name: languageName,
    code: languageCode,
  })
);

export async function getArticleInfoFromIds({
  articleIds,
  language = 'en',
}: {
  articleIds: string[];
  language?: string;
}): Promise<Article[]> {
  const infoQueryParams: Params = {
    action: 'query',
    format: 'json',
    exintro: 'true',
    explaintext: 'true',
    inprop: 'url|displaytitle|preload',
    pageids: articleIds.join('|'),
    pithumbsize: '220',
    prop: 'extracts|pageimages|info',
    redirects: '1',
  };
  const params = new URLSearchParams(infoQueryParams).toString();
  const url = `https://${language}.wikipedia.org/w/api.php?origin=*&${params}`;
  const articleData = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log('err', err));

  return articleData?.query?.pages
    ? Object.values(articleData.query.pages)
    : [];
}
