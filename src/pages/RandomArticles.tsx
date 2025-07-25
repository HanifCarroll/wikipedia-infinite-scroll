import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArticleCategory, languageCodes } from '../lib/utils/utils.ts';
import { ArticleList } from '../components/ArticleList.tsx';
import { Header } from '../components/Header.tsx';
import { Footer } from '../components/Footer.tsx';

export default function RandomArticles() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const language = languageCodes.find(
    (language) =>
      language.code === String(searchParams.get('language')).toLocaleLowerCase()
  );

  useEffect(() => {
    if (!language) {
      navigate('/');
    }
  }, [language, navigate]);

  if (!language) {
    return null;
  }

  const languageName = language.name;
  const languageCode = language.code;
  const articleType = String(searchParams.get('type')) as ArticleCategory;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header language={languageName} articleType={articleType} />
      <main className="flex-1">
        <ArticleList
          articleType={articleType}
          language={languageCode}
        />
      </main>
      <Footer />
    </div>
  );
}
