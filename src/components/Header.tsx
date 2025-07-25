import { Link} from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export function Header({ language }: { language?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/90 shadow-md dark:bg-gray-900/90 dark:shadow-gray-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 dark:text-gray-100 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <div className="flex items-center gap-4">
            {language && (
              <span className="text-lg font-medium text-gray-700 bg-gray-100 px-4 py-1 rounded-full dark:text-gray-200 dark:bg-gray-800">
                {language}
              </span>
            )}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
