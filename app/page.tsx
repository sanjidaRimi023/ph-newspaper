import BreakingNews from "./components/breaking-news";
import FeatureNews from "./components/features-news";
import HeroBanner from "./components/hero-banner";
import NewsHeroGrid from "./components/news/news-grid";



const getFeaturedNews = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news?sort=popularity&limit=10`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch featured news");
  return res.json();
};

const getBreakingNews = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/news?limit=10`,
    {
      next: { revalidate: 30 },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch breaking news");
  return res.json();
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
      <NewsHeroGrid news={breakingNews}/>
    </>
  );
}
