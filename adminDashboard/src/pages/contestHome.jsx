import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Contest = () => {
      const navigate = useNavigate();

  const [matches, setMatches] = useState(null);

  const getMatches = async () => {
    try {
   //   const url = "http://localhost:3000/api/getUpcomingMatches"; 

      const url = `${import.meta.env.VITE_DB_URL}/api/getUpcomingMatches`; 
      const response = await axios.get(url);
      console.log(response);
      setMatches(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={getMatches}>Get all upcoming matches</Button>
      {matches && matches.length > 0 ? (
        matches.map((data, index) => (
          <div
            key={index}
            className=" bg-blue-500 mt-2 rounded-lg p-2 "
            onClick={() =>
              navigate(
                `/createContest/${data.matchId}/${data.seriesName}/${data.teamVerses}`
              )
            }
          >
            <p>Match ID: {data.matchId}</p>
            <p>State: {data.matchState}</p>
            <p>Status: {data.matchStatus}</p>
            <p>seriesName: {data.seriesName}</p>
            <p>teamVerses: {data.teamVerses}</p>
            <p>MatchType: {data.matchDetails[0].matchFormat}</p>
          </div>
        ))
      ) : (
        <p>No matches found</p>
      )}
    </>
  );
};
