import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { getDB } from "@/lib/mongodb"

type Params = {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  const db = await getDB()

  const result = await db.collection("news").findOneAndUpdate(
    { _id: new ObjectId(params.id) },
    { $inc: { popularity: 1 } },
    { returnDocument: "after" }
  )

  if (!result?.value) {
    return NextResponse.json(
      { message: "News not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(result?.value)
}
