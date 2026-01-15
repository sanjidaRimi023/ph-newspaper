// components/news-hero-grid.tsx
import { ChartNoAxesCombined } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  news: NewsData[];
};

const NewsHeroGrid = ({ news }: Props) => {
  if (!news?.length) return null;

  const mainNews = news[0];
  const sideNews = news.slice(1, 4);
  const bottomNews = news.slice(3, 7);

  return (
    <section className="container mx-auto p-4 md:p-6">
      <div className="flex gap-4 items-center mb-4">
        <div className="bg-primary text-white p-3 rounded-full">
          <ChartNoAxesCombined size={30} />
        </div>

        <div className="flex items-center gap-3 text-3xl font-bold">
          <div className="h-10 border-l-4 border-primary" />
          Popular News
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        <div className="lg:col-span-4 flex flex-col gap-4">
          {sideNews.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.category}/${item._id}`}
              className="flex-1 group relative overflow-hidden bg-primary min-h-37"
            >
              <Image
                fill
                src={
                  item.coverImage ||
                  "/default.jpg"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-white text-sm md:text-base font-bold line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        {mainNews && (
          <Link
            href={`/news/${mainNews.category}/${mainNews._id}`}
            className="lg:col-span-8 group relative overflow-hidden bg-primary h-75 md:h-120"
          >
            <Image
              fill
              src={
                mainNews.coverImage ||
                "https://images.unsplash.com/photo-1585829365234-781fbdc4130d?w=800"
              }
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              alt={mainNews.title}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
              <span className="bg-primary text-white text-[10px] font-bold uppercase w-fit px-3 py-1 mb-3">
                {mainNews.category || "Featured"}
              </span>
              <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight line-clamp-2">
                {mainNews.title}
              </h2>
            </div>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bottomNews.map((item) => (
          <Link
            key={item._id}
          href={`/news/${item.category}/${item._id}`}
            className="group bg-white border-border border p-4 shadow hover:shadow-xl"
          >
            <div className="relative h-44 overflow-hidden mb-3">
              <Image
                fill
                src={
                  item.coverImage ||
                  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                alt={item.title}
              />
            </div>

            <h4 className="text-[15px] font-bold text-text-primary line-clamp-2 group-hover:text-primary leading-snug truncate">
              {item.title}
            </h4>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold uppercase text-primary">
                {item.category || "News"}
              </span>
              <span className="text-[10px] text-slate-400">• 2 min read</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsHeroGrid;
