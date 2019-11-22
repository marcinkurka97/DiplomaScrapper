import React from "react";
import PropTypes from "prop-types";
import HomeIcon from "../HomeIcon";
import styled from "styled-components";

const MarkerInGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-left: -7px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
`;

const MarkerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false
  };

  render() {
    return (
      <div>
        {this.props.inGroup ? (
          <MarkerInGroupStyled>
            <HomeIcon scale="0.55" />
          </MarkerInGroupStyled>
        ) : (
          <MarkerStyled>
            <HomeIcon scale="0.55" />
            {this.props.showInfoWindow && (
              <div
                style={{
                  width: '100px',
                  height: '100px'
                }}
              >Info window</div>
            )}
          </MarkerStyled>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool
};

export default Marker;
