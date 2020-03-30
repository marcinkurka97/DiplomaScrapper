import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';
import Marker from '../Marker/Marker';
import ClusterMarker from '../ClusterMarker/ClusterMarker';
import { MapWrapper, mapDarkStyles, mapLightStyles } from './GoogleMap.style';
import { GoogleMapContext } from '../../../../views/MainAppView/MainAppView';

// Default options for Google Maps
const MAP = {
  defaultZoom: 8,
  options: {
    minZoom: 6,
    maxZoom: 24,
  },
};

const GoogleMap = ({ myLatLng }) => {
  const mapRef = useRef();
  const [mapOptions, setMapOptions] = useState({
    center: myLatLng,
    zoom: MAP.defaultZoom,
  });
  const [clusters, setClusters] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const {
    filteredHomeOffers,
    setMapInstance,
    setMapAPI,
    setMapsApiLoaded,
    center,
    darkModeEnabled,
    hoverState,
    hoverIdState,
  } = useContext(GoogleMapContext);

  const onMarkerClick = (props, marker) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  // Event handler for clickich on map (hiding Info Window)
  const onMapClicked = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  // Create markers object array (provided via props)
  const getScrapeData = offers => {
    const markersData = offers.map((offer, index) => {
      if (offer !== 0) {
        return {
          id: index,
          lat: offer.position.lat,
          lng: offer.position.lng,
          markerId: offer.id,
          markerImg: offer.img,
          markerTitle: offer.title,
          markerPrice: offer.price,
          markerLink: offer.link,
          markerType: offer.type,
        };
      }
      return null;
    });

    setMarkers(markersData);
    return markersData;
  };

  // Creating superclusters array from markers array
  const getClusters = useCallback(() => {
    const clusters = supercluster(markers, {
      minZoom: 0,
      maxZoom: 24,
      radius: 20,
    });
    return clusters(mapOptions);
  }, [mapOptions, markers]);

  // Filling clusters state with data from supercluster
  const createClusters = useCallback(
    props => {
      const newClusters = mapOptions.bounds
        ? getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [];

      setClusters(newClusters);
    },
    [getClusters, mapOptions.bounds],
  );

  // On every map change (zoom, dragging) rerender displayed clusters
  const handleMapChange = useCallback(
    ({ center, zoom, bounds }) => {
      setMapOptions({
        center,
        zoom,
        bounds,
      });
      createClusters(this.props);
    },
    [createClusters],
  );

  // Send data to parent component
  const apiIsLoaded = (map, maps) => {
    setMapInstance(map);
    setMapAPI(maps);
    setMapsApiLoaded();
  };

  // Rerender when new orders are added to list
  useEffect(() => {
    getScrapeData(filteredHomeOffers);
    handleMapChange(mapOptions);
  }, [filteredHomeOffers]);

  return (
    <MapWrapper>
      <GoogleMapReact
        ref={mapRef}
        defaultZoom={MAP.defaultZoom}
        defaultCenter={{
          lat: 50.264821,
          lng: 19.01105,
        }}
        center={center}
        options={{
          options: MAP.options,
          styles:
            (localStorage.getItem('dark') === 'true' ? mapDarkStyles : mapLightStyles) ||
            (darkModeEnabled ? mapDarkStyles : mapLightStyles),
        }}
        onChange={handleMapChange}
        onClick={onMapClicked}
        yesIWantToUseGoogleMapApiInternals
        onChildClick={onMarkerClick}
        bootstrapURLKeys={{
          key: 'AIzaSyAF-_e-JJwREzFyL4GsSBDxoqCxMPptirg',
          libraries: ['places', 'drawing'],
        }}
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
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
};

export default GoogleMap;
