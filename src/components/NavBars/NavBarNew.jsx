import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function NavBarNew({ member }) {
  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#E1F5FE",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        zIndex: 1000,
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
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/favorites"
          sx={{ padding: "8px 16px" }}
        >
          <ListItemText primary="Favourites" />
        </ListItem>
      </List>
    </Box>
  );
}
