import AllNews from "../components/all-news";

export const getNews = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/news?limit=20`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch data in getNews page");
  return res.json();
};
const NewsPage = async () => {
  const news = await getNews();
  return (
    <>
      <AllNews news={news} />
    </>
  );
};

export default NewsPage;
