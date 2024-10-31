import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import EmptyList from "../../components/EmptyList";
import ContestList from "../../components/ContestList";
import { StatusBar } from "expo-status-bar";
import ContestListHeader from "../../components/ContestListHeader";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/Header";
import { usePlayerStore } from "../utils/store";
import { axiosRequest } from "../utils/axiosRequest";

const Contest = () => {
  const { matchId, teamVerses, matchTimeRemaining } = useLocalSearchParams();
  const router = useRouter();
  const [contestData, setContestData] = useState(null);
  const setIstempteam = usePlayerStore((state) => state.setIsTempTeam);

  const fetchContest = async () => {
    //const url = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/getContestofMatches`;
    try {
     // const res = await axios.get(url, { params: { matchId: matchId } });
     const res = await axiosRequest.get("/getContestofMatches", {
       params: { matchId: matchId },
     });
      const data = res.data.msg;
      // Format the data for SectionList
      const formattedData = data.map((contest) => ({
        title: contest.contestTitle,
        contestType: contest.contestType,
        data: contest.contestData.map((entry) => ({
          ...entry,
          contestType: contest.contestType
        })),
      }));
      setContestData(formattedData);
    } catch (error) {
      //console.error(error);
    }
  };

  useEffect(() => {
    fetchContest();
  }, []);

  const handleTempteam = (matchId) => {
    setIstempteam({ isTemp: true, matchId: matchId, contestId: null });
    router.push("/(createTeam)/WicketKeeper");
  };

  return (
    <SafeAreaView>
      <View className="container w-full h-full  ">
        <Header />

        <View className="contestContainer w-full h-full bg-white px-2 ">
          <SectionList
            sections={contestData || []}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <ContestList
                match={item}
                matchId={matchId}
                matchTimeReaming={matchTimeRemaining}
                teamVerses={teamVerses}
              />
            )}
            renderSectionHeader={({ section: { contestType, title } }) => (
              <ContestListHeader contestType={contestType} title={title} />
            )}
            ListEmptyComponent={
              <View className="h-screen flex justify-center items-center ">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
          />
        </View>
        <TouchableOpacity
          className="tempTeam w-36 h-10 rounded-3xl absolute bg-red-600 bottom-4 flex justify-center items-center left-1/3 flex-row gap-x-1 shadow-md shadow-black  "
          onPress={() => handleTempteam(matchId)}
        >
          <Ionicons
            name={"add-circle-outline"}
            size={20}
            color={"white"}
            className="font-popB"
          ></Ionicons>
          <Text className="text text-md text-white font-popSb ">
            Create Team
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Contest;
