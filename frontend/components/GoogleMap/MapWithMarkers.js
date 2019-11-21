import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React from "react";

class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  displayMarkers = scrapes => {
    console.log(scrapes);
    return scrapes.scrapes.olxScrape.map((offer, index) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          markerImg={offer.img}
          markerTitle={offer.title}
          markerPrice={offer.price}
          markerLink={offer.link}
          key={index}
          id={index}
          position={{
            lat: offer.lat,
            lng: offer.long
          }}
          icon={{
            url: "https://img.icons8.com/dusk/64/000000/order-delivered.png"
          }}
        />
      );
    });
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const mapStyles = {
      width: "50vw",
      height: "90%"
    };
    const { scrapes } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{
          lat: this.props.currentLocation.lat,
          lng: this.props.currentLocation.lng
        }}
        onClick={this.onMapClicked}
      >
        {this.displayMarkers(scrapes)}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div className="marker-window">
            <img
              className="marker-window__img"
              src={this.state.selectedPlace.markerImg}
            />
            <div className="marker-window__right">
              <h4 className="marker-window__right__title">
                {this.state.selectedPlace.markerTitle}
              </h4>
              <p className="marker-window__right__price">
                {this.state.selectedPlace.markerPrice}
              </p>
              <a
                className="marker-window__right__link"
                href={this.state.selectedPlace.markerLink}
              >
                Przejdź do oferty
              </a>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAnkq6e5TAwYvqYd2ihCJvRt2Lk8rxOFtE"
})(MapContainer);
