import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const GetSeries = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");

  const matchTypes = ["All", "International", "Domestic", "Women"];

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
      setSeries(seriesData.typeMatches);
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatchId = (matchId, seriesName) => {
    navigate(`/match/${matchId}/${seriesName}`);
  };

  const filteredSeries =
    selectedType === "All"
      ? series
      : series.filter((item) => item.matchType === selectedType);

  useEffect(() => {
    getLeague();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 flex flex-1 justify-center items-center ">
        <img src="/loading.gif" className="w-20 h-20" alt="Loading" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Match Series</h1>
        <p className="mt-2 text-sm text-gray-600">
         Select match for contest
        </p>
      </div>
      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {matchTypes.map((type) => (
          <Button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`${
              selectedType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300`}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Series Horizontal List */}
      <div className="flex flex-row flex-wrap justify-start gap-6">
        {filteredSeries.length > 0 ? (
          filteredSeries.map((item, index) => (
            <div
              className="w-full   bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              key={index}
            >
              <center>
                <p className="text-lg text- font-semibold text-blue-600 mb-2">
                  {item.matchType}
                </p>
              </center>
              <div className="p-4 flex flex-row gap-4 ">
                {item.seriesMatches.map(
                  (elem, idx) =>
                    elem.seriesAdWrapper && (
                      <div key={idx}>
                        <p className="font-bold text-gray-700">
                          {elem.seriesAdWrapper.seriesName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Series ID: {elem.seriesAdWrapper.seriesId}
                        </p>

                        {elem.seriesAdWrapper.matches.map((content, idx) => (
                          <div
                            className="bg-gray-100 p-3 mt-4 rounded-md cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                            key={idx}
                            onClick={() =>
                              handleMatchId(
                                content.matchInfo.matchId,
                                elem.seriesAdWrapper.seriesName
                              )
                            }
                          >
                            <p className="font-semibold text-gray-700">
                              Match ID: {content.matchInfo.matchId}
                            </p>
                            <p className="text-sm text-gray-500">
                              Status: {content.matchInfo.status}
                            </p>
                            <p className="text-sm text-gray-500">
                              Format: {content.matchInfo.matchFormat}
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center w-full">
            No series available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default GetSeries;
