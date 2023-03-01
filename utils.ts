import { Article, Params } from '@/types';

export async function getRandomArticleIds(language = 'en'): Promise<number[]> {
  const randomQueryParams: Params = {
    action: 'query',
    format: 'json',
    list: 'random',
    rnnamespace: '0',
    rnlimit: '10',
  };
  const params = new URLSearchParams(randomQueryParams).toString();
  const url = `https://${language}.wikipedia.org/w/api.php?origin=*&` + params;
  const randomData = await fetch(url).then((res) => res.json());

  return randomData.query.random.map((article: { id: number }) => article.id);
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
  const url = `https://${language}.wikipedia.org/w/api.php?origin=*&` + params;
  const articleData = await fetch(url).then((res) => res.json());

  return Object.values(articleData.query.pages);
}

export async function getRandomArticleInfo(language = 'en') {
  const randomArticleIds = await getRandomArticleIds(language);
  return getArticleInfoFromIds({ articleIds: randomArticleIds, language });
}
