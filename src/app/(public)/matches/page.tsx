"use client";

import { useMatches } from "@/hooks/useMatches";
import { MatchSchedule } from "@/app/(public)/matches/components/MatchCard";
import { LEAGUES } from "@/utils/leagues";
import { ClipLoader } from "react-spinners";

const HomePage = () => {
  const { states, error } = useMatches(LEAGUES);

  return (
    <div className="min-h-screen">
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
      {LEAGUES.map((league) => (
        <div key={league.id} className="container mx-auto px-4 py-8">
          {states[league.id].loading ? (
            <div className="text-center">
              <p className="text-lg">
                <ClipLoader />
              </p>
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
