import AllNews from "../components/news/all-news";


export const getNews = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news?limit=40`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch data in getNews page");
    return await res.json();
  } catch (err) {
    console.error("getNews error:", err);
    return []; // fallback to empty array
  }
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
