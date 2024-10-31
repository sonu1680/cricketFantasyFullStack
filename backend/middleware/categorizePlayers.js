export const categorizePlayers = (playerDetails) => {

  if (!Array.isArray(playerDetails)) {
    throw new Error("Invalid player details. Expected an array.");
  }

  const categorizedPlayers = {
     bowler: [],
    allRounder: [],
    wicketKeeper: [],
    batter: [],
  };

  playerDetails.forEach((player) => {
    if (player && player.role) {
      const normalizedRole = player.role.toLowerCase();

      switch (player.role) {
        case "Batsman":
          categorizedPlayers.batter.push(player);
          break;
        case "WK-Batsman":
          categorizedPlayers.wicketKeeper.push(player);
          break;
        case "Bowler":
          categorizedPlayers.bowler.push(player);
          break;
        case "Bowling Allrounder":
        case "Batting Allrounder":
          categorizedPlayers.allRounder.push(player);
          break;
        default:
          console.warn(`Unknown role: ${player.role}`);
          break;
      }
    } else {
      console.warn("Player or role is undefined:", player);
    }
  });

  return categorizedPlayers;
};
