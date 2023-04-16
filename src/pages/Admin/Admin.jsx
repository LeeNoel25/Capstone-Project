import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Groomer from "./Groomer";
import NewGroomer from "./NewGroomer";

export default function Admin() {
  const [groomer, setgroomer] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setselectedLocation] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    console.log(JSON.stringify(adminToken))
    console.log(adminToken)

    if (adminToken) {
      // const isAdmin = JSON.parse(window.atob(adminToken.split(".")[1])).role === "admin";
      JSON.parse(window.atob(adminToken.split(".")[1])).member.role === "admin" ? setIsAuth(adminToken) : false
    } 
    axios.get("/api/maps").then((response) => {
      setLocations(response.data);
    });
  }, []);

  useEffect(() => {
    async function fetchgroomer() {
      try {
        if (isAuth && selectedLocation !== "") {
          const response = await axios.get(
            `/api/groomer/${selectedLocation}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setgroomer(response.data);
        }
      } catch (error) {
        console.error("Error fetching groomer:", error);
      }
    }
    fetchgroomer();
  }, [selectedLocation, isAuth]);

  const handleLocationChange = (event) => {
    setselectedLocation(event.target.value);
  };

  const handleDelete = async (id) => {
    const adminToken = localStorage.getItem("token");
    
    try {
      const response = await axios.delete(`/api/groomer/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      if (response.status === 200) {
        const updatedgroomer = groomer.filter(
          (groomer) => groomer._id !== id
        );
        setgroomer(updatedgroomer);
      }
    } catch (error) {
      console.error("Error deleting groomer:", error);
    }
  };

  function handleClick() {
    console.log("hi1");
    navigate("/newgroomer");
    console.log("hi2");
  }

  return (
    <>
      {!isAuth ? (
        <div className="centered-message">Access denied</div>
      ) : (
        <div className="container">
          <div className="row mt-4">
            <div className="col">
              <button className="btn btn-primary" onClick={handleClick}>
                Create New Groomer
              </button>
            </div>
            <div className="col">
              <h2>Select a location:</h2>
              <select
                className="form-select"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="">--Select a location--</option>
                {locations.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {groomer && groomer.length > 0 ? (
            <div className="row mt-4">
              <div className="col">
                <h2>groomer</h2>
                <ul className="list-group">
                  {groomer.map((groomer) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center Link"
                      key={groomer._id}
                    >
                      <Link to={`/groomer/${groomer._id}`}>
                        {groomer.name}
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(groomer._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="row mt-4">
              <div className="col">
                <p>No groomer found.</p>
              </div>
            </div>
          )}
        </div>
      )}
      <Routes>
        <Route path="/groomer/:id" element={<groomer />} />
        <Route path="/newgroomer" element={<NewGroomer />} />
      </Routes>
    </>
  );
}