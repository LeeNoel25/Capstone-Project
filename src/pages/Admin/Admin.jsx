import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Groomer from "./Groomer";
import CreateGroomer from "./CreateGroomer";

export default function Admin() {
  const [groomers, setGroomers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    console.log(JSON.stringify(adminToken))
    console.log(adminToken)

    if (adminToken) {
      JSON.parse(window.atob(adminToken.split(".")[1])).member.role === "admin" && setIsAuth(adminToken);
    } 
    axios.get("/api/map").then((response) => {
      setLocations(response.data);
    });
  }, []);

  useEffect(() => {
    async function fetchGroomers() {
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
          setGroomers(response.data);
        }
      } catch (error) {
        console.error("Error fetching groomers:", error);
      }
    }
    fetchGroomers();
  }, [selectedLocation, isAuth]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
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
        const updatedGroomers = groomers.filter(
          (groomer) => groomer._id !== id
        );
        setGroomers(updatedGroomers);
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
        <div className="">Access denied</div>
      ) : (
        <div className="">
          <div className="">
            <div className="">
              <button className="" onClick={handleClick}>
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
            <div className="">
              <div className="">
                <h2>groomer</h2>
                <ul className="">
                  {groomer.map((groomer) => (
                    <li
                      className=""
                      key={groomer._id}
                    >
                      <Link to={`/groomer/${groomer._id}`}>
                        {groomer.name}
                      </Link>
                      <button
                        className=""
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
            <div className="">
              <div className="">
                <p>No groomer found.</p>
              </div>
            </div>
          )}
        </div>
      )}
      <Routes>
        <Route path="/groomer/:id" element={<Groomer />} />
        <Route path="/newgroomer" element={<CreateGroomer />} />
      </Routes>
    </>
  );
}