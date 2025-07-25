export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Made with{' '}
              <span className="text-red-500 animate-pulse">❤️</span>
              {' '}in Buenos Aires, Argentina{' '}
              <span className="inline-block">🇦🇷</span>
              {' '}by{' '}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Hanif Carroll
              </span>
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://hanifcarroll.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400 text-sm font-medium"
            >
              Website
            </a>
            
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <a
              href="https://linkedin.com/in/hanifcarroll"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400 text-sm font-medium"
            >
              LinkedIn
            </a>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Explore the world's knowledge, one article at a time
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}