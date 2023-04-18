import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";

const token = localStorage.getItem("token");

export default function Edit() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [groomer, setgroomer] = useState();
  const [minDate, setMinDate] = useState("");
  const [locations, setLocations] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchgroomer() {
      try {
        const response = await fetch(`/api/groomer/edit/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch Booking");
        }
        const data = await response.json();
        setgroomer(data);
      } catch (error) {
        console.error("Error fetching Booking:", error);
      }
    }
    fetchgroomer();
  }, [id]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch(`/api/map`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    setMinDate(today);
  }, []);

  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;

      if (name === "location") {
        setgroomer((prevState) => ({
          ...prevState,
          location: { id: value },
        }));
      } else {
        setgroomer((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    setSuccessMessage(null);
    event.preventDefault();
    try {
      const response = await fetch(`/api/groomer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(groomer),
      });
      if (!response.ok) {
        throw new Error("Failed to update groomer");
      }
      setSuccessMessage("Groomer updated successfully!");
      console.log("Groomer updated successfully!");
    } catch (error) {
      console.error("Error updating groomer:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          {groomer && (
            <form onSubmit={handleSubmit}>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}

              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={handleInputChange}
                  defaultValue={groomer[0].name}
                  required
                  />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <select
                  name="location"
                  className="form-control"
                  defaultValue={groomer[0].location._id}
                  onChange={handleInputChange} required>
                    <option value="">--Select Location--</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

        <div className="form-group">
        <label htmlFor="workingSchedule.startDate">Start Date: </label>
          <input
            type="date"
            name="workingSchedule.startDate"
            placeholder="YYYY-MM-DD"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            className="form-control"
            onChange={handleInputChange}
            defaultValue={moment(groomer[0].workingSchedule.startDate).format("YYYY-MM-DD")}
            min={minDate}
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="workingSchedule.endDate">End Date: </label>
          <input
            type="date"
            name="workingSchedule.endDate"
            placeholder="YYYY-MM-DD"
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
            className="form-control"
            onChange={handleInputChange}
            defaultValue={moment(groomer[0].workingSchedule.endDate).format("YYYY-MM-DD")}
            min={minDate}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="workingHours.startTime">Start Time:</label>
          <input
            type="time"
            name="workingHours.startTime"
            className="form-control"
            placeholder="HH:MM"
            pattern="^([01]\d|2[0-3]):([0-5]\d)$"
            onChange={handleInputChange}
            defaultValue={groomer[0].workingHours.startTime}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="workingHours.endTime">End Time:</label>
          <input
            type="time"
            name="workingHours.endTime"
            className="form-control"
            placeholder="HH:MM"
            pattern="^([01]\d|2[0-3]):([0-5]\d)$"
            onChange={handleInputChange}
            defaultValue={groomer[0].workingHours.endTime}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="breakTime.startTime">Break Start Time:</label>
          <input
            type="time"
            name="breakTime.startTime"
            className="form-control"
            placeholder="HH:MM"
            pattern="^([01]\d|2[0-3]):([0-5]\d)$"
            onChange={handleInputChange}
            defaultValue={groomer[0].breakTime.startTime}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="breakTime.endTime">Break End Time:</label>
          <input
            type="time"
            name="breakTime.endTime"
            className="form-control"
            placeholder="HH:MM"
            pattern="^([01]\d|2[0-3]):([0-5]\d)$"
            onChange={handleInputChange}
            defaultValue={groomer[0].breakTime.endTime}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    )}
  </div>
</div>
  </div>
  );
}
