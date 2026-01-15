import AllNews from "@/app/components/news/all-news";

export const getNews = async (category: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news?category=${category}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch data in getNews page");
  return res.json();
};

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  const news = await getNews(category);

  return <AllNews news={news} initialCategory={category} />;
};

export default CategoryPage;
