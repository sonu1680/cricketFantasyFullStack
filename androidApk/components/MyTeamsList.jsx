import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";


const MyTeamsList = ({ player, matchId }) => {
  const teamPlayers=player.tempTeam;
  //console.log(teamPlayers.totalFantasyPoints);
  const router = useRouter();
  const handleId = (e) => {
    router.push({
      pathname: "MyTeamView",
      params: { teamDetails: JSON.stringify(teamPlayers) },
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleId(player.teamId);
      }}
      className="container w-full h-44 border-2 border-gray-500/30 bg-white rounded-md overflow-hidden "
    >
      <ImageBackground
        source={require("../assets/playground.png")}
        resizeMode="cover"
        className="flex-1  "
      >
        <View className="upper w-full h-8 bg-black/40 flex justify-center items-start px-4 ">
          <Text className="text-md font-popSb text-white">
            Team {player.teamNumber}
          </Text>
        </View>

        <View className="middle flex flex-row justify-between items-center ">
          <View className="left flex flex-col justify-center items-center pl-6 ">
            <Text className="points font-popSb text-white text-lg ">
              Points
            </Text>
            <Text className="points font-popSb text-white text-lg">{player.totalFantasyPoints}</Text>
          </View>
          <View className="right flex flex-row gap-x-6 pr-4 ">
            <View className="flex items-center">
              <View className="relative">
                <Image
                  source={{ uri: player.captainImage }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="absolute top-0 left-0 bg-white rounded-full w-5 h-5 flex justify-center items-center">
                  <Text className="text-black font-bold">C</Text>
                </View>
              </View>
              <Text className="text-white font-semibold text-sm mt-1">
                {player.fantasyCaptain}
              </Text>
            </View>
            <View className="flex items-center">
              <View className="relative">
                <Image
                  source={{ uri: player.viceCaptainImage }}
                  className="w-16 h-16 rounded-full mix-blend-overlay"
                />
                <View className="absolute top-0 left-0 bg-black rounded-full w-5 h-5 flex justify-center items-center">
                  <Text className="text-white font-bold text-xs">VC</Text>
                </View>
              </View>
              <Text className="text-white font-semibold text-sm mt-1">
                {player.fantasyViceCaptain}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View className="bottom w-full flex flex-row h-8 justify-evenly items-center">
        <Text className="text-sm font-popSb text-gray-500 uppercase ">
          
          wk({player.wicketKeeper})
        </Text>
        <Text className="text-sm font-popSb text-gray-500 uppercase ">
          bat({player.batter})
        </Text>
        <Text className="text-sm font-popSb text-gray-500 uppercase ">
          ar({player.allRounder})
        </Text>
        <Text className="text-sm font-popSb text-gray-500 uppercase ">
          bowl({player.bowler})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyTeamsList;
