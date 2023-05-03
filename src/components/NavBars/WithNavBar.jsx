import React from "react";
import NavBarNew from "./NavBarNew";

export default function WithNavBar({ preContent = null, children, member }) {
  return (
    <React.Fragment>
      {preContent}
      <NavBarNew member={member} />
      {children}
    </React.Fragment>
  );
}
