import React from "react";
import { Card } from "@/components/ui/card";

const MatchCard = ({ match }) => {
  const matchDate = new Date(
    match.matchDetails[0].matchStartTimestamp
  ).toLocaleDateString();
  const matchTime = new Date(
    match.matchDetails[0].matchStartTimestamp
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 space-y-6">
        {/* Series & Tournament Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-medium text-blue-400">
              {match.seriesName}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{matchDate}</span>
              <span>•</span>
              <span>{matchTime}</span>
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <div className="flex items-center justify-between gap-4">
          {/* Team 1 */}
          <div className="flex-1">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <img
                  src={
                    match.matchDetails[0].team1.teamLogo != null
                      ? match.matchDetails[0].team1.teamLogo
                      : "./playerImg.png"
                  }
                  alt={match.matchDetails[0].team1.name}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-700 shadow-lg"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">
                  {match.matchDetails[0].team1.name}
                </h3>
                {match.matchDetails[0].team1.score && (
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-white">
                      {match.matchDetails[0].team1.score}
                    </span>
                    {match.matchDetails[0].team1.overs && (
                      <span className="text-xs">
                        ({match.matchDetails[0].team1.overs})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center justify-center px-4">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
                <span className="text-sm md:text-base font-medium text-gray-300">
                  VS
                </span>
              </div>
              <div className="absolute -inset-1 bg-gray-700/20 blur-sm rounded-full -z-10"></div>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex-1">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <img
                  src={
                    match.matchDetails[0].team2.teamLogo != null
                      ? match.matchDetails[0].team2.teamLogo
                      : "./playerImg.png"
                  }
                  alt={match.matchDetails[0].team2.name}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-700 shadow-lg"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base md:text-lg">
                  {match.matchDetails[0].team2.name}
                </h3>
                {match.matchDetails[0].team2.score && (
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-white">
                      {match.matchDetails[0].team2.score}
                    </span>
                    {match.matchDetails[0].team2.overs && (
                      <span className="text-xs">
                        ({match.matchDetails[0].team2.overs})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Match Status or Result */}
        {match.matchDetails[0].status && (
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700/50 text-gray-300">
              {match.matchDetails[0].status}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MatchCard;
