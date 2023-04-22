// import { useState } from "react";

// export default function ({ productQty, onSubmitSuccess }) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);

//   const [formValues, setFormValues] = useState({
//     productQty,
//   });

//   const handleProductQtyChange = (e) => {
//     const productQty = Number(e.target.value);
//     setFormValues((prevState) => ({
//       ...prevState,
//       productQty,
//     }));
//   };

//   const handleEditQuantitySubmit = (e) => {
//     e.preventDefault();
//     onSubmitSuccess(formValues.productQty);
//     setShow(false);
//   };

//   const isConfirmButtonDisabled = () => formValues.productQty === productQty || formValues.productQty < 0;


//   return (
//     <div>
//       <button className="" onClick={() => setShow(true)}>
//         Edit Quantity
//       </button>
//       <div
//         className="modal"
//         style={{ display: show ? "block" : "none" }}
//         id="exampleModal"
//       >
//         <div className="" role="document">
//           <div className="">
//             <div className="">
//               <h5 className="" id="exampleModalLabel">
//                 Modify quantity
//               </h5>
//               <button type="button" className="" onClick={handleClose}>
//                 <span aria-hidden="true"></span>
//               </button>
//             </div>
//             <div className="">
//               <form onSubmit={handleEditQuantitySubmit}>
//                 <div className="">
//                   <span className="">Quantity</span>
//                   <input
//                     min={0}
//                     type="number"
//                     className=""
//                     defaultValue={formValues.productQty}
//                     onChange={handleProductQtyChange}
//                   ></input>
//                 </div>
//               </form>
//             </div>
//             <div className="">
//               <button
//                 type="button"
//                 className=""
//                 onClick={handleEditQuantitySubmit}
//                 disabled={isConfirmButtonDisabled()}
//               >
//                 Confirm
//               </button>
//               <button
//                 type="button"
//                 className=""
//                 data-dismiss="modal"
//                 onClick={handleClose}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {show && <div className=""></div>}
//     </div>
//   );
// }
