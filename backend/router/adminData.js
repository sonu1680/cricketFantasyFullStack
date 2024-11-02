import express from "express";
import { getUserList } from "../controllers/admin/getUserList.js";
import { getCompletedMatches, getLiveMatches, getUpcomingMatch } from "../controllers/admin/getupcomingMatches.js";

const adminData = express.Router();
adminData.get("/getUserList", getUserList);
adminData.get("/getUpcomingMatches", getUpcomingMatch);
adminData.get("/getLiveMatches", getLiveMatches);
adminData.get("/getCompletedMatches", getCompletedMatches);


export { adminData };
