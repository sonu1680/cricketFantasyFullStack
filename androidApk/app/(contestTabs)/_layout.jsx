import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
const _layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Contest") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "MyContests") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "MyTeams") {
            iconName = focused ? "people" : "people-outline";
          } 

          return (
            <Ionicons
              name={iconName}
              size={responsiveFontSize(2.7)}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#111a21",
          paddingBottom: responsiveScreenHeight(0.5),
          paddingTop: responsiveScreenHeight(0.5),
          height: responsiveScreenHeight(7),
        },
        tabBarLabelStyle: {
          fontSize: responsiveScreenHeight(1.6),
        },
      })}
    >
      <Tabs.Screen
        name="Contest"
        options={{ headerShown: false }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="MyContests"
        options={{ headerShown: false }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="MyTeams"
        options={{ headerShown: false }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default _layout;
