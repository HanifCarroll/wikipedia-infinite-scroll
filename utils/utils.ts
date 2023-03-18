import { Article, Params } from '@/utils/types';

export async function getRandomArticleIds({
  language = 'en',
  limit = 20,
}: {
  language?: string;
  limit?: number;
}): Promise<number[]> {
  const randomQueryParams: Params = {
    action: 'query',
    format: 'json',
    list: 'random',
    rnnamespace: '0',
    rnlimit: limit.toString(),
  };
  const params = new URLSearchParams(randomQueryParams).toString();
  const url = `https://${language}.wikipedia.org/w/api.php?origin=*&${params}`;
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
  const url = `https://${language}.wikipedia.org/w/api.php?origin=*&${params}`;
  const articleData = await fetch(url).then((res) => res.json());

  return Object.values(articleData.query.pages);
}

export async function getRandomArticleInfo(language = 'en') {
  let articles: Article[] = [];
  const limit = 10;

  while (articles.length < limit) {
    const randomArticleIds = await getRandomArticleIds({
      language,
      // Retrieve more IDs than we need to show so that we don't have to make
      // many requests if the results don't have thumbnails.
      limit: limit * 3,
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
