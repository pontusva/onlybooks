import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../auth/initAuth";
import { useNavigate } from "react-router-dom";
import { useUidStore } from "../../zustand/userStore";
import { Fade, Skeleton } from "@mui/material";
import { useGetUserById } from "../../data/users/useGetUserById";
import { useDrawerStore } from "../../zustand/useDrawerStore";

const pages = ["Library", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Redeem", "Dashboard", "Logout"];

export const AppBarTop = () => {
  const { openDrawer } = useDrawerStore();
  const [_, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(true);

  const uid = useUidStore((state) => state.uid);
  const { user } = useGetUserById({ firebase_uid: uid || "" });

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting: string | null) => {
    switch (setting) {
      case "Profile":
        // Handle profile click
        break;
      case "Account":
        navigate("/account");
        break;
      case "Redeem":
        navigate("/Library");
        break;
      case "Logout":
        signOut(auth).then(() => console.log("Logged out"));
        break;
      default:
        console.log("No action defined for this setting");
    }
    handleCloseUserMenu(); // Close the user menu after selection
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [navigate]);

  useEffect(() => {
    if (!uid || !user?.username) return;
    setUsername(user.username);
    setSkeletonLoading(false);
  }, [uid, user?.username]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => openDrawer("libraryDrawer")}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <div className="flex w-screen justify-center items-center">
            {skeletonLoading || !username ? (
              <Skeleton variant="rectangular" width={300} height={40} />
            ) : (
              <Fade in={!skeletonLoading}>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  onClick={() => navigate("/")}
                  sx={{
                    display: {
                      xs: "flex",
                      md: "none",
                      flexDirection: "row",
                      justifyContent: "center",
                    },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  BookTree
                </Typography>
              </Fade>
            )}
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {skeletonLoading || !username ? (
                  <Skeleton
                    className="z-10 relative"
                    variant="circular"
                    width={50}
                    height={50}
                  />
                ) : (
                  <Fade in={!skeletonLoading}>
                    <Avatar>{username && username[0].toUpperCase()}</Avatar>
                  </Fade>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={() => handleSettingClick(setting)}
                    textAlign="center"
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
