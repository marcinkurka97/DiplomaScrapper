import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import HomeIcon from '../../../../assets/HomeIcon';

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

  ${props =>
    props.hoverState && props.hoverIdState === props.markerId
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

const scaleInCenter = keyframes`
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
`;

const MarkerInfoWindowWrapper = styled.div`
  position: relative;
  left: -150px;
  top: -160px;
  min-width: 350px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  transition: all 1s ease-out;
  animation: ${scaleInCenter} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  z-index: 10;

  .marker-window__img {
    width: 40%;
    height: 100%;
  }

  .marker-window__right {
    width: 55%;
    height: 100%;
    padding: 0 2.5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #000;

    .marker-window__title {
      font-size: 12px;
    }

    .marker-window__price {
      font-size: 16px;
      text-align: center;
    }

    .marker-window__link {
      font-size: 14px;
      text-align: center;
      text-decoration: none;
      font-weight: 500;
      transition: transform 0.2s ease-in;

      &:hover {
        color: #6d6d6d;
      }
    }
  }
`;

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  render() {
    return (
      <div>
        {/* If there is more than 1 marker nearby create group with marker icon and '+quantinty' */}
        {this.props.inGroup ? (
          <MarkerInGroupStyled>
            <HomeIcon colorType={this.props.colorType} />
          </MarkerInGroupStyled>
        ) : (
          <MarkerStyled
            hoverState={this.props.hoverState}
            hoverIdState={this.props.hoverIdState}
            markerId={this.props.markerId}
          >
            <HomeIcon colorType={this.props.markerType} />
          </MarkerStyled>
        )}
        {this.props.showingInfoWindow && this.props.keyId === this.props.selectedPlace && (
          <MarkerInfoWindowWrapper>
            <img
              alt={this.props.markerTitle}
              className="marker-window__img"
              src={this.props.markerImg}
            />
            <div className="marker-window__right">
              <h4 className="marker-window__right__title">{this.props.markerTitle}</h4>
              <p className="marker-window__right__price">{this.props.markerPrice}</p>
              <a className="marker-window__right__link" href={this.props.markerLink}>
                Przejdź do oferty
              </a>
            </div>
          </MarkerInfoWindowWrapper>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool,
};

export default Marker;
