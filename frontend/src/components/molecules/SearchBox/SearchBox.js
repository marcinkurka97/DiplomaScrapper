import React, { Component } from 'react';
import styled from 'styled-components';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import Input from '../../atoms/Input/Input';
import 'rc-slider/assets/index.css';
import { theme } from '../../../theme/mainTheme';

const SearchBoxContainer = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  width: 30%;
  height: 40px;
`;

const StyledInput = styled(Input)`
  width: 50%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);

  &:focus {
    outline: ${theme.blue} auto 1px;
  }
`;

// Create Slirder with text above it
const SliderWithTooltip = createSliderWithTooltip(Slider);

const StyledSliderWithTooltip = styled(SliderWithTooltip)`
  width: 25% !important;
  margin-left: 40px;
`;

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();

    this.state = {
      mapInstance: null,
      mapsapi: null,
      circles: [],
      markers: [],
      radius: 500,
      sliderValue: 0.5,
    };
  }

  // Assign props values to state before loading component
  static getDerivedStateFromProps(props, state) {
    if (state.mapInstance === null && state.mapsapi === null) {
      state.mapInstance = props.mapInstance;
      state.mapsapi = props.mapsapi;
    }

    return props.mapsapi;
  }

  // Assign Google map search bar to custom input by ref
  componentDidMount() {
    const {
      mapsapi: { places },
    } = this.props;

    this.searchBox = new places.SearchBox(this.searchInput.current);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  // Delete all event listeners from input
  componentWillUnmount() {
    const {
      mapsapi: { event },
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  // Get value from search input and place marker icon on that place and draw circle around it
  onPlacesChanged = () => {
    const { mapInstance, mapsapi, sliderValue } = this.state;
    let { markers, circles } = this.state;
    const { filterByDistance } = this.props;
    const places = this.searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Clear all previous markers from map
    // Only one marker will be displayed at specific time
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];

    this.setState({ markers });

    // Clear all previous circles from map
    // Only one circle will be displayed at specific time
    circles.forEach(circle => {
      circle.setMap(null);
    });
    circles = [];

    this.setState({ circles });

    // Bound for centering map on specific point
    const bounds = new mapsapi.LatLngBounds();

    // Map over all places and place marker and circle at place.location
    places.forEach(place => {
      if (!place.geometry) {
        return;
      }

      // Icon config
      const icon = {
        url: 'https://image.flaticon.com/icons/svg/684/684908.svg',
        size: new mapsapi.Size(142, 142),
        origin: new mapsapi.Point(0, 0),
        anchor: new mapsapi.Point(25, 50),
        scaledSize: new mapsapi.Size(50, 50),
      };

      // Add new marker to array
      markers.push(
        new mapsapi.Marker({
          map: mapInstance,
          icon,
          title: place.name,
          position: place.geometry.location,
        }),
      );

      this.setState({ markers });

      // Add new circle to array
      circles.push(
        new mapsapi.Circle({
          strokeColor: theme.orange,
          strokeOpacity: 0.5,
          strokeWeight: 4,
          fillColor: theme.orange,
          fillOpacity: 0.25,
          map: mapInstance,
          center: place.geometry.location,
          radius: 1000 * sliderValue,
        }),
      );

      this.setState({ circles });

      // Recenter map to this place
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    mapInstance.fitBounds(bounds);

    // Call to parent function which filters markers within cirle range
    filterByDistance(mapsapi, circles[0].radius, circles[0].center);
  };

  // OnChange event handler for slider component
  handleSliderChange = e => {
    const { mapsapi, radius, circles } = this.state;
    const { filterByDistance } = this.props;
    this.setState({ sliderValue: e });

    if (circles.length > 0) {
      this.setState({ radius: e * 1000 });

      const newCircle = circles;
      newCircle[0].setRadius(radius);

      this.setState({ circles: newCircle });

      filterByDistance(mapsapi, radius, circles[0].center);
    }
  };

  // Text displaying above slider
  distanceFormater = v => {
    return `Odległość: ${v} km`;
  };

  render() {
    const { sliderValue } = this.state;
    return (
      <SearchBoxContainer>
        <StyledInput search ref={this.searchInput} placeholder="Wyszukaj miejsce" type="text" />
        <StyledSliderWithTooltip
          onChange={this.handleSliderChange}
          tipFormatter={this.distanceFormater}
          tipProps={{ overlayClassName: 'foo' }}
          min={0.5}
          max={20}
          step={0.5}
          value={sliderValue}
          trackStyle={{ backgroundColor: theme.blue, height: 10 }}
          handleStyle={{
            border: 0,
            height: 24,
            width: 24,
            marginTop: -7,
            backgroundColor: theme.blue,
          }}
          railStyle={{ backgroundColor: '#dfe0df', height: 10 }}
        />
      </SearchBoxContainer>
    );
  }
}

export default SearchBox;
