import { RcFile } from "antd/es/upload";
const uploadURL = import.meta.env.IMG_BB_UPLOAD_URL;

export const handleImageUpload = async (
  file: RcFile
): Promise<string | null> => {
  try {
    const formData = new FormData();
    const url = import.meta.env.VITE_IMG_BB_UPLOAD_URL;
    formData.append("image", file);

    console.log(uploadURL);
    // return
    const response = await fetch(`${url}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      return result.data.url; // Return the image URL
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    // message.error("Failed to upload image");
    return null;
  }
};
