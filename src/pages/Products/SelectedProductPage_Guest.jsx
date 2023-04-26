import * as React from "react";
import { useState} from "react";
import * as API from "../../utilities/api";
import { CartContextNew } from "../OrderPage/CartContextNew";
import { useParams } from "react-router-dom";
// CSS ---------------------------------------------------------------------
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SelectedProductPage({ onAddItemToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = React.useState(null);
  const cardContext = React.useContext(CartContextNew);
  const [snackbarOpenCart, setSnackbarOpenCart] = useState(false);
  const [snackbarOpenFavorites, setSnackbarOpenFavorites] = useState(false);

  React.useEffect(() => {
    refreshProduct();
  }, []);

  const refreshProduct = () => {
    API.getProductById(productId).then((productData) => {
      setProduct(productData);
    });
  };

  const addItemToCart = (item) => {
    onAddItemToCart(item);
    cardContext.addCartItem(item);
    setSnackbarOpenCart(true);
  };

  const addProductToFavorites = (item) => {
    const memberId = localStorage.getItem("memberId");
    const token = localStorage.getItem("token");
    API.addFavorite(memberId, item._id, token)
      .then(() => {
        setSnackbarOpenFavorites(true);
      })
      .catch((error) => {
        console.error("Error adding product to favorites:", error);
      });
  };

  return (
    <React.Fragment>
      {product && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              src={product.imgurl}
              alt={product.name}
              style={{ width: "80%", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ marginTop: "5px" }}>{product.brand}</div>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}
            >
              {product.name}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              $
              {(product.price / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "SGD",
              })}
            </div>
            <div style={{ marginTop: "10px" }}>
              Description: {product.description}
            </div>
            <Button
              variant="outlined"
              style={{ marginTop: "20px" }}
              startIcon={<AddShoppingCartIcon />}
              onClick={() => {
                addItemToCart(product);
              }}
            >
              Add To Cart
            </Button>
            <Button
              variant="outlined"
              style={{ marginTop: "20px", marginLeft: "10px" }}
              startIcon={<FavoriteIcon />}
              onClick={() => {
                addProductToFavorites(product);
              }}
            >
              Favorite
            </Button>
          </Grid>
        </Grid>
      )}
      <Snackbar
        open={snackbarOpenCart}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") setSnackbarOpenCart(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ bottom: "calc(100% - 100px)" }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason !== "clickaway") setSnackbarOpenCart(false);
          }}
          severity="success"
        >
          Item added to cart!
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarOpenFavorites}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") setSnackbarOpenFavorites(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ bottom: "calc(100% - 100px)" }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason !== "clickaway") setSnackbarOpenFavorites(false);
          }}
          severity="success"
        >
          Item added to favorites!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
