import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import PlayersList from "../../components/PlayersList";
import { usePlayerStore } from "../utils/store";
const AllRounder = () => {
  const { teamName } = useLocalSearchParams();
  const datas = JSON.parse(teamName);


const setPlayer = usePlayerStore((state) => state.setPlayer);
const deletePlayer = usePlayerStore((state) => state.deletePlayer);

const hanldePlayerDelete = (playerId) => {
  deletePlayer(playerId);
};
const handlePlayerSelection = (playerData) => {
  setPlayer(playerData);
};
  return (
    <>
      <View className="containe w-full h-10 border-1 border-gray-200/50  shadow-sm shadow-black  flex flex-row justify-evenly pl-10  items-center ">
        <View className="left w-2/6 flex justify-center items-center ">
          <Text className="text-xs font-popSb text-gray-400 uppercase ">
            selected by
          </Text>
        </View>
        <View className="right flex flex-row w-1/2  justify-start items-center gap-x-4">
          <Text className="text-xs font-popSb text-gray-400 uppercase">
            points
          </Text>
          <Text className="text-xs font-popSb text-gray-400 uppercase">
            credits
          </Text>
        </View>
      </View>
      <FlatList
        data={datas}
        renderItem={(item) => (
          <PlayersList
            player={item}
            onAddPlayer={handlePlayerSelection}
            onRemovePlayer={hanldePlayerDelete}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default AllRounder;
