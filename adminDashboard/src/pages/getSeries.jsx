import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetSeries = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [seiesName, setSeriesName] = useState(null); // State to store selected series type
  const [title, setTitle] = useState("All upcoming Matches");
  const getLeague = async () => {
    const options = {
      method: "GET",
      url: "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const seriesData = response.data;
      console.log(seriesData.typeMatches);
      setSeriesName("d");
      setSeries(seriesData.typeMatches);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMatchid = async (matchId, seriesName) => {
    navigate(`/match/${matchId}/${seriesName}`);
  };

  return (
    <>
      {/* Button to fetch the series */}
      <center>
        <Button onClick={getLeague}>Get All Series</Button>
      </center>

      <center className="heading bg-white font-bold underline text-xl ">
        {" "}
        {title}{" "}
      </center>
      {/* Display series data */}
      <div className="container bg-gray-900 w-2/2  flex  overflow-y-auto mt-4">
        {series.map((item, index) => (
          <div className="box w-full h-54 bg-red-300 p-10   " key={index}>
            <p className="text-xl font-bold underline  "> {item.matchType} </p>
            {item.seriesMatches.map(
              (elem, index) =>
                elem.seriesAdWrapper && (
                  <div
                    className="matchw-full  bg-green-300 mt-2 p-2 rounded-sm "
                    key={index}
                  >
                    seriesname: {elem.seriesAdWrapper.seriesName}
                    seriesID: {elem.seriesAdWrapper.seriesId}
                    {elem.seriesAdWrapper.matches.map((content, index) => (
                      <div
                        className="matchId   bg-yellow-300 mt-2 p-2 flex flex-col rounded-md "
                        key={index}
                        onClick={() =>
                          handleMatchid(
                            content.matchInfo.matchId,
                            elem.seriesAdWrapper.seriesName
                          )
                        }
                      >
                        <p> matchId:{content.matchInfo.matchId}</p>
                        <p> status:{content.matchInfo.status}</p>
                        <p> matchFormat:{content.matchInfo.matchFormat}</p>
                      </div>
                    ))}
                  </div>
                )
            )}
          </div>
        ))}
      </div>
      <Button
        className="createContest"
        onClick={() => navigate("/contestHome")}
      >
        Create contest
      </Button>
    </>
  );
};

export default GetSeries;
