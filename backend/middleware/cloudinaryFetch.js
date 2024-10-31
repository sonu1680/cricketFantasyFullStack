import { v2 as cloudinary } from "cloudinary";
import { getImageFromApi } from "./cloudinaryUpload.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "deboz17jx",
  api_key: process.env.CLOUDINARYAPIKEY,
  api_secret: process.env.CLODINARYSECRET,
});

var allImageUrl = []; // global variable to store all image from cloudinary locally

export const fetchImagefromCloudinary = async (id) => {
  // Function to fetch all images from Cloudinary
  const fetchImage = async () => {
    try {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: "fantasyPlayersImage",
        resource_type: "image",
        max_results:500
      });

      allImageUrl = result.resources.map((resource) => resource.secure_url);
    } catch (error) {
      console.log("Error fetching images:", error);
    }
  };

  // Function to check if the image is present locally in the fetched array
  const checkImagePresentInLocalArray = async (imageId) => {
   
    if (allImageUrl.length === 0) {
      await fetchImage(); // Ensure images are fetched before checking
    }

    // Loop through all the image URLs
    for (let i = 0; i < allImageUrl.length; i++) {
      const slicedPart = allImageUrl[i].slice(82, 88);
    
      if (slicedPart == imageId) {
     
        return allImageUrl[i]; // Return the full URL if match is found
      }
    }

    // If the image is not found in the local array, fetch it from the API
   
    const imageUrl = await getImageFromApi(imageId);
    
    return imageUrl;
  };

  // Call the function to check the image
  const imageUrl = await checkImagePresentInLocalArray(id);

  return imageUrl;
};
