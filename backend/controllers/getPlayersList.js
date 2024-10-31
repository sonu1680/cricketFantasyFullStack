import { upcomingMatchModal } from "../models/matchSchema.js";

export const getPlayersList = async (req, res) => {
  const { matchId } = req.query;
  //const {matchId}=req.body;
  const players = await upcomingMatchModal.findOne({ matchId: matchId });
  if (!players) {
    return res.status(404).json({ msg: "No match found,plz create first." });
  }
//   if (!players.matchDetails[0].length > 0) {
//     return res.status(404).json({ msg: "No contest found,create first." });
//   }

let palyerList=[];
palyerList.push(players.matchDetails[0].team1);
palyerList.push(players.matchDetails[0].team2);

  return res.status(200).json({players: palyerList });
};
