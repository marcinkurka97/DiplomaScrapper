import React from 'react';
import PropTypes from 'prop-types';
import HomeIcon from '../../../../assets/HomeIcon';
import { MarkerInGroupStyled, MarkerStyled, MarkerInfoWindowWrapper } from './Marker.style';

const Marker = ({
  inGroup,
  colorType,
  hoverIdState,
  hoverState,
  markerId,
  showingInfoWindow,
  keyId,
  selectedPlace,
  markerTitle,
  markerImg,
  markerPrice,
  markerLink,
  markerType,
}) => {
  return (
    <div>
      {/* If there is more than 1 marker nearby create group with marker icon and '+quantinty' */}
      {inGroup ? (
        <MarkerInGroupStyled id="marker-grouped">
          <HomeIcon colorType={colorType} />
        </MarkerInGroupStyled>
      ) : (
        <MarkerStyled
          id="marker-solo"
          hoverState={hoverState}
          hoverIdState={hoverIdState}
          markerId={markerId}
        >
          <HomeIcon colorType={markerType} />
        </MarkerStyled>
      )}
      {showingInfoWindow && keyId === selectedPlace && (
        <MarkerInfoWindowWrapper id="info-window">
          <img alt={markerTitle} className="marker-window__img" src={markerImg} />
          <div className="marker-window__right">
            <h4 className="marker-window__right__title">{markerTitle}</h4>
            <p className="marker-window__right__price">{markerPrice}</p>
            <a className="marker-window__right__link" href={markerLink}>
              Przejdź do oferty
            </a>
          </div>
        </MarkerInfoWindowWrapper>
      )}
    </div>
  );
};

Marker.defaultProps = {
  inGroup: false,
};

Marker.propTypes = {
  inGroup: PropTypes.bool,
};

export default Marker;
