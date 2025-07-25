import { Article } from '../domain/Article';

export interface SavedArticle extends Article {
  savedAt: number;
}

export class SavedArticlesService {
  private static readonly STORAGE_KEY = 'wikipedia-saved-articles';

  static getSavedArticles(): SavedArticle[] {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved articles:', error);
      return [];
    }
  }

  static saveArticle(article: Article): void {
    try {
      const saved = this.getSavedArticles();
      const isAlreadySaved = saved.some(a => a.pageId === article.pageId);
      
      if (!isAlreadySaved) {
        const savedArticle: SavedArticle = {
          ...article,
          savedAt: Date.now(),
        };
        const updated = [savedArticle, ...saved]; // Add to beginning
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
        this.dispatchSavedArticlesChange();
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  }

  static unsaveArticle(articleId: string): void {
    try {
      const saved = this.getSavedArticles();
      const filtered = saved.filter(a => a.pageId !== articleId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      this.dispatchSavedArticlesChange();
    } catch (error) {
      console.error('Error unsaving article:', error);
    }
  }

  static isArticleSaved(articleId: string): boolean {
    try {
      return this.getSavedArticles().some(a => a.pageId === articleId);
    } catch (error) {
      console.error('Error checking if article is saved:', error);
      return false;
    }
  }

  static getSavedCount(): number {
    return this.getSavedArticles().length;
  }

  static clearAllSaved(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this.dispatchSavedArticlesChange();
    } catch (error) {
      console.error('Error clearing saved articles:', error);
    }
  }

  private static dispatchSavedArticlesChange(): void {
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('savedArticlesChange'));
  }
}