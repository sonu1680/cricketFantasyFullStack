import axios from "axios";
import { axiosRequest } from "./axiosRequest";

export const postTransaction = async (data) => {
    const userId = "sonu";
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const newData = { ...data, date: date, time: time,userId:userId };
    //console.log(b)
  try {
    // const url = `http://${process.env.EXPO_PUBLIC_API_URL}:3000/api/user/postTransaction`;
    // const res = await axios.post(url, newData);
    const res = await axiosRequest.post("/user/postTransaction", newData);
    return res.status;
  } catch (error) {
    console.log("Error fetching balance:", error);
  }
};
