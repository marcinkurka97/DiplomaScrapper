import React from 'react';
import PropTypes from 'prop-types';
import Marker from '../Marker/Marker';
import { MarkerGroup, MarkerCounter } from './ClusterMarker.style';

class ClusterMarker extends React.PureComponent {
  constructor(props) {
    super(props);

    const { points } = this.props;

    this.state = {
      clusterFaceMarkers: points.slice(0, 1),
      colorType: '',
    };
  }

  componentDidMount() {
    this.mostMarkersTypeInCluster();
  }

  componentDidUpdate() {
    this.mostMarkersTypeInCluster();
  }

  mostMarkersTypeInCluster = () => {
    let rentCounter = 0;
    let sellCounter = 0;
    let swapCounter = 0;

    const { points } = this.props;

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
      this.setState({ colorType: 'Mieszkania » Wynajem' });
    } else if (sellCounter >= rentCounter && sellCounter >= swapCounter) {
      this.setState({ colorType: 'Mieszkania » Sprzedaż' });
    } else if (swapCounter >= rentCounter && swapCounter >= sellCounter) {
      this.setState({ colorType: 'Mieszkania » Zamiana' });
    }
  };

  render() {
    const { points, hoverState, hoverIdState, markerId } = this.props;
    const { clusterFaceMarkers, colorType } = this.state;
    return (
      // Creating marker group with HomeIcon and Quantity
      <MarkerGroup
        length={points.length}
        hoverState={hoverState}
        hoverIdState={hoverIdState}
        markerId={markerId}
        points={points}
      >
        {clusterFaceMarkers.map(marker => (
          <Marker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            name={marker.id}
            inGroup
            colorType={colorType}
          />
        ))}
        {points.length > 1 && <MarkerCounter>+{points.length - 1}</MarkerCounter>}
      </MarkerGroup>
    );
  }
}

ClusterMarker.defaultProps = {
  points: [],
};

ClusterMarker.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  points: PropTypes.array,
};

export default ClusterMarker;
