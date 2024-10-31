import { ActivityIndicator, View } from "react-native";
import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import JoinContest from "../JoinContest";

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

const _layout = () => {
  const [rankPayoutList, setRankPayoutList] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const handleRankPayout = (rankMoney) => {
    setRankPayoutList(JSON.stringify(rankMoney));
    setIsloading(false);
  };

  if (isLoading) {
        //<ActivityIndicator size="large" color="#0000ff" />
        return <JoinContest sendDataToLayoutLeaderBoardTab={handleRankPayout} />;

  }

  return (
    <>
      <View className="container w-full h-content pb-2 shadow-black shadow-md bg-white">
        <JoinContest sendDataToLayoutLeaderBoardTab={handleRankPayout} />
      </View>
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "gray",
          tabBarItemStyle: { width: 120 },
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "semibold",
            textTransform: "uppercase",
          },
          tabBarIndicatorStyle: { backgroundColor: "red", height: 5 },
        }}
      >
        <MaterialTopTabs.Screen
          name="Winnings"
          options={{ title: "Winnings" }}
          initialParams={{ rankPrize: rankPayoutList || "" }} // Pass rank payout list to this screen
        />
        <MaterialTopTabs.Screen
          name="LeaderBoard"
          options={{ title: "Leaderboard" }}
        />
      </MaterialTopTabs>
    </>
  );
};

export default _layout;
