import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteProductBtn from "./DeleteProductBtn_Admin";

export default function ProductsForm({ products, delProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    let filteredProductsCopy = [...products];

    if (searchTerm) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p._id.toLowerCase().trim().includes(searchTerm.toLowerCase())
      );
    }
    setSortedProducts(filteredProductsCopy);
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="">
      <h3 className="">Product Portfolio</h3>
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <span className="">Search</span>
              <input
                type="text"
                className=""
                id="searchProductInput"
                placeholder="Enter Product name, id, category or brand"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="">
              <Link to="/productpage/new">
                <button className="">Add New Product</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <table className="">
            <thead className="">
              <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Product Id</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Category</th>
                <th scope="col">Product Brand</th>
                <th scope="col">Picture URL</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p._id}</td>
                  <td>${(p.price / 100).toFixed(2)}</td>
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td className="">{p.imgurl}</td>
                  <td className="">
                    <Link to={`/productpage/products/${p._id}/edit`}>
                      <button className="">Edit</button>
                    </Link>
                    <DeleteProductBtn id={p._id} delProduct={delProduct} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}