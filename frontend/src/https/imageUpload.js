import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

async function uploadImage(image, folder) {
  const storageRef = ref(storage, `/${folder}/${Date.now()}-${image.name}`);
  const response = await uploadBytes(storageRef, image);
  console.log("response : " + response);
  const url = await getDownloadURL(response.ref);
  return url;
}

async function uploadMultipleImages(images, storageRefrence) {
  const imagePromises = Array.from(images, (image) =>
    uploadImage(image, storageRefrence)
  );
  const imageRes = await Promise.all(imagePromises);
  return imageRes;
}

export { uploadImage, uploadMultipleImages };
