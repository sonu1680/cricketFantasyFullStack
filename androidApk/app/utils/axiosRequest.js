import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  try {
    const jwtToken = await SecureStore.getItemAsync("jwtToken");
    return jwtToken;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null; 
  }
};

export const axiosRequest = axios.create({
  baseURL: `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api`,
});

axiosRequest.interceptors.request.use(
  async (config) => {
    const token = await getToken(); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
