import express from 'express';
import {
  upcomingMatchDetails,
} from "../controllers/upcomingMatchDetails.js";
import { liveScore } from '../controllers/liveScore.js';
import { getUpcomingMatch } from '../controllers/getUpcomingMatch.js';
import { createContest } from "../controllers/createContest.js";
import { getContestofMatches } from '../controllers/getContestofMatches.js';
import { getPlayersList } from '../controllers/getPlayersList.js';

 const router=express.Router();


router.post("/matchDetails", upcomingMatchDetails);
router.post("/createContest", createContest);
router.get("/liveScore", liveScore);
router.get('/getUpcomingMatches',getUpcomingMatch)
router.get("/getContestofMatches", getContestofMatches);
router.get("/getPlayersList", getPlayersList);


export {router};