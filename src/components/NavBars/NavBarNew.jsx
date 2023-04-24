// import { NavLink } from "react-router-dom";
// import "./NavBarNew.css";

// export default function NavBarNew() {
//   return (
//     <nav
//       style={{ flexDirection: "column" }}
//       className="headerMenu navbar navbar-expand-lg navbar-light bg-white border-bottom"
//     >
//       <ul className="navbar-nav justify-content-center">
//         <li className="nav-item">
//           <NavLink className="nav-link text-black nav-link-hover" to="/">
//             Browse Products
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link text-black nav-link-hover" to="/booking">
//             Appointment Booking
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link text-black nav-link-hover" to="/maps">
//             Locate Us
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// }

import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function NavBarNew() {
  return (
    <div style={{  }}>
      {/* 64px is the default height of the AppBar */}
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
            <ListItemText primary="Browse Products" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/booking"
            sx={{ padding: "8px 16px" }}
          >
            <ListItemText primary="Appointment Booking" />
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
