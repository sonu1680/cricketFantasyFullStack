import { upcomingMatchModal } from "../models/matchSchema.js";

export const getContestofMatches=async(req,res)=>{
   
    const {matchId}=req.query
    //const {matchId}=req.body;
const contest=await upcomingMatchModal.findOne({matchId:matchId});
if(!contest){
    return res.status(404).json({msg:"No match found,plz create first."})
}
if(!contest.contest.length>0){
    return res.status(404).json({msg:"No contest found,create first."})
}
    return res.status(200).json({ msg: contest.contest});

}