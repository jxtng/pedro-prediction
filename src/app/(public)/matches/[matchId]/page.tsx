import React from "react";
import MatchPage from "./components/MatchPage";
type matchPageParams = Promise<{ matchId: string }>;
const page = async ({ params }: { params: matchPageParams }) => {
  const { matchId } = await params;
  if (!matchId) {
    return <div>Match not found</div>;
  }
  return <MatchPage matchId={matchId} />;
};

export default page;
