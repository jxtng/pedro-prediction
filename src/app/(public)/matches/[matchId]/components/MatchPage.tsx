"use client";

import { useEffect, useState } from "react";
import MatchDetails from "./MatchDetails";

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: string | null;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Score {
  winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
  duration: "REGULAR" | string;
  fullTime: {
    home: number;
    away: number;
  };
  halfTime: {
    home: number;
    away: number;
  };
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality: string;
}

export interface MatchData {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: "TIMED" | "SCHEDULED" | "FINISHED" | string;
  venue: string | null;
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  odds: {
    msg: string;
  };
  referees: Referee[];
}

export interface Head2HeadMatchData {
  matches: MatchData[];
  aggregates: {
    numberOfMatches: number;
    totalGoals: number;
    homeTeam: {
      name: string;
      wins: number;
    };
    awayTeam: {
      name: string;
      wins: number;
    };
  };
}

const MatchPage = ({ matchId }: { matchId: string }) => {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [head2HeadData, setHead2HeadData] = useState<Head2HeadMatchData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getHead2Head = async () => {
      try {
        const response = await fetch(
          `/api/football/get-head2head?matchId=${matchId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("h2h-data", data);
        setHead2HeadData(data);
      } catch (error) {
        console.error("Error fetching match:", error);
        setError("Failed to fetch match details");
      } finally {
        setLoading(false);
      }
    };
    const getMatchDetails = async () => {
      try {
        const response = await fetch(
          `/api/football/get-match?matchId=${matchId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMatchData(data);
      } catch (error) {
        console.error("Error fetching match:", error);
        setError("Failed to fetch match details");
      } finally {
        setLoading(false);
      }
    };
    getMatchDetails();
    getHead2Head();
  }, [matchId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!matchData)
    return <div className="text-center py-10">No match data found</div>;

  return <MatchDetails matchData={matchData} head2HeadData={head2HeadData} />;
};

export default MatchPage;
