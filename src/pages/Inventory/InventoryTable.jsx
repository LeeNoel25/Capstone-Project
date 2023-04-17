import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditInventory from "./EditInventory";

export default function InventoryTable() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [locationsData, setLocationsData] = useState([]);
  const [locationName, setLocationName] = useState(state?.locationName || "");
  const [conditions, setConditions] = useState({
    searchProductKeyword: "",
  });
  const [selectedLocationData, setSelectedLocationData] = useState(null);

  const initalizeLocationsData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/location", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLocationsData(data);
      if (locationName) {
        const selectedLocation = data.find(
          (locationData) => locationData.name === locationName
        );
        setSelectedLocationData(selectedLocation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = (e) => {
    const name = e.target.value;
    setLocationName(name);
    const selectedLocation = locationsData.find(
      (locationData) => locationData.name === name
    );
    setSelectedLocationData(selectedLocation);
  };

  const renderLocationsOption = () => {
    return locationsData.map((locationData) => (
      <option value={locationData.name} key={locationData.name}>
        {locationData.name}
      </option>
    ));
  };

  const handleDelete = async (locationId, productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `/api/location/${locationId}/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        initalizeLocationsData();
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTableContent = () => {
    const token = localStorage.getItem("token");
    if (!selectedLocationData) return null;

    const keyword = conditions.searchProductKeyword.toLowerCase().trim();
    const productsData = selectedLocationData.products;
    const filteredData = keyword
      ? productsData.filter((productData) => {
          const productDetail = productData.productDetails;
          return (
            productDetail._id.toLowerCase().trim().includes(keyword) ||
            productDetail.brand.toLowerCase().trim().includes(keyword) ||
            productDetail.name.toLowerCase().trim().includes(keyword)
          );
        })
      : productsData;
    return (
      <tbody>
        {filteredData.map((product) => {
          const productQty = product.productQty;
          const productDetails = product.productDetails;
          return (
            <tr key={`${productDetails._id}${selectedLocationData._id}`}>
              <td>{productDetails.name}</td>
              <td>{productDetails._id}</td>
              <td>{productDetails.brand}</td>
              <td>{productQty}</td>
              <td className="actionsTableData">
                <EditInventory
                  productQty={productQty}
                  onSubmitSuccess={async (newProductQty) => {
                    const response = await fetch(
                      `/api/location/${selectedLocationData._id}/products/${productDetails._id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          productQty: newProductQty,
                        }),
                      }
                    );
                    initalizeLocationsData();
                  }}
                ></EditInventory>
                <button
                  className=""
                  onClick={() =>
                    handleDelete(selectedLocationData._id, productDetails._id)
                  }
                >
                  Remove Product
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const handleSearchProduct = (e) => {
    const searchProductKeyword = e.target.value;
    setConditions((prevState) => ({
      ...prevState,
      searchProductKeyword,
    }));
  };

  const redirectAddPage = () => {
    navigate("/location/edit", {
      state: { selectedLocationData, locationsData },
    });
  };

  //Triggered when the component first load
  useEffect(() => {
    initalizeLocationsData();
  }, []);

  return (
    <div className="">
      <h3 className="">Inventory Management</h3>
      {locationsData && locationsData.length ? (
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <span className="">Location</span>
                <select
                  className=""
                  value={locationName}
                  onChange={(e) => handleLocationChange(e)}
                >
                  <option value="" key="">
                    Select a location
                  </option>
                  ,{renderLocationsOption()}
                </select>
              </div>
            </div>
          </div>
          <div className=""></div>
          <div className="">
            {locationName ? (
              <div className="">
                <div className="">
                  <div className="">
                    <span className="">Search</span>
                    <input
                      type="text"
                      className=""
                      placeholder="Enter Product name, id or brand"
                      onChange={handleSearchProduct}
                    ></input>
                  </div>
                  <button
                    className=""
                    onClick={redirectAddPage}
                  >
                    Add Product
                  </button>
                </div>
                <table className="">
                  <thead>
                    <tr className="">
                      <th scope="col">Product Name</th>
                      <th scope="col">Product Id</th>
                      <th scope="col">Product Brand</th>
                      <th scope="col">Product Quantity</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  {renderTableContent()}
                </table>
              </div>
            ) : (
              <div className="">Please select a location</div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}