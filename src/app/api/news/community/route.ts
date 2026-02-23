import { NextResponse } from "next/server";
import { getNews } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "3", 10);
  
  try {
    const news = await getNews(limit);
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching community news:", error);
    return NextResponse.json([], { status: 500 });
  }
}
