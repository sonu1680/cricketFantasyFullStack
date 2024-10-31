import { uploadImageToCloudinary } from "../../middleware/cloudinaryUpload.js";
import { userSchema } from "../../models/authModel.js";
import { sendResponse } from "../../utils/response.js";

export const postUserProfile = async (req, res) => {
  try {
    const { name, firstName, lastName, email, address, userId, profileImage } =
      req.body;
    let profileURL;
    if (profileImage) {
      const image = `data:image/png;base64,${profileImage}`;
      profileURL = await uploadImageToCloudinary(image, {
        folder: "userDP",
        public_id: userId,
        format: "png",
      });
    }

    await userSchema.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          "userProfile.lastname": lastName,
          "userProfile.firstName": name,
          "userProfile.address": address,
          "userProfile.emailId": email,
          "userProfile.profileImage": profileURL,
        },
      },
      { upsert: true, new: true, setDefaultOnInsert: true }
    );

    return sendResponse(res, 201, "profile updated");
  } catch (error) {
    return sendResponse(res,500,"Internal server error")
  }
};
