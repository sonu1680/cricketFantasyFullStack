import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

const GetSeriesMatch = () => {
  const { matchId } = useParams();

  const [imageUrl, setImageUrl] = useState(null);
  const [matchImage, setMatchImage] = useState(null);
  const [seriesDatas, setSeriesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getLeague = async () => {
    const options = {
      method: "GET",
      url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}`,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      const seriesData = response.data;
      setSeriesData(seriesData);
      setMatchImage(seriesData.matchInfo.matchImageId);
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  const getImage = async () => {
    if (!matchImage) return;
    const options = {
      method: "GET",
      url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${matchImage}/i.jpg`,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPIKEY,
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
      },
      params: { p: "de", d: "high" },
      responseType: "blob",
    };

    try {
      const response = await axios.request(options);
      const imgUrl = URL.createObjectURL(response.data);
      setImageUrl(imgUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };
  const postData = async () => {
    setIsLoading(true);
    //const url = "http://localhost:3000/api/matchDetails";
    const url = `${import.meta.env.VITE_DB_URL}/api/matchDetails`;

    try {
      const res = await axios.post(url, seriesDatas);
      if (res.status == 201) {
        setIsLoading(false);
      }
      alert(res.data.msg);
    } catch (error) {
      console.error("Error posting match details:", error);
      alert(error.response.data.msg);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeague();
  }, [matchId]);

  useEffect(() => {
    getImage();
  }, [matchImage]);

  return (
    <div className="flex-1 w-full h-full">
      {isLoading && (
        <div className="loading w-full h-full bg-black/50 absolute flex justify-center items-center ">
          <img src="/loading.gif" className="w-20 h-20" alt="" />{" "}
        </div>
      )}
      {seriesDatas.matchInfo ? (
        <div>
          <div>Series Name: {seriesDatas.matchInfo.series.name}</div>
          <div>Match ID: {seriesDatas.matchInfo.matchId}</div>
          <div>Match State: {seriesDatas.matchInfo.state}</div>
          <div>Match Start: {seriesDatas.matchInfo.status}</div>

          <div className="playerDetailContainer w-[400px] flex flex-row  gap-x-4">
            <div className="team1 w-1/2 flex flex-col justify-center items-center ">
              <h1>Team1</h1>
              {seriesDatas.matchInfo.team1?.playerDetails?.length > 0 ? (
                seriesDatas.matchInfo.team1.playerDetails.map(
                  (player, index) => (
                    <div
                      key={player.id || index}
                      className="mt-1 bg-green-300 w-full h-10 flex justify-between px-4 items-center rounded-lg "
                    >
                      <p>{index + 1}</p>
                      <p>{player.name}</p>
                    </div>
                  )
                )
              ) : (
                <div>No team data available</div>
              )}
            </div>

            <div className="team2 w-1/2 flex flex-col justify-center  items-center">
              <h1>Team2</h1>
              {seriesDatas.matchInfo.team2?.playerDetails?.length > 0 ? (
                seriesDatas.matchInfo.team2.playerDetails.map(
                  (player, index) => (
                    <div
                      key={player.id || index}
                      className="mt-1 bg-green-300 w-full h-10 flex justify-between px-4 items-center rounded-lg "
                    >
                      <p>{index + 1}</p>
                      <p>{player.name}</p>
                    </div>
                  )
                )
              ) : (
                <div>No team player found</div>
              )}
            </div>
          </div>

          {imageUrl ? (
            <img src={imageUrl} alt="poster" className="w-96 h-90" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      ) : (
        <p>Loading match data...</p>
      )}

      <Button onClick={postData}>Post Match Details</Button>
    </div>
  );
};

export default GetSeriesMatch;
