import * as React from "react";
import { useEffect, useState, useContext } from "react";
import * as API from "../../utilities/api";
import { CartContextNew } from "../OrderPage/CartContextNew";
import Banners from "../../components/NavBars/Banners.jsx";
import { Box, Container, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function FavoritesPage({ memberId }) {
  const [favorites, setFavorites] = React.useState([]);
  const cartContext = React.useContext(CartContextNew);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    refreshPage();
  }, []);

  const refreshPage = () => {
    API.getFavorites(memberId, token)
      .then((favoriteData) => {
        console.log(favoriteData);
        setFavorites(favoriteData);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  };

  const removeProductFromFavorites = (productId) => {
    API.removeFavorite(memberId, productId, token)
      .then(() => {
        refreshPage();
      })
      .catch((error) => {
        console.error("Error removing product from favorites:", error);
      });
  };

  return (
    <React.Fragment>
      <Banners />
      <Container>
        <Box mt={4}>
          <h1>Favorites</h1>
          {favorites.map((favorite) => {
            return (
              <Box
                key={favorite._id}
                sx={{
                  display: "inline-block",
                  border: "1px solid grey",
                  height: "400px",
                  width: "180px",
                  m: "10px",
                  p: "10px",
                  textAlign: "left",
                }}
              >
                <Link to={`/product/${favorite._id}`} key={favorite._id}>
                  <Box>
                    <img
                      src={favorite.imgurl}
                      style={{
                        width: "180px",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box sx={{ fontSize: "14px", color: "#555555", mt: 1 }}>
                    {favorite.brand}
                  </Box>
                  <Box sx={{ mt: 1, height: "32px", color: "black" }}>
                    {favorite.name}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      mt: 2,
                      color: "black",
                    }}
                  >
                    {(favorite.price / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Box>
                </Link>
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      removeProductFromFavorites(favorite._id);
                    }}
                  >
                    Remove from Favorites
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </React.Fragment>
  );
}
