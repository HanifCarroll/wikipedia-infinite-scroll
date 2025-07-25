import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { languageCodes } from '../lib/utils/utils';

type LanguageSwitcherProps = {
  currentLanguage: string;
};

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buildUrl = (languageCode: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('language', languageCode);
    return `/random?${newSearchParams.toString()}`;
  };

  // Get popular languages first, then rest
  const popularLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'zh'];
  const sortedLanguages = languageCodes.sort((a, b) => {
    const aPopular = popularLanguages.indexOf(a.code);
    const bPopular = popularLanguages.indexOf(b.code);
    
    if (aPopular !== -1 && bPopular !== -1) return aPopular - bPopular;
    if (aPopular !== -1) return -1;
    if (bPopular !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-lg font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 cursor-pointer transition-colors dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center gap-1"
      >
        {currentLanguage}
        <svg 
          className={`w-4 h-4 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {sortedLanguages.map((language, index) => (
              <div key={language.code}>
                {index === popularLanguages.length && (
                  <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                )}
                <a
                  href={buildUrl(language.code)}
                  className={`block px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    language.name === currentLanguage
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span>{language.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {language.code}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}