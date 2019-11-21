import React, { Component } from "react";
import MapWithMarkers from "./MapWithMarkers";
import { ScrapeContext } from "../ScrapeContext";

export default class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: 50.2918689,
        lng: 19.1393377
      },
      isMarkerShown: false
    };
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    } else {
      this.setState({
        currentLatLng: {
          lat: 50.2918689,
          lng: 19.1393377
        }
      });
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <div>
        <ScrapeContext.Consumer>
          {props => {
            return (
              <MapWithMarkers
                scrapes={props}
                currentLocation={this.state.currentLatLng}
              />
            );
          }}
        </ScrapeContext.Consumer>
      </div>
    );
  }
}
