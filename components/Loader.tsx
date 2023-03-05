type LoaderProps = {
  isError: boolean;
};

export function Loader({ isError }: LoaderProps) {
  const message = isError ? 'Error, please refresh' : 'Loading...';
  return (
    <h3
      className={`text-center text-2xl my-10 ${
        isError ? 'text-red-700' : null
      }`}
    >
      {message}
    </h3>
  );
}
