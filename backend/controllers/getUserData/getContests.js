import { userSchema } from "../../models/authModel.js";
import { upcomingMatchModal } from "../../models/matchSchema.js";
import { sendResponse } from "../../utils/response.js";

export const userContests = async (req, res) => {
  const { userId, matchId } = req.query;
  const user = await userSchema.findOne({ userId: userId });

  if (!user) {
    return sendResponse(res, 404, "no user found");
  }
  const contests = user.Contests.findLast((e) => e.matchId == matchId);
  if (!contests)
    return sendResponse(res, 404, "you have not joined any contest");
  
  const allContest = [];
  contests.myContest.forEach((e) => {
    let contest = {};
    contest.contestId = e.contestId;
    contest.contestType = e.contestType;
    contest.teamInContest = e.contestTeam.length;
    contest.contests = null;


    allContest.push(contest);
  });

  const contestData = await upcomingMatchModal.findOne({ matchId: matchId });

  let userContest = [];
  allContest.forEach((e) => {
    const num = contestData.contest.find((k) => k.contestType == e.contestType);
    const num2 = num.contestData.find((f) => f._id == e.contestId);
    e.contests=num2
  });

  // console.log( allContest);
  return sendResponse(res, 200, allContest);
};
