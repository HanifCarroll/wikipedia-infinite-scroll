import Head from 'next/head';
import languages from '../languages.json';
import { Header } from '@/pages/components/Header';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredLanguages = languages.filter(
    (language) =>
      language.Wiki.toLowerCase().includes(searchTerm) ||
      language.Language.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Head>
        <title>Wikipedia Infinite Scroll</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <input
          className="border-2 border-black p-1 text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a language..."
          type="text"
          value={searchTerm}
        />
        <div className="mt-5 w-4/5 max-h-80 border-2 border-black overflow-scroll">
          <table className="w-full border-2 border-black border-collapse">
            <thead>
              <tr>
                <th>Language</th>
                <th>Language Code</th>
                <th># of Articles</th>
              </tr>
            </thead>
            <tbody>
              {filteredLanguages.map((language) => (
                <tr key={language.Wiki} className="border-2 border-black ">
                  <td className="text-center w-1/3">
                    <a href={`/random?language=${language.Wiki}`}>
                      {language.Language}
                    </a>
                  </td>
                  <td className="text-center w-1/3">
                    <a href={`/random?language=${language.Wiki}`}>
                      {language.Wiki}
                    </a>
                  </td>
                  <td className="text-center w-1/3">
                    <a href={`/random?language=${language.Wiki}`}>
                      {language.Articles}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}