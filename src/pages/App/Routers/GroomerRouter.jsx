import React from "react";
import { Route, Routes } from "react-router";
import Admin from "../../Admin/Admin.jsx";
import Groomer from "../../Admin/Groomer.jsx";
import NewGroomer from "../../Admin/CreateGroomer.jsx";
import Edit from "../../Admin/EditGroomer.jsx";

function GroomerRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/:id" element={<Groomer />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/new" element={<NewGroomer />} />
    </Routes>
  );
}

export default GroomerRouter;
