import axios from "axios";
import { upcomingMatchModal } from "../models/matchSchema.js";
import { fantasyPoints } from "../controllers/fantasyPoints.js";

export const liveScoreApi = async (id) => {
  const options = {
    method: "GET",
    url: `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/scard`,
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPIKEY2,
      "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);

    const data = response.data.scoreCard;
    if (data == undefined || data.length == 0) {
      return {
        msg: "Match is not started or liveScore is not present currently,try after sometime.",
        res:404
      };
    }
    const matchId = data[0].matchId;
    const match = await upcomingMatchModal.findOne({ matchId: matchId });
    if (!match) {
      return { msg: "not match found, please create create match first." ,res:404};
    }

    //update the stae and status of match
    match.matchState = response.data.matchHeader.state;
    match.matchStatus = response.data.matchHeader.status;

    // Update both innings for liveScore
    for (let i = 0; i < response.data.scoreCard.length; i++) {
      if (!match.liveScore[i]) {
        match.liveScore.push({ liveScore: response.data.scoreCard[i] });
      } else {
        match.liveScore[i].liveScore = response.data.scoreCard[i];
      }
    }

    /// Update result for the match
    const result = response.data.matchHeader.result;
    if (result) {
      if (!match.result[0]) {
        match.result.push({ result: result });
      } else {
        match.result[0].result = result;
      }
    }

    await match.save();
    const fantasyPoint = await fantasyPoints(id);
    return {
      msg: "liveScore updated",
      liveScore: match.liveScore,
      points: fantasyPoint,
      matchState: response.data.matchHeader.state,
      res:200
    };
  } catch (error) {
    console.error(error);
    return error
  }
};
