import { getDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Props = {
  params: Promise<{ district: string }>;
};

type NewsData = {
  _id: string;
  title: string;
  category: string;
  district: string;
  publishedAt: string;
  popularity: number;
};

async function getDistrictName(id: string) {
  const db = await getDB();
  const districtDoc = await db
    .collection("districts")
    .findOne({ _id: new ObjectId(id) });
  return districtDoc?.name || "Unknown District";
}

async function getDistrictNews(districtName: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/news/by-district?district=${districtName}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch district news");
    return await res.json();
  } catch (err) {
    console.error("District news fetch error:", err);
    return [];
  }
}

export default async function DistrictPage({ params }: Props) {
  const { district: districtId } = await params; 
  const districtName = await getDistrictName(districtId);
  const news: NewsData[] = await getDistrictNews(districtName);

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-semibold mb-4">News from {districtName}</h1>

      {news.length === 0 ? (
        <p className="text-gray-500">No news found for this district.</p>
      ) : (
        <ul className="space-y-3">
          {news.map((n) => (
            <li key={n._id} className="border p-3 rounded">
              <h2 className="font-medium">{n.title}</h2>
              <p className="text-sm text-gray-500">{n.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}