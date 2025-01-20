import { Area, Coach, Competition, Player } from "@/types";
import React from "react";
import TeamDetailsPage from "./components/TeamDetailsPage";

type Params = Promise<{ teamId: string }>;

export type TeamData = {
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
  coach: Coach;
  squad: Player[];
  sraff: [];
  lastUpdated: string;
};

const page = async ({ params }: { params: Params }) => {
  const { teamId } = await params;

  const response = await fetch(
    `http://api.football-data.org/v4/teams/${teamId}`,
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

  const data: TeamData = await response.json();

  return <TeamDetailsPage data={data} />;
};

export default page;
