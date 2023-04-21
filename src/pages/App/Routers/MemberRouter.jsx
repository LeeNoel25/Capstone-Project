import React from "react";
import { Route, Routes } from "react-router";
import Map from "../../Map/Map.jsx";
import BookingPage from "../../Bookings/BookingPage.jsx";
import BookingPlanner from "../../Bookings/BookingPlanner.jsx";

function MemberRouter({ member }) {
  if (!member) {
    return null;
  }

  return (
    <Routes>
      <Route path="/map" element={<Map />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/history" element={<BookingPlanner />} />
    </Routes>
  );
}

export default MemberRouter;
