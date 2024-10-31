import { userSchema } from "../../models/authModel.js";
import { generateToken } from "../../utils/jwtTokenGenerate.js";
import { otpVerifier } from "../../utils/otpVerifier.js";
import { sendResponse } from "../../utils/response.js";

export const otpVerification = async (req, res) => {
try {
    const { phone, otp } = req.body;
    const user = await userSchema.findOne({ userId: phone });
    if (!user) return sendResponse(res, 404, "please try again");
    const userOtp = user.userProfile.otp;
    const otpExpiration = user.userProfile.otpExpiration;
    const isExpire = await otpVerifier(otpExpiration);
    if (isExpire) return sendResponse(res, 401, "otp expired");
    if (otp != userOtp)
      return sendResponse(res, 401, "please enter correct otp");
    const token = await generateToken(phone);

    return sendResponse(res, 201, {
      token: token,
      msg: "signup/login success",
    });
} catch (error) {
  return sendResponse(res,500,"Internal server error")
}
};
