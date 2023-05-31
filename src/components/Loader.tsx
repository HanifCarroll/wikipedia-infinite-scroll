type LoaderProps = {
  handleReload: () => void;
  isError: boolean;
};

export function Loader({ handleReload, isError }: LoaderProps) {
  if (isError) {
    return (
      <div className="flex items-center justify-center my-10">
        <button
          className="my-4 w-32 h-10 border-2 border-black w-20"
          onClick={handleReload}
        >
          Reload
        </button>
      </div>
    );
  }

  return <h3 className={'text-center text-2xl my-10'}>Loading...</h3>;
}
