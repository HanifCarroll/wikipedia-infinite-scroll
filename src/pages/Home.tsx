import { useState } from 'react';
import { Header } from '../components/Header.tsx';
import { ArticleCriteriaModal } from '../components/ArticleCriteriaModal.tsx';
import { Footer } from '../components/Footer.tsx';
import { LanguageCard } from '../components/LanguageCard.tsx';
import { getLanguageTableData } from '..//lib/utils/utils.ts';

export default function Home() {
  const languageTableData = getLanguageTableData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  // Define popular languages (top 6)
  const popularLanguageCodes = ['en', 'es', 'fr', 'de', 'it', 'pt'];
  
  const allLanguages = languageTableData.sort((lang1, lang2) => lang2.allCount - lang1.allCount);
  
  const popularLanguages = allLanguages.filter(lang => 
    popularLanguageCodes.includes(lang.code)
  ).sort((a, b) => popularLanguageCodes.indexOf(a.code) - popularLanguageCodes.indexOf(b.code));
  
  const otherLanguages = allLanguages.filter(lang => 
    !popularLanguageCodes.includes(lang.code)
  );

  const formattedSearchTerm = searchTerm.trim().toLowerCase();
  
  // Filter all languages (popular + other) when searching
  const filteredPopularLanguages = popularLanguages.filter(
    (language) =>
      language.code.toLowerCase().includes(formattedSearchTerm) ||
      language.name.toLowerCase().includes(formattedSearchTerm)
  );
  
  const filteredOtherLanguages = otherLanguages.filter(
    (language) =>
      language.code.toLowerCase().includes(formattedSearchTerm) ||
      language.name.toLowerCase().includes(formattedSearchTerm)
  );
  
  // Combine filtered results when searching
  const allFilteredLanguages = searchTerm ? [...filteredPopularLanguages, ...filteredOtherLanguages] : [];
  const hasSearchResults = searchTerm && allFilteredLanguages.length > 0;
  const showNoResults = searchTerm && allFilteredLanguages.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/20 py-20 px-4 border-b border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-70 dark:opacity-40">
            <div className="absolute top-10 left-10 w-44 h-44 bg-blue-200/80 dark:bg-blue-700/50 rounded-full blur-xl animate-[float-1_20s_ease-in-out_infinite]"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-200/80 dark:bg-indigo-700/50 rounded-full blur-xl animate-[float-2_25s_ease-in-out_infinite_reverse]"></div>
            <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-purple-200/80 dark:bg-purple-700/50 rounded-full blur-xl animate-[float-3_30s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-cyan-200/80 dark:bg-cyan-700/50 rounded-full blur-xl animate-[float-4_18s_ease-in-out_infinite_reverse]"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl mb-6 shadow-lg border border-white/20 dark:border-gray-700/50">
                <img 
                  src="/favicon.ico" 
                  alt="Wikipedia Infinite Scroll" 
                  className="w-18 h-18"
                />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Wikipedia Infinite Scroll
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              Practice reading in any language with endless Wikipedia articles
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              Discover Wikipedia's finest content - curated for accuracy, clarity, and comprehensive coverage
            </p>
          </div>
        </div>

        {/* Popular Languages Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Search Bar */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Start Exploring
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Choose from popular languages or search for any language by name or code
            </p>
            
            {/* Prominent Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  className="block w-full pl-10 pr-4 py-3 text-base border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-gray-300 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 dark:hover:border-gray-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search languages..."
                  type="text"
                  value={searchTerm}
                />
              </div>
            </div>
          </div>
          
          {/* Search Results */}
          {hasSearchResults && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Search Results ({allFilteredLanguages.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFilteredLanguages.map((language) => (
                  <LanguageCard
                    key={language.code}
                    name={language.name}
                    code={language.code}
                    allCount={language.allCount}
                    featuredCount={language.featuredCount}
                    goodCount={language.goodCount}
                    allUrl={language.allUrl}
                    featuredUrl={language.featuredUrl}
                    goodUrl={language.goodUrl}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* No Search Results */}
          {showNoResults && (
            <div className="text-center py-8 mb-6">
              <div className="max-w-md mx-auto">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No languages found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No languages found matching "{searchTerm}". Try searching by language name or code.
                </p>
              </div>
            </div>
          )}
          
          {/* Popular Languages - Hidden when searching */}
          {!searchTerm && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Popular Languages
              </h3>

              {/* Tip Banner */}
              <div className="mb-8 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2 dark:bg-blue-950/30 dark:border-blue-900">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">💡</span>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-semibold">Tip:</span> Start with{' '}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="font-semibold underline hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm"
                  >
                    Featured or Good
                  </button>{' '}
                  articles for the best reading experience
                </p>
              </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularLanguages.map((language) => (
                  <LanguageCard
                    key={language.code}
                    name={language.name}
                    code={language.code}
                    allCount={language.allCount}
                    featuredCount={language.featuredCount}
                    goodCount={language.goodCount}
                    allUrl={language.allUrl}
                    featuredUrl={language.featuredUrl}
                    goodUrl={language.goodUrl}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Progressive Disclosure - More Languages - Hidden when searching */}
          {!searchTerm && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowAllLanguages(!showAllLanguages)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {showAllLanguages ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Show Less Languages
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Browse All Languages ({otherLanguages.length} more)
                  </>
                )}
              </button>
            </div>
          )}

          {/* All Languages - Progressive Disclosure - Hidden when searching */}
          {showAllLanguages && !searchTerm && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center">
                All Other Languages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherLanguages.map((language) => (
                  <LanguageCard
                    key={language.code}
                    name={language.name}
                    code={language.code}
                    allCount={language.allCount}
                    featuredCount={language.featuredCount}
                    goodCount={language.goodCount}
                    allUrl={language.allUrl}
                    featuredUrl={language.featuredUrl}
                    goodUrl={language.goodUrl}
                    isCompact={true}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <ArticleCriteriaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Footer />
    </div>
  );
}
