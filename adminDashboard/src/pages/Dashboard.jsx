import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import MatchCardDetailed from "@/components/MatchCard";
import MatchCard from "@/components/MatchCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("upcoming");

  const fetchMatches = async (category) => {
    setIsLoading(true);
    try {
      {
      }
      let res;
      if (category == "Live") {
        res = await axios.get(
          `${import.meta.env.VITE_DB_URL}/api/admin/getLiveMatches`
        );
      } else if (category == "Completed") {
        res = await axios.get(
          `${import.meta.env.VITE_DB_URL}/api/admin/getCompletedMatches`
        );
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_DB_URL}/api/admin/getUpcomingMatches`
        );
      }
      setMatches(res.data.data);
      setActiveCategory(category.toLowerCase());
    } catch (error) {
      //console.log("Error fetching matches:", error);
      toast.error("Error fetching matches!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches("upcoming");
  }, []);

  const categories = [
    {
      id: "upcoming",
      label: "Upcoming Matches",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      id: "live",
      label: "Live Matches",
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
    },
    {
      id: "completed",
      label: "Completed Matches",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <p className="text-lg font-medium">Loading matches...</p>
        </div>
      </div>
    );
  }
  const handleNavigation = (matchId, seriesName, teamVerses) => {
    navigate(`/createContest/${matchId}/${seriesName}/${teamVerses}`);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Match Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and manage all your sports matches in one place
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              onClick={() =>
                fetchMatches(
                  category.id.charAt(0).toUpperCase() + category.id.slice(1)
                )
              }
              className={`
                transition-all duration-200 cursor-pointer transform hover:-translate-y-1
                ${
                  activeCategory === category.id
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }
              `}
            >
              <div
                className={`p-6 rounded-lg ${category.color} text-white ${category.hoverColor}`}
              >
                <h2 className="text-lg font-semibold">{category.label}</h2>
                <p className="mt-2 text-2xl font-bold">
                  {activeCategory === category.id ? matches.length : 0}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Matches Grid */}
        <div className="space-y-6">
          {matches.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">
                No matches found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no matches in this category yet.
              </p>
            </div>
          ) : (
            matches.map((match, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="lg:flex lg:items-center lg:space-x-6">
                    <div className="flex-1 min-w-0">
                      <div
                        className="lg:grid lg:grid-cols-2 lg:gap-8"
                        onClick={() =>
                          handleNavigation(
                            match.matchId,
                            match.seriesName,
                            match.teamVerses
                          )
                        }
                      >
                        <MatchCard match={match} />

                        <div className="mt-4 lg:mt-0">
                          <div className="aspect-w-14 aspect-h-7 rounded-lg overflow-hidden">
                            <img
                              src={match.matchDetails?.[0]?.matchBanner}
                              alt="Match banner"
                              className="w-11/12 max-h-10/12 object-cover transform transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
