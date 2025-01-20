import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/matches?matchday=23",
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
    console.log("data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
