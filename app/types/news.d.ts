interface NewsItem {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}


interface NewsData {
  title: string;
  slug: string;
  category:
    | "politics"
    | "sports"
    | "technology"
    | "business"
    | "entertainment"
    | "travel";
  content: string;
  district: string;
  division: string;
  publishedAt: Date;
  popularity: number;
  isBreaking: boolean;
  isFeatured: boolean;
  coverImage: string;
}
