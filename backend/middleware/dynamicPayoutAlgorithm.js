export const dynamicPayOut=async(prizePool,totalSpots)=>{


  const payoutDistribution = [
    { rank: "1", percentage: 0.05 }, // 5% of the prize pool for rank 1
    { rank: "2", percentage: 0.02 }, // 2% for rank 2
    { rank: "3", percentage: 0.015 }, // 1.5% for rank 3
    { rank: "4", percentage: 0.01 }, // 1% for rank 4
    { rank: "5", percentage: 0.005 }, // 0.5% for rank 5
    { rank: "6", percentage: 0.005 }, // 0.5% for rank 6
    { rank: "7", percentage: 0.005 }, // 0.5% for rank 7
    { rank: "8", percentage: 0.005 }, // 0.5% for rank 8
    { rank: "9", percentage: 0.004 }, // 0.4% for rank 9
    { rank: "10-12", percentage: 0.003 }, // 0.3% each for ranks 10-12
    { rank: "13-16", percentage: 0.002 }, // 0.2% each for ranks 13-16
    { rank: "17-20", percentage: 0.001 }, // 0.1% each for ranks 17-20
  ];

const rankPayout=[]  //to store prize money for their rank

payoutDistribution.forEach((payout)=>{
const prizeAmount=Math.floor(prizePool*payout.percentage);
rankPayout.push({rank:payout.rank,prizeAmount:prizeAmount});
})

//console.log(rankPayout);
return rankPayout;
}
