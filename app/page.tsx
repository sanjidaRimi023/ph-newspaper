import FeatureNews from "./components/features-news";
import HeroBanner from "./components/hero-banner";

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

export default async function HomePage() {
  const featuredNews = await getFeaturedNews();

  return (
    <>
      <HeroBanner />
      <FeatureNews news={featuredNews} />
    </>
  );
}
