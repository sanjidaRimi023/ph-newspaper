import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    const db = await getDB();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const result = await db.collection("news").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { popularity: 1 } },
      { returnDocument: "after" } 
    );

    const newsData = result; 

    if (!newsData) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    return NextResponse.json(newsData);
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}