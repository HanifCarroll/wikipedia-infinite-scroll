import { useState, useEffect } from 'react';
import { SavedArticlesService } from '../lib/services/SavedArticlesService';
import { Article } from '../lib/domain/Article';

type ArticleSummaryProps = {
  summary?: string;
  thumbnailUrl?: string;
  title: string;
  url: string;
  pageId: string;
};

export function ArticleSummary({
  summary,
  thumbnailUrl,
  title,
  url,
  pageId,
}: ArticleSummaryProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    setIsSaved(SavedArticlesService.isArticleSaved(pageId));
  }, [pageId]);

  const summaryCharacterLimit = 400;
  if (summary && summary.length > summaryCharacterLimit) {
    const lastPeriodIndex = summary.lastIndexOf('.', summaryCharacterLimit);
    const endIndex =
      lastPeriodIndex === -1 ? summaryCharacterLimit : lastPeriodIndex;
    summary = summary.slice(0, endIndex + 1);
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const article: Article = {
      pageId,
      title,
      summary: summary || '',
      url,
      thumbnailUrl: thumbnailUrl || '',
    };

    if (isSaved) {
      SavedArticlesService.unsaveArticle(pageId);
      setIsSaved(false);
    } else {
      SavedArticlesService.saveArticle(article);
      setIsSaved(true);
    }
  };

  return (
    <a 
      href={url} 
      className="block w-full max-w-4xl mx-auto group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="article-card flex flex-col md:flex-row py-4 md:py-0">
        {thumbnailUrl && (
          <div className="md:w-1/3 bg-gray-100 dark:bg-gray-800">
            <div className="relative h-56 sm:h-64 md:h-full flex items-center justify-center overflow-hidden px-4 md:p-0">
              <img 
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                src={thumbnailUrl} 
                alt={title}
                loading="lazy"
              />
            </div>
          </div>
        )}
        <div className={`flex-1 px-6 pt-4 md:p-6 ${thumbnailUrl ? 'md:w-2/3' : ''}`}>
          <div className="flex items-start justify-between mb-3 gap-2">
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-gray-100 dark:group-hover:text-blue-400 flex-1">
              {title}
            </h2>
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-lg transition-colors flex-shrink-0 -mt-0.5 ${
                isSaved 
                  ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-700'
              }`}
              title={isSaved ? 'Remove from saved articles' : 'Save article'}
            >
              <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
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
