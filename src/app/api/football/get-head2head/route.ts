import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json(
      { error: "Match ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/matches/${matchId}/head2head?limit=5`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_ORG_API_KEY!,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("h2h-data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching match:", error);
    return NextResponse.json(
      { error: "Failed to fetch match details" },
      { status: 500 }
    );
  }
}
