import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import LiveContestCard from "../components/LiveContestCard";
import LiveScoreScreen from "../components/LiveScoreScreen";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { axiosRequest } from "./utils/axiosRequest";
import { usePlayerStore } from "./utils/store";
import MyTeamsList from "../components/MyTeamsList";


const LiveScorePage = () => {
  const [nav, setNav] = useState("myContest");
  const swipeLock = useRef(false);
  const [myContests, setMyContests] = useState(null);

  const [myTeam, setMyTeam] = useState([]);
  const matchId = usePlayerStore((state) => state.headerData.matchId);
  const tabs = [
    { label: "My Contests", key: "myContest" },
    { label: "My Teams", key: "myTeams" },
    { label: "Player Stats", key: "playersStats" },
  ];

  const handleSwipe = (direction) => {
    if (swipeLock.current) return;

    const currentIndex = tabs.findIndex((tab) => tab.key === nav);
    swipeLock.current = true;

    if (direction === "left" && currentIndex < tabs.length - 1) {
      setNav(tabs[currentIndex + 1].key);
    } else if (direction === "right" && currentIndex > 0) {
      setNav(tabs[currentIndex - 1].key);
    }

    setTimeout(() => {
      swipeLock.current = false;
    }, 300);
  };

  const onGestureEvent = (event) => {
    const { translationX } = event.nativeEvent;

    if (translationX < -50) {
      handleSwipe("left");
    } else if (translationX > 50) {
      handleSwipe("right");
    }
  };
  const getMyTeam = async () => {
    try {
      const res = await axiosRequest.get(
        `/user/previewTempTeam?matchId=${matchId}`
      );
      setMyTeam(res.data.message.teams);
    } catch (error) {
      console.error("Error fetching match list:", error);
    }
  };

  const geMyContest = async () => {
    try {
      const res = await axiosRequest.get(
        `/user/getUserContests?matchId=${matchId}`
      );
      // console.log(res.data.message);
      setMyContests(res.data.message);
    } catch (error) {
      console.error("Error fetching match list:", error);
    }
  };

  useEffect(() => {
    getMyTeam();
    geMyContest();
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-gray-50 flex-1 ">
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View className="flex-1 ">
            <LiveScoreScreen />

            <View className="w-full h-12 mt-2 px-4 flex flex-row justify-evenly items-center">
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setNav(tab.key)}
                  className={`flex justify-center items-center w-1/3 h-full border-[1px] border-gray-400/60 ${
                    index === 0
                      ? "rounded-l-md"
                      : index === tabs.length - 1
                      ? "rounded-r-md"
                      : ""
                  } ${nav === tab.key ? "bg-red-600" : "bg-white"}`}
                >
                  <Text
                    className={`font-popR text-md ${
                      nav === tab.key ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {nav === "myContest" ? (
              <FlatList
                data={myContests}
                keyExtractor={(item) => item.contestId}
                renderItem={(item, index) => (
                  <LiveContestCard
                    myContests={item.item.contests}
                    teamInContest={item.item.teamInContest}
                  />
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
            ) : nav === "myTeams" ? (
              <FlatList
                data={myTeam}
                keyExtractor={(item) => item.teamId.toString()}
                renderItem={(item, index) => <MyTeamsList player={item.item} />}
                ListEmptyComponent={
                  <View className="flex flex-1 h-screen w-full justify-center items-center">
                    <Text className="font-popB text-gray-500 capitalize ">
                      no team found..
                    </Text>
                  </View>
                }
                contentContainerStyle={{ padding: 5 }}
              />
            ) : (
              <View className="flex flex-1 justify-center items-center ">
                <Text className="font-popB capitalize ">coming soon</Text>
              </View>
            )}
          </View>
        </PanGestureHandler>
       
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default LiveScorePage;
