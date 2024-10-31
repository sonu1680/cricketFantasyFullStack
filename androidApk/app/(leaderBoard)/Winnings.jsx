import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import PayoutDistributionRank from "../../components/PayoutDistributionRank";
import { useLocalSearchParams } from "expo-router";

const Winnings = () => {
  const { rankPrize } = useLocalSearchParams(); // Get the rankPrize passed as a param
  const payout=JSON.parse(rankPrize);
  //console.log(payout, "rankPrize received"); // Log the received data

  // Check if rankPrize exists and is not empty
  if (!rankPrize) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View className="title w-full h-10 flex justify-between items-center flex-row px-6">
        <Text className="text-md font-semibold text-gray-500 capitalize">
          Rank
        </Text>
        <Text className="text-md font-semibold text-gray-500 capitalize">
          Winning Amount
        </Text>
      </View>

      <FlatList
        data={payout}
        renderItem={({ item, index }) => (
          <PayoutDistributionRank payOut={item} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ActivityIndicator size="large" color="#0000ff" />}
      />
    </>
  );
};

export default Winnings;
