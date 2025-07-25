import { useState, useEffect } from 'react';
import { SavedArticlesService, SavedArticle } from '../lib/services/SavedArticlesService';
import { ArticleSummary } from '../components/ArticleSummary';
import { Header } from '../components/Header';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header language="Saved Articles" />
      
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No saved articles yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start exploring and save interesting articles to read later
            </p>
            <a
              href="/random?language=en&type=featured"
              className="btn-primary inline-block"
            >
              Discover Articles
            </a>
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
    </div>
  );
}