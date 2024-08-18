import { Typography } from "@mui/material";

export const Home = () => {
  return (
    <div className="absolute h-screen flex items-center justify-center w-screen">
      <div className="flex relative bottom-20 flex-col">
        <img className="" src="/booktree.png" alt="booktree logo" />
        <Typography
          className="text-center"
          variant="h2"
          component="h1"
          style={{
            background: "linear-gradient(45deg, #f3ec78, #af4261)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BookTree
        </Typography>
      </div>
    </div>
  );
};
