import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header.tsx';
import { getLanguageTableData } from '..//lib/utils/utils.ts';

export default function Home() {
  const languageTableData = getLanguageTableData();
  const [searchTerm, setSearchTerm] = useState('');
  const formattedSearchTerm = searchTerm.trim().toLocaleLowerCase();
  const filteredLanguages = languageTableData
    .filter(
      (language) =>
        language.code.toLowerCase().includes(formattedSearchTerm) ||
        language.name.toLowerCase().includes(formattedSearchTerm)
    )
    .sort((lang1, lang2) => lang2.allCount - lang1.allCount);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-5 text-3xl font-medium">Wikipedia Infinite Scroll</h1>
        <p className="mb-5">
          Click on one of the counts to view the corresponding list of articles
        </p>
        <input
          className="rounded border border-black p-1 text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a language"
          type="text"
          value={searchTerm}
        />
        <div className="mt-5 max-h-80 w-11/12 overflow-scroll border-y border-black md:w-4/5">
          <table className="w-full border-collapse border border-black">
            <thead>
              <tr className="tracking-wide">
                <th>Language</th>
                <th>Code</th>
                <th>All</th>
                <th>Featured</th>
                <th>Good</th>
                <th>Featured & Good</th>
              </tr>
            </thead>
            <tbody>
              {filteredLanguages.map((language) => (
                <tr key={language.name} className="border border-black ">
                  <td className="w-1/6 text-center">
                    <span>{language.name}</span>
                  </td>
                  <td className="text-center">
                    <span>{language.code}</span>
                  </td>
                  <td className="text-center">
                    <Link to={language.allUrl}>
                      {language.allCount.toLocaleString()}
                    </Link>
                  </td>
                  <td className="text-center">
                    {language.featuredCount > 0 ? (
                      <Link to={language.featuredUrl}>
                        {language.featuredCount.toLocaleString()}
                      </Link>
                    ) : (
                      0
                    )}
                  </td>
                  <td className="text-center">
                    {language.goodCount > 0 ? (
                      <Link to={language.goodUrl}>
                        {language.goodCount.toLocaleString()}
                      </Link>
                    ) : (
                      0
                    )}
                  </td>
                  <td className="text-center">
                    {language.bothCount > 0 ? (
                      <Link to={language.bothUrl}>
                        {language.bothCount.toLocaleString()}
                      </Link>
                    ) : (
                      0
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="my-3 underline">
          <a href="https://en.wikipedia.org/wiki/Wikipedia:Compare_criteria_Good_v._Featured_article">
            What are good and featured articles?
          </a>
        </p>
      </div>
    </>
  );
}
