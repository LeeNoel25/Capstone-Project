import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductsPage() {
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByCategory, setSortByCategory] = useState("");
  
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
      setSortedProducts(filteredProductsCopy);
    }, [searchTerm, sortByCategory, sortByPrice, products]);
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    return (
        <div >
          <nav >
            <div >
              <div >
                <label>Search: </label>   
                <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search product or brand"/>
              </div>
              <div >
                <label>Sort by Price: </label>
                <select
                  value={sortByPrice}
                  onChange={(e) => setSortByPrice(e.target.value)}
                >
                  <option value="">All Products</option>
                  <option value="lowToHigh">Low to high</option>
                  <option value="highToLow">High to low</option>
                </select>
              </div>
              <div >
                <label>Sort by categories: </label>
                <select
                  value={sortByCategory}
                  onChange={(e) => setSortByCategory(e.target.value)}
                >
                  <option value="">All categories</option>
                  {category.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </nav>
    
          <div >
            {sortedProducts.map((product) => (
              <div key={product._id}>
                <Link to={`/products/${product.name}`}>
                  <img src={product.imgurl} alt={product.name} />
                  <div >
                    <h5>{product.brand} </h5>
                    <p>{product.name}</p>
                    <p>
                      {(product.price / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "SGD",
                      })}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
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