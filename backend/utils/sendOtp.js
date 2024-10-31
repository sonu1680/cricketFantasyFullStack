import twilio from "twilio";
import dotenv from "dotenv"
import axios from "axios";
dotenv.config();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = new twilio(accountSid, authToken);

export const sendOtp = async (phone, otp) => {
  // const message = await client.messages.create({
  //   body: `Your otp is ${otp}`,
  //   to: phone,
  //   from: twilioPhone,
  // });

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
