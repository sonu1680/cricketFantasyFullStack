import { postToTempTeamForContest } from "../../middleware/postToTempTeamForContest.js";
import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";

export const postMyContest = async (req, res) => {
  const { userId, matchId, contestType, contestId, myTeam, contestFee } =
    req.body;
  try {
    const user = await userSchema.findOne({ userId: userId });

    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    if (!user.Contests) {
      user.Contests = [];
    }

    let contest = user.Contests.findLast((c) => c.matchId === matchId);

    if (!contest) {
      //console.log("No contest found, creating a new contest");

      const newContest = {
        matchId: matchId,
        myContest: [{ contestId: contestId,contestType:contestType, contestTeam: [{ team: myTeam }] }],
     
      };

      user.Contests.push(newContest);
    } else {
      const a = contest.myContest.find((e) => e.contestId == contestId);
     // console.log(a);
      if (a) {
        a.contestTeam.push({ team: myTeam });
      } else {
        contest.myContest.push({
          contestId: contestId,
          contestType:contestType,
          contestTeam: [{ team: myTeam }],
        });
      }
     // console.log("Contest found, adding team to contestTeam");
    }

    // modify user balance
//     console.log(typeof(contestFee))
//  user.balance -= Number(contestFee);

    await user.save();
        const resTempTeam = await postToTempTeamForContest(
          userId,
          matchId,
          myTeam
        );
        //console.log(resTempTeam);
        if (!resTempTeam) sendResponse(res, 404, "No match found");
    return sendResponse(res, 201, "Contest join successfully");
  } catch (error) {
    //console.error("Error while setting contest:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};

export const postTempTeam = async (req, res) => {

  const { userId, matchId, team } = req.body;
  try {
    const user = await userSchema.findOne({ userId: userId });

    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    if (!user.tempTeam) {
      user.tempTeam = [];
    }

    let existingTempTeam = user.tempTeam.findLast(
      (temp) => temp.matchId === matchId
    );

    if (!existingTempTeam) {
      user.tempTeam.push({
        matchId: matchId,
        team: [{ team: team }],
      });
    } else {
      existingTempTeam.team.push({ team: team });
    }

    await user.save();

    return sendResponse(res, 201, "Team created successfully");
  } catch (error) {
    console.error("Error while posting temp team:", error);
    return sendResponse(res, 500, "Internal Server Error");
  }
};
