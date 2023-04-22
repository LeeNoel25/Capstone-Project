// import Calendar from "react-calendar";

// const Cal = ({ date, setDate, selectGroomer, setShowTime }) => {

//     const todayDate = () => {
//         let today = new Date();
//         return today;
//       };

//     const getMinDate = (groomer) => {
//         const startDate = groomer.workingSchedule.startDate;
//         return startDate;
//       };
    
//       const getMaxDate = (groomer) => {
//         const endDate = groomer.workingSchedule.endDate;
//         return endDate;
//       };

//     return(
//         <div>
//         <Calendar
//           onChange={setDate}
//           value={date}
//           onClickDay={() => {
//             setShowTime(true);
            
//           }}
//           minDate={
//             selectGroomer && selectGroomer.workingSchedule
//               ? new Date(Math.max(new Date(getMinDate(selectGroomer)), todayDate()))
//               : todayDate()
//           }
//           maxDate={
//             selectGroomer && selectGroomer.workingSchedule
//               ? new Date(getMaxDate(selectGroomer))
//               : todayDate()
//           }
//         />
//       </div>
//     )
// }

// export default Cal;