// import { useParams, Link, Routes, Route } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Edit from './EditGroomer';


// export default function Groomer() {
//   const [booking, setBooking] = useState([]);
//   const { id } = useParams();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     async function fetchBooking() {
//       try {
//         const response = await fetch(`/api/groomer/admin/${id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch Booking');
//         }
//         const data = await response.json();
//         setBooking(data);
//         if (data.length > 0) {
//           setgroomerName(data[0].groomer.id.name);
//         }
//       } catch (error) {
//         console.error('Error fetching Booking:', error);
//       }
//     }
//     fetchBooking();
//   }, [id]);

//   return (
//     <div className="">
//         <Link to={`/groomer/edit/${id}`}>
//             <Button variant="primary">Edit</Button>
//         </Link>
//         <hr/>
//       {booking.length > 0 && (
//         <>
//           <h3>Groomer: {booking[0].groomer.id.name}</h3>
//           <hr />
//         </>
//       )}
//       <h4>Booking</h4>
//       <ul className="">
//         {booking.map((booking) => (
//           <li key={booking._id} className="">
//             <div className="">
//               <div className="">
//                 <strong>Date:</strong> {booking.date}
//               </div>
//               <div className="">
//                 <strong>Time:</strong> {booking.timeslot}
//               </div>
//               <div className="">
//                 <strong>Member's Information:</strong>{' '}
//                 {booking.memberInfo.name}, {booking.memberInfo.email}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <Routes>
//         <Route path={`/groomer/edit/${id}`} element={<Edit />} />
//       </Routes>
//     </div>
//   );
// }
