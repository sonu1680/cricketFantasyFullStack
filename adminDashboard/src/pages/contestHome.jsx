import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Contest = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getMatches = async () => {
    setIsLoading(true); // Set loading state
    try {
      const url = `${import.meta.env.VITE_DB_URL}/api/getUpcomingMatches`;
      const response = await axios.get(url);
      setMatches(response.data.data);

    } catch (error) {
      console.error(error);
                toast.error("Something went wrong!");

    } finally {
      setIsLoading(false); // End loading state
    }
  };
useEffect(()=>{
 getMatches();

},[])
if (isLoading){
  return (
    <div className="fixed inset-0 bg-black/80 flex flex-1 justify-center items-center ">
      <img src="/loading.gif" className="w-20 h-20" alt="Loading" />
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Get Matches Button */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Match contest</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage all your sports matches in one place
        </p>
      </div>
      {/* Match Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches && matches.length > 0 ? (
          matches.map((data, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-200"
              onClick={() =>
                navigate(
                  `/createContest/${data.matchId}/${data.seriesName}/${data.teamVerses}`
                )
              }
            >
              <div className="mb-4">
                <p className="text-gray-600">
                  <strong>Match ID:</strong> {data.matchId}
                </p>
                <p className="text-gray-600">
                  <strong>State:</strong> {data.matchState}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {data.matchStatus}
                </p>
              </div>

              <div className="bg-blue-100 p-2 rounded-lg">
                <p className="font-bold text-lg text-blue-700">
                  {data.seriesName}
                </p>
                <p className="text-gray-700">{data.teamVerses}</p>
                <p className="text-sm text-gray-500">
                  Match Type: {data.matchDetails[0].matchFormat}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No matches found</p>
        )}
      </div>
    </div>
  );
};
