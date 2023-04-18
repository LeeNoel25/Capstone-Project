import React from "react";
import Banners from "./Banners";
import WithNavBar from "./WithNavBar";

export default function ({ children }) {
  return <WithNavBar preContent={<Banners />} children={children} />;
}
