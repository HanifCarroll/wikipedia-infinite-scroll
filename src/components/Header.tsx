import { Link} from 'react-router-dom';

export function Header({ language }: { language?: string }) {
  return (
    <header
      className="sticky top-0 z-10 mb-10 p-3 border-y border-gray-800 w-full bg-white flex justify-between md:text-xl ">
      <Link to="/">Home</Link>
      {language ? <span>{language}</span> : null}
    </header>
  );
}
