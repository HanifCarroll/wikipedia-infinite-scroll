import Link from 'next/link';

export function Header({ language }: { language?: string }) {
  return (
    <header className="sticky top-0 z-10 mb-10 p-3 border-2 border-gray-800 w-full bg-white flex justify-between md:text-xl ">
      <Link href="/">Home</Link>
      {language ? <span>{language}</span> : null}
    </header>
  );
}
