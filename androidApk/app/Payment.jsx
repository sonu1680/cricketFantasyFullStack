import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { postTransaction } from "./utils/postTransaction";
import { usePlayerStore } from "./utils/store";
import RazorpayCheckout from "react-native-razorpay";
const Payment = () => {
  const { type } = useLocalSearchParams();
  const balance=usePlayerStore((state)=>state.balance)
  const [amount, setAmount] = useState("100");
  const predefinedAmounts = [100, 200, 500, 1000, 1500, 2000];
  const router = useRouter();

  const handleAddMoney = async() => {
    const data = {
      amount: Number(amount),
      transactionType: type,
      paymentMethod: "upi",
      title: type,
      subTitle: type,
    };
    // var options = {
    //   description: "Credits towards consultation",
    //   image: "https://i.imgur.com/3g7nmJC.jpg",
    //   currency: "INR",
    //   key: "<YOUR_KEY_ID>",
    //   amount: "5000",
    //   name: "Acme Corp",
    //   order_id: "order_DslnoIgkIDL8Zt", //Replace this with an order_id created using Orders API.
    //   prefill: {
    //     email: "gaurav.kumar@example.com",
    //     contact: "9191919191",
    //     name: "Gaurav Kumar",
    //   },
    //   theme: { color: "#53a20e" },
    // };
    // RazorpayCheckout.open(options)
    //   .then((data) => {
    //     // handle success
    //     alert(`Success: ${data.razorpay_payment_id}`);
    //   })
    //   .catch((error) => {
    //     // handle failure
    //     alert(`Error: ${error.code} | ${error.description}`);
    //   });


    const res=await postTransaction(data);
    if(res==201){
      router.push("Wallet");
    }
  };
  return (
    <SafeAreaView className="flex flex-1">
      <StatusBar style="light" />
      {/* Header */}
      <Header />
      <View className="flx flex-1 p-4  bg-blue-400">
        {/* Balance */}
        <View className="mb-8">
          <Text className="text-white text-4xl font-bold">₹{balance}</Text>
          <Text className="text-white text-sm mt-1">Money in your wallet</Text>
        </View>

        {/* Add Money Card */}
        <View className="bg-white rounded-lg p-4">
          <Text className="text-lg font-semibold mb-4">
            {type == "Withdraw" ? "Withdrawl Money" : "Add Money"}
          </Text>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Enter Amount (₹)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Predefined Amounts */}
          <View className="flex-row flex-wrap justify-between mb-4">
            {predefinedAmounts.map((value) => (
              <TouchableOpacity
                key={value}
                className="bg-gray-100 rounded-full py-2 px-4 mb-2"
                onPress={() => setAmount(value.toString())}
              >
                <Text>₹{value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Proceed Button */}
          <TouchableOpacity
            onPress={handleAddMoney}
            className="bg-blue-500 rounded-md py-3 items-center"
          >
            <Text className="text-white font-semibold">
              {type == "Withdraw" ? "Withdrawl Money" : "Add Money"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
