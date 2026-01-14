"use client";

import { ChartNoAxesCombined, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import FeaturedSlider from "./featured-slider";

const FeatureNews = ({ news = [] }: { news: NewsData[] }) => {
  const featured = [...news]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 6);

  const [current, setCurrent] = useState(0);
  const leftnext = () => {
    setCurrent((prev) => (prev - 1) % featured.length);
  };
  const rightnext = () => {
    setCurrent((prev) => (prev + 1) % featured.length);
  };

  return (
    <section className="py-8 bg-gray-100">
      <div className="flex items-center justify-between mb-5  container mx-auto">
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
            onClick={leftnext}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={rightnext}
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
