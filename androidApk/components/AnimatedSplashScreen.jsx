import { useRef } from "react";
import {  StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import Animated,{FadeIn,FadeOut} from "react-native-reanimated";
const SplashScreen = ({ onAnimationFinish = () => {} }) => {
  const animation = useRef(null);

  return (
    <Animated.View className="w-full h-full flex flex-1 bg-black  justify-center items-center " entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} >
      <LottieView
        autoPlay
        ref={animation}
        onAnimationFinish={onAnimationFinish}
        loop={false}
        style={{
          width: 300,
          height: 200,
      
        }}
        source={require("../assets/netflix.json")}
      />
    </Animated.View>
  );
};


export default SplashScreen;
