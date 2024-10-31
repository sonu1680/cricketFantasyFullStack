import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { responsiveFontSize ,responsiveScreenHeight} from "react-native-responsive-dimensions";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
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
        <Tabs.Screen name="Home" options={{ headerShown: false }}></Tabs.Screen>

        <Tabs.Screen
          name="MyContest"
          options={{ headerShown: false }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="Wallet"
          options={{ headerShown: false }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="Setting"
          options={{ headerShown: false }}
        ></Tabs.Screen>
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default _layout;
