import axios from "axios";

const uploadImage = async (file: any) => {
  const url = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

  const formData = new FormData();

  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string
  );

  formData.append("file", file);

  const result = await axios.post(url, formData);
  return result?.data?.secure_url;
};

export default uploadImage;
