import { liveScoreApi } from "../../middleware/fetchScoreFromRapidApi.js";
import { liveScoreQueue } from "../../models/liveScoreQueueModel.js";

export const fetchScoreFromRapid = async () => {
  const getScore = async () => {
    try {
      const time = Date.now();

      const matches = await liveScoreQueue.find(
        {
          matchSchedule: { $lte: time },
          matchState: {
            $in: [
              "upcoming",
              "live",
              "inprogress",
              "Inprogress",
              "preview",
              "Preview",
              "In Progress",
              "In progress",
            ],
          },
        },
        { matchId: 1 }
      );

      for (const match of matches) {
        try {
          const matchState = await liveScoreApi(match.matchId);

          if (matchState.res === 200) {
            await liveScoreQueue.findOneAndUpdate(
              { matchId: match.matchId },
              {
                $set: {
                  matchState: matchState,
                },
              },
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
          }
        } catch (apiError) {
          console.error(
            `Error fetching match state for matchId ${match.matchId}:`,
            apiError
          );
        }
      }
    } catch (dbError) {
      console.error("Error fetching matches from liveScoreQueue:", dbError);
    }
  };

  setInterval(async () => {
    await getScore();
  }, 960000);
};
