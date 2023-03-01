export type Params = { [key: string]: string };

export type Article = {
  canonicalurl: string;
  displaytitle: string;
  extract: string;
  pageid: number;
  thumbnail?: { source: string };
};
