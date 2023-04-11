import { sampleSize, shuffle } from 'lodash';
import languageArticleInfo from './languageArticleInfo.json';

type RandomArticleArguments = {
  language?: 'en';
  limit?: number;
  type?: ArticleCategory;
};

export type ArticleCategory = 'featured' | 'good' | 'both';

async function getArticleMap(language: string) {
  const featuredFileName = './articleData/' + language + '-featured.json';
  const goodFileName = './articleData/' + language + '-good.json';
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

export async function getRandomArticleInfo({
  language = 'en',
  type = 'featured',
}: RandomArticleArguments) {
  const limit = 10;
  const articlesMap = await getArticleMap(language);
  const articles =
    type === 'featured' || type === 'good'
      ? articlesMap[type]
      : articlesMap.featured.concat(articlesMap.good);
  const shuffledArticles = shuffle(articles);

  if (articles.length <= limit) {
    return shuffledArticles;
  }
  return sampleSize(shuffledArticles, limit);
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
