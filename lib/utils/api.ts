import { Params } from '@/lib/utils/types';
import { Article, createArticle } from '@/lib/domain/Article';

type RandomArticleIdResult = {
  randomArticleIds: string[];
  rncontinue?: string;
};

export async function getRandomArticleIds({
  language = 'en',
  limit = 20,
  rncontinue,
}: {
  language?: string;
  limit?: number;
  rncontinue?: string;
}): Promise<RandomArticleIdResult> {
  const randomQueryParams: Params = {
    action: 'query',
    format: 'json',
    list: 'random',
    rnnamespace: '0',
    rnlimit: limit.toString(),
  };
  // Continue using the Wikipedia API generator from the previous request
  if (rncontinue) {
    randomQueryParams.rncontinue = rncontinue;
  }
  const params = new URLSearchParams(randomQueryParams).toString();
  const url = `https://${language}.wikipedia.org/w/api.php?origin=*&${params}`;
  const response = await fetch(url);
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    const randomArticleIds = data.query.random.map((article: { id: number }) =>
      article.id.toString()
    );
    const result: RandomArticleIdResult = {
      randomArticleIds,
    };
    if (data.continue.rncontinue) {
      result.rncontinue = data.continue.rncontinue;
    }
    return result;
  } catch (e) {
    console.log('Error during getRandomArticleIds: ', e);
    console.log('The response was: ', text);
    return { randomArticleIds: [] };
  }
}

export type ArticleInfoResponse = {
  articleInfo: Article[];
  rncontinue?: string;
};
export async function getArticleInfoFromIds({
  articleIds,
  language = 'en',
  rncontinue,
}: {
  articleIds: string[];
  language?: string;
  rncontinue?: string;
}): Promise<ArticleInfoResponse> {
  if (!articleIds.length) {
    return { articleInfo: [] };
  }

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

  if (!articleData?.query?.pages) {
    return { articleInfo: [] };
  }

  const articleInfo: Article[] = Object.values(articleData.query.pages).map(
    createArticle
  );
  const result: ArticleInfoResponse = {
    articleInfo,
  };
  if (rncontinue) {
    result.rncontinue = rncontinue;
  }
  return result;
}
