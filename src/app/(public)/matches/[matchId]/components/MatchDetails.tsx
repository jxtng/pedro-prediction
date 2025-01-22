import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { Head2HeadMatchData, MatchData, Score } from "./MatchPage";
import Link from "next/link";
import CommentSection from "./comment-section";

interface MatchDetailsProps {
  matchData: MatchData | null;
  head2HeadData: Head2HeadMatchData | null;
}

const MatchDetails = ({ matchData, head2HeadData }: MatchDetailsProps) => {
  // console.log("head2HeadData", head2HeadData);
  const getScoreDisplay = (score: Score) => {
    if (!score?.fullTime?.home && !score?.fullTime?.away) {
      return "vs";
    }
    return `${score.fullTime.home} - ${score.fullTime.away}`;
  };

  const getMatchStats = (matches: MatchData[]) => {
    return matches.reduce(
      (acc, match) => {
        const homeTeamId = match.homeTeam.id;
        const awayTeamId = match.awayTeam.id;
        const winner = match.score.winner;

        if (winner === "HOME_TEAM" && homeTeamId === matchData?.homeTeam.id)
          acc.wins++;
        else if (
          winner === "AWAY_TEAM" &&
          awayTeamId === matchData?.homeTeam.id
        )
          acc.wins++;
        else if (
          winner === "HOME_TEAM" &&
          homeTeamId === matchData?.awayTeam.id
        )
          acc.losses++;
        else if (
          winner === "AWAY_TEAM" &&
          awayTeamId === matchData?.awayTeam.id
        )
          acc.losses++;
        else if (winner === null || winner === "DRAW") acc.draws++;

        if (match.score.fullTime.home !== null) {
          acc.totalGoals +=
            match.score.fullTime.home + match.score.fullTime.away;
        }

        return acc;
      },
      { wins: 0, draws: 0, losses: 0, totalGoals: 0 }
    );
  };

  const stats = head2HeadData ? getMatchStats(head2HeadData.matches) : null;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Main Match Card */}
      {matchData && (
        <Card className="bg-white dark:bg-gray-800 text-black dark:text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {matchData.competition.name} - Matchday {matchData.matchday}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between px-4 py-6">
              {/* Home Team */}
              <div className="flex flex-col items-center space-y-2 w-1/3">
                <Image
                  width={80}
                  height={80}
                  src={matchData.homeTeam.crest}
                  alt={matchData.homeTeam.name}
                  className="w-20 h-20 object-contain"
                />
                <h3 className="text-lg font-semibold text-center hover:underline">
                  <Link href={`/teams/${matchData.homeTeam.id}`}>
                    {matchData.homeTeam.name}
                  </Link>
                </h3>
              </div>

              {/* Score/Time */}
              <div className="flex flex-col items-center justify-center w-1/3">
                <div className="text-3xl font-bold mb-2">
                  {getScoreDisplay(matchData.score)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {format(new Date(matchData.utcDate), "HH:mm")}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(matchData.utcDate), "dd MMM yyyy")}
                </div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center space-y-2 w-1/3">
                <Image
                  width={80}
                  height={80}
                  src={matchData.awayTeam.crest}
                  alt={matchData.awayTeam.name}
                  className="w-20 h-20 object-contain"
                />
                <h3 className="text-lg font-semibold text-center hover:underline">
                  <Link href={`/teams/${matchData.awayTeam.id}`}>
                    {matchData.awayTeam.name}
                  </Link>
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Head to Head Stats */}
      {head2HeadData && matchData && (
        <Card className="bg-white dark:bg-gray-800 text-black dark:text-white">
          <CardHeader>
            <CardTitle className="text-xl">Head to Head Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-2xl font-bold">{stats?.wins}</div>
                <div className="text-sm text-muted-foreground">
                  {matchData.homeTeam.shortName} Wins
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-2xl font-bold">{stats?.draws}</div>
                <div className="text-sm text-muted-foreground">Draws</div>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-2xl font-bold">{stats?.losses}</div>
                <div className="text-sm text-muted-foreground">
                  {matchData.awayTeam.shortName} Wins
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Matches
                </span>
                <span className="font-semibold">
                  {head2HeadData.matches.length}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Total Goals
                </span>
                <span className="font-semibold">{stats?.totalGoals}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Average Goals per Match
                </span>
                <span className="font-semibold">
                  {stats &&
                    (stats?.totalGoals / head2HeadData.matches.length).toFixed(
                      1
                    )}
                </span>
              </div>
            </div>

            {/* Recent Matches */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Meetings</h3>
              <div className="space-y-3">
                {head2HeadData.matches.slice(0, 5).map((match) => (
                  <div
                    key={match.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-primary/5"
                  >
                    <div className="text-sm">
                      {format(new Date(match.utcDate), "dd MMM yyyy")}
                    </div>
                    <Link href={`/matches/${match.id}`}>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">
                          {match.homeTeam.shortName}
                        </span>
                        <span className="px-2 py-1 bg-primary/10 rounded">
                          {match.score.fullTime.home} -{" "}
                          {match.score.fullTime.away}
                        </span>
                        <span className="font-semibold">
                          {match.awayTeam.shortName}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comment section */}
      <Card className="bg-white dark:bg-gray-800 text-black dark:text-white">
        <CardHeader>
          <CardTitle className="text-xl">
            User Discussions and Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CommentSection matchId={matchData?.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchDetails;
