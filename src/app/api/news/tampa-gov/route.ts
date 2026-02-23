import { NextResponse } from "next/server";
import { getTampaGovNews } from "@/lib/tampa-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "3", 10);
  
  try {
    const news = await getTampaGovNews(limit);
    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching Tampa Gov news:", error);
    return NextResponse.json([], { status: 500 });
  }
}
