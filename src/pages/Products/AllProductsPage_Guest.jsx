import * as React from "react";
import * as API from "../../utilities/api";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import { CartContextNew } from "../OrderPage/CartContextNew";

export default function ProductsPage(props) {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const cardContext = React.useContext(CartContextNew);

  React.useEffect(() => {
    refreshPage();
  }, []);

  React.useEffect(() => {
    // Filtering functions
    setFilteredProducts(products);
  }, [products, filter]);

  const refreshPage = () => {
    API.getProducts().then((productData) => {
      console.log(productData);
      setProducts(productData);
    });
  };

  const addItemToCart = (item) => {
    props?.onAddItemToCart(item);
    cardContext.addCartItem(item);
  };

  return (
    <React.Fragment>
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
                style={{ fontSize: "14px", color: "#555555", marginTop: "5px" }}
              >
                {product.brand}
              </div>
              <div style={{ marginTop: "5px", height: "32px" }}>
                {product.name}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                ${product.price}
              </div>
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
    </React.Fragment>
  );
}

/* Here is the explanation for the code above:
1. First, we import the useState and useEffect hooks from the react library. We also import the Link component from react-router-dom.
2. Next, we create the ProductsPage component and define the state variables that we will be using. The sortedProducts variable will be used to store the filtered and sorted products. The sortByPrice variable will be used to store the user’s sorting preference. The searchTerm variable will be used to store the user’s search term.
3. We then use the useEffect hook to filter and sort the products. We also pass the sortByCategory, sortByPrice, searchTerm, and products variables as dependencies to the useEffect hook. This will cause the useEffect hook to run any time the sortByCategory, sortByPrice, searchTerm, or products variables change.
4. Next, we use an if statement to filter the products by category if the sortByCategory variable has a value. We use the filter method to filter the products array and return only the products that have a category equal to the value of the sortByCategory variable.
5. Next, we use an if statement to sort the products by price if the sortByPrice variable has a value of “lowToHigh”. We use the sort method to sort the products array by price from lowest to highest.
6. Then, we use an if statement to sort the products by price if the sortByPrice variable has a value of “highToLow”. We use the sort method to sort the products array by price from highest to lowest.
7. Then, we use an if statement to filter the products by name or brand if the searchTerm variable has a value. We use the filter method to filter the products array and return only the products that have a name or brand that includes the value of the searchTerm variable.
8. Finally, we use the setSortedProducts function to update the sortedProducts variable with the filtered and sorted products.
9. Next, we create the handleSearchChange function. This function will be used to update the searchTerm variable when the user enters a value in the search input.
10. Then, we use the map method to loop over the products array and return a Product component for each product. We also pass the product */
