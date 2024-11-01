import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { usePlayerStore } from "../app/utils/store";

const MatchList = ({ match, myContestDetails, isMyContest }) => {
  const router = useRouter();
  
  const [myContestDetail, setMyContestDetail] = useState(myContestDetails);

  // Update state only when myContestDetails changes
  useEffect(() => {
    if (myContestDetails) {
      setMyContestDetail(myContestDetails);
    }
  }, [myContestDetails]);

  const setHeaderData = usePlayerStore((state) => state.setHeaderData);

  // Date and time calculations

  const matchTime = new Date(match.matchDetails[0].matchStartTimestamp);
  const currentTime = new Date();
  const timeDifference = matchTime - currentTime;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let matchTimeRemaining = 0;

  if (hours > 12 && hours < 24) {
    matchTimeRemaining = "Today";
  } else if (hours > 24 && hours < 48) {
    matchTimeRemaining = "Tomorrow";
  } else if (hours > 48) {
    matchTimeRemaining = match.matchStatus.slice(15, 22);
  } else {
    matchTimeRemaining = `${hours}h ${minutes}m`;
  }
  const handleNavigation = ({ matchId, matchTimeRemaining }) => {
    setHeaderData({
      matchId: matchId,
      teamVerses: match.teamVerses,
      matchTimeRemaining: matchTimeRemaining,
    });

    if (isMyContest) {
      router.push({
        pathname: "LiveScorePage",
        params: { match, myContestDetails },
      });
    } else {
      router.push({
        pathname: "(contestTabs)/Contest",
        params: { matchId: matchId, matchTimeRemaining: matchTimeRemaining },
      });
    }
  };

  return (
    <TouchableOpacity
      className="select w-full h-32 bg-white rounded-xl shadow-sm shadow-black border-2 border-gray-300 mt-4 flex justify-around items-center"
      onPress={() =>
        handleNavigation({
          matchId: match.matchId,
          matchTimeRemaining: matchTimeRemaining,
        })
      }
    >
      <View className="upper w-full h-6  flex justify-center items-center">
        <Text className="matchType text-xs  font-popSb text-gray-600">
          {match.seriesName}
        </Text>
      </View>

      <View className="middle w-full h-20 flex flex-row justify-around items-center space-x-2">
        <View className="left h-full w-2/6 flex justify-start flex-row space-x-2 items-center">
          <View className="dot w-1.5 h-8 bg-red-600 rounded-tr-md rounded-br-md"></View>
          <View className="w-12 h-12 rounded-full border-4 border-white flex justify-center items-center">
            {match.matchDetails[0].team1.teamLogo == null ? (
              <Image
                source={require("../assets/playerImg.png")}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{
                  uri: match.matchDetails[0].team1.teamLogo,
                }}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
            )}
          </View>
          <Text className="team1 font-popSb text-lg">
            {match.matchDetails[0].team1.shortName}
          </Text>
        </View>
        {match.matchState == "live" ? (
          <View className="middle h-full w-2/6 flex justify-center items-center">
            <View className="timeRemain w-content h-content p-1 rounded-md bg-red-600/20">
              <Text className="remain font-bold text-red-600 text-xs">
                {match.matchState}
              </Text>
            </View>
          </View>
        ) : match.matchState == "Complete" ? (
          <View className="middle h-full w-2/6 flex justify-center items-center">
            <View className="timeRemain w-content h-content p-1 rounded-md bg-red-600/20">
              <Text className="remain font-bold text-red-600 text-xs">
                {match.matchState}
              </Text>
            </View>
          </View>
        ) : (
          <View className="middle h-full w-2/6 flex justify-center items-center">
            <View className="startTime">
              <Text className="time font-normal text-gray-600/80 text-sm">
                {new Date(
                  match.matchDetails[0].matchStartTimestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <View className="timeRemain w-content h-content p-1 rounded-md bg-red-600/20">
              <Text className="remain font-popSb text-red-600 text-xs">
                {matchTimeRemaining}
              </Text>
            </View>
          </View>
        )}

        <View className="right h-full w-2/6 flex justify-end items-center flex-row space-x-2">
          <Text className="team2 font-bold text-lg">
            {match.matchDetails[0].team2.shortName}
          </Text>
          <View className="w-12 h-12 rounded-full border-4 border-white flex justify-center items-center">
            {match.matchDetails[0].team2.teamLogo == null ? (
              <Image
                source={require("../assets/playerImg.png")}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{
                  uri: match.matchDetails[0].team2.teamLogo,
                }}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
            )}
          </View>
          <View className="dot w-1.5 h-8 bg-red-600 rounded-tl-md rounded-bl-md"></View>
        </View>
      </View>

      <View className="bottom w-full h-[29px] flex flex-row justify-between border-t-2 border-gray-200">
        <LinearGradient
          colors={["#90ff91", "#d0ffc5", "#edffed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-2/6 h-full justify-center items-center rounded-bl-xl"
        >
          <Text className="font-popSb text-xs text-center text-green-600 uppercase">
            {myContestDetail
              ? myContestDetail.teamNo + " Team"
              : "1 prize ₹1000"}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["#ff9290", "#ffc5c5", "#edffed"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          className="w-2/6 h-full justify-center items-center rounded-br-xl"
        >
          <Text className="font-popSb text-xs text-center text-red-600 uppercase">
            {myContestDetail
              ? myContestDetail.contestNo + " Contest"
              : "winBike"}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default MatchList;
