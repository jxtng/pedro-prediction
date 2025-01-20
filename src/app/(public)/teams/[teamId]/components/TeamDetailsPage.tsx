import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, MapPin, Calendar, Shield } from "lucide-react";
import { TeamData } from "../page";
import Image from "next/image";
import { Player } from "@/types";

const TeamDetailsPage = ({ data }: { data: TeamData }) => {
  const groupPlayersByPosition = (players: Player[]) => {
    return players.reduce((acc, player) => {
      const position = player.position || "Unspecified";
      // @ts-expect-error TODO
      if (!acc[position]) {
        // @ts-expect-error TODO
        acc[position] = [];
      }
      // @ts-expect-error TODO
      acc[position].push(player);
      return acc;
    }, {});
  };

  const groupedPlayers = groupPlayersByPosition(data.squad);
  const positionOrder = [
    "Goalkeeper",
    "Defence",
    "Centre-Back",
    "Right-Back",
    "Left-Back",
    "Midfield",
    "Defensive Midfield",
    "Central Midfield",
    "Attacking Midfield",
    "Left Winger",
    "Right Winger",
    "Centre-Forward",
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Team Header */}
      <Card className="border-none shadow-lg dark:bg-gray-800">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Image
            width={100}
            height={100}
            src={data.crest}
            alt={`${data.name} crest`}
            className="w-24 h-24 object-contain dark:bg-gray-700 rounded-lg p-2"
          />
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold dark:text-white">
              {data.name}
            </CardTitle>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
              >
                <Shield className="w-4 h-4" />
                {data.tla}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
              >
                <Calendar className="w-4 h-4" />
                Founded {data.founded}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
                style={{
                  backgroundColor: data.clubColors
                    .split("/")[0]
                    .toLowerCase()
                    .trim(),
                  color: "white",
                }}
              >
                {data.clubColors}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="squad" className="w-full">
        <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
          <TabsTrigger
            value="squad"
            className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700"
          >
            Squad
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700"
          >
            Info
          </TabsTrigger>
          <TabsTrigger
            value="competitions"
            className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700"
          >
            Competitions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="squad" className="mt-4">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Squad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {positionOrder.map((position) => {
                  // @ts-expect-error TODO
                  const players: Player[] = groupedPlayers[position];
                  if (!players) return null;

                  return (
                    <div key={position}>
                      <h3 className="font-semibold text-lg mb-2 dark:text-gray-200">
                        {position}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {players.map((player) => (
                          <Card
                            key={player.id}
                            className="p-4 dark:bg-gray-700"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium dark:text-white">
                                {player.name}
                              </span>
                              <span className="text-sm text-muted-foreground dark:text-gray-300">
                                {player.nationality} •{" "}
                                {new Date().getFullYear() -
                                  new Date(
                                    player.dateOfBirth
                                  ).getFullYear()}{" "}
                                years
                              </span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="mt-4">
          <Card className="dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 dark:text-gray-200">
                  <MapPin className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                  <span>{data.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                  <a
                    href={data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline dark:text-blue-400"
                  >
                    {data.website}
                  </a>
                </div>
                {data.coach && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 dark:text-gray-200">
                      Coach
                    </h3>
                    <Card className="p-4 dark:bg-gray-700">
                      <div className="flex flex-col">
                        <span className="font-medium dark:text-white">
                          {data.coach.name}
                        </span>
                        <span className="text-sm text-muted-foreground dark:text-gray-300">
                          {data.coach.nationality} • Contract until{" "}
                          {data.coach.contract.until}
                        </span>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitions" className="mt-4">
          <Card className="dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.runningCompetitions.map((competition) => (
                  <Card key={competition.id} className="p-4 dark:bg-gray-700">
                    <div className="flex items-center gap-4">
                      <Image
                        width={50}
                        height={50}
                        src={competition.emblem}
                        alt={competition.name}
                        className="w-12 h-12 object-contain dark:bg-gray-600 rounded-lg p-1"
                      />
                      <div>
                        <div className="font-medium dark:text-white">
                          {competition.name}
                        </div>
                        <Badge className="dark:bg-gray-600 dark:text-gray-200">
                          {competition.type}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamDetailsPage;
