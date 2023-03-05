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
  summary = summary.length > 400 ? summary.slice(0, 400) + '...' : summary;

  return (
    <a href={url} className="w-11/12 md:w-4/5">
      <div className="flex flex-col md:flex-row md:items-center h-500 bg-gray-100 border-2 border-gray-500 px-8 py-4 gap-6">
        <img src={thumbnail ?? PLACEHOLDER_THUMBNAIL} alt={title} />
        <div className="flex flex-col justify-items-evenly items">
          <h2 className="mb-4 text-lg font-medium">{title}</h2>
          <p className="leading-relaxed">{summary}</p>
        </div>
      </div>
    </a>
  );
}
