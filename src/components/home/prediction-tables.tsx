import { cn } from "@/lib/utils";

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

const topPredictors = [
  {
    name: "Pedro_23",
    wins: 5,
    losses: 1,
    accuracy: 83,
    image: "/images/avatars/avatar-1.jpg",
  },
  {
    name: "JohnDoe_456",
    wins: 4,
    losses: 2,
    accuracy: 67,
    image: "/images/avatars/avatar-2.jpg",
  },
  {
    name: "JaneDoe_789",
    wins: 3,
    losses: 3,
    accuracy: 50,
    image: "/images/avatars/avatar-3.jpg",
  },
  {
    name: "Michael_333",
    wins: 2,
    losses: 4,
    accuracy: 33,
    image: "/images/avatars/avatar-4.jpg",
  },
  {
    name: "Sarah_123",
    wins: 1,
    losses: 5,
    accuracy: 17,
    image: "/images/avatars/avatar-5.jpg",
  },
];

const countries = [
  {
    name: "Spain",
    points: 10,
  },
  {
    name: "England",
    points: 8,
  },
  {
    name: "Italy",
    points: 7,
  },
  {
    name: "Germany",
    points: 6,
  },
  {
    name: "France",
    points: 5,
  },
  {
    name: "Brazil",
    points: 4,
  },
  {
    name: "Argentina",
    points: 3,
  },
  {
    name: "Portugal",
    points: 2,
  },
  {
    name: "Netherlands",
    points: 1,
  },
];

for (let i = 0; i < 7; i++) matches.push({ ...matches[0] });

const PredictionTables = () => {
  return (
    <div className="flex">
      <aside className="w-80 p-4 hidden lg:block bg-secondary border-l-4 border-red-500">
        <div className="top-leagues mb-6">
          <h3 className="text-lg font-bold text-center mb-4 text-white">
            Top Leagues Predictors
          </h3>
          <ul className="space-y-2">
            {topPredictors.map(({ name, wins, losses }) => {
              const predictionPercent = (wins / (wins + losses)) * 100;
              return (
                <li
                  key={name}
                  className="flex justify-between items-center p-2 bg-white/50 rounded-md"
                >
                  <span className="text-sm">{name}</span>
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-md",
                      predictionPercent > 50 ? "bg-green-500" : "bg-red-500"
                    )}
                  >
                    {predictionPercent.toFixed(2) + "%"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="overall-section">
          <h3 className="text-lg font-bold text-center mb-4 text-white">
            Overall Tables
          </h3>
          <ul className="space-y-1">
            {countries.map(({ name, points }) => (
              <li
                key={name}
                className="capitalize flex justify-between text-sm p-2 bg-white/50 rounded-md"
              >
                <span>{name}</span>
                <span className="text-green-500">+{points} pts</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default PredictionTables;
