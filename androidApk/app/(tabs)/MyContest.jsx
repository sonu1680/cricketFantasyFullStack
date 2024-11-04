import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PanGestureHandler } from "react-native-gesture-handler";
import TabsHeader from "../../components/TabsHeader";
import UpcomingContests from "../myContestPages/UpcomingContests";
import LiveContests from "../myContestPages/LiveContests";
import CompletedContests from "../myContestPages/CompletedContests";
import axios from "axios";
import { axiosRequest } from "../utils/axiosRequest";

const MyContest = () => {
  const [liveContest, setLiveContest] = useState(null);
  const [upcomingContest, setUpcomingContest] = useState(null);
  const [completedContest, setCompletedContest] = useState(null);

  const getMatchList = async () => {
    try {
 
      const res = await axiosRequest.get("/user/getMyMatches");
      const matchDetails = res.data;
      setLiveContest(matchDetails.message.live);
      setUpcomingContest(matchDetails.message.upcoming);
      setCompletedContest(matchDetails.message.completed);
    } catch (error) {
     // console.error("Error fetching match list:", error);
    }
  };
  useEffect(() => {
    getMatchList();
  }, []);

  const [nav, setNav] = useState("upcoming");
  const swipeLock = useRef(false);

  const tabs = [
    { label: "Upcoming", key: "upcoming" },
    { label: "Live", key: "live" },
    { label: "Completed", key: "complete" },
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



  return (
    <SafeAreaView className="bg-gray-50 flex-1 ">
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View className="flex-1 ">
          <TabsHeader />

          <View className="w-full h-12 mt-2 px-4 flex flex-row justify-evenly items-center">
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setNav(tab.key)}
                className={`flex justify-center items-center w-1/3 h-full border-[1px] border-gray-400/60 ${
                  index === 0
                    ? "rounded-l-lg"
                    : index === tabs.length - 1
                    ? "rounded-r-lg"
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

          {nav === "upcoming" ? (
            <UpcomingContests
              matchData={upcomingContest}
             
            />
          ) : nav === "live" ? (
            <LiveContests matchData={liveContest} />
          ) : (
            <CompletedContests matchData={completedContest} />
          )}
        </View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default MyContest;
