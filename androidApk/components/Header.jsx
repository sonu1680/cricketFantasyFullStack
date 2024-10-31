import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { usePlayerStore } from '../app/utils/store';

const Header = ({ title}) => {
  const router = useRouter();
  const deleteEverything = usePlayerStore((state) => state.deleteEverything);
  const headerData = usePlayerStore((state) => state.headerData);
  const handleBack = () => {
    deleteEverything();
    router.back();
  };
  const[balance,setBalance]=useState(usePlayerStore((state)=>state.balance))
  const handlePayment = () => {
   
    router.push({
      pathname:"Payment",
      params:{type:"Deposit"}
    });
  };
  return (
    <LinearGradient
      className="headerNav w-full h-20 bg-red-600 flex flex-row justify-between items-center "
      colors={["#6e100e", "#462121", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View className="leftContainer flex flex-row justify-center items-center gap-x-4 pl-2 ">
        <TouchableOpacity className="subLeft" onPress={() => handleBack()}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <View className="subRight flex flex-col justify-center items-center  ">
          {title == undefined ? (
            <Text className="teamVerses text-white text-lg font-semibold ">
              {headerData.teamVerses}
            </Text>
          ) : (
            <Text className="teamVerses text-white text-xl font-semibold mt-4  ">
              {title}
            </Text>
          )}

          <Text className="time text-white font-normal ">
            {headerData.matchTimeRemaining}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handlePayment()}
        className="rightContainer mr-6 w-content bg-black gap-x-2 flex flex-row justify-between items-center p-1 rounded-md "
      >
        <Ionicons name="wallet-outline" size={30} color="white" />
        <Text className="balance text-white font-semibold ">₹{balance}</Text>
        <Ionicons name="add-circle-outline" size={30} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header