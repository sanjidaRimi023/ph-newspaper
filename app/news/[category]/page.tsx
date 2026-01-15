import AllNews from "@/app/components/news/all-news";


export const getNews = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch data in getNews page");
  return res.json();
};
const CategoryPage = async () => {
  const news = await getNews();
  return (
    <>
      <AllNews news={news} />
    </>
  );
};

export default CategoryPage;
