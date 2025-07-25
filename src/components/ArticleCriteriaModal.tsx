import { useEffect, useRef } from 'react';

type ArticleCriteriaModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ArticleCriteriaModal({ isOpen, onClose }: ArticleCriteriaModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden dark:bg-gray-800"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Wikipedia Article Quality Criteria
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="space-y-6">
            {/* Featured Articles */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-gray-100">
                Featured Articles ⭐
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 dark:bg-blue-900/20">
                <p className="text-gray-700 mb-2 dark:text-gray-300">
                  Featured articles are considered Wikipedia's best work and must meet strict criteria:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2 dark:text-gray-400">
                  <li>Professional standards of writing, presentation, and sourcing</li>
                  <li>Comprehensive coverage of the topic</li>
                  <li>Well-researched with high-quality reliable sources</li>
                  <li>Neutral point of view</li>
                  <li>Stable content without ongoing edit wars</li>
                </ul>
              </div>
            </section>

            {/* Good Articles */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-gray-100">
                Good Articles ✓
              </h3>
              <div className="bg-green-50 rounded-lg p-4 dark:bg-green-900/20">
                <p className="text-gray-700 mb-2 dark:text-gray-300">
                  Good articles meet a less stringent set of criteria than featured articles:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2 dark:text-gray-400">
                  <li>Well-written and clear</li>
                  <li>Accurate and verifiable</li>
                  <li>Broad in coverage without going into unnecessary detail</li>
                  <li>Neutral in point of view</li>
                  <li>Stable without edit wars</li>
                  <li>Illustrated with appropriate images when possible</li>
                </ul>
              </div>
            </section>

            {/* Key Differences */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-gray-100">
                Key Differences
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">Review Process:</span>
                    <p className="text-gray-600 dark:text-gray-400">Featured articles undergo a more rigorous peer review, while good articles have a simpler nomination process.</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">Comprehensiveness:</span>
                    <p className="text-gray-600 dark:text-gray-400">Featured articles must be comprehensive, while good articles need only be broad in coverage.</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">Writing Quality:</span>
                    <p className="text-gray-600 dark:text-gray-400">Featured articles require "brilliant prose," while good articles need to be simply "well-written."</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 dark:bg-gray-700 dark:border-gray-600">
          <a 
            href="https://en.wikipedia.org/wiki/Wikipedia:Compare_criteria_Good_v._Featured_article"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium dark:text-blue-400 dark:hover:text-blue-300"
          >
            Read full comparison on Wikipedia
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}