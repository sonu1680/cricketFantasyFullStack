import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { usePlayerStore } from "./utils/store";

const JoinContest = ({ sendDataToLayoutLeaderBoardTab }) => {
  const { matchTimeReaming, teamVerses, contest, isMycontest } =
    useLocalSearchParams();
    const setContestEntryFee = usePlayerStore((state) => state.setContestEntryFee);
  const contestData = JSON.parse(contest);
  //console.log(contestData.rankPayout, "leaderboard");
  const router = useRouter();
  const handleCreateTeam = (entryFee) => {
    setContestEntryFee(entryFee);
    if (isMycontest) {
      Toast.show({
        text1: "You have alreday joined this contest..",
        type: "error",
      });
    } else {
      router.push("(createTeam)/WicketKeeper");
    }
  };

  ////sending data to leadbord-winner for rank payout distribution list
  const sendDataToParent = () => {
    sendDataToLayoutLeaderBoardTab(contestData.rankPayout);
  };
  useEffect(() => {
    sendDataToParent();
  }, []);
  return (
    <SafeAreaView>
      <Header matchTimeReaming={matchTimeReaming} teamVerses={teamVerses} />

      <View className="container  w-full h-content bg-white ">
        <View
          onPress={() => handleJoinContest()}
          className="container w-full h-48 rounded-lg bg-white shadow-lg shadow-black mt-2 border-2 border-gray-300/40 flex flex-col justify-between items-center  "
        >
          <View className="upper w-full  h-18 flex flex-row justify-between pt-1  ">
            <View className="left gap-y-2 pl-3">
              <Text className="text-gray-600 font-semibold text-md ">
                Current Prize Pool
              </Text>
              <Text className="text-black font-bold text-xl ">
                ₹{contestData.prizePool}
              </Text>
            </View>
            <View className="right pr-2 gap-y-1 ">
              <Text>Max Prize pool</Text>
              <Text className="text-black font-bold text-xl ">
                ₹{contestData.prizePool}
              </Text>
            </View>
          </View>
          <View className="middle w-full flex justify-center  items-center h-6  px-2">
            <View className="length w-full h-1 bg-red-600 rpunded-full "></View>
            <View className="spotContainer flex flex-row justify-between items-center w-full ">
              <Text className="text-xs font-semibold text-gray-500 ">
                12 Spots Left
              </Text>
              <Text className="text-xs font-semibold text-gray-500 ">
                {contestData.numberOfSpots} Spots
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleCreateTeam(contestData.entryFee)}
            className="entryBtn w-[95%] h-10 bg-green-700 shadow-lg shadow-black rounded-md flex justify-center items-center "
          >
            <Text className="text-white font-popSb text-xs capitalize ">
              {isMycontest
                ? "you have joined this contest"
                : "Join  ₹" + contestData.entryFee}
            </Text>
          </TouchableOpacity>

          <LinearGradient
            colors={["#6e100e", "#462121", "#000000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="lower w-full h-8 bg-red-200 rounded-bl-lg rounded-br-lg flex flex-row justify-start items-center pl-3 gap-x-1"
          >
            <Image
              source={require("../assets/firstMedalOutline.png")}
              className="w-6 h-6 rounded-full "
              resizeMode={"contain"}
            />
            <Text className="text-xs font-semibold text-white ">
              ₹{contestData.rankPayout[0].prizeAmount}
            </Text>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JoinContest;
