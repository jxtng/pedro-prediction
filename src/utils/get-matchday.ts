// utils/getMatchday.ts
import { LEAGUES } from "./leagues";

export function getMatchday(leagueId: string): number {
  // Find the league in our LEAGUES array
  const league = LEAGUES.find((league) => league.id === leagueId);

  if (!league) {
    // If league is not found, throw an error
    throw new Error(`League with ID ${leagueId} not found`);
  }

  // Return the matchday from the league configuration
  return league.matchday;
}
