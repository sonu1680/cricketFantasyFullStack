import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronLeft,
} from "lucide-react-native";
import { axiosRequest } from "../../app/utils/axiosRequest";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import TabsHeader from "../../components/TabsHeader";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const UserProfile = () => {
  const router = useRouter();
  const users = useLocalSearchParams();
  const data = JSON.parse(users.data);
  //console.log(data);
  const [profileImage, setProfileImage] = useState(null);
  const imageRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      imageRef.current = result.assets[0].base64;
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const image = imageRef.current;
    try {
      const res = await axiosRequest.post("/user/postUserProfile", {
        name,
        address,
        email,
        profileImage: image,
      });
      if (res.status == 201) {
        Toast.show({
          text1: "Profile updated",
          type: "success",
        });
      }
      setIsLoading(false);
    } catch (error) {
      //console.error("error", error);
      setIsLoading(false);
    }
  };

  let mobile;
  const getPhonefromStoreage = async () => {
    mobile = await SecureStore.getItemAsync("phone");
     setPhone(mobile);
  };
  
  useEffect(() => {
    try {
      getPhonefromStoreage();
      setName(data.firstName);
      setEmail(data.emailId),
     
        setProfileImage(data.profileImage),
        setAddress(data.address);
    } catch (error) {}
  }, []);
  return (
    <SafeAreaView className=" bg-white">
      <Header />
      <View className="p-4">
        <View className="items-center mb-6">
          <TouchableOpacity onPress={pickImage} className="relative">
            {profileImage == null ? (
              <View className="w-32 h-32  border-2 border-gray-400/30  flex justify-center items-center rounded-full">
                <Text className="font-popB text-3xl text-red-500 ">
                  {name[0]}
                </Text>
              </View>
            ) : (
              <Image
                source={{ uri: profileImage }}
                className="w-32 h-32 rounded-full"
              />
            )}
            <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
              <Camera className="w-6 h-6 text-white" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-600 mb-1">Name</Text>
          <View className="flex-row items-center border-b border-gray-300 py-2">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <TextInput
              className="flex-1"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-600 mb-1">Email</Text>
          <View className="flex-row items-center border-b border-gray-300 py-2">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <TextInput
              className="flex-1"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-600 mb-1">Phone</Text>
          <View className="flex-row items-center border-b border-gray-300 py-2">
            <Phone className="w-5 h-5 text-gray-400 mr-2" />
            <TextInput
              className="flex-1"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-600 mb-1">
            Address
          </Text>
          <View className="flex-row items-center border-b border-gray-300 py-2">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <TextInput
              className="flex-1"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              multiline
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleSave()}
          className={` rounded-md py-3 mb-4 ${isLoading ? "" : "bg-blue-500"}`}
        >
          {isLoading ? (
            <View className="w-full  absolute rounded-md flex justify-center items-center ">
              <ActivityIndicator
                size={"large"}
                color={"red"}
              ></ActivityIndicator>
            </View>
          ) : (
            <Text className="text-white text-center font-semibold">
              save changes
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default UserProfile;
