import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticleCategory } from '../lib/utils/utils';

type TypeSwitcherProps = {
  currentType: ArticleCategory;
};

const articleTypes = [
  { value: 'featured' as ArticleCategory, label: 'Featured', description: 'Wikipedia\'s finest articles' },
  { value: 'good' as ArticleCategory, label: 'Good', description: 'High-quality articles' },
  { value: 'both' as ArticleCategory, label: 'Featured & Good', description: 'Best quality articles' },
  { value: 'all' as ArticleCategory, label: 'All', description: 'Random Wikipedia articles' },
];

export function TypeSwitcher({ currentType }: TypeSwitcherProps) {
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

  const buildUrl = (type: ArticleCategory) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('type', type);
    return `/random?${newSearchParams.toString()}`;
  };

  const currentTypeLabel = articleTypes.find(t => t.value === currentType)?.label || 'Unknown';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-2 rounded-full hover:bg-blue-200 cursor-pointer transition-colors dark:text-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 flex items-center gap-1"
      >
        {currentTypeLabel}
        <svg 
          className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 z-50">
          <div className="p-2">
            {articleTypes.map((type) => (
              <a
                key={type.value}
                href={buildUrl(type.value)}
                className={`block px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  type.value === currentType
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{type.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {type.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}