import React from "react";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";
import Marker from "../Marker/Marker";
import ClusterMarker from "../ClusterMarker/ClusterMarker";
import styled from "styled-components";

const MapWrapper = styled.div`
  position: relative;
  width: 60vw;
  height: 100%;
`;

const MAP = {
  defaultZoom: 8,
  options: {
    maxZoom: 24
  }
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: this.props.myLatLng,
      zoom: MAP.defaultZoom
    },
    clusters: [],
    markers: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    });
  }

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    this.getScrapeData(this.props.scrapes);
  }

  getScrapeData = props => {
    const markersData = [];
    props.olxScrape.map((offer, index) => {
      markersData.push({
        id: index,
        lat: offer.lat,
        lng: offer.long,
        markerImg: offer.img,
        markerTitle: offer.title,
        markerPrice: offer.price,
        markerLink: offer.link
      });
    });

    this.setState({ markers: markersData });
    return markersData;
  };

  getClusters = () => {
    const clusters = supercluster(this.state.markers, {
      minZoom: 0,
      maxZoom: 24,
      radius: 20
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points
          }))
        : []
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={this.props.myLatLng}
          options={MAP.options}
          onChange={this.handleMapChange}
          onClick={this.onMapClicked}
          yesIWantToUseGoogleMapApiInternals
          onChildClick={this.onMarkerClick}
          bootstrapURLKeys={{ key: "AIzaSyAnkq6e5TAwYvqYd2ihCJvRt2Lk8rxOFtE" }}
        >
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  keyId={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                  markerImg={item.points[0].markerImg}
                  markerTitle={item.points[0].markerTitle}
                  markerPrice={item.points[0].markerPrice}
                  markerLink={item.points[0].markerLink}
                  showingInfoWindow={this.state.showingInfoWindow}
                  activeMarker={this.state.activeMarker}
                  selectedPlace={this.state.selectedPlace}
                />
              );
            }

            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
