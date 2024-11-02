import dotenv from "dotenv"
import axios from "axios";
dotenv.config();


export const sendOtp = async (phone, otp) => {

  try {
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API,
        variables_values: `${otp}`,
        route: "otp",
        numbers: `${phone}`,
      },
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
  }

  return { status: 200 };

  // console.log(message);
};
