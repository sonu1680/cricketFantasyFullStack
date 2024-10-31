import { View, Text, ImageBackground, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { axiosRequest } from "./utils/axiosRequest";
import { useLocalSearchParams } from "expo-router";

const MyTeamView = () => {
    const [playerData,setPlayerData]=useState(null);
    const[isLoading,setIsloading]=useState(true);
    const {teamDetails}=useLocalSearchParams();
    //console.log(JSON.parse(teamDetails));
    const getMyTeam = async () => {
      try {
      setPlayerData(JSON.parse(teamDetails));
              setIsloading(false);

      //console.log(playerData.batter[0]);
    
    } catch (error) {
      console.error("Error fetching match list:", error);
    }
    finally{
      setIsloading(false)
    }
  };

  useEffect(() => {
    getMyTeam();
  }, []);

const spltName=(fullName)=>{
 

  let nameParts = fullName.split(" ");
  let result = `${nameParts[0][0]} ${nameParts[1]}`;
  let newresult=result.slice(0,8)
  return newresult;
}

  const PlayerItem = ({ player, role }) => (
    <View className="w-20 h-28 flex justify-center items-center m-2">
      <Image
        source={{ uri: player.faceImageurl }}
        className="w-12 h-12 rounded-full"
      />
      <View className="flex w-16 mt-2 justify-center items-center bg-white/60 p-[2px] rounded-sm  ">
        <Text className="text-gray-600  text-xs font-popSb  ">
          {spltName(player.name)}
        </Text>
      </View>
      <Text className="text-gray-300 mt-1">{player.fantasyPoint} Pt</Text>
      {player.captain && <Text className="text-yellow-500">C</Text>}
      {player.viceCaptain && <Text className="text-yellow-500">VC</Text>}
    </View>
  );

  const TeamSection = ({ title, data }) => (
    <View className="">
      <Text className="text-white text-center  text-s font-popB">
        {title}
      </Text>
      <View className="flex flex-row justify-center ">
        {data.map((player, index) => (
          <PlayerItem key={index} player={player} />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <Header />

      <ImageBackground
        source={require("../assets/playground2.png")}
        resizeMode="cover"
        className="flex-1"
      >
        {isLoading ? (
          <ActivityIndicator size={"large"} color={"white"} ></ActivityIndicator>
        ) : (
          <View className="p-2 bg-gray-900/50 h-full w-full flex justify-evenly pb-4 items-center rounded-lg">
            <TeamSection
              title="WICKET KEEPERS"
              data={playerData.wicketKeeper}
            />
            <TeamSection title="BATTERS" data={playerData.batter} />
            <TeamSection title="ALL ROUNDERS" data={playerData.allRounder} />
            <TeamSection title="BOWLERS" data={playerData.bowler} />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MyTeamView;
