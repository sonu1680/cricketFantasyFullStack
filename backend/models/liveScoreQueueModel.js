import mongoose from "mongoose";

const match = new mongoose.Schema({
  matchId: { type: String, required: false },
  matchState: { type: String, required: false },
  matchSchedule: { type: Number, required: false },
});


export const liveScoreQueue = mongoose.model("liveScoreQueue", match);