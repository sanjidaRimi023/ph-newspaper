interface NewsItem {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

// {
//   "_id": "...",
//   "title": "Metro Rail Update",
//   "slug": "metro-rail-update",
//   "category": "politics",
//   "content": "...",
//   "district": "dhaka",
//   "division": "dhaka",
//   "publishedAt": "2026-01-10T10:00:00Z",
//   "popularity": 0,
//   "isBreaking": true,
//   "isFeatured": false,
//   "coverImage": "https://..."
// }

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
