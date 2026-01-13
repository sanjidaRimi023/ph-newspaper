import { NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"
import { Sort } from "mongodb"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const category = searchParams.get("category")
  const page = Number(searchParams.get("page") || 1)
  const sort = searchParams.get("sort") || "date"

const limit = Number(searchParams.get("limit"));

  const skip = (page - 1) * limit

  const query: Record<string, unknown> = {}
  if (category) query.category = category



const sortQuery: Sort =
  sort === "popularity"
    ? { popularity: -1 }
    : { publishedAt: -1 };


  const db = await getDB()

  const news = await db
    .collection("news")
    .find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .toArray()

  return NextResponse.json(news)
}
