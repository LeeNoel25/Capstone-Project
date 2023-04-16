import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SelectedProductPage({ products }) {
  const { productName } = useParams();
  const [locationProduct, setLocationProduct] = useState([]);
  const product = products.filter((p) => p.name === productName);

  useEffect(() => {
    fetch(`/api/products/${productName}`)
      .then((response) => response.json())
      .then((data) => setLocationProduct(data))
      .catch((error) => console.error(error));
  }, [productName]);

  return (
    <>
      <div >
        <div >
          {product.map((p) => (
            <div key={p._id} className="row">
              <div >
                <img
                  className=""
                  src={p.imgurl}
                  alt={p.name}
                />
              </div>
              <div className="">
                <div className="">
                  <div className="">{p.brand}</div>
                  <div className="">{p.name}</div>
                  <div className="">
                    {(p.price / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "SGD",
                    })}
                  </div>
                  <div className="">
                    Description: {p.description}
                  </div>
                  <div className="">
                    <button
                      className=""
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      View Availability
                    </button>
                    <div
                      className=""
                      aria-labelledby="dropdownMenuButton"
                    >
                      <table className="">
                        <thead>
                          <tr>
                            <th>Store Name</th>
                            <th>Availability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locationProduct.map((lp, i) => (
                            <tr key={i}>
                              <td>{lp.name}</td>
                              <td>
                                {lp.productQty > 0 ? "Available" : "Not Available"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
