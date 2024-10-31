import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { usePlayerStore } from "../app/utils/store";

const CaptainRolePlayerList = ({ player }) => {

  
  // Fetch state from the store
  const selectedCaptain = usePlayerStore((state) => state.selectedCaptain);
  const setCaptain = usePlayerStore((state) => state.setCaptain);

  const selectedVcaptain = usePlayerStore((state) => state.selectedVcaptain);
  const setVcaptain = usePlayerStore((state) => state.setVcaptain);

  // Handle captain selection
  const handleSelectCaptain = (player) => {
    
    if (selectedCaptain.playerId === player.playerId) {
      console.log("This player is already the captain");
    } else if (selectedVcaptain.playerId === player.playerId) {
      console.log("Player cannot be both captain and vice-captain");
    } else {
      setCaptain(player);
    }
  };
  // Handle vice-captain selection
  const handleSelectVcaptain = (player) => {
    if (selectedVcaptain.playerId === player.playerId) {
      console.log("This player is already the vice-captain");
    } else if (selectedCaptain.playerId === player.playerId) {
      console.log("Player cannot be both captain and vice-captain");
    } else {
      setVcaptain(player);
    }
  };

  return (
    <View
      className={`w-full px-2 h-22  border-2 rounded-lg  border-gray-300/30 shadow-md shadow-black mb-2 flex flex-row justify-between items-center ${
        selectedCaptain.playerId === player.playerId
          ? "bg-red-200"
          : selectedVcaptain.playerId === player.playerId
          ? "bg-green-200"
          : "bg-white"
      } `}
    >
      <View className="left w-1/2 h-20 gap-x-4 flex flex-row justify-start items-center ">
        <View className="img w-14 h-14 rounded-full ">
          {player.faceImageurl ? (
            <Image
              source={{ uri: player.faceImageurl }}
              className="w-14 h-14 rounded-full "
            />
          ) : (
            <Image
              source={require("../assets/playerImg.png")}
              className="w-10 h-10"
            />
          )}
        </View>
        <View className="detailsContainer flex flex-col justify-center items-start ">
          <Text className="text-md font-popSb capitalize text-black ">
            {player.name}
          </Text>
          <Text className="text-md font-popR capitalize text-gray-500 ">
            country | 34 pts
          </Text>
        </View>
      </View>

      <View className="right w-1/2 h-20 flex flex-row justify-end items-center ">
        <View className="captaincheckboxContainer  w-16 h-18 flex justify-center items-center ">
          <TouchableOpacity
            onPress={() => handleSelectCaptain(player)}
            className={`checkbox w-10 h-10 rounded-full border-2 border-gray-300 flex justify-center items-center ${
              selectedCaptain.playerId === player.playerId
                ? "bg-red-400"
                : "bg-white"
            }`}
          >
            <Text className="text-md font-popB capitalize text-gray-500 ">
              C
            </Text>
          </TouchableOpacity>
          <Text className="text-md font-popR capitalize text-gray-500 ">
            3%
          </Text>
        </View>

        <View className="VicecaptaincheckboxContainer   w-16 h-18 flex justify-center items-center ">
          <TouchableOpacity
            onPress={() => handleSelectVcaptain(player)}
            className={`checkbox w-10 h-10 rounded-full border-2 border-gray-300 flex justify-center items-center  ${
              selectedVcaptain.playerId === player.playerId
                ? "bg-green-400"
                : "bg-white"
            }  `}
          >
            <Text className="text-sm font-popB capitalize text-gray-500 ">
              VC
            </Text>
          </TouchableOpacity>
          <Text className="text-md font-popR capitalize text-gray-500 ">
            5%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CaptainRolePlayerList;
