import { sampleSize, shuffle } from 'lodash';
import {
  ArticleInfoResponse,
  getArticleInfoFromIds,
  getRandomArticleIds,
} from './api.js';
import languageArticleInfo from './articles.json';

type RandomArticleArguments = {
  language: string;
  limit?: number;
  rncontinue?: string;
  type: ArticleCategory;
  seenArticleIds: string[];
};

export type ArticleCategory = 'featured' | 'good' | 'both' | 'all';

async function getTrulyRandomArticleInfo({
  language,
  rncontinue,
  seenArticleIds,
}: {
  language: string;
  rncontinue?: string;
  seenArticleIds: string[];
}) {
  const limit = 20;
  let randomIds: string[] = [];
  let rncontinueValue: string | undefined;

  do {
    const randomResult = await getRandomArticleIds({
      language,
      limit: 50,
      rncontinue,
    });
    rncontinueValue = randomResult.rncontinue;
    const unseenIds = randomResult.randomArticleIds.filter(
      (id) => !seenArticleIds.includes(id)
    );
    if (unseenIds.length === 0 || randomResult.randomArticleIds.length === 0) {
      break;
    }
    randomIds = randomIds.concat(unseenIds);
    sleep(0.2);
  } while (randomIds.length < limit);

  if (randomIds.length === 0) {
    return { articleInfo: [] };
  }

  const articleIds = sampleSize(randomIds, limit);

  return await getArticleInfoFromIds({
    articleIds,
    language,
    rncontinue: rncontinueValue,
  });
}

function sleep(seconds: number) {
  const e = new Date().getTime() + seconds * 1000;
  while (new Date().getTime() <= e) {
    /* empty */
  }
}

export async function getRandomArticleInfo({
  language,
  rncontinue,
  seenArticleIds,
  type = 'featured',
}: RandomArticleArguments): Promise<ArticleInfoResponse> {
  const limit = 10;
  const languageData = languageArticleInfo.find(
    (lang) => lang.languageCode === language
  );
  if (!languageData) {
    return { articleInfo: [] };
  }

  if (type === 'all') {
    return getTrulyRandomArticleInfo({ language, rncontinue, seenArticleIds });
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
    return { articleInfo: [] };
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
    allUrl: `/random?&language=${language.languageCode}&type=all`,
    allCount: language.allCount,
  }));
}

export const languageCodes = languageArticleInfo.map(
  ({ languageCode, languageName }) => ({
    name: languageName,
    code: languageCode,
  })
);
