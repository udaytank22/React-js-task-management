import { Children, createContext, useContext, useEffect, useState } from "react";


// utils/location.js
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};



const UserLocaion = createContext();

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getUserLocation()
      .then((loc) => {
        setLocation(loc);
      })
      .catch((error) => {
        console.error("Error getting location:", error.message);
      });
  }, []);


  return (
    <UserLocaion.Provider value={{ location }}>
      {children}
    </UserLocaion.Provider>
  )
}

// cuatom hook for accessing location
export const useUserLocation = () => {
  return useContext(UserLocaion);
}

