import { useEffect } from "react";

const CurrentLocation = ({ setMemberLatitude, setMemberLongitude }) => {

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude, position.coords.longitude)
        setMemberLatitude(position.coords.latitude);
        setMemberLongitude(position.coords.longitude);
      });
    }
  }, [setMemberLatitude, setMemberLongitude]);

  return null;
};

export default CurrentLocation;