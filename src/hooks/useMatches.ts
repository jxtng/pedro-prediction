import { useState, useEffect } from "react";
import { LeagueStates, League } from "@/types/matches";

export const useMatches = (leagues: League[]) => {
  const [states, setStates] = useState<LeagueStates>(
    leagues.reduce(
      (acc, league) => ({
        ...acc,
        [league.id]: { matches: [], loading: false },
      }),
      {}
    )
  );
  const [error, setError] = useState("");

  const fetchMatches = async (league: League) => {
    setStates((prev) => ({
      ...prev,
      [league.id]: { ...prev[league.id], loading: true },
    }));
    setError("");

    try {
      const response = await fetch(`/api/football/get-matches/${league.id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStates((prev) => ({
        ...prev,
        [league.id]: { matches: data.matches, loading: false },
      }));
    } catch (error) {
      console.error(error);
      setError("Failed to fetch matches");
      setStates((prev) => ({
        ...prev,
        [league.id]: { ...prev[league.id], loading: false },
      }));
    }
  };

  useEffect(() => {
    leagues.forEach((league) => fetchMatches(league));
  }, [leagues]);

  return { states, error };
};
