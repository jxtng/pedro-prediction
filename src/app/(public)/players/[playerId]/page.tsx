import { Area, Competition, Player } from "@/types";
import React from "react";
import PlayerDetailsPage from "./components/PlayerDetailsPage";

type Params = Promise<{ playerId: string }>;

export interface PlayerFullData extends Player {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  section: string;
  shirtNumber: number;
  currentTeam: {
    area: Area;
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    runningCompetitions: Competition[];
    contract: {
      start: string;
      until: string;
    };
  };
}

const page = async ({ params }: { params: Params }) => {
  const { playerId } = await params;

  const response = await fetch(
    `http://api.football-data.org/v4/persons/${playerId}`,
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_ORG_API_KEY!,
      },
      next: { revalidate: 14400 },
    }
  );

  if (!response.ok)
    return (
      <div className="w-full text-red-500 text-center text-xl">
        failed to load
      </div>
    );

  const data: PlayerFullData = await response.json();

  return <PlayerDetailsPage data={data} />;
};

export default page;
