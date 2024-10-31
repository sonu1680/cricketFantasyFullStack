import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerStore, } from "../app/utils/store";
const CreateTeamHeader = () => {

  const selectedPlayers = usePlayerStore((state) => state.selectedPlayers);
  const deleteEverything = usePlayerStore((state) => state.deleteEverything);
  if (selectedPlayers.length>=0){
  //console.log(selectedPlayers, "selectedPlayers");

}
  //console.log(selectedPlayers.length / 10);
  progress = (selectedPlayers.length)/10;
  const totalSegments = 11; // total number of segments in the bar
  const filledSegments = Math.floor(progress * totalSegments); // number of segments to fill based on progress
  
  const handleDelteAllPlayers=()=>{
    deleteEverything()

}
  return (
    <View className="container w-full h-92 bg-white ">
      <Header />
      <View className="details w-full h-40 bg-black border-t-2 border-green-300 ">
        <View className="upper w-full h-20  flex flex-row justify-between items-center ">
          <View className="left flex flex-row gap-x-2 pl-2 justify-center items-start ">
            <View className="image">
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxyCy_wcLunDEVdq6bE3ciYbd_8EXoHQkOw&s"
                }
                className="w-14 h-14  rounded-full  "
                resizeMode="contain"
              />
            </View>
            <View className="teamname">
              <Text className="text-white text-lg font-bold">IND</Text>
              <Text className="text-white text-lg font-bold">2</Text>
            </View>
          </View>
          <View className="middle flex flex-row justify-between items-center gap-x-2 ">
            <View className="players flex justify-center items-center ">
              <Text className="text-gray-500 text-xs font-bold">Players</Text>
              <Text className="text-white text-md font-bold">11/11</Text>
            </View>
            <View className="players flex justify-center items-center ">
              <Text className="text-gray-500 text-xs font-bold">
                Credits Left
              </Text>
              <Text className="text-white text-md font-bold">100</Text>
            </View>
          </View>
          <View className="right flex flex-row gap-x-2 pr-2 justify-center items-start  ">
            <View className="teamname">
              <Text className="text-white text-lg font-bold">NPL</Text>
              <Text className="text-white text-lg font-bold">2</Text>
            </View>
            <View className="image">
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxyCy_wcLunDEVdq6bE3ciYbd_8EXoHQkOw&s"
                }
                className="w-14 h-14  rounded-full  "
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <View className="middle w-full h-20 px-2 flex flex-row gap-x-3 justify-center items-center ">
          <View className="flex flex-row gap-1">
            {Array.from({ length: totalSegments }, (_, index) => (
              <View
                key={index}
                className={`h-4 w-6 flex justify-center items-center rounded ${
                  index < filledSegments ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                {index === filledSegments - 1 && filledSegments > 0 && (
                  <Text className="text-white text-xs font-bold">
                    {index + 1}
                  </Text>
                )}
              </View>
            ))}
          </View>
          <Ionicons
            name="trash"
            size={22}
            color="white"
            onPress={() => handleDelteAllPlayers()}
          />
        </View>
        <View className="lower w-full h-20 "></View>
      </View>
    </View>
  );
};

export default CreateTeamHeader;
