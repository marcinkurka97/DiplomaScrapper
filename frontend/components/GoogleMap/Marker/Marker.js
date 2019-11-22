import React from "react";
import PropTypes from "prop-types";
import HomeIcon from "../HomeIcon";
import styled from "styled-components";

const MarkerInGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50x;
  height: 50px;
  margin-left: -7px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
`;

const MarkerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;

  svg {
    transition: transform 0.3s;
  }

  svg:hover {
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
            <HomeIcon />
          </MarkerInGroupStyled>
        ) : (
          <MarkerStyled>
            <HomeIcon />
            {this.props.showingInfoWindow && this.props.keyId === this.props.selectedPlace && (
              <div className="marker-window">
                <img
                  className="marker-window__img"
                  src={this.props.markerImg}
                />
                <div className="marker-window__right">
                  <h4 className="marker-window__right__title">
                    {this.props.markerTitle}
                  </h4>
                  <p className="marker-window__right__price">
                    {this.props.markerPrice}
                  </p>
                  <a
                    className="marker-window__right__link"
                    href={this.props.markerLink}
                  >
                    Przejdź do oferty
                  </a>
                </div>
              </div>
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
