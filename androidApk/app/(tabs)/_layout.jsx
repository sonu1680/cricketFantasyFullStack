import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Setting") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "MyContest") {
              iconName = focused ? "trophy" : "trophy-outline";
            } else if (route.name === "Wallet") {
              iconName = focused ? "wallet" : "wallet-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={responsiveFontSize(3)}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#ffcc00", // Bright active color
          tabBarInactiveTintColor: "#a0a0a0", // Subtle inactive color
          tabBarStyle: {
            backgroundColor: "#111a21",
            paddingBottom: responsiveScreenHeight(0.8),
            paddingTop: responsiveScreenHeight(0.8),
            height: responsiveScreenHeight(7.5), // Increased height for comfort
            borderTopWidth: 0, // Remove top border
            elevation: 5, // Add shadow for modern look
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
          },
          tabBarLabelStyle: {
            fontSize: responsiveFontSize(1.5),
            fontWeight: "600",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#ffcc00", // Add an indicator below the active tab
            height: 3,
          },
        })}
      >
        <Tabs.Screen name="Home" options={{ headerShown: false }} />
        <Tabs.Screen name="MyContest" options={{ headerShown: false }} />
        <Tabs.Screen name="Wallet" options={{ headerShown: false }} />
        <Tabs.Screen name="Setting" options={{ headerShown: false }} />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default _layout;
