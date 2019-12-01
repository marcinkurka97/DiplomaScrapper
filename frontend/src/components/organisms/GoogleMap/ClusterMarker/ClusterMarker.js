import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
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
  // eslint-disable-line react/prefer-stateless-function
  state = {
    clusterFaceMarkers: this.props.points.slice(0, 1),
  };

  render() {
    return (
      // Creating marker group with HomeIcon and Quantity
      <MarkerGroup
        length={this.props.points.length}
        hoverState={this.props.hoverState}
        hoverIdState={this.props.hoverIdState}
        markerId={this.props.markerId}
        points={this.props.points}
      >
        {this.state.clusterFaceMarkers.map(marker => (
          <Marker key={marker.id} lat={marker.lat} lng={marker.lng} name={marker.id} inGroup />
        ))}
        {this.props.points.length > 1 && (
          <MarkerCounter>+{this.props.points.length - 1}</MarkerCounter>
        )}
      </MarkerGroup>
    );
  }
}

ClusterMarker.propTypes = {
  points: PropTypes.array,
  users: PropTypes.instanceOf(List),
  selected: PropTypes.bool,
};

export default ClusterMarker;
