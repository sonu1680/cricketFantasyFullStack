import { userSchema } from "../models/authModel.js";

export const postToTempTeamForContest = async (userId, matchId, myTeam) => {
    const team=myTeam;
    try {
      const user = await userSchema.findOne({ userId: userId });

      if (!user) {
        return "User not found"
      }

      if (!user.tempTeam) {
        user.tempTeam = [];
      }

      let existingTempTeam = user.tempTeam.findLast(
        (temp) => temp.matchId === matchId
      );

      if (!existingTempTeam) {
        user.tempTeam.push({
          matchId: matchId,
          team: [{ team: team }],
        });
      } else {
        existingTempTeam.team.push({ team: team });
      }

      await user.save();

      return "Team created successfully";
    } catch (error) {
      console.error("Error while posting temp team:", error);
      return "Internal Server Error";
    }
};