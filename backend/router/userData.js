import express from 'express'
import { postMyContest, postTempTeam } from "../controllers/postUserData/contest.js";
import { postTransaction } from '../controllers/postUserData/transcation.js';
import { getTransaction } from '../controllers/getUserData/getTransaction.js';
import { userContests } from '../controllers/getUserData/getContests.js';
import {  previewTempTeam } from '../controllers/getUserData/getTempTeam.js';
import { getMyMatches } from '../controllers/getUserData/getMyMatches.js';
import { getBalance } from '../controllers/getUserData/getBalance.js';
import { postUserProfile } from '../controllers/postUserData/postUserprofile.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { getUserProfile } from '../controllers/getUserData/getUserProfile.js';
import { getLiveScore } from '../controllers/getUserData/getLiveScore.js';
export const userRoute=express.Router();

userRoute.post("/postMyContest",verifyToken, postMyContest);
userRoute.post("/postMyContest",verifyToken, postMyContest);
userRoute.post("/postTempTeam",verifyToken, postTempTeam);
userRoute.post("/postTransaction", verifyToken,postTransaction);
userRoute.post("/postUserProfile",verifyToken, postUserProfile);


userRoute.get("/getTransactions", verifyToken,getTransaction);
userRoute.get("/getUserContests", verifyToken,userContests);
userRoute.get("/previewTempTeam",verifyToken, previewTempTeam);
userRoute.get("/getMyMatches",verifyToken, getMyMatches);
userRoute.get("/getBalance",verifyToken, getBalance);
userRoute.get("/getTransaction",verifyToken, getTransaction);
userRoute.get("/getUserProfile", verifyToken, getUserProfile);
userRoute.get("/getLiveScore", getLiveScore);


