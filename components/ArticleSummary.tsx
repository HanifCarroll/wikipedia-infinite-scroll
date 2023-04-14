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
  const summaryCharacterLimit = 400;
  if (summary.length > summaryCharacterLimit) {
    const lastPeriodIndex = summary.lastIndexOf('.', summaryCharacterLimit);
    const endIndex =
      lastPeriodIndex === -1 ? summaryCharacterLimit : lastPeriodIndex;
    summary = summary.slice(0, endIndex + 1);
  }

  return (
    <a href={url} className="w-11/12 md:w-4/5">
      <div className="h-500 flex flex-col gap-6 border-2 border-gray-500 bg-gray-100 px-8 py-4 md:flex-row md:items-center">
        <img
          className="w-100 h-auto object-scale-down"
          src={thumbnail ?? '/placeholder-image.png'}
          alt={title}
        />
        <div className="justify-items-evenly items flex flex-col">
          <h2 className="mb-4 text-lg font-medium">{title}</h2>
          <p className="leading-relaxed">{summary}</p>
        </div>
      </div>
    </a>
  );
}
