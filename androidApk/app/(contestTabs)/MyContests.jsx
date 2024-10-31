import {
  View,
  Text,
  SectionList,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Header from "../../components/Header";
import { usePlayerStore } from "../utils/store";
import ContestListHeader from "../../components/ContestListHeader";
import ContestList from "../../components/ContestList";
import { axiosRequest } from "../utils/axiosRequest";

const MyContests = () => {
  const [myContests, setMyContests] = useState(null);

  const headerData = usePlayerStore((state) => state.headerData);
  const getMatchList = async () => {
    try {

const res = await axiosRequest.get(
  `/user/getUserContests?matchId=${headerData.matchId}`
);
      console.log(res.data.message);
      setMyContests(res.data.message);
    } catch (error) {
      console.log("Error fetching match list:", error);
    }
  };
  useEffect(() => {
    getMatchList();
  }, []);

  return (
    <SafeAreaView>
      <Header />
      <View className="contestContainer w-full h-full bg-white px-2 ">
        <FlatList
          data={myContests}
          renderItem={({ item, index }) => (
            <ContestList
              key={index}
              match={item.contests}
              matchId={headerData.matchId}
              matchTimeReaming={headerData.matchTimeRemaining}
              teamVerses={headerData.teamVerses}
              isMycontest={true}
            />
          )}
          keyExtractor={(item) => item.contestId}
          ListEmptyComponent={
            myContests == null ? (
              <View className="flex h-screen flex-1 justify-center items-center">
                <Text className="font-popB text-gray-500 capitalize ">
                  no contest found..
                </Text>
              </View>
            ) : (
              <View className="h-screen flex justify-center items-center ">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyContests;
