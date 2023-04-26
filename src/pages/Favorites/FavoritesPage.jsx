import * as React from "react";
import { useEffect, useState, useContext } from "react";
import * as API from "../../utilities/api";
import { CartContextNew } from "../OrderPage/CartContextNew";
import Banners from "../../components/NavBars/Banners.jsx";
import { Box, Container, TextField } from "@mui/material";
import { Link } from "react-router-dom";

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

  return <h1>test</h1>;
}
