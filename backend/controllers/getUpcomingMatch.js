import { upcomingMatchModal } from "../models/matchSchema.js";

export const getUpcomingMatch = async (req, res) => {
  try {
    const data = await upcomingMatchModal.find(
      {
        matchState: {
          $in: ["upcoming", "inprogress", "Upcoming", "preview", "Preview"],
        },
      },
      "matchId matchState matchDetails.matchStartTimestamp matchStatus seriesName matchDetails.team1.shortName matchDetails.team2.shortName matchDetails.team1.teamLogo matchDetails.team2.teamLogo teamVerses" // Specify fields to retrieve
    );


    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data." });
  }
};
