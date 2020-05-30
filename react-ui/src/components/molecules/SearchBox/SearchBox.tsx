import React, { useState, useEffect, useRef } from 'react';
import 'rc-slider/assets/index.css';
import { theme as MainTheme } from '../../../theme/mainTheme';
import { SearchBoxContainer, StyledInput, StyledSliderWithTooltip } from './SearchBox.style';
import { SearchBoxProps } from './SearchBox.types';

const SearchBox: React.FC<SearchBoxProps> = ({ mapInstance, mapsapi, filterByDistance }) => {
  const searchInput = useRef(null);
  let searchBox: any;
  const [circles, setCircles] = useState<any>();
  const [radius, setRadius] = useState(500);
  const [sliderValue, setSliderValue] = useState(0.5);

  // Assign Google map search bar to custom input by ref
  useEffect(() => {
    // eslint-disable-next-line
    searchBox = new mapsapi.places.SearchBox(searchInput.current);
    searchBox.addListener('places_changed', onPlacesChanged);

    // Delete all event listeners from input
    return () => {
      if (mapsapi.event) mapsapi.event.clearInstanceListeners(searchBox);
    };
  }, []);

  // Get value from search input and place marker icon on that place and draw circle around it
  const onPlacesChanged = () => {
    let circlesCopy = circles;
    const places = searchBox.getPlaces();

    if (!places.length) return;

    // Bound for centering map on specific point
    const bounds = new mapsapi.LatLngBounds();

    // Map over all places and place marker and circle at place.location
    places.forEach((place: any) => {
      if (!place.geometry) {
        return;
      }

      // Add new marker to array
      new mapsapi.Marker({
        map: mapInstance,
        icon: {
          url: 'https://image.flaticon.com/icons/svg/684/684908.svg',
          size: new mapsapi.Size(142, 142),
          origin: new mapsapi.Point(0, 0),
          anchor: new mapsapi.Point(25, 50),
          scaledSize: new mapsapi.Size(50, 50),
        },
        title: place.name,
        position: place.geometry.location,
      });

      // Add new circle to array
      circlesCopy = new mapsapi.Circle({
        strokeColor: MainTheme.orange,
        strokeOpacity: 0.5,
        strokeWeight: 4,
        fillColor: MainTheme.orange,
        fillOpacity: 0.25,
        map: mapInstance,
        center: place.geometry.location,
        radius: 1000 * sliderValue,
      });

      setCircles(circlesCopy);

      // Recenter map to this place
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    mapInstance.fitBounds(bounds);

    // Call to parent function which filters markers within cirle range
    filterByDistance(mapsapi, radius, circlesCopy.center);
  };

  // OnChange event handler for slider component
  const handleSliderChange = (e: any) => {
    setSliderValue(e);

    if (!circles) return;

    setRadius(e * 1000);

    const newCircle = circles;
    newCircle.setRadius(radius);

    setCircles(newCircle);

    filterByDistance(mapsapi, radius, circles.center);
  };

  return (
    <SearchBoxContainer>
      <StyledInput ref={searchInput} search placeholder="Wyszukaj miejsce" type="text" />
      <StyledSliderWithTooltip
        onChange={handleSliderChange}
        tipFormatter={(v: number) => `Odległość: ${v} km`}
        tipProps={{ overlayClassName: 'foo' }}
        min={0.5}
        max={20}
        step={0.5}
        value={sliderValue}
        trackStyle={{ backgroundColor: MainTheme.blue, height: 10 }}
        handleStyle={{
          border: 0,
          height: 24,
          width: 24,
          marginTop: -7,
          backgroundColor: MainTheme.blue,
        }}
      />
    </SearchBoxContainer>
  );
};

export default SearchBox;
