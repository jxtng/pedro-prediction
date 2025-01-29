"use client";

import { useMatches } from "@/hooks/useMatches";
import { MatchSchedule } from "@/app/(public)/matches/components/MatchCard";
import { LEAGUES } from "@/utils/leagues";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PredictionTables from "./prediction-tables";

const UpcomingMatches = () => {
  const { states, error } = useMatches(LEAGUES);

  return (
    <section className="flex flex-col lg:flex-row">
      <div className="min-h-screen flex-1">
        <div className="flex flex-wrap gap-4 mb-6 w-full justify-center">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Leagues" />
            </SelectTrigger>
            <SelectContent>
              {LEAGUES.map((league) => (
                <SelectItem key={league.id} value={league.id}>
                  {league.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Odds" />
            </SelectTrigger>
          </Select>

          <Button className="px-4 py-2">Tomorrow</Button>
          <Button className="px-4 py-2">Today</Button>
        </div>
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
      <PredictionTables />
    </section>
  );
};

export default UpcomingMatches;
