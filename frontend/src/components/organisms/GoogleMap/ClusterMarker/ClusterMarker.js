import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import Marker from '../Marker/Marker';

const MarkerCounter = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  padding: 0 10px 0 5px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  border-bottom-right-radius: 100px;
  border-top-right-radius: 100px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  background-color: #fff;
  left: -10%;
  z-index: -1;

  &:before {
    box-sizing: initial;
    content: '';
    position: absolute;
    height: 100%;
    width: 25px;
    left: -52%;
    background: #fff;
    z-index: -2;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }
`;

const bounce = keyframes`
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: scale(1) translateY(0);
  }
  40% {
    transform: scale(1.25) translateY(-20px);
  }
  60% {
    transform: scale(1.125) translateY(-10px);
  }
`;

const MarkerGroup = styled.div`
  position: relative;
  top: -48px;
  left: -17px;
  display: flex;
  align-items: center;
  width: 70px;

  ${props =>
    props.hoverState && props.points.some(obj => obj.markerId === props.hoverIdState)
      ? css`
          position: relative;
          transform: scale(1.5);
          animation-name: ${bounce};
          animation-duration: 1.5s;
          animation-fill-mode: both;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          z-index: 5;
        `
      : ''}
`;

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
