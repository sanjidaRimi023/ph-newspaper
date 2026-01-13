"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { NewsCard } from "./new-card";

const newsData: NewsItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    category: "Technology",
    title: "The Future of AI: How Generative Models are Changing Journalism",
    description:
      "Artificial Intelligence is no longer a futuristic concept. It is actively reshaping how news is gathered, written, and distributed across the globe...",
    date: "Jan 12, 2026",
    readTime: "5 min read",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
    category: "Politics",
    title: "Global Summit 2026: Leaders Gather to Discuss Climate Change",
    description:
      "World leaders arrive in Geneva to finalize the most ambitious climate accord in history as temperatures hit record highs.",
    date: "Jan 11, 2026",
    readTime: "8 min read",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    category: "Culture",
    title: "Modern Art Movements Taking Over the Digital World",
    description:
      "NFTs may have cooled, but digital art is seeing a renaissance in the meta-galleries of 2026.",
    date: "Jan 10, 2026",
    readTime: "4 min read",
  },
];
const HeroBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full lg:h-150">
        <div className="lg:col-span-7 relative group overflow-hidden rounded-3xl bg-slate-100">
          <NewsCard item={newsData[0]} variant="large" />

          {/* Carousel Controls Overlay */}
          <div className="absolute bottom-6 right-6 flex gap-2 z-30">
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-primary transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-primary transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 relative overflow-hidden rounded-3xl bg-slate-100 group">
            <NewsCard item={newsData[1]} variant="medium" />
          </div>

          <div className="flex-1 relative overflow-hidden rounded-3xl bg-slate-100 group">
            <NewsCard item={newsData[2]} variant="medium" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
