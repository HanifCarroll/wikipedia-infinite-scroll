export function NoMoreArticles() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-green-600 mb-4">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2 dark:text-gray-100">
        All caught up!
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        You've seen all of the articles in this category
      </p>
    </div>
  );
}
