import mongoose from 'mongoose';

// Transaction schema
const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },  
  date: { type: String, required: true },
  time: { type: String, required: true },
  transactionType: { type: String, required: true },  
  paymentMethod: { type: String, required: true },
  title:{type:String,required:false},
  subTitle:{type:String,required:false}
});

const contestteam = new mongoose.Schema({
  team: { type: Object, required: false }
});

const team = new mongoose.Schema({
  matchId: { type: String, required: false },
  team: [contestteam],
});

const contestId = new mongoose.Schema({
  contestId: { type: String, required: false },
  contestType:{type:String,required:false},
  contestTeam: [contestteam],
});

const contest = new mongoose.Schema({
  matchId: { type: String, required: false },
  myContest: [contestId],
});
  
const userProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: false, default: null },
  lastName: { type: String, required: false, default: null },
  address: { type: String, required: false, default: null },
  profileImage: { type: String, required: false, default: null },
  emailId: { type: String, required: false, default: null },
  otp: { type: String, required: true },
  otpExpiration: {
    type: Date,
    default: Date.now(),
    get: (otpExpiration) => otpExpiration.getTime(),
    set: (otpExpiration) => new Date(otpExpiration),
  },
});

const signUpSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userProfile: userProfileSchema,
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
  Contests: [contest],
  tempTeam: [team],
});


export const userSchema = mongoose.model('User', signUpSchema);
