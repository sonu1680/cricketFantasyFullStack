import React, { useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerStore } from "../app/utils/store";

const PlayerImage = React.memo(({ faceImageurl, faceImageId }) => {
  const playerImage = useMemo(
    () =>
      faceImageurl && faceImageId !== 182026
        ? { uri: faceImageurl }
        : require("../assets/playerImg.png"),
    [faceImageurl, faceImageId]
  );

  return (
    <Image
      source={playerImage}
      className="w-14 h-14 rounded-full"
      resizeMode="contain"
      alt="player"
    />
  );
});

const PlayerInfo = React.memo(({ nickName }) => (
  <View className="name">
    <Text className="text-xs font-popB text-black capitalize">{nickName}</Text>
    <Text className="text-xs font-popR text-gray-500 capitalize">
      sel by 87%
    </Text>
  </View>
));

const PlayerCredits = React.memo(({ credit }) => (
  <>
    <Text className="text-gray-500 text-xs font-popR">{credit}</Text>
    <Text className="text-black text-xs font-popR">{credit}</Text>
  </>
));

const PlayersList = ({ player, onAddPlayer, onRemovePlayer }) => {
  const isSelected = usePlayerStore(
    useCallback(
      (state) =>
        state.selectedPlayers.some((p) => p.playerId === player.item.id),
      [player.item.id]
    )
  );

  const handlePlayerToggle = useCallback(() => {
    const {
      id,
      name,
      credit,
      teamId,
      teamName,
      role,
      faceImageurl,
      nickName,
      fantasyCaptain,
      fantasyViceCaptain,
    } = player.item;
    const playerData = {
      playerId: id,
      name,
      selectedBy: "87%",
      credits: credit,
      teamId,
      teamname: teamName,
      role,
      faceImageurl,
      nickName,
      fantasyCaptain,
      fantasyViceCaptain,
    };

    if (!isSelected) {
      onAddPlayer(playerData);
    } else {
      onRemovePlayer(id);
    }
  }, [player.item, isSelected, onAddPlayer, onRemovePlayer]);

  return (
    <TouchableOpacity
      onPress={handlePlayerToggle}
      className={`container w-full h-20 ${
        isSelected ? "bg-green-200" : "bg-white"
      } mt-1 border border-gray-400/30 shadow-sm shadow-black flex-row justify-between items-center`}
    >
      <View className="left w-1/2 h-20 flex-row justify-start gap-x-4 pl-3 items-center">
        <View className="image w-14 h-14 rounded-full border-4 border-white justify-center items-center">
          <PlayerImage
            faceImageurl={player.item.faceImageurl}
            faceImageId={player.item.faceImageId}
          />
        </View>
        <PlayerInfo nickName={player.item.nickName} />
      </View>
      <View className="right w-1/2 h-20 flex-row justify-evenly items-center">
        <PlayerCredits credit={player.item.credit} />
        <TouchableOpacity onPress={handlePlayerToggle}>
          <Ionicons
            name={isSelected ? "remove-circle-outline" : "add-circle-outline"}
            size={30}
            color={isSelected ? "red" : "green"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(PlayersList);
