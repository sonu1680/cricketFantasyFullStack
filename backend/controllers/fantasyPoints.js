import { upcomingMatchModal } from "../models/matchSchema.js";
export const fantasyPoints = async (id) => {
  const match = await upcomingMatchModal.findOne({ matchId: id });
  if (!match) {
    return console.log("no match found");
  }

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
  const battingPoints = (batter) => {
    let points = 0;
    points += batter.ones * pointSystem.one;
    points += batter.twos * pointSystem.two;
    points += batter.threes * pointSystem.three;
    points += batter.fours * pointSystem.four;
    points += batter.sixes * pointSystem.six;
    if (batter.runs >= 50) points += pointSystem.halfCentury;
    if (batter.runs >= 100) points += pointSystem.century;
    if (batter.runs === 0 && batter.outDesc) points += pointSystem.duckPenalty;
    fantasyPointContainer[batter.batId] = points;
  };

  // Function to calculate points for bowlers
  const bowlingPoints = (bowler) => {
    let points = 0;
    points += bowler.wickets * pointSystem.wicket;
    points += bowler.maidens * pointSystem.maidenOver;
    if (bowler.wickets >= 3) points += pointSystem.three_wicket_bonus;
    if (bowler.wickets >= 4) points += pointSystem.four_wicket_bonus;
    if (bowler.wickets >= 5) points += pointSystem.five_wicket_bonus;
    fantasyPointContainer[bowler.bowlerId] = points;
  };

  // Calculate fantasy points for both innings
  for (let i = 0; i < match.liveScore.length; i++) {
    const liveScore = match.liveScore[i].liveScore;
    const batting = liveScore.batTeamDetails.batsmenData;
    const bowling = liveScore.bowlTeamDetails.bowlersData;

    // Calculate points for batters
    for (const key in batting) {
      battingPoints(batting[key]);
    }

    // Calculate points for bowlers
    for (const key in bowling) {
      bowlingPoints(bowling[key]);
    }
  }

  // Update the fantasy points in the match
  if (!match.fantasyPoints[0]) {
    match.fantasyPoints.push({ fantasyPoints: fantasyPointContainer });
  } else {
    match.fantasyPoints[0].fantasyPoints = fantasyPointContainer;
  }

  await match.save();
  return match.fantasyPoints;
};
