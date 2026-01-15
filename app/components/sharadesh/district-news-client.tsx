"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Filter,
  SortAsc,
  Clock,
  LayoutGrid,
  ArrowUpNarrowWide,
} from "lucide-react";

interface ChartItem {
  name: string;
  count: number;
}

export default function DistrictNewsClient({
  news = [],
  districtName,
}: {
  news: NewsData[];
  districtName: string;
}) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const safeNews = useMemo(() => news || [], [news]);

  const filteredNews = useMemo(() => {
    return safeNews.filter((n) => filter === "all" || n.category === filter);
  }, [safeNews, filter]);

  const sortedNews = useMemo(() => {
    return [...filteredNews].sort((a, b) => {
      if (sortBy === "latest") {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      }
      if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });
  }, [filteredNews, sortBy]);

  const chartData = useMemo(() => {
    return safeNews.reduce((acc: ChartItem[], item) => {
      const found = acc.find((x) => x.name === item.category);
      if (found) found.count++;
      else acc.push({ name: item.category, count: 1 });
      return acc;
    }, []);
  }, [safeNews]);

  const categories = [
    "politics",
    "sports",
    "technology",
    "business",
    "entertainment",
    "travel",
  ];

  return (
    <div className="space-y-12">
      {/* Analytics + Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 border border-border">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp size={22} className="text-primary" />
              Coverage Analytics
            </h3>
            <span className="text-xs font-bold uppercase text-text-muted">
              Live Statistics
            </span>
          </div>

          <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  className="capitalize"
                />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  cursor={{ fill: "rgba(255,70,70,0.05)" }}
                  contentStyle={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 0,
                  }}
                />
                <Bar dataKey="count" barSize={40}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? "#FF4646" : "#0f172a"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-text-primary p-8 text-white border border-border">
          <div className="space-y-8">
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase mb-4 text-primary">
                <Filter size={14} /> Filter Category
              </label>
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-4 bg-white/10 border border-white/20 outline-none capitalize text-sm"
              >
                <option value="all" className="text-black">
                  All Categories
                </option>
                {categories.map((c) => (
                  <option key={c} value={c} className="text-black">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase mb-4 text-primary">
                <SortAsc size={14} /> Sort By
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setSortBy("latest")}
                  className={`w-full flex items-center gap-3 px-4 py-3 border text-sm font-semibold ${
                    sortBy === "latest"
                      ? "bg-primary border-primary text-white"
                      : "bg-white/5 border-white/20 text-white/70"
                  }`}
                >
                  <Clock size={16} /> Latest News
                </button>

                <button
                  onClick={() => setSortBy("popularity")}
                  className={`w-full flex items-center gap-3 px-4 py-3 border text-sm font-semibold ${
                    sortBy === "popularity"
                      ? "bg-primary border-primary text-white"
                      : "bg-white/5 border-white/20 text-white/70"
                  }`}
                >
                  <TrendingUp size={16} /> Popular Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section title */}
      <div className="flex items-center gap-4">
        <LayoutGrid size={24} className="text-primary" />
        <h2 className="text-2xl font-black uppercase">
          Local Headlines in {districtName}
        </h2>
        <div className="grow h-px bg-border" />
      </div>

      {/* News grid */}
      {sortedNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedNews.map((n) => (
            <Link href={`/news/${n.category}/${n._id}`} key={n._id}>
              <article className="bg-white border border-border h-full flex flex-col">
                <div className="relative h-60">
                  <Image
                    src={n.coverImage}
                    alt={n.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white text-xs font-black px-3 py-1 uppercase">
                    {n.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col grow">
                  <h3 className="text-lg font-bold mb-4 line-clamp-2">
                    {n.title}
                  </h3>

                  <div className="mt-auto flex justify-between pt-4 border-t border-dashed">
                    <span className="flex items-center gap-2 text-xs">
                      <Calendar size={14} />
                      {new Date(n.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-bold flex items-center justify-center">
                      <ArrowUpNarrowWide size={15} /> {n.popularity}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed">
          <h3 className="text-xl font-bold">No stories found</h3>
          <p className="text-text-muted mt-2">
            Try another category or check back later.
          </p>
        </div>
      )}
    </div>
  );
}
