import { useParams, Link, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Edit from './Edit';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const token = localStorage.getItem('token');

export default function Groomer() {
  const [Booking, setBooking] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(`/api/groomer/admin/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch Booking');
        }
        const data = await response.json();
        setBooking(data);
        if (data.length > 0) {
          setgroomerName(data[0].groomer.id.name);
        }
      } catch (error) {
        console.error('Error fetching Booking:', error);
      }
    }
    fetchBooking();
  }, [id]);

  return (
    <div className="container">
        <Link to={`/groomer/edit/${id}`}>
            <Button variant="primary">Edit</Button>
        </Link>
        <hr/>
      {Booking.length > 0 && (
        <>
          <h3>Groomer: {Booking[0].groomer.id.name}</h3>
          <hr />
        </>
      )}
      <h4>Booking</h4>
      <ul className="list-group">
        {Booking.map((booking) => (
          <li key={booking._id} className="list-group-item">
            <div className="row">
              <div className="col-3">
                <strong>Date:</strong> {booking.date}
              </div>
              <div className="col-3">
                <strong>Time:</strong> {booking.timeslot}
              </div>
              <div className="col-6">
                <strong>Member's Information:</strong>{' '}
                {booking.memberInfo.name}, {booking.memberInfo.email}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path={`/groomer/edit/${id}`} element={<Edit />} />
      </Routes>
    </div>
  );
}
