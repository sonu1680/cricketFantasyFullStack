import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SectionList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { usePlayerStore } from "./utils/store";
import CaptainRolePlayerList from "../components/CaptainRolePlayerList";
import axios from "axios";
import Toast from "react-native-toast-message";
import { postTransaction } from "./utils/postTransaction";
import { axiosRequest } from "./utils/axiosRequest";
const CaptainSelection = () => {
  const router = useRouter();
  const myBalance = usePlayerStore((state) => state.balance);
  const deleteEverything = usePlayerStore((state) => state.deleteEverything);
  const contestEntryFee = usePlayerStore((state) => state.contestEntryFee);
  const selectedPlayers = usePlayerStore((state) => state.selectedPlayers);
  const selectedCaptain = usePlayerStore((state) => state.selectedCaptain);
  const selectedVcaptain = usePlayerStore((state) => state.selectedVcaptain);
  const setSelectedCaptain = usePlayerStore(
    (state) => state.setSelectedCaptain
  );
  const setSelectedVcaptain = usePlayerStore(
    (state) => state.setSelectedVcaptain
  );
  const isTempTeam = usePlayerStore((state) => state.isTempTeam);
  const [captainPlayers, setCaptainPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //console.log(selectedCaptain);
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (selectedPlayers?.length > 0) {
      const groupedPlayers = selectedPlayers.reduce((acc, player) => {
        const {
          role,
          name,
          playerId,
          faceImageurl,
          teamId,
          nickName,
          fantasyViceCaptain,
          fantasyCaptain,
        } = player;
        let as;
        if (role === "Bowling Allrounder" || role === "Batting Allrounder") {
          as = "All Rounder";
        } else if (role.includes("WK")) {
          as = "Wicket Keeper";
        } else {
          as = role;
        }

        if (!acc[as]) {
          acc[as] = [];
        }
        acc[as].push({
          name,
          playerId,
          teamId,
          faceImageurl,
          nickName,
          fantasyViceCaptain,
          fantasyCaptain,
        });
        return acc;
      }, {});

      const formattedData = Object.keys(groupedPlayers).map((role) => ({
        title: role,
        data: groupedPlayers[role],
      }));

      setCaptainPlayers(formattedData);
    }
  }, [selectedPlayers]);

  const handleSaveTeam = async () => {
    setIsLoading(true);

    await selectedPlayers.forEach((player) => {
      if (player.playerId === selectedCaptain.playerId) {
        player.fantasyCaptain = true;
        player.fantasyViceCaptain = false;
      } else if (player.playerId === selectedVcaptain.playerId) {
        player.fantasyViceCaptain = true;
        player.fantasyCaptain = false;
      } else {
        player.fantasyCaptain = false;
        player.fantasyViceCaptain = false;
      }
    });

    ///posting temp team to database
    if (isTempTeam.isTemp) {
      const matchId = isTempTeam.matchId;

      try {
        // const url = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/user/postTempTeam`;
        // const res = await axios.post(url, {
        //   team: selectedPlayers,
        //   matchId: matchId,
        //   userId: "wakeel",
        // });
        const res = await axiosRequest.post("/user/postTempTeam", {
          team: selectedPlayers,
          matchId: matchId,
        });

        setIsLoading(false);
        if (res.status == 201) {
          setIsLoading(false);

          Toast.show({
            type: "success",
            text1: res.data.message,
          });
          deleteEverything();
          router.back();
          router.back();
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Somethhing went wrong!",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      if (contestEntryFee > myBalance) {
        Toast.show({
          type: "error",
          text1: "Please Deposit Funds!",
        });
        return router.push("Wallet");
      }

      try {
       // const url = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/user/postMyContest`;
        // const res = await axios.post(url, {
        //   myTeam: selectedPlayers,
        //   matchId: isTempTeam.matchId,
        //   userId: "wakeel",
        //   contestId: isTempTeam.contestId,
        //   contestType: isTempTeam.contestType,
        // });
        const res = await axiosRequest.post("/user/postMyContest", {
          myTeam: selectedPlayers,
            matchId: isTempTeam.matchId,
            contestId: isTempTeam.contestId,
            contestType: isTempTeam.contestType,
        });
        const trxData = {
          amount: Number(contestEntryFee),
          transactionType: "Withdraw",
          paymentMethod: "wallet",
          title: "Contest Entry Fee",
        };
        const trxRes = await postTransaction(trxData);
        if (!trxRes == 201);
        setIsLoading(false);
        if (res.status == 201) {
          setIsLoading(false);

          Toast.show({
            type: "success",
            text1: res.data.message,
          });
          deleteEverything();
          router.push("/(tabs)/Home");
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Somethhing went wrong!",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="w-full h-full">
      {/* Header */}
      <View className="w-full h-20 bg-red-400">
        <LinearGradient
          className="w-full h-20 flex flex-row justify-between items-center"
          colors={["#6e100e", "#462121", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View className="flex flex-row justify-center items-center gap-x-4 pl-2">
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-medium font-bold">
              Choose Captain and V. Captain
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View className="w-full h-32 ">
        <View className="w-full h-20 border-2 border-gray-300/10 shadow-sm shadow-gray-500 flex flex-row justify-center items-center">
          <View className="w-1/2 h-full flex flex-row gap-x-4 items-center">
            <View className="w-14 h-14">
              <Image
                source={
                  selectedCaptain?.faceImageurl
                    ? { uri: selectedCaptain.faceImageurl }
                    : require("../assets/playerImg.png")
                }
                className="w-14 h-14 rounded-full "
              />
            </View>
            <View className="flex flex-col">
              <Text className="font-black capitalize">Captain</Text>
              <Text className="font-black capitalize">
                {selectedCaptain?.nickName || "...."}
              </Text>
              <Text className="font-black capitalize">2x Points</Text>
            </View>
          </View>
          <View className="w-1/2 h-full flex flex-row justify-end items-center gap-x-4">
            <View className="flex flex-col">
              <Text className="font-black capitalize">V. Captain</Text>
              <Text className="font-black capitalize">
                {selectedVcaptain?.nickName || "...."}
              </Text>
              <Text className="font-black capitalize">1.5x Points</Text>
            </View>
            <View className="w-14 h-14">
              <Image
                source={
                  selectedVcaptain?.faceImageurl
                    ? { uri: selectedVcaptain.faceImageurl }
                    : require("../assets/playerImg.png")
                }
                className="w-14 h-14 rounded-full "
              />
            </View>
          </View>
        </View>

        {/* Section Header for Player Type */}
        <View className="border-b-2 border-gray-400/30 w-full px-10 h-10 flex flex-row justify-between items-center">
          <View className="w-1/2 h-10 flex justify-center items-start">
            <Text className="text-gray-700">TYPE</Text>
          </View>
          <View className="h-10 w-1/4 flex flex-row justify-between items-center">
            <Text>%C</Text>
            <Text>%VC</Text>
          </View>
        </View>
      </View>

      {/* Player List */}

      <SectionList
        sections={captainPlayers}
        keyExtractor={(item, index) => item.playerId.toString()}
        renderItem={({ item }) => (
          <CaptainRolePlayerList
            player={item}
            key={item.playerId}
            onCaptainSelect={() => setSelectedCaptain(item)}
            onViceCaptainSelect={() => setSelectedVcaptain(item)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="playerRole w-full h-8 px-4 flex justify-center items-start">
            <Text className="text-gray-500 font-popB text-md">{title}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="h-screen flex justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <View className="saveteamContainer  w-full h-10  absolute bottom-4 flex flex-row justify-evenly   ">
        <View className="preview w-5/12 h-10 bg-green-600 rounded-md flex justify-center items-center shadow-lg shadow-black ">
          <Text className="text-sm font-popR text-white flex justify-center items-center ">
            Preview
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleSaveTeam()}
          className="save w-5/12 h-10 bg-red-600 rounded-md flex justify-center items-center  shadow-lg shadow-black "
        >
          <Text className="text-sm font-popR text-white flex justify-center items-center ">
            Save Team
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View className="loading w-full h-full bg-black/60 absolute  flex justify-center items-center ">
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CaptainSelection;
