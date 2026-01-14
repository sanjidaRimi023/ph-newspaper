"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewsCard } from "./new-card";


const newsData: NewsItem[] = [
  {
    id: "1",
    image:
      "https://i.ibb.co.com/SXmWgrBs/event3.jpg",
    category: "Technology",
    title: "The Future of AI: How Generative Models are Changing Journalism",
    description:
      "Artificial Intelligence is actively reshaping how news is gathered, written, and distributed.",
    date: "Jan 12, 2026",
    readTime: "5 min read",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",
    category: "Politics",
    title: "Global Summit 2026: Leaders Discuss Climate Change",
    description:
      "World leaders gather to finalize one of the most ambitious climate agreements.",
    date: "Jan 11, 2026",
    readTime: "8 min read",
  },
  {
    id: "3",
    image:
      "https://i.ibb.co.com/1fzCn6mH/4.jpg",
    category: "Culture",
    title: "Digital Art and the New Cultural Shift",
    description:
      "Digital art platforms are redefining how culture is created and consumed.",
    date: "Jan 10, 2026",
    readTime: "4 min read",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % newsData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const next = () =>
    setCurrent((prev) => (prev + 1) % newsData.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + newsData.length) % newsData.length);

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  
        <div className="lg:col-span-7 relative overflow-hidden">
          <NewsCard item={newsData[current]} variant="large" />

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={prev}
              className="p-2 bg-white/80 hover:bg-white text-black"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="p-2 bg-white/80 hover:bg-white text-black"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

   
        <div className="lg:col-span-5 flex flex-col gap-10">
          <NewsCard item={newsData[1]} variant="medium" />
          <NewsCard item={newsData[2]} variant="medium" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
