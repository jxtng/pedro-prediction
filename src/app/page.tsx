import HeroSection from "@/components/hero";
import LiveScore from "@/components/home/livescore";
import UpcomingMatches from "@/components/home/upcoming-matches";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React from "react";

const navLinks = [
  { name: "Upcoming Matches", component: <UpcomingMatches /> },
  { name: "Statistics", component: "" },
  { name: "Livescore", component: <LiveScore /> },
  { name: "Rewards", component: "" },
];
const Home = () => {
  return (
    <>
      <HeroSection />
      <Tabs defaultValue="upcoming-matches">
        <TabsList className="w-full bg-secondary rounded-none h-auto p-0 gap-1 overflow-auto">
          {navLinks.map((link) => (
            <TabsTrigger
              key={link.name}
              value={link.name.toLowerCase().replace(" ", "-")}
              className={cn(
                "bg-primary text-primary-foreground h-16 rounded-none grow border-b-4 data-[state=active]:border-amber-500",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              )}
            >
              {link.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {navLinks.map((link) => (
          <TabsContent
            key={link.name}
            value={link.name.toLowerCase().replace(" ", "-")}
            className="p-0"
          >
            {link.component}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default Home;
