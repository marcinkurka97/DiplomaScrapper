import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import Marker from "../Marker/Marker";
import styled from "styled-components";

const MarkerCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 8px;
  margin-left: -10px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  border-radius: 50%;
  background-color: #fff;
`;

const MarkerGroup = styled.div`
  display: flex;
  width: ${props => (props.length === 2 ? "55px" : "80px")};
`;

class ClusterMarker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    clusterFaceMarkers: this.props.points.slice(0, 1)
  };

  render() {
    return (
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
