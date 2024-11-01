import dotenv from "dotenv";
import { upcomingMatchModal } from "../models/matchSchema.js";
import { fetchImagefromCloudinary } from "../middleware/cloudinaryFetch.js";
import { getImageFromApi } from "../middleware/cloudinaryUpload.js";
dotenv.config();

export const upcomingMatchDetails = async (req, res) => {
  const { matchInfo } = req.body;

  const matchRes = await upcomingMatchModal.findOne({
    matchId: matchInfo.matchId,
  });

  if (matchRes) {
    return res.status(401).json({ msg: "match already exists" });
  }
  const teamVerses =
    matchInfo.team1.shortName + " vs " + matchInfo.team2.shortName;
  const setMatch = new upcomingMatchModal({
    matchId: matchInfo.matchId,
    matchState: matchInfo.state,
    matchStatus: matchInfo.status,
    seriesName: matchInfo.series.name,
    teamVerses: teamVerses,
    startAt: new Date(matchInfo.matchStartTimestamp).toLocaleString(),
    endAt: new Date(matchInfo.matchCompleteTimestamp).toLocaleString(),
  });

  setMatch.matchDetails = [];
  setMatch.liveScore = [];
  setMatch.fantasyPoints = [];
  setMatch.result = [];
  setMatch.contest = [];

  const newTeam1 = matchInfo.team1;
  const newTeam2 = matchInfo.team2;

          newTeam1["team1Logo"] =
            `https://res.cloudinary.com/deboz17jx/image/upload/v1730468785/${newTeam1.id}.png`;
              newTeam2[
                "team2Logo"
              ] = `https://res.cloudinary.com/deboz17jx/image/upload/v1730468785/${newTeam2.id}.png`;
  for (let i = 0; i < newTeam1.playerDetails.length; i++) {
    newTeam1.playerDetails[i]["credit"] = i;
    newTeam1.playerDetails[i]["fantasyCaptain"] = false;
    newTeam1.playerDetails[i]["fantasyViceCaptain"] = false;

    const url = await fetchImagefromCloudinary(
      matchInfo.team1.playerDetails[i].faceImageId
    );

    newTeam1.playerDetails[i]["faceImageurl"] = url;
  }

  for (let i = 0; i < newTeam2.playerDetails.length; i++) {

    newTeam2.playerDetails[i]["credit"] = i;
    newTeam2.playerDetails[i]["fantasyCaptain"] = false;
    newTeam2.playerDetails[i]["fantasyViceCaptain"] = false;

    const url = await fetchImagefromCloudinary(
      matchInfo.team2.playerDetails[i].faceImageId
    );
    newTeam2.playerDetails[i]["faceImageurl"] = url;
  }

  //fetch banner image fro api
  const matchBannerImg = await getImageFromApi(
    matchInfo.matchImageId,
    "matchBanners"
  );

  //push  data to database

  setMatch.matchDetails.push({
    matchId: matchInfo.matchId,
    matchFormat: matchInfo.matchFormat,
    matchType: matchInfo.matchType,
    matchStartTimestamp: matchInfo.matchStartTimestamp,
    state: matchInfo.state,
    matchBanner: matchBannerImg,
    team1: newTeam1,
    team2: newTeam2,
  });

  await setMatch.save();

  return res.status(201).json({ msg: "Match created succesfully" });
};
