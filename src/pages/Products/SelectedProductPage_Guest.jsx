import * as React from "react";
import { useEffect, useState, useContext } from "react";
import * as API from "../../utilities/api";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { CartContextNew } from "../OrderPage/CartContextNew";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

export default function SelectedProductPage({ products }) {
  const { productId } = useParams();
  const [product, setProduct] = React.useState(null);
  const cardContext = React.useContext(CartContextNew);

  React.useEffect(() => {
    refreshProduct();
  }, []);

  const refreshProduct = () => {
    API.getProductById(productId).then((productData) => {
      setProduct(productData);
    });
  };

  const addItemToCart = (item) => {
    props?.onAddItemToCart(item);
    cardContext.addCartItem(item);
  };

  return (
    <React.Fragment>
      {product && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              src={product.imgurl}
              alt={product.name}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ marginTop: "5px" }}>{product.brand}</div>
            <div style={{ fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>
              {product.name}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              ${(product.price / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "SGD",
              })}
            </div>
            <div style={{ marginTop: "10px" }}>Description: {product.description}</div>
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
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
