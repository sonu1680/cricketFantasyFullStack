import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  selectedPlayers: [],

  setPlayer: (newPlayer) =>
    set((state) => {
      if (state.selectedPlayers.length >= 11) {
        console.log("Cannot add more than 11 players.");
        return state;
      }
      return {
        ...state,
        selectedPlayers: [...state.selectedPlayers, newPlayer],
      };
    }),

  deletePlayer: (playerId) =>
    set((state) => ({
      ...state,
      selectedPlayers: state.selectedPlayers.filter(
        (player) => player.playerId !== playerId
      ),
    })),

  deleteEverything: () =>
    set((state) => ({
      ...state,
      selectedPlayers: [],
    })),

  selectedCaptain: { playerId: null },

  setCaptain: (captain) =>
    set((state) => ({
      ...state,
      selectedCaptain: captain,
    })),

  selectedVcaptain: { playerId: null },

  setVcaptain: (vCaptain) =>
    set((state) => ({
      ...state,
      selectedVcaptain: vCaptain,
    })),

  isTempTeam: {
    matchId: null,
    isTemp: false,
    contestId: null,
    contestType: null,
  },

  setIsTempTeam: (isTemp) => {
    set((state) => ({
      isTempTeam: {
        ...state.isTempTeam,
        matchId: isTemp.matchId,
        isTemp: isTemp.isTemp,
        contestId: isTemp.contestId,
        contestType: isTemp.contestType,
      },
    }));
  },

  headerData: { matchId: null, teamVerses: null, matchTimeReaming: null },
  setHeaderData: (data) => {
    set((state) => ({
      headerData: {
        ...state.data,
        matchId: data.matchId,
        teamVerses: data.teamVerses,
        matchTimeRemaining: data.matchTimeRemaining,
      },
    }));
  },
  balance: 0,
  setBalance: (money) => {
    set((state) => ({
      balance: money,
    }));
  },

  contestEntryFee:0,
  setContestEntryFee:(amount)=>{
    set((state)=>({
      contestEntryFee:amount,
    }))
  },

bearerToken:null,
setBearerToken:(token)=>{
  set((state)=>({
    bearerToken:token,
  }))
},

}));
