import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header.tsx';
import { ArticleCriteriaModal } from '../components/ArticleCriteriaModal.tsx';
import { getLanguageTableData } from '..//lib/utils/utils.ts';

export default function Home() {
  const languageTableData = getLanguageTableData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedSearchTerm = searchTerm.trim().toLocaleLowerCase();
  const filteredLanguages = languageTableData
    .filter(
      (language) =>
        language.code.toLowerCase().includes(formattedSearchTerm) ||
        language.name.toLowerCase().includes(formattedSearchTerm)
    )
    .sort((lang1, lang2) => lang2.allCount - lang1.allCount);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="gradient-bg text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Wikipedia Infinite Scroll
          </h1>
          <p className="text-xl opacity-90 mb-3">
            Practice reading in any language with endless Wikipedia articles
          </p>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Learn languages naturally by reading Wikipedia's best articles - curated for accuracy, clarity, and comprehensive coverage
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              className="w-full px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30 transition-all dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a language..."
              type="text"
              value={searchTerm}
            />
          </div>
        </div>
      </div>

      {/* Language Table */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tip Banner */}
        <div className="mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2 dark:bg-blue-950/30 dark:border-blue-900">
          <span className="text-blue-600 dark:text-blue-400 mt-0.5">💡</span>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Tip:</span> Start with{' '}
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-semibold underline hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
            >
              Featured or Good
            </button>{' '}
            articles for the best reading experience - they're Wikipedia's most polished and well-structured content
          </p>
        </div>

        <div className="card overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Select a Language
            </h2>
            <p className="text-sm text-gray-600 mt-1 dark:text-gray-300">
              Click on any count to start reading articles
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Language</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Code</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">All Articles</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Featured</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Good</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Featured & Good</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLanguages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                          No languages found
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Try searching with a different term
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLanguages.map((language) => (
                  <tr key={language.name} className="table-row-hover">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                      {language.name}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm font-mono dark:bg-gray-700">
                        {language.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link 
                        to={language.allUrl}
                        className="text-blue-600 hover:text-blue-800 font-semibold hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {language.allCount.toLocaleString()}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {language.featuredCount > 0 ? (
                        <Link 
                          to={language.featuredUrl}
                          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {language.featuredCount.toLocaleString()}
                        </Link>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {language.goodCount > 0 ? (
                        <Link 
                          to={language.goodUrl}
                          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {language.goodCount.toLocaleString()}
                        </Link>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {language.bothCount > 0 ? (
                        <Link 
                          to={language.bothUrl}
                          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {language.bothCount.toLocaleString()}
                        </Link>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">0</span>
                      )}
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ArticleCriteriaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
