import { upcomingMatchModal } from "../../models/matchSchema.js";
import { sendResponse } from "../../utils/response.js";

export const getLiveScore = async (req, res) => {
  try {
    const { matchId } = req.query;
    const match = await upcomingMatchModal.findOne(
      { matchId: matchId },
      { liveScore: 1,matchState:1,matchStatus:1,teamVerses:1 }
    );
    const matchDetails={
        matchState:match.matchState,
        matchStatus:match.matchStatus,
        teamVerses:match.teamVerses
    }
    //console.log(match)
    if (!match || match.liveScore.length == 0) {
      return sendResponse(
        res,
        401,
        "Live score not present or match not started."
      );
    }
    let scoreDetails = [];
      match.liveScore.forEach((e) => {
      let score = e.liveScore.scoreDetails;
      score.inningId = e.liveScore.inningsId;
      score.battingTeam = e.liveScore.batTeamDetails.batTeamName;
      scoreDetails.push(score);
    });

    return sendResponse(res, 200, { scoreDetails, matchDetails });
  } catch (error) {
    return sendResponse(res, 500, "Internal server serror");
  }
};
