import {
  View,
  Text,
  Image,
  FlatList,
  styles,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import MatchList from "../../components/MatchList";
import Coursel from "../../components/Coursel";
import { useRouter } from "expo-router";
import TabsHeader from "../../components/TabsHeader";
import { usePlayerStore } from "../utils/store";
import { getBalance } from "../utils/getBalanceApi";
import { axiosRequest } from "../utils/axiosRequest";

const Home = () => {
  const router = useRouter();
  const [matchData, setMatchData] = useState(null);
  const setBalance = usePlayerStore((state) => state.setBalance);
  const [refreshing, setRefreshing] = useState(false);

  const getMatchList = async () => {
    try {
      setRefreshing(true);
      const res = await axiosRequest.get("/getUpcomingMatches");
      const matchDetails = res.data;
      setMatchData(matchDetails.data);
      setRefreshing(false);
    } catch (error) {
      //console.error("Error fetching match list:", error);
      setRefreshing(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        await getMatchList();
        setBalance(balance);
      } catch (error) {
        //  console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <SafeAreaView>
      <View className="h-full w-screen bg-primary">
        <StatusBar style="light" />
        {/* // header bar */}
        <TabsHeader />

        <View className="matchListContainer w-screen h-full bg-white px-2  ">
          <FlatList
            data={matchData}
            renderItem={({ item }) => <MatchList match={item} />}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
              <ActivityIndicator size="large" color="#0000ff" />
            }
            ListHeaderComponent={<Coursel />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getMatchList}
              ></RefreshControl>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
