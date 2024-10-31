import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRouter, withLayoutContext } from "expo-router";
import CreateTeamHeader from "../../components/CreateTeamHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { usePlayerStore } from "../utils/store";
import Toast from "react-native-toast-message";
import { axiosRequest } from "../utils/axiosRequest";

const { Navigator, Screen } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

const _layout = () => {
  const router=useRouter();
  const matchId=usePlayerStore((state)=>state.headerData.matchId);
  
  const selectedPlayers = usePlayerStore((state) => state.selectedPlayers);
const [isLoading,setIsLoading]=useState(true);
  const [players, setPlayers] = useState({
    batter: [],
    bowler: [],
    allRounder: [],
    wicketKeeper: []
  });

  // Function to categorize players
  const categorizePlayers = (playerDetails) => {
    const categorizedPlayers = {
      batter: [],
      bowler: [],
      allRounder: [],
      wicketKeeper: []
    };

    playerDetails.forEach(player => {
      switch (player.role) {
        case "Batsman":
          categorizedPlayers.batter.push(player);
          break;
        case "WK-Batsman":
          categorizedPlayers.wicketKeeper.push(player);
          break;
        case "Bowler":
          categorizedPlayers.bowler.push(player);
          break;
        case "Bowling Allrounder":
        case "Batting Allrounder":
          categorizedPlayers.allRounder.push(player);
          break;
        default:
          break; 
      }
    });

    return categorizedPlayers;
  };

  const fetchPlayers = async () => {
    try {
     const res = await axiosRequest.get("/getPlayersList",{ params: { matchId } });
      const playerList = res.data.players;
//console.log(playerList.playerDetails);
      const allCategorizedPlayers = {
        batter: [],
        bowler: [],
        allRounder: [],
        wicketKeeper: []
      };

      playerList.forEach(list => {
        const categorizedPlayers = categorizePlayers(list.playerDetails);
        allCategorizedPlayers.batter.push(...categorizedPlayers.batter);
        allCategorizedPlayers.bowler.push(...categorizedPlayers.bowler);
        allCategorizedPlayers.allRounder.push(...categorizedPlayers.allRounder);
        allCategorizedPlayers.wicketKeeper.push(...categorizedPlayers.wicketKeeper);
      });

    

      setPlayers(allCategorizedPlayers); 
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);


if(isLoading){
    return <ActivityIndicator size="large" color="#0000ff" />;
}


const handleCaptain=()=>{
  if (selectedPlayers.length>=11){
    router.push('/CaptainSelection')
  }
  else{
    Toast.show({
      type:"error",
      text1:"Please select 11 players.."
    })
  } 
    
}

  return (
    <>
      <SafeAreaView>
        <CreateTeamHeader />
      </SafeAreaView>
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          tabBarIndicatorStyle: { backgroundColor: "red", height: 3 },
        }}
      >
        <MaterialTopTabs.Screen
          name="WicketKeeper"
          options={{ title: "WK" }}
          initialParams={{ teamName: JSON.stringify(players.wicketKeeper) }}
        />
        <MaterialTopTabs.Screen
          name="Batter"
          options={{ title: "BAT" }}
          initialParams={{ teamName: JSON.stringify(players.batter) }}
        />
        <MaterialTopTabs.Screen
          name="AllRounder"
          options={{ title: "AR" }}
          initialParams={{ teamName: JSON.stringify(players.allRounder) }}
        />
        <MaterialTopTabs.Screen
          name="Bowler"
          options={{ title: "BOWL" }}
          initialParams={{ teamName: JSON.stringify(players.bowler) }}
        />
      </MaterialTopTabs>
      <View className="w-full  h-16 bg-transparent relative  bottom-2  flex flex-row justify-around items-center ">
        <View className="left w-5/12 h-10 rounded-md bg-green-400 flex justify-center items-center ">
          <Text className="text-sm font-popR text-white">Team Preview</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleCaptain()}
          className="right w-5/12 h-10 rounded-md bg-gray-400 flex justify-center items-center "
        >
          <Text className="text-sm font-popR text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default _layout;
