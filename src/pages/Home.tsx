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
  const filteredOtherLanguages = otherLanguages.filter(
    (language) =>
      language.code.toLowerCase().includes(formattedSearchTerm) ||
      language.name.toLowerCase().includes(formattedSearchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-1">
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
          </div>
        </div>

        {/* Popular Languages Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Popular Languages */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Start Exploring
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Choose from the most popular languages on Wikipedia
            </p>

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularLanguages.map((language) => (
                <LanguageCard
                  key={language.code}
                  name={language.name}
                  code={language.code}
                  allCount={language.allCount}
                  featuredCount={language.featuredCount}
                  goodCount={language.goodCount}
                  bothCount={language.bothCount}
                  allUrl={language.allUrl}
                  featuredUrl={language.featuredUrl}
                  goodUrl={language.goodUrl}
                  bothUrl={language.bothUrl}
                />
              ))}
            </div>
          </div>

          {/* Progressive Disclosure - More Languages */}
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

          {/* All Languages - Progressive Disclosure */}
          {showAllLanguages && (
            <div className="space-y-6">
              {/* Search Bar for All Languages */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a language..."
                    type="text"
                    value={searchTerm}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredOtherLanguages.map((language) => (
                  <LanguageCard
                    key={language.code}
                    name={language.name}
                    code={language.code}
                    allCount={language.allCount}
                    featuredCount={language.featuredCount}
                    goodCount={language.goodCount}
                    bothCount={language.bothCount}
                    allUrl={language.allUrl}
                    featuredUrl={language.featuredUrl}
                    goodUrl={language.goodUrl}
                    bothUrl={language.bothUrl}
                    isCompact={true}
                  />
                ))}
              </div>

              {filteredOtherLanguages.length === 0 && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No languages found matching "{searchTerm}"
                  </p>
                </div>
              )}
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
