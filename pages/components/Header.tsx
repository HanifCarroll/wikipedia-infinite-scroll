import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 mb-10 p-3 border-2 border-gray-800 w-full bg-white">
      <Link href="/">Home</Link>
    </header>
  );
}
