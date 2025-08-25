export const locationPermission = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Success callback: Access latitude and longitude
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Latitude:", latitude, "Longitude:", longitude);
      return latitude, longitude
      // Update state or perform actions with location data
    },
    (error) => {
      // Error callback: Handle permission denial or other issues
      console.error("Error getting location:", error.message);
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Optional options
  );
};

export const mediaPermission = () => {
  navigator.mediaDevices.getUserMedia({
    video: true,
  }
  ).then((stream) => {
    // Success callback: Handle the media stream
    console.log("Media stream obtained:", stream);
    // You can use the stream for audio/video recording or other purposes
  }).catch((error) => {
    // Error callback: Handle permission denial or other issues
    console.error("Error accessing media devices:", error.message);
  });
};
