import React, { useState, useEffect, useCallback } from 'react';
import Marker from '../Marker/Marker';
import { MarkerGroup, MarkerCounter } from './ClusterMarker.style';
import { ClusteMarkerProps } from './ClusterMarker.types';

const ClusterMarker: React.FC<ClusteMarkerProps> = ({ points, hoverState, hoverIdState }) => {
  const [clusterFaceMarkers] = useState(points.slice(0, 1));
  const [colorType, setColorType] = useState('');

  const mostMarkersTypeInCluster = useCallback(() => {
    let rentCounter = 0;
    let sellCounter = 0;
    let swapCounter = 0;

    points.map(point => {
      if (point.markerType === 'Mieszkania » Wynajem') {
        rentCounter += 1;
      }
      if (point.markerType === 'Mieszkania » Sprzedaż') {
        sellCounter += 1;
      }
      if (point.markerType === 'Mieszkania » Zamiana') {
        swapCounter += 1;
      }
      return null;
    });

    if (rentCounter >= sellCounter && rentCounter >= swapCounter) {
      setColorType('Mieszkania » Wynajem');
    } else if (sellCounter >= rentCounter && sellCounter >= swapCounter) {
      setColorType('Mieszkania » Sprzedaż');
    } else if (swapCounter >= rentCounter && swapCounter >= sellCounter) {
      setColorType('Mieszkania » Zamiana');
    }
  }, [points]);

  useEffect(() => {
    mostMarkersTypeInCluster();
  }, [mostMarkersTypeInCluster]);

  return (
    // Creating marker group with HomeIcon and Quantity
    <MarkerGroup hoverState={hoverState} hoverIdState={hoverIdState} points={points}>
      {clusterFaceMarkers.map(marker => (
        <Marker key={marker.id} inGroup colorType={colorType} />
      ))}
      {points.length > 1 && <MarkerCounter>+{points.length - 1}</MarkerCounter>}
    </MarkerGroup>
  );
};

export default ClusterMarker;
