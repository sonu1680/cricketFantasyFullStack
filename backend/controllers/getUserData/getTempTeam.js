import { categorizePlayers } from "../../middleware/categorizePlayers.js";
import { userSchema } from "../../models/authModel.js";
import { upcomingMatchModal } from "../../models/matchSchema.js";
import { sendResponse } from "../../utils/response.js";

export const previewTempTeam = async (req, res) => {
  try {
    const { matchId, userId } = req.query;
    if (!matchId || !userId) {
      return sendResponse(res, 400, "Match ID and User ID are required");
    }

    // Fetch user by userId
    const user = await userSchema.findOne({ userId });
    if (!user) return sendResponse(res, 404, "User not found");

    // Fetch the latest temporary team for the match
    const tempTeam = user.tempTeam?.findLast(
      (team) => team.matchId === matchId
    );
    if (!tempTeam) return sendResponse(res, 404, "Temporary team not found");

    // Fetch admin match data (fantasy points)
    const adminData = await upcomingMatchModal.findOne(
      { matchId },
      { fantasyPoints: 1 }
    );

    let isFantasyPointPresent = adminData && adminData.fantasyPoints.length > 0;
    let adminTeam = isFantasyPointPresent
      ? adminData.fantasyPoints[0].fantasyPoints
      : {};

    let teams = [];
    let teamCounter = 1;

    // Loop over each team in tempTeam and build the response
    for (const teamObj of tempTeam.team) {
      let teamInfo = {
        wicketKeeper: 0,
        batter: 0,
        bowler: 0,
        allRounder: 0,
        totalFantasyPoints: 0,
        teamNumber: teamCounter,
        tempTeam: null,
        fantasyCaptain: "",
        captainImage: "",
        fantasyViceCaptain: "",
        viceCaptainImage: "",
      };

      // Copy the team object for modification
      let totalFantasyPoints = 0;
      for (const player of teamObj.team) {
        // Assign fantasy points if available
        if (isFantasyPointPresent && adminTeam[player.playerId]) {
          player.fantasyPoint = adminTeam[player.playerId];
          totalFantasyPoints += adminTeam[player.playerId];
        } else {
          player.fantasyPoint = 0;
        }

        // Count roles
        switch (player.role) {
          case "Batsman":
            teamInfo.batter++;
            break;
          case "WK-Batsman":
            teamInfo.wicketKeeper++;
            break;
          case "Bowler":
            teamInfo.bowler++;
            break;
          case "Bowling Allrounder":
          case "Batting Allrounder":
            teamInfo.allRounder++;
            break;
          default:
            break;
        }

        // Assign captain and vice-captain details
        if (player.fantasyCaptain) {
          teamInfo.fantasyCaptain = player.nickName;
          teamInfo.captainImage = player.faceImageurl;
        }
        if (player.fantasyViceCaptain) {
          teamInfo.fantasyViceCaptain = player.nickName;
          teamInfo.viceCaptainImage = player.faceImageurl;
        }
      }

      // Assign total fantasy points and categorize players
      teamInfo.totalFantasyPoints = totalFantasyPoints;
      teamInfo.tempTeam = categorizePlayers(teamObj.team);
      teamInfo.teamId = teamObj._id;

      // Push the processed team info
      teams.push(teamInfo);
      teamCounter++;
    }

    return sendResponse(res, 200, { teams });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return sendResponse(res, 500, "Server error");
  }
};
