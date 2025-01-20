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
      <aside className="lg:w-80 w-full p-4 border-l-4 border-red-500">
        <div className="top-leagues mb-6">
          <h3 className="text-lg font-bold text-center mb-4 dark:text-white text-black">
            Top Leagues Predictors
          </h3>
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white text-black dark:text-white dark:bg-gray-950 p-2 rounded-md"
              >
                <span className="text-sm">Predictor {index + 1}</span>
                <span className="bg-green-500 text-xs px-2 py-1 rounded-md">
                  90%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overall-section">
          <h3 className="text-lg font-bold text-center mb-4 dark:text-white text-black">
            Overall Table
          </h3>
          <ul className="space-y-1">
            {Array.from({ length: 15 }).map((_, index) => (
              <li
                key={index}
                className="flex justify-between text-sm bg-white text-black dark:text-white dark:bg-gray-950 p-2 rounded-md"
              >
                <span>Team {index + 1}</span>
                <span className="text-green-500">+{index * 10} pts</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default UpcomingMatches;
