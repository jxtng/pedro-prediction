"use client";

import { useMatches } from "@/hooks/useMatches";
import { MatchSchedule } from "./components/MatchCard";
import { LEAGUES } from "@/utils/leagues";

const HomePage = () => {
  const { states, error } = useMatches(LEAGUES);

  return (
    <div className="min-h-screen bg-gray-100">
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
      {LEAGUES.map((league) => (
        <div key={league.id} className="container mx-auto px-4 py-8">
          {states[league.id].loading ? (
            <div className="text-center">
              <p className="text-lg">Loading matches...</p>
            </div>
          ) : (
            <MatchSchedule
              heading={`${league.name} - Matchday ${league.matchday}`}
              matches={states[league.id].matches}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
