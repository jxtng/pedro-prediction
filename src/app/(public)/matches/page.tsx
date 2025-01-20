"use client";

import { useEffect, useState } from "react";
import { MatchSchedule } from "./components/MatchCard";

const HomePage = () => {
  const [plmatches, setPlMatches] = useState([]);
  const [bl1Matches, setBl1Matches] = useState([]);
  // const [fl1matches, setEl1Matches] = useState([]);
  const [loadingBL1, setLoadingBL1] = useState(false);
  // const [loadingFL1, setLoadingFL1] = useState(false);
  const [loadingPL, setLoadingPL] = useState(false);
  const [error, setError] = useState("");

  const getPLMatches = async () => {
    try {
      setLoadingPL(true);
      setError("");
      const response = await fetch("/api/football/get-matches/pl");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPlMatches(data.matches);
      console.log("data", data.matches);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch matches");
    } finally {
      setLoadingPL(false);
    }
  };
  const getBL1Matches = async () => {
    try {
      setLoadingBL1(true);
      setError("");
      const response = await fetch("/api/football/get-matches/bl1");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBl1Matches(data.matches);
      console.log("data", data.matches);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch matches");
    } finally {
      setLoadingBL1(false);
    }
  };
  // const getFL1Matches = async () => {
  //   try {
  //     setLoadingFL1(true);
  //     setError("");
  //     const response = await fetch("/api/football/get-matches/fl1");

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setEl1Matches(data.matches);
  //     console.log("data", data.matches);
  //   } catch (error) {
  //     console.error(error);
  //     setError("Failed to fetch matches");
  //   } finally {
  //     setLoadingFL1(false);
  //   }
  // };

  useEffect(() => {
    // getFL1Matches();
    getBL1Matches();
    getPLMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {error && <div>error</div>}
        {loadingPL ? (
          <div className="text-center">
            <p className="text-lg">Loading matches...</p>
          </div>
        ) : (
          <MatchSchedule
            heading="Premier League - Matchday 23"
            matches={plmatches}
          />
        )}
      </div>
      <div className="container mx-auto px-4 py-8">
        {loadingBL1 ? (
          <div className="text-center">
            <p className="text-lg">Loading matches...</p>
          </div>
        ) : (
          <MatchSchedule
            heading="Bundesliga - Matchday 19"
            matches={bl1Matches}
          />
        )}
      </div>
      {/* <div className="container mx-auto px-4 py-8">
        {loadingFL1 ? (
          <div className="text-center">
            <p className="text-lg">Loading matches...</p>
          </div>
        ) : (
          <MatchSchedule
            heading="Premier League - Matchday 23"
            matches={fl1matches}
          />
        )}
      </div> */}
    </div>
  );
};

export default HomePage;
