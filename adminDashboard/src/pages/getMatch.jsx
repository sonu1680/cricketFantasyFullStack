import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const GetSeriesMatch = () => {
  const { matchId } = useParams();
const navigation=useNavigate();
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
      toast.error("Error fetching match data");
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
      toast.error("Error fetching image");
    }
  };

  const postData = async () => {
    setIsLoading(true);
    const url = `${import.meta.env.VITE_DB_URL}/api/matchDetails`;



    try {
      const res = await axios.post(url, seriesDatas);
      if (res.status == 201) {
        setIsLoading(false);
      }
            toast.success(res.data.msg);

      const teamVerses=seriesDatas.matchInfo.team1.name+" vs "+seriesDatas.matchInfo.team2.name;
        navigation(
          `/createContest/${seriesDatas.matchInfo.matchId}/${seriesDatas.matchInfo.series.name}/${teamVerses}`
        );

    } catch (error) {
      toast.error("Error posting match details");
     // alert(error.response.data.msg);
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
    <div className="flex flex-col items-center  justify-center p-6 min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <img src="/loading.gif" className="w-20 h-20" alt="Loading" />
        </div>
      )}

      {seriesDatas.matchInfo ? (
        <div className=" shadow-lg rounded-lg p-6  w-full ">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Match Details
            </h2>
            <p className="text-gray-600">
              <strong>Series Name:</strong> {seriesDatas.matchInfo.series.name}
            </p>
            <p className="text-gray-600">
              <strong>Match ID:</strong> {seriesDatas.matchInfo.matchId}
            </p>
            <p className="text-gray-600">
              <strong>State:</strong> {seriesDatas.matchInfo.state}
            </p>
            <p className="text-gray-600">
              <strong>Start Status:</strong> {seriesDatas.matchInfo.status}
            </p>
          </div>

          <div className="flex gap-8 mb-8">
            {/* Team 1 Details */}
            <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Team 1 Players
              </h3>
              {seriesDatas.matchInfo.team1?.playerDetails?.length > 0 ? (
                seriesDatas.matchInfo.team1.playerDetails.map(
                  (player, index) => (
                    <div
                      key={player.id || index}
                      className="flex justify-between bg-white p-3 rounded-md mb-2 shadow-sm"
                    >
                      <span>{index + 1}</span>
                      <span>{player.name}</span>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500 text-center">
                  No team data available
                </p>
              )}
            </div>

            {/* Team 2 Details */}
            <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Team 2 Players
              </h3>
              {seriesDatas.matchInfo.team2?.playerDetails?.length > 0 ? (
                seriesDatas.matchInfo.team2.playerDetails.map(
                  (player, index) => (
                    <div
                      key={player.id || index}
                      className="flex justify-between bg-white p-3 rounded-md mb-2 shadow-sm"
                    >
                      <span>{index + 1}</span>
                      <span>{player.name}</span>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500 text-center">
                  No team player found
                </p>
              )}
            </div>
          </div>

          {/* Match Image */}
          {imageUrl ? (
            <div className="flex  justify-center mb-6">
              <img
                src={imageUrl}
                alt="Match Poster"
                className="rounded-lg shadow-lg  "
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center">Loading image...</p>
          )}

          <Button
            onClick={postData}
            className="w-full py-3 text-lg font-semibold"
          >
            Post Match Details
          </Button>
        </div>
      ) : (
        <p className="text-gray-600">Loading match data...</p>
      )}
    </div>
  );
};

export default GetSeriesMatch;
