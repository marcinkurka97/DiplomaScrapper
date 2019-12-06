import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import styled from 'styled-components';
import Marker from '../Marker/Marker';
import ClusterMarker from '../ClusterMarker/ClusterMarker';

const MapWrapper = styled.div`
  position: relative;
  width: 50vw;
  height: 100%;
`;

// Default options for Google Maps
const MAP = {
  defaultZoom: 8,
  options: {
    minZoom: 6,
    maxZoom: 24,
  },
};

export class GoogleMap extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mapOptions: {
        center: this.props.myLatLng,
        zoom: MAP.defaultZoom,
      },
      clusters: [],
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  // Load data on component mount
  componentDidMount() {
    this.getScrapeData(this.props.filteredHomeOffers);
  }

  // Rerender when new orders are added to list
  componentDidUpdate(prevProps) {
    if (prevProps.filteredHomeOffers.length !== this.props.filteredHomeOffers.length) {
      this.getScrapeData(this.props.filteredHomeOffers);
      this.handleMapChange(this.state.mapOptions);
    }
  }

  // Event handler for clicking on Marker (showing Info Window)
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  // Event handler for clickich on map (hiding Info Window)
  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  // Create markers object array (provided via props)
  getScrapeData = offers => {
    const markersData = [];
    // eslint-disable-next-line
    offers.map((offer, index) => {
      markersData.push({
        id: index,
        lat: offer.lat,
        lng: offer.long,
        markerId: offer.id,
        markerImg: offer.img,
        markerTitle: offer.title,
        markerPrice: offer.price,
        markerLink: offer.link,
        markerType: offer.type,
      });
    });

    this.setState({ markers: markersData });
    return markersData;
  };

  // Creating superclusters array from markers array
  getClusters = () => {
    const clusters = supercluster(this.state.markers, {
      minZoom: 0,
      maxZoom: 24,
      radius: 20,
    });
    return clusters(this.state.mapOptions);
  };

  // Filling clusters state with data from supercluster
  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [],
    });
  };

  // On every map change (zoom, dragging) rerender displayed clusters
  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      },
    );
  };

  // Send data to parent component
  apiIsLoaded = (map, maps) => {
    this.props.setMapInstance(map);
    this.props.setMapAPI(maps);
    this.props.setMapsApiLoaded();
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={{
            lat: 50.264821,
            lng: 19.01105,
          }}
          center={this.props.center}
          options={MAP.options}
          onChange={this.handleMapChange}
          onClick={this.onMapClicked}
          yesIWantToUseGoogleMapApiInternals
          onChildClick={this.onMarkerClick}
          bootstrapURLKeys={{
            key: 'AIzaSyAnkq6e5TAwYvqYd2ihCJvRt2Lk8rxOFtE',
            libraries: ['places', 'drawing'],
          }}
          style={{ zIndex: 5 }}
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        >
          {/* If there is only 1 marker nearby place Marker on map */}
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  keyId={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                  markerId={item.points[0].markerId}
                  markerImg={item.points[0].markerImg}
                  markerTitle={item.points[0].markerTitle}
                  markerPrice={item.points[0].markerPrice}
                  markerLink={item.points[0].markerLink}
                  markerType={item.points[0].markerType}
                  showingInfoWindow={this.state.showingInfoWindow}
                  activeMarker={this.state.activeMarker}
                  selectedPlace={this.state.selectedPlace}
                  hoverState={this.props.hoverState}
                  hoverIdState={this.props.hoverIdState}
                />
              );
            }

            // If there is more than 1 marker nearby place cluster on map instead
            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
                hoverState={this.props.hoverState}
                hoverIdState={this.props.hoverIdState}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
