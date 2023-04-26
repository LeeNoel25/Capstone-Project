import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function NavBarNew() {
  return (
    <div style={{}}>
      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <ListItem
            button
            component={NavLink}
            to="/"
            sx={{ padding: "8px 16px" }}
          >
            <ListItemText primary="All Products" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/favorites"
            sx={{ padding: "8px 16px" }}
          >
            <ListItemText primary="My Favorites" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/maps"
            sx={{ padding: "8px 16px" }}
          >
            <ListItemText primary="Locate Us" />
          </ListItem>
        </List>
      </Box>
    </div>
  );
}
