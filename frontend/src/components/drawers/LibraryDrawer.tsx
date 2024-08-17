import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { useDrawerStore } from "../../zustand/useDrawerStore";
import { PlayList } from "../drawers/PlayList";
import { RedeemCodeDialog } from "../dialogs/RedeemCode";
import HLSPlayer from "../streaming/HLSplayer";

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
    <Box sx={{ width: 250 }} role="presentation">
      <RedeemCodeDialog>
        <Button>Redeem Code</Button>
      </RedeemCodeDialog>
      <PlayList />
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
