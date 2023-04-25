import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as API from "../../utilities/api";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { CartContextNew } from "../OrderPage/CartContextNew";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Banners from "../../components/NavBars/Banners.jsx";

export default function ProductsPage(props) {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const cardContext = React.useContext(CartContextNew);
  const { category, initialSortByCategory } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByCategory, setSortByCategory] = useState(initialSortByCategory);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  React.useEffect(() => {
    refreshPage();
  }, []);

  const refreshPage = () => {
    API.getProducts().then((productData) => {
      console.log(productData);
      setProducts(productData);
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const addItemToCart = (item) => {
    props?.onAddItemToCart(item);
    cardContext.addCartItem(item);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    let filteredProductsCopy = [...products];
    if (sortByCategory) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (p) => p.category === sortByCategory
      );
    }
    if (sortByPrice === "lowToHigh") {
      filteredProductsCopy.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "highToLow") {
      filteredProductsCopy.sort((a, b) => b.price - a.price);
    }
    if (searchTerm) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filteredProductsCopy);
  }, [searchTerm, sortByCategory, sortByPrice, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <Banners />
      <div>
        {filteredProducts.map((product) => {
          return (
            <div
              key={product._id}
              style={{
                display: "inline-block",
                border: "1px solid grey",
                height: "340px",
                width: "200px",
                margin: "0px 0px 10px 10px",
                padding: "10px",
              }}
            >
              <Link to={`/product/${product._id}`} key={product._id}>
                <div>
                  <img
                    src={product.imgurl}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#555555",
                    marginTop: "5px",
                  }}
                >
                  {product.brand}
                </div>
                <div
                  style={{ marginTop: "5px", height: "32px", color: "black" }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginTop: "10px",
                    color: "black",
                  }}
                >
                  ${product.price}
                </div>
              </Link>
              <div>
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
              </div>
            </div>
          );
        })}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ bottom: "calc(100% - 100px)" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Item added to cart!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
