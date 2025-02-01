"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { useLivescoreMatches } from "@/hooks/use-live-matches";
import { Match } from "@/types/matches";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function LiveScore() {
  const { currentMatches, finishedMatches, upComingMatches, isLoading, error } =
    useLivescoreMatches();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Live Scores</h1>

        {isLoading ? (
          <div className="text-center">
            <p className="text-lg">
              <ClipLoader />
            </p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-lg text-red-500">
              Error loading matches. Please try again
            </p>
          </div>
        ) : (
          <>
            <SectionCard
              title={
                currentMatches.length ? "Live Matches" : "No Current Live Match"
              }
              classes={{
                main: "bg-green-100 dark:bg-green-900",
                title: cn(currentMatches.length && "text-green-500"),
                content: cn(!currentMatches.length && "hidden"),
              }}
            >
              {currentMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </SectionCard>

            <SectionCard
              title="Finished Matches"
              classes={{ content: cn(!finishedMatches.length && "hidden") }}
            >
              {finishedMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </SectionCard>

            <SectionCard
              title="Upcoming Matches"
              classes={{
                main: "bg-amber-100 dark:bg-amber-900",
                title: cn(upComingMatches.length && "text-amber-500"),
                content: cn(!upComingMatches.length && "hidden"),
              }}
            >
              {upComingMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </SectionCard>
          </>
        )}
        <Button
          className="w-full mt-4"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}

const SectionCard: React.FC<{
  title: string;
  children: React.ReactNode;
  classes?: {
    main?: string;
    title?: string;
    content?: string;
  };
}> = ({ title, children, classes }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Card
      className={cn("mb-4 dark:bg-gray-800 dark:text-gray-200", classes?.main)}
    >
      <CardHeader
        onClick={() => setExpanded(!expanded)}
        className="flex-row gap-4 justify-between items-center hover:cursor-pointer hover:blur-[1px] hover:opacity-80 rounded-lg"
      >
        <CardTitle className={classes?.title}>{title}</CardTitle>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </CardHeader>
      {expanded && children && (
        <CardContent className={cn("max-md:px-0", classes?.content)}>
          <hr />
          {children}
        </CardContent>
      )}
    </Card>
  );
};

const MatchCard: React.FC<Match> = (match) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="p-2 m-2 text-sm rounded-md cursor-pointer hover:opacity-80 bg-gray-800/30 border"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="match-header flex gap-4 my-2">
          <div className="time mr-auto">
            {new Date(match.utcDate).toLocaleString()}
          </div>
          <div
            className={cn(
              "tag text-xs p-1 rounded",
              match.status === "LIVE" && "bg-green-500 animate-pulse",
              match.status === "UPCOMING" && "bg-amber-500",
              match.status === "FINISHED" && "border"
            )}
          >
            {match.status}
          </div>
          <div className="full-time">FT</div>
          <div className="half-time">HT</div>
        </div>
        <div className="match-content flex items-center gap-2">
          <div className="max-md:hidden shrink-0 flex flex-col gap-2">
            <Image
              src={match.homeTeam.crest}
              alt="Crest"
              className="size-4"
              width={16}
              height={16}
            />
            <Image
              src={match.awayTeam.crest}
              alt="Crest"
              className="size-4"
              width={16}
              height={16}
            />
          </div>
          <div className="flex flex-col mr-auto text-sm">
            <span>
              {match.homeTeam.name} ({match.homeTeam.tla})
            </span>
            <span>
              {match.awayTeam.name} ({match.awayTeam.tla})
            </span>
          </div>
          <div className="full-time text-center">
            <div className="size-6 flex justify-center items-center bg-gray-400 dark:bg-gray-900 rounded my-1">
              {match.score.fullTime.home ?? "-"}
            </div>
            <div className="size-6 flex justify-center items-center bg-gray-400 dark:bg-gray-900 rounded my-1">
              {match.score.fullTime.away ?? "-"}
            </div>
          </div>
          <div className="half-time text-center">
            <div className="size-6 flex justify-center items-center bg-gray-400 dark:bg-gray-900 rounded my-1">
              {match.score.halfTime.home ?? "-"}
            </div>
            <div className="size-6 flex justify-center items-center bg-gray-400 dark:bg-gray-900 rounded my-1">
              {match.score.halfTime.away ?? "-"}
            </div>
          </div>
        </div>
        {expanded && (
          <div className="border bg-gray-200/60 dark:bg-gray-800/60 p-2 rounded-lg my-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="home-team gap-2 bg-gray-300 dark:bg-gray-900 p-2 rounded-lg">
                <div className="team flex flex-wrap gap-2 items-center">
                  <img src={match.homeTeam.crest} alt="" className="size-8" />
                  {match.homeTeam.name}
                  <div className="rank ml-auto">
                    RK: {match.homeTeam.leagueRank}
                  </div>
                </div>
                <div className="coach text-xs">
                  Coach: {match.homeTeam.coach.name}
                </div>
              </div>
              <div className="away-team gap-2 bg-gray-300 dark:bg-gray-900 p-2 rounded-lg">
                <div className="team flex flex-wrap gap-2 items-center">
                  <img src={match.awayTeam.crest} alt="" className="size-8" />
                  {match.awayTeam.name}
                  <div className="rank ml-auto">
                    RK: {match.awayTeam.leagueRank}
                  </div>
                </div>
                <div className="coach text-xs">
                  Coach: {match.awayTeam.coach.name}
                </div>
              </div>
            </div>

            <div className="home-team gap-2 bg-gray-300 dark:bg-gray-900 p-2 rounded-lg my-2">
              {match.referees.length && (
                <div className="refs text-center">
                  Referees: {match.referees.map((ref) => ref.name + ", ")}
                </div>
              )}
              <div className="flex flex-wrap gap-8 justify-center">
                <div className="area flex gap-2 items-center">
                  Area:
                  <img src={match.area.flag} alt="" className="size-4" />
                  {match.area.name} ({match.area.code})
                </div>
                <div className="venue text-center">
                  Venue:
                  {match.venue}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
