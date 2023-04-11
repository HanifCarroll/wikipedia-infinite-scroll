export type Article = {
  url: string;
  title: string;
  summary: string;
  id: number;
  thumbnail_url?: string;
};

export type Language = { code: string; name: string };

export type Params = { [key: string]: string };
