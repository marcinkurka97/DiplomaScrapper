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

  sendDataToParent = () => {
    this.props.parentCallback(this.state.myLatLng);
  };

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

  render() {
    return (
      <GoogleMap
        myLatLng={this.state.myLatLng}
        scrapes={this.props.scrapes}
        hoverState={this.props.hoverState}
        hoverIdState={this.props.hoverIdState}
        center={this.props.center}
      />
    );
  }
}

export default Geolocation;
