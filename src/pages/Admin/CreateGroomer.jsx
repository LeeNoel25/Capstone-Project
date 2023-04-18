import { useEffect, useState } from "react";
import moment from 'moment'

export default function CreateGroomer() {
    const [name, setName] = useState('');
    const [locations, setLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchLocations() {
            try {
                const response = await fetch(`/api/map`);
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

    const handleSubmit = async (event) => {
        setSuccessMessage(null);
setErrorMessage(null);
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
            const createdGroomer = await response.json();
            console.log('New groomer created:', createdGroomer);
            setSuccessMessage("Groomer successfully created!");
        } catch (error) {
            setErrorMessage("Error creating groomer.");
            console.error('Error creating groomer:', error);
        }
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    return (
        <div className="">
            <h1>Create a new groomer!</h1>
            <form onSubmit={handleSubmit}>

                {successMessage && (
                    <p className="">{successMessage}</p>
                )}

                <div className="">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" className="" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

            <div className="">
                <label htmlFor="location">Location:</label>
                <select id="location" className="" value={selectedLocation} onChange={handleLocationChange}>
                    <option value="">Choose a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location._id}>{location.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="">Create</button>
        </form>
    </div>
);}