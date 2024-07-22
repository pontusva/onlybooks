import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const BottomNavigationBottom = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="h-screen w-screen flex items-end justify-around">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <div className="w-screen flex justify-around">
          <BottomNavigationAction label="Recents" icon={<PersonIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </div>
      </BottomNavigation>
    </div>
  );
};
