import { sampleSize, shuffle } from 'lodash';
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
  limit = 20,
  type = 'featured',
}: RandomArticleArguments) {
  const articlesMap = await getArticleMap(language);
  const articleIds =
    type === 'featured' || type === 'good'
      ? articlesMap[type]
      : [...articlesMap.featured, ...articlesMap.good];

  if (articleIds.length <= limit) {
    return articleIds;
  }
  return sampleSize(articleIds, limit);
}

async function getArticleMap(language: string) {
  const featuredFileName = './featured/' + language + '-featured.json';
  const goodFileName = './good/' + language + '-good.json';
  const featuredFileExists = languageArticleInfo.featured.find(
    (lang) => lang.code === language
  );
  const goodFileExists = languageArticleInfo.good.find(
    (lang) => lang.code === language
  );
  const featuredFile = Boolean(featuredFileExists)
    ? await import(`${featuredFileName}`).then((module) => module.default)
    : [];
  const goodFile = Boolean(goodFileExists)
    ? await import(`${goodFileName}`).then((module) => module.default)
    : [];

  return {
    featured: featuredFile,
    good: goodFile,
  };
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

  return articleData?.query?.pages
    ? Object.values(articleData.query.pages)
    : [];
}

export async function getRandomArticleInfo({
  language = 'en',
  type = 'featured',
}: RandomArticleArguments) {
  let articles: Article[] = [];
  const limit = 10;

  do {
    const randomArticleIds = await getRandomArticleIdsFromLocal({
      language,
      // Retrieve more IDs than we need to show so that we don't have to make
      // many requests if the results don't have thumbnails.
      limit: limit * 2,
      type,
    });
    const articlesInfo = await getArticleInfoFromIds({
      articleIds: randomArticleIds,
      language,
    });
    articles = articles
      .concat(articlesInfo)
      .filter((article) => article.thumbnail && article.extract);

    if (!articles.length || articles.length < limit) {
      break;
    }
  } while (articles.length < limit);

  return shuffle(articles.slice(0, limit));
}

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
    bothCount: language.count,
  }));
  good.forEach((language) => {
    const objectToUpdate = result.find((lang) => lang.code === language.code);
    if (objectToUpdate) {
      objectToUpdate.goodCount = language.count;
      objectToUpdate.bothCount = objectToUpdate.featuredCount + language.count;
    } else {
      result.push({
        language: language.language,
        code: language.code,
        featuredCount: 0,
        goodCount: language.count,
        featuredUrl: '',
        goodUrl: `/random?&language=${language.code}&type=good`,
        bothUrl: `/random?&language=${language.code}&type=both`,
        bothCount: language.count,
      });
    }
  });

  return result;
}
