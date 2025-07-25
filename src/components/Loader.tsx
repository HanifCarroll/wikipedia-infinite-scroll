type LoaderProps = {
  handleReload: () => void;
  isError: boolean;
};

export function Loader({ handleReload, isError }: LoaderProps) {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4 dark:text-gray-300">Failed to load articles</p>
        <button
          className="btn-primary"
          onClick={handleReload}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-400"></div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Loading more articles...</p>
    </div>
  );
}
