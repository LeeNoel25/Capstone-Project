import React, { useState, useEffect } from "react";
import { time } from "../../../time";
import moment from "moment";

const now = new Date();
const currentTime = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function timeToMins(time) {
  const [hours, minutes] = time.split(":");
  const calculateInMins = parseInt(hours) * 60 + parseInt(minutes);
  return calculateInMins;
}

const checkTimeSlot = (startTime) => {
  const startTimeInMins = timeToMins(startTime);
  const currTimeInMins = timeToMins(currentTime);
  return currTimeInMins > startTimeInMins;
};

function Times({ date, selectGroomer, memberInfo, Groomer }) {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const makeBooking = async (bookingTiming) => {
    try {
      const token = localStorage.getItem("token");
      const formattedDate = moment(date).format("YYYY-MM-DD");
      console.log(`formattedDate: ${formattedDate}`);
  
      const response = await fetch(`/api/booking/${memberInfo.name}/${formattedDate}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingTiming),
      });

      const data = await response.json();
      return { status: response.status, message: data.message };
    } catch (error) {
      console.error("Error creating booking:", error);
      return { status: 400, message: error.message };
    }
  };
  console.log("selectGroomer:", JSON.stringify(selectGroomer));

  const clearErrorMessage = () => {
    setErrorMessage(null);
  }

  const displayInfo = async (e) => {
    const clickedTimeslot = e.target.innerText;
    setInfo(true);
    setEvent(clickedTimeslot);
    setDateChanged(false);
    setErrorMessage(null);

    const newBooking = await makeBooking({
      date: date.toLocaleDateString("en-UK"),
      timeslot: e.target.innerText,
      Groomer: {
        id: Groomer._id,
      },
      location: {
        id: Groomer.location.id,
      },
      memberInfo: {
        name: memberInfo.name,
        email: memberInfo.email,
      },
    });

    if (newBooking.status === 200) {
      setBookings((bookingTiming) => [...bookingTiming, { timeslot: clickedTimeslot }]);
    } else {
      setErrorMessage(newBooking.message); // Display the error message
    }
  };

  const todayDate = new Date();

  const futureDate = date > todayDate;
  console.log(`date in Times: ${date}`);

  useEffect(() => {
    setDateChanged(true);
    setInfo(false);
    clearErrorMessage();
  }, [date]);

  useEffect(() => {
    if (selectGroomer && date) {
      const token = localStorage.getItem("token");
  
      fetch(`/api/booking/${selectGroomer._id}/${moment(date).format("YYYY-MM-DD")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setBookings(data))
        .then((data) => {
          console.log("Fetched data: ", data);
        })
        .catch((error) =>
          console.error("Error fetching booked Booking:", error)
        );
    } else {
      setBookings([]);
    }
  }, [selectGroomer, date]);

  const timeSlotDisabled = (startTime, futureDate, endTime, selectGroomer) => {
    console.log(`bookings in Times: ${JSON.stringify(bookings)}`);
    const isPastTimeSlot = checkTimeSlot(startTime) && !futureDate;
    const isTimeSlotBooked = bookings.some(
      (booking) => booking.timeslot === `${startTime} - ${endTime}`
    );
    
    return (
      isPastTimeSlot ||
      isTimeSlotBooked      
    );
  };

  const isAllTimeSlotRemoved = () => {
    return time.every((times) => {
      const startTime = times.split(" - ")[0];
      const endTime = times.split(" - ")[1];
      return timeSlotDisabled(startTime, futureDate, endTime, selectGroomer);
    });
  };

  const renderBookingMessage = () => {
    if (errorMessage) {
      return errorMessage
    } else if(!dateChanged && info && !errorMessage){
      return `Makeup session booked on ${date.toLocaleDateString(
        "en-UK"
      )} for timeslot ${event}.`;
    }
  };

  return (
    <div className="times">
      {time.map((times, index) => {
        const startTime = times.split(" - ")[0];
        const endTime = times.split(" - ")[1];
        const disabledTime = timeSlotDisabled(
          startTime,
          futureDate,
          endTime,
          selectGroomer
        );
        return !disabledTime ? (
          <div key={index}>
            <button onClick={(e) => displayInfo(e)}>{times}</button>
          </div>
        ) : null;
      })}
      {isAllTimeSlotRemoved() && <div>No timeslot available for today</div>}
      <div>
        {renderBookingMessage()}
      </div>
    </div>
  );
}

export default Times;