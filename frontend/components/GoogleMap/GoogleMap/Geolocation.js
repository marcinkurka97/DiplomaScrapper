import React from "react";
import GoogleMap from "./GoogleMap";

class Geolocation extends React.Component {
  constructor() {
    super();
    this.state = {
      myLatLng: {
        lat: 50.264821,
        lng: 19.01105
      }
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          myLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    } else {
      this.setState({
        myLatLng: {
          lat: 50.264821,
          lng: 19.01105
        }
      });
    }
  }

  render() {
    return (
      <GoogleMap myLatLng={this.state.myLatLng} scrapes={this.props.scrapes} />
    );
  }
}

export default Geolocation;
