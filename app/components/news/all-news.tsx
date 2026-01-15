"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MessageCircle, Clock, Eye } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  "All",
  "politics",
  "sports",
  "technology",
  "business",
  "entertainment",
  "travel",
];
type props = {
  news: NewsData[];
  initialCategory?: string; 
};

const AllNews = ({ news, initialCategory }: props) => {
  const [category, setCategory] = useState(initialCategory || "All");
  const [sort, setSort] = useState<"date" | "popularity">("date");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredNews = useMemo(() => {

    let newsToFilter = [...news];
    
    if (!initialCategory) {
      newsToFilter = newsToFilter.filter((item) =>
        category === "All" ? true : item.category === category
      );
    }
    
    return newsToFilter.sort((a, b) => {
      if (sort === "popularity") {
        return b.popularity - a.popularity;
      }
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
  }, [news, category, sort, initialCategory]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  return (
    <section className="">
      <header
        style={{ backgroundImage: "url('/bgImage.jpg')" }}
        className="relative mb-10 flex min-h-70 flex-col items-end gap-6  pb-6 bg-cover bg-no-repeat md:flex-row md:justify-between md:px-20
  "
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <nav className="relative flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = initialCategory 
              ? (cat === "All" ? !initialCategory : cat === initialCategory)
              : category === cat;
            
            const href = cat === "All" ? "/news" : `/news/${cat}`;
            
            return (
              <Link
                key={cat}
                href={href}
                onClick={() => {
                  if (!initialCategory) {
                    setCategory(cat);
                  }
                  setCurrentPage(1);
                }}
                className={`rounded-md px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-gray-50 text-text-primary"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </nav>
        <div className="relative flex items-center gap-4 rounded-lg bg-gray-50 p-2">
          <button
            onClick={() => setSort("date")}
            className={`px-4 py-1 text-xs ${
              sort === "date"
                ? "font-bold text-primary underline"
                : "text-text-primary"
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => setSort("popularity")}
            className={`px-4 py-1 text-xs ${
              sort === "popularity"
                ? "font-bold text-primary underline"
                : "text-text-primary"
            }`}
          >
            Trending
          </button>
        </div>
      </header>

      <div className="grid gap-8 xl:grid-cols-2 container mx-auto">
        {currentItems.map((item) => {
    
          const categoryForLink = initialCategory || item.category;
          const newsDetailHref = `/news/${categoryForLink}/${item._id}`;
          
          return (
          <article key={item.slug}>
            <Link href={newsDetailHref} className="group block h-full">
              <div className="flex h-full flex-col overflow-hidden transition hover:shadow-2xl md:flex-row">
                <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-sm">
                  <Image
                    src={item.coverImage ? item.coverImage : "/default.jpg"}
                    alt={item.title || "Default image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 bg-primary px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                    {item.category}
                  </span>
                </div>

                <div className="flex w-full flex-col justify-between bg-primary p-7 text-white md:w-[55%]">
                  <div>
                    <time className="mb-5 flex items-center gap-2 text-xs opacity-80">
                      <Calendar size={14} />
                      {new Date(item.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>

                    <h2 className="mb-4 text-2xl font-bold leading-tight group-hover:text-gray-200">
                      {item.title}
                    </h2>

                    <p className="line-clamp-3 text-xs font-light leading-relaxed opacity-85">
                      {item.content.replace(/<[^>]*>?/gm, "")}
                    </p>
                  </div>

                  <footer className="mt-8 flex gap-6 border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-widest opacity-70">
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} /> 12
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> 3 min
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={14} /> {item.popularity}
                    </span>
                  </footer>
                </div>
              </div>
            </Link>
          </article>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav className="mt-16 flex items-center justify-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="rounded bg-gray-100 px-4 py-2 disabled:opacity-30"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-10 w-10 rounded font-bold transition ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded bg-gray-100 px-4 py-2 disabled:opacity-30"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
};

export default AllNews;
