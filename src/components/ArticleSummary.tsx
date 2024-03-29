type ArticleSummaryProps = {
  summary?: string;
  thumbnailUrl?: string;
  title: string;
  url: string;
};

export function ArticleSummary({
  summary,
  thumbnailUrl,
  title,
  url,
}: ArticleSummaryProps) {
  const summaryCharacterLimit = 400;
  if (summary && summary.length > summaryCharacterLimit) {
    const lastPeriodIndex = summary.lastIndexOf('.', summaryCharacterLimit);
    const endIndex =
      lastPeriodIndex === -1 ? summaryCharacterLimit : lastPeriodIndex;
    summary = summary.slice(0, endIndex + 1);
  }

  return (
    <a href={url} className="w-11/12 md:w-4/5">
      <div className="h-500 flex flex-col gap-6 border-2 border-gray-500 bg-gray-100 px-8 py-4 md:flex-row md:items-center">
        <img className="basis-[400px]" src={thumbnailUrl} alt={title} />
        <div className="justify-items-evenly items flex w-full flex-col">
          <h2 className="mb-4 text-lg font-medium">{title}</h2>
          <p className="leading-relaxed">{summary}</p>
        </div>
      </div>
    </a>
  );
}
