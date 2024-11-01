import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { MoveDownLeft, MoveUpRight } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

const TransactionList = ({ item }) => {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Handle loading state

  useEffect(() => {
    if (item) {
      setItems(item); // Set item from props
      setIsLoading(false); // Update loading state

    }
  }, [item]);

  if (isLoading) {
    return null
  }

  if (!items) {
    return (
      <View className="flex flex-1 justify-center items-center ">
        <Text className="font-popSb text-lg">
          No transaction data available
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row justify-between items-center bg-white p-4 rounded-xl mb-4 shadow">
      <View className="flex-row items-center space-x-3">
        <View className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center">
          {/* Transaction Icon */}
          {items.title === "Deposit" ? (
            <MoveUpRight color="#00ff40" strokeWidth={3} />
          ) : (
            <MoveDownLeft color="#ff0000" strokeWidth={3} />
          )}
        </View>
        <View>
          <Text className="font-popSb text-lg">{items.title}</Text>
          <Text className="text-gray-400 text-xs">
            {items.date || "No date"}
          </Text>
          <Text className="text-gray-400 text-xs">
            {items.subtitle || "No subtitle"}
          </Text>
        </View>
      </View>
      <View className="flex-row items-end space-x-2">
        <Text
          className={`font-popSb text-lg ${
            items.title === "Deposit" ? "text-green-600" : "text-red-600"
          }`}
        >
          {items.amount || "N/A"}
        </Text>
      </View>
    </View>
  );
};

export default TransactionList;
