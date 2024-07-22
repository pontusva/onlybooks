import { Chip, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export const Account = () => {
  return (
    <>
      <div className="mt-5">
        <Chip
          label={<Typography>Account status: User</Typography>}
          variant="outlined"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-screen h-[23rem] pt-3">
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">{BecomeAuthorCard}</Card>
        </Box>
      </div>
      <div className="flex flex-col items-center justify-center w-screen h-[20rem] pt-3">
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">{StayUserCard}</Card>
        </Box>
      </div>
    </>
  );
};

const BecomeAuthorCard = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Upgrade to an Author Account!
      </Typography>
      <Typography variant="h5" component="div">
        Empower Your Writing Journey
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Special Offer for Independent Authors
      </Typography>
      <Typography variant="body2">
        Join our community of authors and enjoy exclusive benefits:
        <div>- Access advanced writing tools</div>
        <div>- Promote your books to a larger audience</div>
        <div> - Collaborate with other authors</div>
        <div> - Participate in writing contests</div>
        {'"Unlock your potential and share your stories with the world"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

const StayUserCard = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Enjoy Our Features as a Regular User!
      </Typography>
      <Typography variant="h5" component="div">
        Stay Connected, Stay Informed
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Benefits of Being a Valued User
      </Typography>
      <Typography variant="body2">
        As a regular user, you have access to a range of features:
        <br />
        <ul>
          <li>Browse and read a wide variety of content</li>
          <li>Follow your favorite authors and get updates</li>
          <li>Participate in discussions and community events</li>
          <li>Save and organize your favorite articles</li>
        </ul>
        {'"Enjoy a seamless and enriching reading experience with us"'}
      </Typography>
    </CardContent>
  </React.Fragment>
);
