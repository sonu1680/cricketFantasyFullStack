import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native"; // For loading indicator

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const jwtToken = await SecureStore.getItemAsync("jwtToken");
        setIsAuthenticated(!!jwtToken);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

 // console.log(isAuthenticated);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Redirect href="/(tabs)/Home" />
  ) : (
    <Redirect href="/(auth)/Login" />
  );
};

export default Index;
