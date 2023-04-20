import { useState, useEffect } from "react";
import DeleteBooking from "./DeleteBooking";


const BookingPlanner = () => {
  const [booking, setBookings] = useState([]);
  const token = localStorage.getItem("token")
  const Name =  JSON.parse(window.atob(token.split(".")[1]))
  const memberName = Name.member.name
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`/api/booking/${encodeURIComponent(memberName)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBooking(data));
  }, [memberName]);

  const delBooking = (id) => setBookings(booking.filter(({ _id }) => _id !== id));

  return (
    <div>
      <h1>Today & Upcoming Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Groomer</th>
            <th>Booking Date</th>
            <th>Time Slot</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.location.id.name}</td>
              <td>{booking.groomer.id.name}</td>
              <td>{booking.date}</td>
              <td>{booking.timeslot}</td>
              <td>
                <DeleteBooking id={booking._id} delBooking={delBooking} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingPlanner;