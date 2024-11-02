import {upcomingMatchModal} from "../../models/matchSchema.js"
export const getUpcomingMatch = async (req, res) => {
  try {
    const data = await upcomingMatchModal.find(
      {
        matchState: {
          $in: ["upcoming", "Upcoming", "preview", "Preview"],
        },
      },
      "matchId matchState matchDetails.matchStartTimestamp matchStatus matchDetails.matchBanner seriesName matchDetails.team1.name matchDetails.team2.name matchDetails.team1.teamLogo matchDetails.team2.teamLogo teamVerses" // Specify fields to retrieve
    );

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data." });
  }
};

export const getCompletedMatches = async (req, res) => {
  try {
    const data = await upcomingMatchModal.find(
      {
        matchState: {
          $in: ["completed", "Completed", "complete", "Complete"],
        },
      },
      "matchId matchState matchDetails.matchStartTimestamp matchStatus matchDetails.matchBanner seriesName matchDetails.team1.name matchDetails.team2.name matchDetails.team1.teamLogo matchDetails.team2.teamLogo teamVerses" // Specify fields to retrieve
    );

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data." });
  }
};
export const getLiveMatches = async (req, res) => {
  try {
    const data = await upcomingMatchModal.find(
      {
        matchState: {
          $in: ["Live", "live", "inprogress", "Inprogress","InProgress"],
        },
      },
      "matchId matchState matchDetails.matchStartTimestamp matchStatus matchDetails.matchBanner seriesName matchDetails.team1.name matchDetails.team2.name matchDetails.team1.teamLogo matchDetails.team2.teamLogo teamVerses" // Specify fields to retrieve
    );

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data." });
  }
};