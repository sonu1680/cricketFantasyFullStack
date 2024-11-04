import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { axiosRequest } from "../app/utils/axiosRequest";
import Toast from "react-native-toast-message";
import { usePlayerStore } from "../app/utils/store";
import { useRouter } from "expo-router";

const LiveScoreScreen = () => {
  const router = useRouter();
  const [matchScore, setMatchScore] = useState(null);
  const matchId = usePlayerStore((state) => state.headerData.matchId);

  const getLiveScore = async () => {
    try {
      const res = await axiosRequest.get(
        `/user/getLiveScore?matchId=${matchId}`
      );
      setMatchScore(res.data.message);
    } catch (error) {
      Toast.show({
        text1: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    getLiveScore();
  }, []);

  if (!matchScore) {
    return <ActivityIndicator />;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <View className="bg-gray-900 px-4 py-2 flex-row items-center">
        <TouchableOpacity onPress={handleBack} className="mr-3">
          <ArrowLeft color={"white"} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-medium">
          {matchScore?.matchDetails?.teamVerses || "Teams Unavailable"}
        </Text>
      </View>

      {/* Match Status */}
      <View className="bg-gray-900 px-6 py-3">
        <View className="flex-row justify-between items-center">
          {/* Team 1 */}
          <View className="items-center">
            <Image
              source={{ uri: "https://placeholder.com/40" }}
              className="w-10 h-10 rounded-full bg-blue-500"
            />
            <Text className="text-white mt-1">
              {matchScore?.scoreDetails?.[0]?.battingTeam?.slice(0, 13) ||
                "N/A"}
            </Text>
            <Text className="text-white text-lg font-bold">
              {matchScore?.scoreDetails?.[0]?.runs || 0}/
              {matchScore?.scoreDetails?.[0]?.wickets || 0} (
              {matchScore?.scoreDetails?.[0]?.overs || 0})
            </Text>
          </View>

          {/* Live Indicator */}
          <View className="items-center">
            <View className="flex">
              <Text className="text-green-500 font-pop-Sb text-lg ">
                Fantasy11
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-red-500 mr-1" />
              <Text className="text-red-500">
                {matchScore?.matchDetails?.matchState || "Unknown"}
              </Text>
            </View>
          </View>

          {/* Team 2 */}
          <View className="items-center">
            <Image
              source={{ uri: "https://placeholder.com/40" }}
              className="w-10 h-10 rounded-full bg-yellow-500"
            />
            <Text className="text-white mt-1">
              {matchScore?.scoreDetails?.[1]?.battingTeam?.slice(0, 13) ||
                "N/A"}
            </Text>
            <Text className="text-white text-lg font-bold">
              {matchScore?.scoreDetails?.[1]?.runs || 0}/
              {matchScore?.scoreDetails?.[1]?.wickets || 0} (
              {matchScore?.scoreDetails?.[1]?.overs || 0})
            </Text>
          </View>
        </View>
      </View>

      {/* Match Result if Completed */}
      {matchScore?.matchDetails?.matchState?.toLowerCase() === "complete" && (
        <View className="bg-gray-900 flex justify-center items-center pb-4">
          <Text className="text-green-500 font-popSb">
            {matchScore?.matchDetails?.matchStatus || "Match Finished"}
          </Text>
        </View>
      )}
    </>
  );
};

export default LiveScoreScreen;
