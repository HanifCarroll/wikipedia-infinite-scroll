import { Link } from 'react-router-dom';

type LanguageCardProps = {
  name: string;
  code: string;
  allCount: number;
  featuredCount: number;
  goodCount: number;
  bothCount: number;
  allUrl: string;
  featuredUrl: string;
  goodUrl: string;
  bothUrl: string;
  isCompact?: boolean;
};

export function LanguageCard({ 
  name, 
  code, 
  allCount, 
  featuredCount, 
  goodCount, 
  bothCount,
  allUrl,
  featuredUrl,
  goodUrl,
  bothUrl,
  isCompact = false 
}: LanguageCardProps) {
  if (isCompact) {
    return (
      <div className="card p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {code}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {allCount.toLocaleString()} articles available
        </p>
        <div className="space-y-2">
          {featuredCount > 0 && (
            <Link 
              to={featuredUrl}
              className="block w-full text-center px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm font-medium dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
            >
              Featured ({featuredCount.toLocaleString()})
            </Link>
          )}
          <Link 
            to={allUrl}
            className="block w-full text-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            All Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          {code}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {allCount.toLocaleString()} articles available
      </p>

      <div className="space-y-3">
        {featuredCount > 0 && (
          <Link 
            to={featuredUrl}
            className="block w-full text-center px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium group"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Featured Articles
              <span className="text-amber-200">({featuredCount.toLocaleString()})</span>
            </div>
          </Link>
        )}
        
        {goodCount > 0 && (
          <Link 
            to={goodUrl}
            className="block w-full text-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Good Articles
              <span className="text-green-200">({goodCount.toLocaleString()})</span>
            </div>
          </Link>
        )}

        {bothCount > 0 && (
          <Link 
            to={bothUrl}
            className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Featured & Good
              <span className="text-purple-200">({bothCount.toLocaleString()})</span>
            </div>
          </Link>
        )}
        
        <Link 
          to={allUrl}
          className="block w-full text-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            All Articles
            <span className="text-gray-500">({allCount.toLocaleString()})</span>
          </div>
        </Link>
      </div>
    </div>
  );
}