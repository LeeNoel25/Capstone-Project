// import { useState, useContext } from "react";
// import { CartContext } from "../../pages/OrderPage/CartContext";
// import CartProduct from "./CartProduct";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";

// function NavbarComponent() {
//   const cart = useContext(CartContext);

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const checkout = async () => {
//     await fetch("http://localhost:3001/checkout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ items: cart.items }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((response) => {
//         if (response.url) {
//           window.location.assign(response.url); // Forwarding user to Stripe
//         }
//       });
//   };

//   const productsCount = cart.items.reduce(
//     (sum, product) => sum + product.quantity,
//     0
//   );

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             BetterLife Online Store
//           </Typography>
//           <IconButton color="inherit" onClick={handleShow}>
//             <Badge badgeContent={productsCount} color="error">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Modal
//         open={show}
//         onClose={handleClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "50%",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             minWidth: "300px",
//           }}
//         >
//           <Typography id="modal-title" variant="h6" component="h2">
//             Shopping Cart
//           </Typography>
//           {productsCount > 0 ? (
//             <>
//               <Typography id="modal-description" sx={{ mt: 2 }}>
//                 Items in your cart:
//               </Typography>
//               {cart.items.map((currentProduct, idx) => (
//                 <CartProduct
//                   key={idx}
//                   id={currentProduct.id}
//                   quantity={currentProduct.quantity}
//                 ></CartProduct>
//               ))}

//               <Typography variant="h6" component="div" sx={{ mt: 2 }}>
//                 Total: ${cart.getTotalCost().toFixed(2)}
//               </Typography>

//               <Button variant="contained" onClick={checkout} sx={{ mt: 2 }}>
//                 Purchase items!
//               </Button>
//             </>
//           ) : (
//             <Typography variant="h6" component="div" sx={{ mt: 2 }}>
//               The cart is empty!
//             </Typography>
//           )}
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default NavbarComponent;
