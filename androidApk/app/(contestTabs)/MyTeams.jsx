import { View, Text, Image, ImageBackground, FlatList, ActivityIndicator } from "react-native";
import React,{useState,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import MyTeamsList from "../../components/MyTeamsList";
import { usePlayerStore } from "../utils/store";
import axios from "axios";
import { axiosRequest } from "../utils/axiosRequest";
const MyTeams = () => {
 
const matchId=usePlayerStore((state)=>state.headerData.matchId);
const [myTeam,setMyTeam]=useState([]);
const [fantasyPoints, setFantasyPoints] = useState([]);

  const getMyTeam=async()=>{
     try {
  
  const res = await axiosRequest.get(
    `/user/previewTempTeam?matchId=${matchId}`
  );
 
       setMyTeam(res.data.message.teams);
     //console.log(res.data.message.teams[0].totalFantasyPoints);
     } catch (error) {
      // console.error("Error fetching match list:", error);

     }
  }
  useEffect(()=>{
    getMyTeam();
  },[])

  return (
    <SafeAreaView>
      <Header />
      <FlatList
        data={myTeam}
        keyExtractor={(item) => item.teamId.toString()}
        renderItem={(item, index) => (
          <MyTeamsList player={item.item}  />
        )}
        ListEmptyComponent={
          <View className="flex flex-1 h-screen w-full justify-center items-center">
            <Text className="font-popB text-gray-500 capitalize ">
              no team found..
            </Text>
          </View>
        }
        contentContainerStyle={{ padding: 5 }}
      />
    </SafeAreaView>
  );
};

export default MyTeams;
