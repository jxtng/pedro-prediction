import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Match {
  team1: string;
  team2: string;
  icon1: string;
  icon2: string;
  time: string;
  league: string;
}

const matches: Match[] = [
  {
    team1: "Real Madrid",
    team2: "Manchester United",
    icon1: "/images/teams/real-madrid.svg",
    icon2: "/images/teams/man-united.svg",
    time: "15:00",
    league: "La Liga",
  },
];

for (let i = 0; i < 7; i++) matches.push({ ...matches[0] });

const SoccerPrediction = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Leagues" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="league1">La Liga</SelectItem>
              <SelectItem value="league2">Premier League</SelectItem>
              <SelectItem value="league3">Serie A</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Odds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="odds1">Over 1.5</SelectItem>
              <SelectItem value="odds2">Under 2.5</SelectItem>
              <SelectItem value="odds3">Both Teams to Score</SelectItem>
            </SelectContent>
          </Select>

          <Button className="px-4 py-2">Tomorrow</Button>
          <Button className="px-4 py-2">Today</Button>
        </div>

        <div className="cards flex flex-wrap gap-4 justify-center">
          {matches.map((match, index) => (
            <MatchCard key={index} {...match} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="link" className="text-green-500">
            View more prediction &rarr;
          </Button>
        </div>
      </div>

      <aside className="w-80 p-4 hidden lg:block bg-secondary border-l-4 border-red-500">
        <div className="top-leagues mb-6">
          <h3 className="text-lg font-bold text-center mb-4 text-white">
            Top Leagues Predictors
          </h3>
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-2 rounded-md"
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
          <h3 className="text-lg font-bold text-center mb-4 text-white">
            Overall Table
          </h3>
          <ul className="space-y-1">
            {Array.from({ length: 15 }).map((_, index) => (
              <li
                key={index}
                className="flex justify-between text-sm bg-white p-2 rounded-md"
              >
                <span>Team {index + 1}</span>
                <span className="text-green-500">+{index * 10} pts</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

const MatchCard: React.FC<Match> = (props) => {
  return (
    <Card className="bg-white p-12 rounded-lg max-w-lg">
      <div className="flex justify-between items-center mb-6">
        <Image
          src={props.icon1}
          alt={`${props.team1} Logo`}
          width={50}
          height={50}
        />
        <div className="time-section flex flex-col items-center gap-2 text-3xl">
          &ndash; {props.league} &ndash;
          <div className="text-base rounded px-2 py-1 bg-secondary text-white font-semibold">
            15:00
          </div>
        </div>
        <Image
          src={props.icon2}
          alt={`${props.team2} Logo`}
          width={50}
          height={50}
        />
      </div>

      <div className="flex justify-between items-center mb-4 bg-[lime] min-h-12 gap-4">
        <div className="text-lg size-8 flex justify-center items-center bg-black text-[lime] -ml-4 shrink-0">
          1
        </div>
        <div className="font-bold text-lg basis-0 grow">{props.team1}</div>
        <div className="self-start flex justify-center items-center text-2xl bg-white text-black -mt-4 size-16 shrink-0">
          X
        </div>
        <div className="font-bold text-lg basis-0 grow">{props.team2}</div>
        <div className="text-lg size-8 flex justify-center items-center bg-black text-[lime] -mr-4 shrink-0">
          2
        </div>
      </div>

      <p className="text-center">Click to make a prediction</p>
    </Card>
  );
};

export default SoccerPrediction;
