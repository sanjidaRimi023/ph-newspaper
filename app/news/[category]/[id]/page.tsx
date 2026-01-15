import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowLeft, Eye, Hash } from "lucide-react";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { id } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const ogUrl = `${baseUrl}/api/og?id=${id}`;

  return {
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "PH Newspaper",
      images: [ogUrl],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogUrl],
    },
  };
}


async function getSingleNews(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("getSingleNews error:", err);
    return null;
  }
}

async function getAllNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news?limit=30`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("getAllNews error:", err);
    return [];
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  const [currentNews, allNews]: [NewsData | null, NewsData[]] =
    await Promise.all([getSingleNews(id), getAllNews()]);

  if (!currentNews)
    return <div className="text-center py-20 font-bold">News not found!</div>;

  if (currentNews.category !== category) {
    redirect(`/news/${currentNews.category}/${id}`);
  }

  const relatedNews = allNews.filter(
    (n) => n.category === currentNews.category && n._id !== currentNews._id
  );

  const otherCategoryNews = allNews
    .filter((n) => n.category !== currentNews.category)
    .slice(0, 4);

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 pt-8">
          <Link
            href={`/news/${category}`}
            className="flex items-center gap-2 mb-6 text-primary font-bold hover:underline"
          >
            <ArrowLeft size={18} /> BACK TO LIST
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <main className="lg:col-span-7 bg-white p-6 md:p-10 rounded-sm shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  {currentNews.category}
                </span>
                <div className="flex items-center gap-1 text-text-muted text-sm font-medium border-l pl-3">
                  <MapPin size={14} className="text-primary" />
                  {currentNews.district}, {currentNews.division}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-text-primary leading-[1.2] mb-6">
                {currentNews.title}
              </h1>

              <div className="relative aspect-video w-full overflow-hidden rounded-sm mb-6">
                <Image
                  src={currentNews.coverImage}
                  alt={currentNews.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex items-center gap-2 text-xl text-gray-400 italic mb-4">
                <Hash size={12} /> {currentNews.slug}
              </div>

              <div>{currentNews.content}</div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-sm text-text-muted">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(currentNews.publishedAt).toLocaleDateString(
                      "en-US",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {new Date(currentNews.publishedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full font-bold">
                  <Eye size={18} />
                  {currentNews.popularity} Views
                </div>
              </div>
            </main>

            <aside className="lg:col-span-5 space-y-8 bg-white border-2 border-gray-200 px-8 py-4">
              <h3 className="text-xl font-bold uppercase border-b-2 border-primary pb-2 inline-block">
                Related Stories
              </h3>

              <div className="space-y-4">
                {relatedNews.map((item) => (
                  <Link
                    key={item._id}
                    href={`/news/${item.category}/${item._id}`}
                    className="block"
                  >
                    <div className="flex gap-4 p-3 rounded-none transition-all duration-300 hover:shadow-xl border border-gray-100 group">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden">
                        <Image
                          src={
                            item.coverImage ? item.coverImage : "/default.jpg"
                          }
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-400 font-bold  italic flex items-center gap-1">
                          <Clock size={10} />{" "}
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                        <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          <section className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-0.5 bg-gray-300 grow"></div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">
                More to Explore
              </h3>
              <div className="h-0.5 bg-gray-300 grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherCategoryNews.map((item) => (
                <Link
                  key={item._id}
                  href={`/news/${item.category}/${item._id}`}
                  className="group"
                >
                  <div className="bg-white border border-gray-200 shadow hover:shadow-2xl p-4 h-full transition hover:border-primary">
                    <div className="relative aspect-4/3 mb-4 overflow-hidden">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-primary font-black uppercase">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-base mt-2 line-clamp-2 group-hover:underline">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
