import { useEffect } from "react";
import { useCoverImage } from "../../zustand/useCoverImage";
import { Fade } from "react-awesome-reveal";

export const Home = () => {
  const coverImageUrl = useCoverImage((state) => state.coverImage);

  useEffect(() => {
    console.log(coverImageUrl);
  }, []);
  return (
    <div className="absolute  h-screen flex items-center justify-center w-screen">
      <div className="flex relative bottom-20 flex-col">
        {coverImageUrl && (
          <Fade
            cascade
            key={coverImageUrl}
            onVisibilityChange={() => {}}
            duration={1000}
          >
            <img height={20} src={coverImageUrl || ""} alt="Cover Image" />
          </Fade>
        )}
      </div>
    </div>
  );
};
