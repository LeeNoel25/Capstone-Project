// import { useLeafletContext } from "@react-leaflet/core";
// import { useEffect, useState } from "react";
// import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
// import CurrentPositionMarker from "./CurrentPositionMarker";
// import StoreMarker from "./StoreMarker";

// const defaultCenter = [1.352638, 103.813529];
// const defaultZoom = 9.5;

// const StoreMap = ({ stores, currentPosition }) => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     if (!currentPosition) return;

//     const updateCenter = (latLong, zoom) => {
//       map.target.setView(latLong, zoom);
//     };

//     updateCenter([currentPosition.latitude, currentPosition.longitude], 12); // referenced https://egghead.io/lessons/react-change-the-location-of-a-react-leaflet-map-with-leaflet-s-flyto-and-setview  & https://stackoverflow.com/questions/65394203/leaflet-react-get-map-instance-in-functional-component to set up
//   }, [currentPosition]);

//   return (
//     <MapContainer
//       className="h-[30vh]"
//       whenReady={setMap}
//       center={defaultCenter}
//       zoom={defaultZoom}
//       scrollWheelZoom={false}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {currentPosition ? (
//         <CurrentPositionMarker currentPosition={currentPosition} />
//       ) : null}
//       {stores?.map((s) => (
//         <StoreMarker store={s} key={s._id} />
//       ))}
//     </MapContainer>
//   );
// };

// export default StoreMap;
