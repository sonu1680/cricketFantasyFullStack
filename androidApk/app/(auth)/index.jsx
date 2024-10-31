import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href={"/(auth)/Login"} />;
};

export default index;
