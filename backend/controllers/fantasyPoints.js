import { upcomingMatchModal } from "../models/matchSchema.js";

export const fantasyPoints = async (id) => {
  try {
    // Fetch the match by matchId
    const match = await upcomingMatchModal.findOne({ matchId: id });
    if (!match) {
      console.log("No match found");
      return null;
    }

    // Point system definition
    const pointSystem = {
      one: 1,
      two: 1,
      three: 1,
      four: 2,
      six: 3,
      halfCentury: 8,
      century: 16,
      duckPenalty: -2,
      // Bowling point system
      wicket: 12,
      three_wicket_bonus: 4,
      four_wicket_bonus: 8,
      five_wicket_bonus: 16,
      maidenOver: 12,
      // Fielding point system
      catch: 8,
      three_catch_bonus: 4,
      stumping: 12,
      runout_directHit: 12,
      runout_notDirectHit: 6,
    };

    const fantasyPointContainer = {};

    // Function to calculate points for batters
    const calculateBattingPoints = (batter) => {
      let points = 0;
      points += (batter.ones || 0) * pointSystem.one;
      points += (batter.twos || 0) * pointSystem.two;
      points += (batter.threes || 0) * pointSystem.three;
      points += (batter.fours || 0) * pointSystem.four;
      points += (batter.sixes || 0) * pointSystem.six;

      if (batter.runs >= 50) points += pointSystem.halfCentury;
      if (batter.runs >= 100) points += pointSystem.century;
      if (batter.runs === 0 && batter.outDesc)
        points += pointSystem.duckPenalty;

      fantasyPointContainer[batter.batId] = points;
    };

    // Function to calculate points for bowlers
    const calculateBowlingPoints = (bowler) => {
      let points = 0;
      points += (bowler.wickets || 0) * pointSystem.wicket;
      points += (bowler.maidens || 0) * pointSystem.maidenOver;

      if (bowler.wickets >= 3) points += pointSystem.three_wicket_bonus;
      if (bowler.wickets >= 4) points += pointSystem.four_wicket_bonus;
      if (bowler.wickets >= 5) points += pointSystem.five_wicket_bonus;

      fantasyPointContainer[bowler.bowlerId] = points;
    };

    // Calculate fantasy points for each innings
    for (const innings of match.liveScore) {
      const liveScore = innings.liveScore;
      const batTeamDetails = liveScore.batTeamDetails?.batsmenData || {};
      const bowlTeamDetails = liveScore.bowlTeamDetails?.bowlersData || {};

      // Calculate points for batters
      for (const key in batTeamDetails) {
        calculateBattingPoints(batTeamDetails[key]);
      }

      // Calculate points for bowlers
      for (const key in bowlTeamDetails) {
        calculateBowlingPoints(bowlTeamDetails[key]);
      }
    }

    // Update the fantasy points in the match document
    if (!match.fantasyPoints[0]) {
      match.fantasyPoints.push({ fantasyPoints: fantasyPointContainer });
    } else {
      match.fantasyPoints[0].fantasyPoints = fantasyPointContainer;
    }

    // Save the updated match document
    await match.save();

    return match.fantasyPoints;
  } catch (error) {
    console.error("Error calculating fantasy points:", error);
    return null;
  }
};
