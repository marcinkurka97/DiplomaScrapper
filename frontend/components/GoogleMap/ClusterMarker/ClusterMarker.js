import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import Marker from "../Marker/Marker";
import styled from "styled-components";

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
    content: "";
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

const MarkerGroup = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
`;

class ClusterMarker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    clusterFaceMarkers: this.props.points.slice(0, 1)
  };

  render() {
    return (
      // Creating marker group with HomeIcon and Quantity
      <MarkerGroup length={this.props.points.length}>
        {this.state.clusterFaceMarkers.map(marker => (
          <Marker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            name={marker.id}
            inGroup
          />
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
  selected: PropTypes.bool
};

export default ClusterMarker;
