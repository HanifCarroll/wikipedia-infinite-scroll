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
    <a 
      href={url} 
      className="block w-full max-w-4xl mx-auto group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="article-card flex flex-col md:flex-row">
        {thumbnailUrl && (
          <div className="md:w-1/3 overflow-hidden">
            <img 
              className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              src={thumbnailUrl} 
              alt={title}
              loading="lazy"
            />
          </div>
        )}
        <div className={`flex-1 p-6 ${thumbnailUrl ? 'md:w-2/3' : ''}`}>
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-gray-100 dark:group-hover:text-blue-400">
              {title}
            </h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4 dark:text-gray-300">
            {summary || 'No summary available for this article.'}
          </p>
          
          <div className="flex justify-end text-sm text-gray-500 dark:text-gray-400">
            <span className="text-blue-600 group-hover:text-blue-700 font-medium dark:text-blue-400 dark:group-hover:text-blue-300">
              Read more →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
