import React from "react";
import NavBarNew from "./NavBarNew";

export default function ({ preContent = null, children }) {
  return (
    <React.Fragment>
      {preContent}
      <NavBarNew />
      {children}
    </React.Fragment>
  );
}
