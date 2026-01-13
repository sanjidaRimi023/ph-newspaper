"use client";

import { ChartNoAxesCombined, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import FeaturedSlider from "./featured-slider";

type News = {
  _id: string;
  title: string;
  coverImage: string;
};

const FeatureNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [current, setCurrent] = useState(0);

  
  useEffect(() => {
    const loadNews = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/news?sort=popularity&limit=10`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setNews(data);
    };

    loadNews();
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % news.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + news.length) % news.length);
  };

  useEffect(() => {
    if (!news.length) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <section className="my-10">

      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-4 items-center">
          <div className="bg-primary text-white p-3 rounded-full">
            <ChartNoAxesCombined size={30} />
          </div>

          <div className="flex items-center gap-3 text-3xl font-bold">
            <div className="h-10 border-l-4 border-primary" />
            News & Trending
          </div>
        </div>

   
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

   
      <FeaturedSlider newsData={news} current={current} />
    </section>
  );
};

export default FeatureNews;
