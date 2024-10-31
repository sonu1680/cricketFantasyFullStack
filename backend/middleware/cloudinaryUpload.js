import { v2 as cloudinary } from "cloudinary";
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "deboz17jx",
  api_key: process.env.CLOUDINARYAPIKEY,
  api_secret: process.env.CLODINARYSECRET,
});

export const uploadImageToCloudinary = async (base64Image, options = {}) => {
  try {
    if (!base64Image.startsWith("data:image")) {
      console.log("Invalid base64 image format.");
    }

    const uploadOptions = {
      folder: options.folder || "default-folder",
      public_id: options.public_id || undefined,
      resource_type: "image",
      format: options.format,
    };

    const uploadResult = await cloudinary.uploader.upload(
      base64Image,
      uploadOptions
    );
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
  }
};




/// function to to get player image from api with playerfaceId for face image..

  export const getImageFromApi = async (imgId,folder) => {
  console.log(imgId, folder,"clouUpload");
    const options = {
      method: "GET",
      url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imgId}/i.jpg`,
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPIKEY,
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
      },
      params: { p: "de", d: "high" },
      responseType: "arraybuffer",
    };

    try {
      const response = await axios.request(options);
      const imageBuffer = Buffer.from(response.data, "binary");
      const imageBase64 = imageBuffer.toString("base64");
      const image = `data:image/png;base64,${imageBase64}`;

      const uploadedImageUrl = await uploadImageToCloudinary(image, {
        folder: folder || "fantasyPlayersImage",
        public_id: imgId,
        format: "png",
      });

   
      return uploadedImageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

