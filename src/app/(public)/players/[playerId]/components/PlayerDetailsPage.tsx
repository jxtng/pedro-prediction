import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Flag,
  Shirt as Jersey,
  Users,
  Building,
  Trophy,
} from "lucide-react";
import { PlayerFullData } from "../page";
import Image from "next/image";

const PlayerDetailsPage = ({ data }: { data: PlayerFullData }) => {
  const calculateAge = (dateOfBirth: string) => {
    return new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Player Header Card */}
      <Card className="border-none shadow-lg dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-300 dark:text-gray-600">
                {data.name.charAt(0)}
              </div>
            </div>
            <div className="text-center md:text-left space-y-4">
              <div>
                <CardTitle className="text-3xl font-bold mb-2 dark:text-white">
                  {data.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <Jersey className="w-4 h-4" />#{data.shirtNumber}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <Flag className="w-4 h-4" />
                    {data.nationality}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <Calendar className="w-4 h-4" />
                    {calculateAge(data.dateOfBirth)} years
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <Users className="w-4 h-4" />
                    {data.position}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Team Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white">
              Current Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Image
                width={100}
                height={100}
                src={data.currentTeam.crest}
                alt={`${data.currentTeam.name} crest`}
                className="w-24 h-24 object-contain dark:bg-gray-700 rounded-lg p-2"
              />
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold dark:text-white">
                  {data.currentTeam.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    <Building className="w-4 h-4 inline mr-2" />
                    {data.currentTeam.venue}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    <span className="font-medium">Contract:</span>{" "}
                    {data.currentTeam.contract.start} -{" "}
                    {data.currentTeam.contract.until || "Present"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitions Section */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white">
              <Trophy className="w-5 h-5 inline-block mr-2" />
              Current Competitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {data.currentTeam.runningCompetitions.map((competition) => (
                <Card key={competition.id} className="p-4 dark:bg-gray-700">
                  <div className="flex items-center gap-4">
                    {competition.emblem && (
                      <Image
                        width={48}
                        height={48}
                        src={competition.emblem}
                        alt={competition.name}
                        className="w-12 h-12 object-contain dark:bg-gray-600 rounded-lg p-1"
                      />
                    )}
                    <div>
                      <div className="font-medium dark:text-white">
                        {competition.name}
                      </div>
                      <Badge className="mt-1 dark:bg-gray-600 dark:text-gray-200">
                        {competition.type}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Details Section */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white">
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="font-medium dark:text-white">
                    {data.firstName || data.name} {data.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Date of Birth
                  </p>
                  <p className="font-medium dark:text-white">
                    {formatDate(data.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Nationality
                  </p>
                  <p className="font-medium dark:text-white">
                    {data.nationality}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Position
                  </p>
                  <p className="font-medium dark:text-white">{data.position}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Details Section */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold dark:text-white">
              Team Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Club Colors
                </p>
                <p className="font-medium dark:text-white">
                  {data.currentTeam.clubColors}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Founded
                </p>
                <p className="font-medium dark:text-white">
                  {data.currentTeam.founded}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Website
                </p>
                <a
                  href={data.currentTeam.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline dark:text-blue-400"
                >
                  {data.currentTeam.website}
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Address
                </p>
                <p className="font-medium dark:text-white">
                  {data.currentTeam.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayerDetailsPage;
