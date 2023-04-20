import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { noPharmIcon} from "./MapIcons";

const LOW_STOCK_LEVEL = 10;

const StoreMarker = ({ store }) => {
  const [icon, setIcon] = useState(noPharmIcon);
  const [popUp, setPopUp] = useState([]);

  useEffect(() => {
    if (store.stocks > 0) {
      if (store.stocks >= LOW_STOCK_LEVEL && store.pharmacists.length > 0) {
        setIcon(medPharmIcon);
        setPopUp(["Medicine Available", "Pharmacist Available"]);
      } else if (store.stocks > 0 && store.pharmacists.length > 0) {
        setIcon(lowMedPharmIcon);
        setPopUp(["Low Stock", "Pharmacist Available"]);
      } else if (
        store.stocks >= LOW_STOCK_LEVEL &&
        store.pharmacists.length === 0
      ) {
        setIcon(medNoPharmIcon);
        setPopUp("Medicine Available", "Pharmacist Not Available");
      } else if (store.stocks > 0 && store.pharmacists.length === 0) {
        setIcon(lowMedNoPharmIcon);
        setPopUp(["Low Stock", "Pharmacist Not Available"]);
      }
    } else if (store.pharmacists.length > 0) {
      setIcon(pharmIcon);
      setPopUp(["Pharmacist Available", ""]);
    }
  }, [store]);

  const handleClick = () => {
    //to sort array of stores and bubble current one up to top
  };

  return (
    <Marker position={[store.lat, store.lon]} icon={icon}>
      <Popup>
        <h4>{store.name}</h4>
        {/* <p>{store.streetAddress}</p>
        <p>{store?.unitNumber}</p>
        <p>{store.postalCode}</p> */}
        {popUp[0]}
        <br />
        {popUp[1]}
      </Popup>
    </Marker>
  );
};

export default StoreMarker;
