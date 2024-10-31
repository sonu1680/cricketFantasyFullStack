import { View, Text, Image } from "react-native";
import React from "react";

const PayoutDistributionRank = ({ payOut }) => {
  
  return (
    <View className="title w-full h-10 flex  justify-between border-[1px] border-gray-300/20 shadow-sm shadow-gray-200 items-center flex-row px-6 pr-10  ">
      {payOut.rank == "1" ? (
        <Image
          source={require("../assets/firstMedal.png")}
          className="w-8 h-8 rounded-full "
          resizeMode={"contain"}
        />
      ) : payOut.rank == "2" ? (
        <Image
          source={require("../assets/secondMedal.png")}
          className="w-8 h-8 rounded-full "
          resizeMode={"contain"}
        />
      ) : payOut.rank == "3" ? (
        <Image
          source={require("../assets/thirdMedal.png")}
          className="w-8 h-8 rounded-full "
          resizeMode={"contain"}
        />
      ) : (
        <Text className="text-md font-semibold pl-1 text-gray-500 capitalize">
          #{payOut.rank}
        </Text>
      )}

      <Text className="text-md font-semibold text-gray-500 capitalize">
        ₹{payOut.prizeAmount}
      </Text>
    </View>
  );
};

export default PayoutDistributionRank;
