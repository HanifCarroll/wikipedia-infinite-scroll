const PLACEHOLDER_THUMBNAIL = 'https://placehold.jp/150x150.png';

type ArticleSummaryProps = {
  summary: string;
  thumbnail?: string;
  title: string;
  url: string;
};

export function ArticleSummary({
  summary,
  thumbnail,
  title,
  url,
}: ArticleSummaryProps) {
  return (
    <a href={url} className="w-4/5">
      <div className="flex items-center h-500 bg-gray-100 border-2 border-gray-500 px-8 py-4 gap-6">
        <img src={thumbnail ?? PLACEHOLDER_THUMBNAIL} alt={title} />
        <div className="flex flex-col justify-items-evenly items">
          <h2 className="mb-4">{title}</h2>
          <p className="leading-relaxed">{summary}</p>
        </div>
      </div>
    </a>
  );
}
