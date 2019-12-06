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

const mapStyles =
  localStorage.getItem('dark') === 'true'
    ? [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [
            {
              color: '#222222',
            },
          ],
        },
        {
          featureType: 'all',
          elementType: 'labels.text',
          stylers: [
            {
              color: '#eeeeee',
            },
            {
              visibility: 'simplified',
            },
          ],
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry',
          stylers: [
            {
              color: '#263b3e',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#38414e',
            },
          ],
        },
      ]
    : '';

// Default options for Google Maps
const MAP = {
  defaultZoom: 8,
  options: {
    minZoom: 6,
    maxZoom: 24,
  },
  styles: mapStyles,
};

class GoogleMap extends React.PureComponent {
  constructor(props) {
    super(props);

    const { myLatLng } = this.props;

    this.state = {
      mapOptions: {
        center: myLatLng,
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
    const { filteredHomeOffers } = this.props;
    this.getScrapeData(filteredHomeOffers);
  }

  // Rerender when new orders are added to list
  componentDidUpdate(prevProps) {
    const { filteredHomeOffers } = this.props;
    const { mapOptions } = this.state;
    if (prevProps.filteredHomeOffers.length !== filteredHomeOffers.length) {
      this.getScrapeData(filteredHomeOffers);
      this.handleMapChange(mapOptions);
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
    const { showingInfoWindow } = this.state;
    if (showingInfoWindow) {
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
    const { markers, mapOptions } = this.state;
    const clusters = supercluster(markers, {
      minZoom: 0,
      maxZoom: 24,
      radius: 20,
    });
    return clusters(mapOptions);
  };

  // Filling clusters state with data from supercluster
  createClusters = props => {
    const { mapOptions } = this.state;
    this.setState({
      clusters: mapOptions.bounds
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
    const { setMapInstance, setMapAPI, setMapsApiLoaded } = this.props;
    setMapInstance(map);
    setMapAPI(maps);
    setMapsApiLoaded();
  };

  render() {
    const { center, hoverState, hoverIdState } = this.props;
    const { clusters, showingInfoWindow, activeMarker, selectedPlace } = this.state;
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={{
            lat: 50.264821,
            lng: 19.01105,
          }}
          center={center}
          options={MAP}
          onChange={this.handleMapChange}
          onClick={this.onMapClicked}
          yesIWantToUseGoogleMapApiInternals
          onChildClick={this.onMarkerClick}
          bootstrapURLKeys={{
            key: 'AIzaSyAnkq6e5TAwYvqYd2ihCJvRt2Lk8rxOFtE',
            libraries: ['places', 'drawing'],
          }}
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        >
          {/* If there is only 1 marker nearby place Marker on map */}
          {clusters.map(item => {
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
                  showingInfoWindow={showingInfoWindow}
                  activeMarker={activeMarker}
                  selectedPlace={selectedPlace}
                  hoverState={hoverState}
                  hoverIdState={hoverIdState}
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
                hoverState={hoverState}
                hoverIdState={hoverIdState}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
