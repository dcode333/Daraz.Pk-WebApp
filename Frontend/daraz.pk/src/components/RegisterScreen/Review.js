import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Review({ userDetails }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Your Details
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Name" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {userDetails.name}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Email" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {userDetails.email}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="City" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {userDetails.city}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Region" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {userDetails.region}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Zip Code" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {userDetails.zip}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Country" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {userDetails.country}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
