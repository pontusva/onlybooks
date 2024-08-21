import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase methods
import { storage } from "../auth/initAuth";
export const useUploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const startUpload = (
    file: File,
    callback: (url: string) => Promise<void>
  ) => {
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await callback(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return { uploadProgress, startUpload };
};
