import { categorizePlayers } from "../../middleware/categorizePlayers.js";
import { userSchema } from "../../models/authModel.js";
import { upcomingMatchModal } from "../../models/matchSchema.js";
import { sendResponse } from "../../utils/response.js";

export const getTempTeam = async (req, res) => {
  try {
    const { matchId, userId, teamId } = req.query;
    const user = await userSchema.findOne({ userId });
    if (!user) return sendResponse(res, 404, "User not found");
    const tempteam = user.tempTeam.findLast((e) => e.matchId === matchId);
   // console.log(tempteam);

    if (!tempteam) return sendResponse(res, 404, "Temporary team not found");
    const team = tempteam.team.filter(
      (e) => e._id == "6713d9ea3cb7682f5808b53d"
    );
    const teams = team[0].team;
   // console.log(tempteam, team);

    const finalteam = categorizePlayers(teams);
    // console.log(finalteam);
    return sendResponse(res, 200, finalteam);
  } catch (error) {
    return sendResponse(res, 500, "Server error");
  }
};

export const previewTempTeam = async (req, res) => {
  let isFantasypointPresent = false;
  try {
    const { matchId, userId } = req.query;
    //console.log(matchId);
    const user = await userSchema.findOne({ userId: userId });
    if (!user) return sendResponse(res, 404, "User not found");

    const tempteam = user.tempTeam.findLast((e) => e.matchId === matchId);
    //console.log(tempteam)
    if (!tempteam || tempteam == undefined)
      return sendResponse(res, 404, "Temporary team not found");

    const adminData = await upcomingMatchModal.findOne(
      { matchId: matchId },
      { fantasyPoints: 1 }
    );
    let adminTeam;
    if (adminData.fantasyPoints.length != 0) {
      isFantasypointPresent = true;
      adminTeam = adminData.fantasyPoints[0].fantasyPoints;
    }

    let teams = [];
    let teamCounter = 1;
    tempteam.team.forEach((teamObj) => {
      let teamInfo = {
        wicketKeeper: 0,
        batter: 0,
        bowler: 0,
        allRounder: 0,
        totalFantasyPoints:0,
        teamNumber: teamCounter,
        tempTeam: null
      };
      teamInfo.tempTeam = teamObj;
      let sonu=0;
      teamObj.team.forEach((player) => {
        if (isFantasypointPresent) {
          if (adminTeam.hasOwnProperty(player.playerId)) {
            const value = adminTeam[player.playerId];
            teamInfo.tempTeam.team.find((points) => {
              if (points.playerId == player.playerId) {
                points.fantasyPoint = value;
                sonu=sonu+value
              }
            });
          } else {
            teamInfo.tempTeam.team.find((points) => {
              points.fantasyPoint = 0;

            });
          }
        }

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

        if (player.fantasyCaptain) {
          teamInfo.fantasyCaptain = player.nickName;
          teamInfo.captainImage = player.faceImageurl;
        }
        if (player.fantasyViceCaptain) {
          teamInfo.fantasyViceCaptain = player.nickName;
          teamInfo.viceCaptainImage = player.faceImageurl;
        }
      });
     
      teamInfo.totalFantasyPoints=sonu;
      const finalteam = categorizePlayers(teamInfo.tempTeam.team);
      teamInfo.teamId = teamObj._id;
      teamInfo.tempTeam=finalteam
      teams.push(teamInfo);
      teamCounter++;
    });
    return sendResponse(res, 200, { teams });
  } catch (error) {
    return sendResponse(res, 500, "Server error");
  }
};
