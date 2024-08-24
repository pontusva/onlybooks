import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useDrawerStore } from "../../zustand/useDrawerStore";
import { PlayList } from "../drawers/PlayList";

export const LibraryDrawer = () => {
  const { openDrawer, closeDrawer, drawers } = useDrawerStore();
  const isOpen = drawers.libraryDrawer;

  const toggleDrawer = (open: boolean) => () => {
    if (open) {
      openDrawer("libraryDrawer");
    } else {
      closeDrawer("libraryDrawer");
    }
  };

  const DrawerList = (
    <div className="bg-[url('/c5f4946c-e495-4003-aeff-20710a9a920a.png')] h-screen">
      <Box sx={{ width: 250 }} role="presentation">
        <PlayList />
        <Divider />
      </Box>
    </div>
  );

  return (
    <div>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
