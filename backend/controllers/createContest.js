import { upcomingMatchModal } from "../models/matchSchema.js";
import { dynamicPayOut } from "../middleware/dynamicPayoutAlgorithm.js";

export const createContest = async (req, res) => {
  try {
    const {
      contestTitle,
      contestSubTitle,
      contestType,
      matchId,
      prizePool,
      numberOfSpots,
    } = req.body;
    // Find the match by matchId
    const match = await upcomingMatchModal.findOne({ matchId: matchId });

    if (!match) {
      return res
        .status(404)
        .json({ msg: "No match found with this match id", matchId: matchId });
    }

    // Calculate profit and new prize pool
    const myProfit = Math.round(prizePool * 0.25);
    const newPrizePool = Math.round(prizePool - myProfit);
    const entryFee = Math.round(prizePool / numberOfSpots);

    const rankPayout = await dynamicPayOut(newPrizePool);

    const contestData = {
      entryFee: String(entryFee),
      numberOfSpots: String(numberOfSpots),
      prizePool: String(newPrizePool),
      rankPayout: rankPayout,
    };

    const contest = {
      contestTitle: contestTitle,
      contestSubTitle: contestSubTitle,
      contestType: contestType,
      contestData: [contestData],
    };
    // console.log(match.contest[0].contestTitle);
    for (let i = 0; i < match.contest.length; i++) {
      if (match.contest[i].contestType == contestType) {
        match.contest[i].contestData.push(contestData);
        await match.save();
        return res.status(201).json({ msg: "Contest created successfully" });
      }
    }

    match.contest.push(contest);
    await match.save();

    return res.status(201).json({ msg: "Contest created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ msg: "Error at createContest" });
  }
};
