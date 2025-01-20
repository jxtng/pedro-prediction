import { Match } from "@/app/(public)/matches/components/MatchCard";

export interface League {
  id: string;
  name: string;
  matchday: number;
}

export interface MatchState {
  matches: Match[];
  loading: boolean;
}

export interface LeagueStates {
  [key: string]: MatchState;
}
