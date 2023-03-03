export type Article = {
  canonicalurl: string;
  displaytitle: string;
  extract: string;
  pageid: number;
  thumbnail?: { source: string };
};

export type Language = { code: string; name: string };

export type Params = { [key: string]: string };
