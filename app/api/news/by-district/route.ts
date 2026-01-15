import { getDB } from "@/lib/mongodb"
import type { Filter, Sort } from "mongodb"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const district = searchParams.get("district")
  const category = searchParams.get("category")
  const sort = searchParams.get("sort") || "date"

  if (!district) {
    return NextResponse.json(
      { error: "District required" },
      { status: 400 }
    )
  }

  const db = await getDB()

  const query: Filter<NewsData> = {  district: {
    $regex: new RegExp(`^${district}$`, "i"),
  },}

  if (category) {
    query.category = category as NewsData["category"]
  }

  const sortQuery :Sort=
    sort === "popularity"
      ? { popularity: -1 }
      : { publishedAt: -1 }

  const news = await db
    .collection<NewsData>("news")
    .find(query)
    .sort(sortQuery)
    .toArray()

  return NextResponse.json(news)
}
