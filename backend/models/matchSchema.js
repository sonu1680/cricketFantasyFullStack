import mongoose from "mongoose";

const upcomingMatchData = new mongoose.Schema({
  matchId: { type: String,  },
  matchFormat: { type: String,  },
  matchType: { type: String,  },
  matchStartTimestamp: { type: Number,  },
  state: { type: String,  },
  matchBanner:{type:String,required:true},
  team1: { type: mongoose.Schema.Types.Mixed,  },
  team2: { type: mongoose.Schema.Types.Mixed,  },
});

const liveScoreData = new mongoose.Schema({
  liveScore: { type: mongoose.Schema.Types.Mixed, required: true }, 
});

const resultData = new mongoose.Schema({
  result: { type: mongoose.Schema.Types.Mixed, required: true }, 
});
const points=new mongoose.Schema({
  fantasyPoints:{ type:mongoose.Schema.Types.Mixed, required: true}
});
const contestDatas = new mongoose.Schema({
  entryFee: { type: String, required: true },
  numberOfSpots: { type: String, required: true },
  prizePool: { type: String, required: true },
  rankPayout: { type: Array, required: true },
});


const matchContest = new mongoose.Schema({
  contestTitle: { type: String, required: true },
  contestSubTitle: { type: String, required: true },
  contestType: { type: String, required: true },
  contestData: [contestDatas],
});



const matchData = new mongoose.Schema({
  matchId: { type: String, required: true },
  matchState:{type:String,required:true},
  matchStatus:{type:String,required:true},
  seriesName:{type:String,required:true},
  teamVerses:{type:String,required:true},
  startAt:{type:String,required:true},
  endAt:{type:String,required:true},
  matchDetails: [upcomingMatchData], 
  liveScore: [liveScoreData], 
  fantasyPoints:[points],
  result: [resultData], 
  contest:[matchContest]
});

export const upcomingMatchModal = mongoose.model("MatchData", matchData);
