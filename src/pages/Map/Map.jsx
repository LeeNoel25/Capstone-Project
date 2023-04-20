import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { Link } from 'react-router-dom'
// import Location from '../../../components/location';
import CurrentLocation from '../../components/Maps/currentLocation';
import Distance from '../../components/Maps/Distance';

const blackIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
});

const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const Map = () => {
  const [locations, setLocations] = useState([]);
  const [userLatitude, setMemberLatitude] = useState("");
  const [userLongitude, setMemberLongitude] = useState("");
  const initialPosition = [1.3521, 103.8198];
  const initialZoom = 12;
  const [streetViewImageUrl, setStreetViewImageUrl] = useState('');
  const [streetViewLocation, setStreetViewLocation] = useState(null);
  const [panorama, setPanorama] = useState(null);
  const mapRef = useRef();
  
  useEffect(() => {
    axios.get('/api/map').then(response => {
      setLocations(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  function getStreetViewImageUrl(lat, lng, radius) {
    const radiusParam = radius ? `&radius=${radius}` : '';
    const adjustedLat = lat + (Math.random() * radius * 2 - radius) * 0.0001;
    const adjustedLng = lng + (Math.random() * radius * 2 - radius) * 0.0001;
    const baseUrl = 'https://maps.googleapis.com/maps/api/streetview';
    const size = '300x200';
    const heading = '210';
    const pitch = '10';
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
    // const apiKey = 'AIzaSyDDDJIzJGH2EKzuO21LzTsg6Hxiyq04Tc4';
  
    const imageUrl = `${baseUrl}?size=${size}&location=${adjustedLat},${adjustedLng}&heading=${heading}&pitch=${pitch}&key=${apiKey}${radiusParam}`;
    setStreetViewImageUrl(imageUrl);
  }
  

    function handleShowStreetView(location) {
      const radius = 50
      setStreetViewImageUrl(null)
      getStreetViewImageUrl(Number(location.latitude), Number(location.longitude), radius);
    }

  const handleNewLocation = () => {
    axios.get('/api/map').then(response => {
      setLocations(response.data);
    }).catch(error => {
      console.error(error)
    })
  }

  const handleResetMap = () => {
    mapRef.current.setView(initialPosition, initialZoom);
  }

  console.log(userLatitude)
  console.log(userLongitude)

  return (
    <div className="row">
  
      <div className="col-lg-8 offset-lg-1">
        <MapContainer ref={mapRef} center={initialPosition} zoom={initialZoom} style={{ height: '400px', width: '100%', border: '1px solid black'}}>
          <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' maxZoom={15} attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
  
          {locations.map(location => (
            <Marker key={location._id} position={[location.latitude, location.longitude]} icon={blackIcon}>
              <Popup>
                <div>
                  <b>{location.name}</b>
                  <br />
                  <br />
                  <Link to={`https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`} target="_blank">Get directions</Link>
                  <br />
                  <br />
                  <button onClick={() => handleShowStreetView(location)}>Click me repeatedly to show all pictures nearby the area!</button>
                  <br />
                  <br />
                  {streetViewImageUrl && <img src={streetViewImageUrl} alt="Street View" />}
                  <button onClick={() => window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${location.latitude},${location.longitude}`, '_blank')}>Still lost? This could help</button>
                </div> 
              </Popup>
            </Marker>
          ))}
          
          <Marker position={[Number(userLatitude), Number(userLongitude)]} icon={greenIcon}>
            <Popup>
              <div>
                <b>Your current location</b>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
  
      <div className="col-lg-3">
        <Distance latitude={userLatitude} longitude={userLongitude} mapRef={mapRef} handleResetMap={handleResetMap}/>
        <CurrentLocation setMemberLatitude={setMemberLatitude} setMemberLongitude={setMemberLongitude} />
        <button onClick={handleResetMap} className="reset-map">Reset Map</button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Map;