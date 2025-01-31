import Animated, { FadeIn } from "react-native-reanimated";
import { useEffect, useState } from "react";
import {  Stack, useRouter } from "expo-router";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import { useFonts } from "@expo-google-fonts/poppins";
import Toast from "react-native-toast-message";


const _layout = () => {
 const [appReady, setAppReady] = useState(false);
 const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
 const router = useRouter ();
 const [fontsLoaded] = useFonts({
   Poppins_400Regular: require("@expo-google-fonts/poppins/Poppins_400Regular.ttf"),
   Poppins_600SemiBold: require("@expo-google-fonts/poppins/Poppins_600SemiBold.ttf"),
   Poppins_800ExtraBold: require("@expo-google-fonts/poppins/Poppins_800ExtraBold.ttf"),
 });


 useEffect(() => {

   if (fontsLoaded) {
     setAppReady(true);
   }
 }, [fontsLoaded]);

 if (!appReady || !splashAnimationFinished) {
   return (
     <AnimatedSplashScreen
       onAnimationFinish={() => setSplashAnimationFinished(true)}
     />
   );
 }
  

  return (
    <Animated.View className="flex flex-1" entering={FadeIn.duration(200)}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(createTeam)" />

        <Stack.Screen name="AllTransactionPage" />
        <Stack.Screen name="CaptainSelection" />
        <Stack.Screen name="CreateTeam" />
        <Stack.Screen name="JoinContest" />
        <Stack.Screen name="LiveScorePage" />
        <Stack.Screen name="MyTeamView" />
        <Stack.Screen name="Notification" />
        <Stack.Screen name="Payment" />
      </Stack>
      <Toast />
    </Animated.View>
  );
};

export default _layout;
