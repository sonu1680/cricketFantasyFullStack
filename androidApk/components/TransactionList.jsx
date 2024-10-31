import { View, Text, Image } from "react-native";
import React from "react";
import { MoveDownLeft, MoveUpRight } from "lucide-react-native";


const TransactionList = ({ item }) => {
//  console.log(item)
   return (
     <View className="flex-row justify-between items-center bg-white p-4 rounded-xl mb-4 shadow">
       <View className="flex-row items-center space-x-3">
         {/* You can use Image component for icons */}
         <View className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center">
           {/* Transaction Icon */}
           {item.title == "Deposit" ? (
             <MoveUpRight color="#00ff40" strokeWidth={3} />
           ) : (
             <MoveDownLeft color="#ff0000" strokeWidth={3} />
           )}
         </View>
         <View>
           <Text className="font-popSb text-lg">{item.title}</Text>
           <Text className="text-gray-400 text-xs">{item.date}</Text>
           <Text className="text-gray-400 text-xs">{item.subtitle}</Text>
         </View>
       </View>
       <View className="flex-row items-end space-x-2">
         <Text
           className={`font-popSb text-lg ${
             item.title == "Deposit" ? "text-green-600" : "text-red-600"
           }`}
         >
           {item.amount}
         </Text>
       </View>
     </View>
   );
};

export default TransactionList;
