import { useSearchParams } from 'react-router-dom';
import { languageCodes, ArticleCategory } from '../lib/utils/utils';

export function NoMoreArticles() {
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get('language');
  const currentType = searchParams.get('type') as ArticleCategory;
  
  // Get suggestions for different exploration paths
  const otherLanguages = languageCodes
    .filter(lang => lang.code !== currentLanguage)
    .slice(0, 3);

  const buildUrl = (params: Record<string, string>) => {
    const urlParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    return `/random?${urlParams.toString()}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 max-w-2xl mx-auto text-center">
      <div className="text-green-600 mb-6 dark:text-green-400">
        <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-3xl font-bold text-gray-900 mb-3 dark:text-gray-100">
        Amazing work, explorer!
      </h3>
      
      <p className="text-lg text-gray-600 mb-8 dark:text-gray-300">
        You've reached the end of this collection. Time to explore new territories!
      </p>

      <div className="space-y-6 w-full">
        {/* Primary CTA - Try different article types */}
        {currentType !== 'all' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">
              🎯 Discover more content
            </h4>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={buildUrl({ type: 'all' })}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                All Wikipedia Articles
              </a>
              {currentType !== 'featured' && (
                <a
                  href={buildUrl({ type: 'featured' })}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transform hover:scale-105 transition-all duration-200 shadow-md dark:bg-amber-700 dark:hover:bg-amber-600"
                >
                  Featured Articles
                </a>
              )}
            </div>
          </div>
        )}

        {/* Secondary CTA - Try different languages */}
        {otherLanguages.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">
              🌍 Explore other languages
            </h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {otherLanguages.map((language) => (
                <a
                  key={language.code}
                  href={buildUrl({ language: language.code })}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  {language.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Fallback CTA */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Start a fresh exploration
          </a>
        </div>
      </div>
    </div>
  );
}
