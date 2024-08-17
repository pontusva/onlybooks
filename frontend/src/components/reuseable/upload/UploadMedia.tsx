export const UploadMedia = ({ file }) => {
  const UploadMedia = () => {
    const [file, setFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    const handleCoverImageChange = (event) => {
      setCoverImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!file) return;

      // Upload file and cover image
      const formData = new FormData();
      formData.append("file", file);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      try {
        const uploadResponse = await fetch("/upload-media", {
          method: "POST",
          body: formData,
        });
        const result = await uploadResponse.json();
        console.log("Upload success:", result);

        // Call GraphQL mutation
        await handleGraphqlMutation(result);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };
  };
};
