import AllNews from "@/app/components/news/all-news";

export const getNews = async (category: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news?category=${category}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch data in getNews page");
    return await res.json();
  } catch (err) {
    console.error("getNews error:", err);
    return []; // fallback to empty array
  }
};

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  const news = await getNews(category);

  return <AllNews news={news} initialCategory={category} />;
};

export default CategoryPage;
