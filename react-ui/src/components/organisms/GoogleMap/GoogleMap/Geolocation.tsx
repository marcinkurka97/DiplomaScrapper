import React, { useState, useEffect, useCallback } from 'react';
import GoogleMap from './GoogleMap';
import { GeolocationProps } from './GoogleMap.types';

const Geolocation: React.FC<GeolocationProps> = ({ parentCallback }) => {
  const [myLatLng, setMyLatLng] = useState({
    lat: 50.264821,
    lng: 19.01105,
  });

  // Get current location if user agrees to share his location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setMyLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      // If geolocation isn't working on current browser or user declined to share location, set default location to Katowice
      setMyLatLng({
        lat: 50.264821,
        lng: 19.01105,
      });
    }
  };

  const sendDataToParent = useCallback(() => {
    parentCallback(myLatLng);
  }, [parentCallback, myLatLng]);

  useEffect(() => {
    getLocation();
    sendDataToParent();
  }, [sendDataToParent]);

  return <GoogleMap myLatLng={myLatLng} />;
};

export default Geolocation;
