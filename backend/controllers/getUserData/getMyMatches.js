import { userSchema } from "../../models/authModel.js";
import { upcomingMatchModal } from "../../models/matchSchema.js";
import { sendResponse } from "../../utils/response.js";

export const getMyMatches = async (req, res) => {
try {
  const { userId } = req.query;
  const user = await userSchema.findOne({ userId: userId });
  if (!user) {
    return sendResponse(res, 404, "User not found");
  }

  let userContestDetails = [];

  user.Contests.forEach((e) => {
    const rahul = {
      matchId: e.matchId,
      contestNo: e.myContest.length,
      contestTeamNo: 0,
      matchDetails: null,
    };

    e.myContest.forEach((k) => {
      rahul.contestTeamNo += k.contestTeam.length;
    });

    userContestDetails.push(rahul);
  });

  for (const match of userContestDetails) {
    const data = await upcomingMatchModal.findOne(
      {
        matchId: match.matchId,
      },
      "matchId matchState matchDetails.matchStartTimestamp matchStatus seriesName matchDetails.team1.shortName matchDetails.team2.shortName teamVerses"
    );
    match.matchDetails = data;
  }
  const updatedMatch = {
    live: [],
    upcoming: [],
    completed: [],
  };

  userContestDetails.forEach((match) => {
    if (
      match.matchDetails.matchState == "In progress"||
      match.matchDetails.matchState == "live" ||
      match.matchDetails.matchState == "In Progress" 
    ) {
      updatedMatch.live.push(match);
    } else if (
      match.matchDetails.matchState == "upcoming" ||
      match.matchDetails.matchState == "Preview" ||
      match.matchDetails.matchState == "preview"
    ) {
      updatedMatch.upcoming.push(match);
    } else if (
      match.matchDetails.matchState.toLowerCase() == "complete" ||
      match.matchDetails.matchState.toLowerCase() == "completed"
    ) {
      updatedMatch.completed.push(match);
    }
  });

  return sendResponse(res, 200, updatedMatch);

} catch (error) {
  return sendResponse(res,500,"Internal server error")
}  

};
