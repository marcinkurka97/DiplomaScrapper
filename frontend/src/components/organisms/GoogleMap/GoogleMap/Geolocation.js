import React from 'react';
import GoogleMap from './GoogleMap';

class Geolocation extends React.Component {
  constructor() {
    super();
    this.state = {
      myLatLng: {
        lat: 50.264821,
        lng: 19.01105,
      },
    };
  }

  componentDidMount() {
    this.getLocation();
    this.sendDataToParent();
  }

  // Get current location if user agrees to share his location
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          myLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      // If geolocation isn't working on current browser or user decline to share location, set default location to Katowice
      this.setState({
        myLatLng: {
          lat: 50.264821,
          lng: 19.01105,
        },
      });
    }
  }

  sendDataToParent = () => {
    const { parentCallback } = this.props;
    const { myLatLng } = this.state;
    parentCallback(myLatLng);
  };

  render() {
    const { myLatLng } = this.state;
    const {
      filteredHomeOffers,
      hoverState,
      hoverIdState,
      center,
      filterByDistance,
      setMapsApiLoaded,
      setMapInstance,
      setMapAPI,
    } = this.props;
    return (
      <GoogleMap
        myLatLng={myLatLng}
        filteredHomeOffers={filteredHomeOffers}
        hoverState={hoverState}
        hoverIdState={hoverIdState}
        center={center}
        filterByDistance={filterByDistance}
        setMapsApiLoaded={setMapsApiLoaded}
        setMapInstance={setMapInstance}
        setMapAPI={setMapAPI}
      />
    );
  }
}

export default Geolocation;
