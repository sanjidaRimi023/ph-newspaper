import { getDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { MapPin, Newspaper, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import DistrictNewsClient from "@/app/components/sharadesh/district-news-client";

type Props = {
  params: Promise<{ district: string }>;
};

// --------------------
// District details
// --------------------
async function getDistrictDetails(id: string) {
  try {
    const db = await getDB();
    return await db.collection("districts").findOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.error("District DB error:", err);
    return null;
  }
}

// --------------------
// District news
// --------------------
async function getDistrictNews(districtName: string): Promise<NewsData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(
      `${baseUrl}/api/news/by-district?district=${districtName}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("News fetch failed");
    return await res.json();
  } catch (err) {
    console.error("District news error:", err);
    return [];
  }
}

// --------------------
// Metadata
// --------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district: districtId } = await params;
  const district = await getDistrictDetails(districtId);

  if (!district) {
    return { title: "District Not Found | PH News" };
  }

  const news = await getDistrictNews(district.name);

  if (news.length === 0) {
    return {
      title: `No News Found in ${district.name} | PH News`,
      description: `There are currently no published news articles from ${district.name}.`,
    };
  }

  return {
    title: `${district.name} News | PH News`,
    description: `Latest headlines and breaking news from ${district.name}.`,
  };
}

// --------------------
// Page
// --------------------
export default async function DistrictPage({ params }: Props) {
  const { district: districtId } = await params;
  const district = await getDistrictDetails(districtId);

  if (!district) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">District Not Found</h1>
        <Link
          href="/sharadesh"
          className="text-info hover:underline mt-4 inline-block"
        >
          Back to Map
        </Link>
      </div>
    );
  }

  const news = await getDistrictNews(district.name);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-text-primary text-white pt-20 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 skew-x-12 translate-x-20" />
          <Link
            href="/sharadesh"
            className="flex items-center gap-2 text-text-muted hover:text-primary mb-8 w-fit"
          >
            <ArrowLeft size={18} />
            Back to Map
          </Link>

          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-3">
                <MapPin size={18} />
                <span className="uppercase tracking-widest text-sm font-bold">
                  {district.division} Division
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black">
                {district.name}
              </h1>

              <p className="text-text-muted mt-4 max-w-xl">
                Latest updates and local news from {district.name}.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 p-6">
                <Newspaper size={22} className="text-primary mb-2" />
                <p className="text-3xl font-bold">{news.length}</p>
                <p className="text-xs tracking-widest uppercase text-text-muted">
                  Articles
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6">
                <Info size={22} className="text-info mb-2" />
                <p className="text-3xl font-bold">Live</p>
                <p className="text-xs tracking-widest uppercase text-text-muted">
                  Status
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {news.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-3">No News Found</h2>
            <p className="text-text-muted">
              There are currently no published articles from {district.name}.
            </p>
          </div>
        ) : (
          <DistrictNewsClient news={news} districtName={district.name} />
        )}
      </div>
    </main>
  );
}
