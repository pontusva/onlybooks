import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { useNavigate } from "react-router-dom";
import { GenerateUuid } from "../dialogs/GenerateUUid";

export const AuthorLibrary = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-screen items-center justify-center flex">
      <List
        sx={{
          marginTop: 10,
          display: { md: "flex" },
        }}
      >
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              onClick={() => navigate("/books")}
              primary="Books"
              secondary="6"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Sold" secondary="24" />
          </ListItem>
        </div>
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <GenerateUuid
              children={
                <ListItemText
                  primary="Generate"
                  secondary="Unique code for a book"
                />
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              onClick={() => navigate("/generated")}
              primary="Generated codes"
              secondary="5"
            />
          </ListItem>
        </div>
      </List>
    </div>
  );
};
