import useSWR from "swr";
import { Match } from "@/types/matches";

export const useLivescoreMatches = () => {
  const { data, isLoading, error } = useSWR(
    `/api/football/get-livescore-matches`,
    (url) => fetch(url).then((res) => res.json())
  );

  const upComingMatches: Match[] = [];
  const currentMatches: Match[] = [];
  const finishedMatches: Match[] = [];

  if (data) {
    data.matches.forEach((match: Match) => {
      if (["TIMED", "SCHEDULED"].includes(match.status)) {
        upComingMatches.push({ ...match, status: "UPCOMING" });
      } else if (["IN_PLAY", "PAUSED", "LIVE"].includes(match.status)) {
        currentMatches.push({ ...match, status: "LIVE" });
      } else {
        finishedMatches.push({ ...match, status: "FINISHED" });
      }
    });
  }

  return { currentMatches, finishedMatches, upComingMatches, isLoading, error };
};
