"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockData = [
  {
    id: 1,
    league: "English Premier League",
    matches: [
      {
        id: "match1",
        homeTeam: "Manchester United",
        awayTeam: "Chelsea",
        homeScore: 2,
        awayScore: 1,
        status: "FT",
        stats: {
          possession: { home: 53, away: 47 },
          onTarget: { home: 4, away: 2 },
          offTarget: { home: 5, away: 5 },
          dangerousAttacks: { home: 45, away: 36 },
        },
      },
      {
        id: "match2",
        homeTeam: "Arsenal",
        awayTeam: "Liverpool",
        homeScore: 1,
        awayScore: 1,
        status: "FT",
        stats: {
          possession: { home: 50, away: 50 },
          onTarget: { home: 3, away: 3 },
          offTarget: { home: 4, away: 4 },
          dangerousAttacks: { home: 40, away: 40 },
        },
      },
    ],
  },
  {
    id: 2,
    league: "La Liga",
    matches: [
      {
        id: "match3",
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        homeScore: 3,
        awayScore: 2,
        status: "FT",
        stats: {
          possession: { home: 60, away: 40 },
          onTarget: { home: 6, away: 3 },
          offTarget: { home: 7, away: 2 },
          dangerousAttacks: { home: 55, away: 35 },
        },
      },
      {
        id: "match4",
        homeTeam: "Atletico Madrid",
        awayTeam: "Sevilla",
        homeScore: 0,
        awayScore: 0,
        status: "FT",
        stats: {
          possession: { home: 48, away: 52 },
          onTarget: { home: 2, away: 2 },
          offTarget: { home: 3, away: 4 },
          dangerousAttacks: { home: 30, away: 34 },
        },
      },
    ],
  },
];

export default function LiveScore() {
  const [data] = useState(mockData);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const toggleMatchDetails = (matchId: string) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Live Scores</h1>
        {data.map((league) => (
          <Card key={league.id} className="mb-4">
            <CardHeader>
              <CardTitle>{league.league}</CardTitle>
            </CardHeader>
            <CardContent>
              <hr className="my-2" />
              {league.matches.map((match) => (
                <div key={match.id}>
                  <div
                    className="flex justify-between items-center py-2 border-b last:border-none cursor-pointer"
                    onClick={() => toggleMatchDetails(match.id)}
                  >
                    <div className="flex flex-col">
                      <span>{match.homeTeam}</span>
                      <span>{match.awayTeam}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-lg font-bold">
                        {match.homeScore} - {match.awayScore}
                      </span>
                      <span className="text-sm text-gray-500">
                        {match.status}
                      </span>
                    </div>
                  </div>
                  {expandedMatch === match.id && (
                    <div className="bg-gray-200 p-4 rounded-lg mt-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h3 className="font-bold">Ball Possession</h3>
                          <p>
                            {match.stats.possession.home}% -{" "}
                            {match.stats.possession.away}%
                          </p>
                        </div>
                        <div>
                          <h3 className="font-bold">On Target</h3>
                          <p>
                            {match.stats.onTarget.home} -{" "}
                            {match.stats.onTarget.away}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-bold">Off Target</h3>
                          <p>
                            {match.stats.offTarget.home} -{" "}
                            {match.stats.offTarget.away}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-bold">Dangerous Attacks</h3>
                          <p>
                            {match.stats.dangerousAttacks.home} -{" "}
                            {match.stats.dangerousAttacks.away}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
        <Button
          className="w-full mt-4"
          onClick={() => alert("Refresh clicked")}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
