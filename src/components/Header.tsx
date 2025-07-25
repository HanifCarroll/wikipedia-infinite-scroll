import { Link} from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { SavedArticlesService } from '../lib/services/SavedArticlesService';
import { LanguageSwitcher } from './LanguageSwitcher';
import { TypeSwitcher } from './TypeSwitcher';
import { ArticleCategory } from '../lib/utils/utils';

export function Header({ language, articleType }: { language?: string; articleType?: ArticleCategory }) {
  const { theme, toggleTheme } = useTheme();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateSavedCount = () => {
      setSavedCount(SavedArticlesService.getSavedCount());
    };

    // Initial load
    updateSavedCount();

    // Listen for storage changes (when articles are saved/unsaved)
    const handleStorageChange = () => {
      updateSavedCount();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleSavedArticlesChange = () => {
      updateSavedCount();
    };
    window.addEventListener('savedArticlesChange', handleSavedArticlesChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedArticlesChange', handleSavedArticlesChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/90 shadow-md dark:bg-gray-800/95 dark:shadow-black/30 border-b border-transparent dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center"
          >
            <img 
              src="/favicon.ico" 
              alt="Home" 
              className="w-8 h-8 hover:opacity-80 transition-opacity duration-200"
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            {language && (
              <div className="flex items-center gap-1 sm:gap-2">
                <LanguageSwitcher currentLanguage={language} />
                {articleType && (
                  <TypeSwitcher currentType={articleType} />
                )}
              </div>
            )}
            <Link
              to="/saved"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800"
              title="Saved Articles"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {savedCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                  {savedCount > 99 ? '99+' : savedCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
