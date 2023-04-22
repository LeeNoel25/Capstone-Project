// import {
//     createElementObject,
//     createPathComponent,
//     extendContext,
//   } from "@react-leaflet/core";
//   import L from "leaflet";
  
//   const createCircleMarker = ({ currentPosition }, context) => {
//     const circle = new L.CircleMarker(
//       [currentPosition.latitude, currentPosition.longitude],
//       {
//         radius: 7,
//         color: "#ffffff",
//         weight: 3,
//         opacity: 1.0,
//         fill: true,
//         fillColor: "#3e8cf9",
//         fillOpacity: 1.0,
//       }
//     );
//     return createElementObject(
//       circle,
//       extendContext(context, { overlayContainer: circle })
//     );
//   };
  
//   const CurrentPositionMarker = createPathComponent(createCircleMarker);
  
//   export default CurrentPositionMarker;
  