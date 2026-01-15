import { getDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(){
    const db = await getDB();
    const districts = await db.collection("districts").find().toArray();
    return NextResponse.json(districts)
}