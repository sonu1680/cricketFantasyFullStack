import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";
import * as otpGenerator from "otp-generator";
import { sendOtp } from "../../utils/sendOtp.js";


export const signup = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone || phone.length < 10)
      return sendResponse(res, 401, "please provide valid phone number");

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const newPhone = `${phone}`;
    const ress = await sendOtp(newPhone, otp);

    if (!res.status == 200) {
      return sendResponse(res, 401, "otp not send");
    }
    await userSchema.findOneAndUpdate(
      { userId: phone },
      {
        $set: {
          "userProfile.otp": otp,
          "userProfile.otpExpiration": new Date(),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return sendResponse(res, 200, "otp sent");
  } catch (error) {
    console.log(error)
    return sendResponse(res,500,"Internal server error")
  }
};
