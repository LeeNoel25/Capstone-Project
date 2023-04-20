import React, { useState, useEffect, useCallback } from "react";
import BookingForm from "./BookingForm";

const Booking = ({ setSelectedGroomer, setmemberInfo, memberInfo, fetchedLocations }) => {

  const [selectGroomer, setSelectGroomer] = useState([]);
  const [selectLocation, setSelectLocation] = useState("");

  useEffect(() => {
    if (selectLocation) {
      const token = localStorage.getItem("token");
  
      fetch(`/api/calendar/${selectLocation}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setSelectGroomer(data))
        .catch((error) =>
          console.error("Error fetching makeup groomer:", error)
        );
    }
  }, [selectLocation]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setmemberInfo((memberInfo) => ({
      ...memberInfo,
      [name]: value,
    }));
    if (name === "location") {
      setSelectLocation(value);
    }
    if (name === "groomer") {
      const selectedGroomer = selectGroomer.find(
        (groomer) => groomer.name === e.target.value
      );

      setSelectedGroomer(selectedGroomer);
      console.log(`selectedGroomer in Booking: ${JSON.stringify(selectedGroomer)}`);
    }
  }, [selectGroomer, setSelectedGroomer, setmemberInfo]);

  return (
    <div>
      <BookingForm
        selectGroomer={selectGroomer}
        selectLocation={selectLocation}
        handleChange={handleChange}
        memberInfo={memberInfo}
        fetchedLocations={fetchedLocations}
      />
    </div>
  );
};

export default Booking;
