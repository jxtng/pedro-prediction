import { NextResponse } from "next/server";

export async function GET() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const tomorrow = date.toISOString().split("T")[0];

  date.setDate(date.getDate() - 3);
  const dayAfterYesterday = date.toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${dayAfterYesterday}&dateTo=${tomorrow}`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_ORG_API_KEY!,
        },
        next: { revalidate: 7200 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
