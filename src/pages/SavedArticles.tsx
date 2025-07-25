import { useState, useEffect } from 'react';
import { SavedArticlesService, SavedArticle } from '../lib/services/SavedArticlesService';
import { ArticleSummary } from '../components/ArticleSummary';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSavedArticles();
  }, []);

  const loadSavedArticles = () => {
    setSavedArticles(SavedArticlesService.getSavedArticles());
  };

  const filteredArticles = savedArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved articles? This action cannot be undone.')) {
      SavedArticlesService.clearAllSaved();
      setSavedArticles([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header language="Saved Articles" />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Saved Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {savedArticles.length} article{savedArticles.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            
            {savedArticles.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-300 hover:border-red-400 rounded-lg transition-colors dark:text-red-400 dark:border-red-600 dark:hover:text-red-300"
              >
                Clear All
              </button>
            )}
          </div>

          {savedArticles.length > 0 && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search saved articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          )}
        </div>

        {savedArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Your reading list awaits
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Discover fascinating articles and bookmark the ones that spark your curiosity. Your personal knowledge collection starts here!
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="/random?language=en&type=featured"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Featured Articles
                </a>
                <a
                  href="/random?language=en&type=featured&category=Science"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md dark:bg-purple-700 dark:hover:bg-purple-600 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Science
                </a>
                <a
                  href="/random?language=en&type=featured&category=History"
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transform hover:scale-105 transition-all duration-200 shadow-md dark:bg-amber-700 dark:hover:bg-amber-600 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  History
                </a>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                💡 Look for the bookmark icon on articles to save them here
              </p>
            </div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No articles match your search
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try a different search term or clear your search to see all saved articles
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredArticles.map((article, index) => (
              <div
                key={article.pageId}
                className="animate-fade-in"
                style={{
                  animationDelay: `${(index % 10) * 0.05}s`,
                  animationFillMode: 'both'
                }}
              >
                <ArticleSummary
                  thumbnailUrl={article.thumbnailUrl}
                  title={article.title}
                  summary={article.summary}
                  url={article.url}
                  pageId={article.pageId}
                />
              </div>
            ))}
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  );
}