import BreakingNews from "./components/breaking-news";
import FeatureNews from "./components/features-news";
import HeroBanner from "./components/hero-banner";
import NewsHeroGrid from "./components/news/news-grid";

const getFeaturedNews = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/news?sort=popularity&limit=10`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to fetch featured news");
    return await res.json();
  } catch (err) {
    console.error("getFeaturedNews error:", err);
    return []; // fallback to empty array
  }
};

const getBreakingNews = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/news?limit=10`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error("Failed to fetch breaking news");
    return await res.json();
  } catch (err) {
    console.error("getBreakingNews error:", err);
    return []; 
  }
};

export default async function HomePage() {
  const [featuredNews, breakingNews] = await Promise.all([
    getFeaturedNews(),
    getBreakingNews(),
  ]);

  return (
    <>
      <BreakingNews news={breakingNews} />
      <HeroBanner />
      <FeatureNews news={featuredNews} />
      <NewsHeroGrid news={breakingNews} />
    </>
  );
}
