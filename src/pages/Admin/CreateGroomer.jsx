import { useEffect, useState } from "react";
import moment from 'moment'

export default function NewGroomer() {
    const [name, setName] = useState('');
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchLocations() {
            try {
                const response = await fetch(`/api/maps`);
                if (!response.ok) {
                    throw new Error("Failed to fetch locations");
                }
                const data = await response.json();
                setLocations(data)
            } catch (error) {
                console.error("Error fetching location:", error)
            }
        }
        fetchLocations()
    }, [])

    useEffect(() => {
        const today = moment().format("YYYY-MM-DD");
        setMinDate(today);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name,
            location: { id: selectedLocation },
        };
        try {
            const response = await fetch('/api/groomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Failed to create groomer');
            }
            const newgroomer = await response.json();
            console.log('New groomer created:', newgroomer);
            setSuccessMessage("Groomer successfully created!");
        } catch (error) {
            console.error('Error creating groomer:', error);
        }
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    return (
        <div className="container">
            <h1>Create a new groomer!</h1>
            <form onSubmit={handleSubmit}>

                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

            <div className="form-group">
                <label htmlFor="location">Location:</label>
                <select id="location" className="form-control" value={selectedLocation} onChange={handleLocationChange}>
                    <option value="">Choose a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location._id}>{location.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    </div>
);}