import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect } from "react";
import { useUserLocation } from "../context/UserLocation";

const Map = () => {

  const { location } = useUserLocation();

  const containerStyle = {
    width: '100%',
    height: '100%'
  }


  const center = {
    lat: 28.6139, // Example: New Delhi
    lng: 77.2090
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuUVyHOxiZyUIvBIvsZg6O_ZiedhxW0FA">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location || center}
        zoom={10}
      >
        <Marker position={location || center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
