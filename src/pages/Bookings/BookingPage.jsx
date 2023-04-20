import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import Times from "./Time";
import Booking from "./Booking";
import Cal from "./Calendar";

const BookingPage = () => {
  const [date, setDate] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [selectGroomer, setSelectedGroomer] = useState("");
  const [memberInfo, setmemberInfo] = useState({ name: "", email: "" });
  const [fetchedLocations, setFetchedLocations] = useState([]);


  useEffect(() => {
    const fetchLocation = async () => {
      const token = localStorage.getItem("token");
  
      const response = await fetch("/api/calendar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });
  
      if (!response.ok) {
        console.error("Error fetching location data:", response.status, response.statusText);
        return;
      }
  
      const locationData = await response.json();
      setFetchedLocations(locationData);
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