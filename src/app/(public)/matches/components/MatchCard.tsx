"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
}

interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

interface Score {
  fullTime: { home: number | null; away: number | null };
}

interface MatchScheduleProps {
  matches: Match[];
  heading: string;
}

const MatchCard = ({ match }: { match: Match }) => {
  const matchDate = parseISO(match.utcDate);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/matches/${match.id}`)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {format(matchDate, "MMMM d, yyyy")}
        </span>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {format(matchDate, "HH:mm")} UTC
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center w-5/12">
          <Image
            src={match.homeTeam.crest || "/placeholder.svg"}
            alt={`${match.homeTeam.name} crest`}
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="font-semibold dark:text-white">
            {match.homeTeam.shortName}
          </span>
        </div>
        <div className="w-2/12 text-center">
          <span className="text-lg font-bold dark:text-white">
            {match.score.fullTime.home !== null
              ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
              : "vs"}
          </span>
        </div>
        <div className="flex items-center justify-end w-5/12">
          <span className="font-semibold dark:text-white">
            {match.awayTeam.shortName}
          </span>
          <Image
            src={match.awayTeam.crest || "/placeholder.svg"}
            alt={`${match.awayTeam.name} crest`}
            width={40}
            height={40}
            className="ml-2"
          />
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {match.status === "FINISHED" ? "Final Score" : "Scheduled"}
        </span>
      </div>
    </div>
  );
};

export const MatchSchedule: React.FC<MatchScheduleProps> = ({
  matches,
  heading,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        {heading}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};
