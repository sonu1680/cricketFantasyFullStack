import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { usePlayerStore } from "../app/utils/store";

const ContestList = ({
  matchId,
  match,
  matchTimeRemaining,
  teamVerses,
  isMycontest
}) => {
  const router = useRouter();

  const setIstempteam = usePlayerStore((state) => state.setIsTempTeam);

  const handleJoinContest = (match) => {
    setIstempteam({
      isTemp: false,
      matchId: matchId,
      contestId: match._id,
      contestType: match.contestType,
    });

    router.push({
      pathname: "(leaderBoard)/Winnings",
      params: {
        matchTimeReaming: matchTimeRemaining,
        teamVerses: teamVerses,
        isMycontest:isMycontest,
        contest: JSON.stringify(match),
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={(e) => handleJoinContest(match)}
      className="container w-full h-36 rounded-lg bg-white shadow-lg shadow-black mt-2 border-2 border-gray-300/40 flex flex-col justify-between items-center  "
    >
      <View className="upper w-full  h-18 flex flex-row justify-between pt-1  ">
        <View className="left gap-y-2 pl-3">
          <Text className="text-gray-600 font-semibold text-md ">
            Max Prize Pool
          </Text>
          <Text className="text-black font-bold text-xl ">
            ₹{match.prizePool}
          </Text>
        </View>
        <View className="right pr-2 gap-y-1 ">
          <Text>Entry</Text>
          <View className="entryfee w-20 h-10 bg-red-600 flex justify-center items-center rounded-md ">
            <Text className="fee text-white font-semibold text-md ">
              ₹ {match.entryFee}
            </Text>
          </View>
        </View>
      </View>
      <View className="middle w-full flex justify-center  items-center h-6  px-2">
        <View className="length w-full h-1 bg-red-600 rpunded-full "></View>
        <View className="spotContainer flex flex-row justify-between items-center w-full ">
          <Text className="text-xs font-semibold text-gray-500 ">
            12 Spots Left
          </Text>
          <Text className="text-xs font-semibold text-gray-500 ">
            {match.numberOfSpots} Spots
          </Text>
        </View>
      </View>
      <LinearGradient
        colors={["#6e100e", "#462121", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="lower w-full h-8 bg-red-200 rounded-bl-lg rounded-br-lg flex flex-row justify-start items-center pl-3 gap-x-1"
      >
        <Ionicons name="podium-outline" size={20} color="white" />
        <Text className="text-xs font-semibold text-white ">
          ₹{match.rankPayout[0].prizeAmount}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ContestList;
