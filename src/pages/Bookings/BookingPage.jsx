import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import Times from "./Times";
import Booking from "./Booking";
import Cal from "./Calendar";

const BookingPage = () => {
  const [date, setDate] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [selectGroomer, setSelectedGroomer] = useState("");
  const [memberInfo, setmemberInfo] = useState({ name: "", email: "" });
  const [fetchedLocations, setFetchedLocations] = useState([]);


  useEffect(() => {
    // Fetch all locations
    const fetchLocation = async () => {
      const token = localStorage.getItem("token");
  
      const response = await fetch("/api/calender", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });
  
      const locationData = await response.json();
      setFetchedLocations(locationData); // Set the fetched location data to the state
    };
    fetchLocation();
  }, []);

  return (
    <div className="app">
      <h1 className="header">Calendar</h1>
      <Booking
        setSelectedGroomer={setSelectedGroomer}
        setmemberInfo={setmemberInfo}
        memberInfo={memberInfo}
        fetchedLocations={fetchedLocations}
      />
      {showTime ? (
        <Times
          date={date}
          selectGroomer={selectGroomer}
          showTime={showTime}
          memberInfo={memberInfo}
        />
      ) : null}

      <div>
        <Cal
          date={date}
          setDate={setDate}
          selectGroomer={selectGroomer}
          setShowTime={setShowTime}
          memberInfo={memberInfo}
        />
      </div>
    </div>
  );
};

export default BookingPage;