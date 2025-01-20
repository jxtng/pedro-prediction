import React from "react";

const page = async () => {
  try {
    const response = await fetch(
      `https://api.football-data.org/v4/matches/497620`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_ORG_API_KEY!,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching match:", error);
  }
  return <div>page</div>;
};

export default page;
