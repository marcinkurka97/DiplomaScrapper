import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBox extends Component {
  static propTypes = {
    mapsapi: PropTypes.shape({
      places: PropTypes.shape({
        SearchBox: PropTypes.func,
      }),
      event: PropTypes.shape({
        clearInstanceListeners: PropTypes.func,
      }),
    }).isRequired,
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Search...',
    onPlacesChanged: null,
  };

  constructor(props) {
    super(props);

    this.searchInput = React.createRef();

    this.state = {
      map: null,
      mapsapi: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.map === null && state.mapsapi === null) {
      state.map = props.map;
      state.mapsapi = props.mapsapi;
    }

    return props.mapsapi;
  }

  componentDidMount() {
    const {
      mapsapi: { places },
    } = this.props;

    this.searchBox = new places.SearchBox(this.searchInput.current);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    const {
      mapsapi: { event },
    } = this.props;

    event.clearInstanceListeners(this.searchBox);
  }

  onPlacesChanged = () => {
    const { onPlacesChanged } = this.props;

    if (onPlacesChanged) {
      onPlacesChanged(this.searchBox.getPlaces());
    }

    const places = this.searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    var bounds = new this.state.mapsapi.LatLngBounds();

    places.forEach(place => {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }

      var icon = {
        url: place.icon,
        size: new this.state.mapsapi.Size(142, 142),
        origin: new this.state.mapsapi.Point(0, 0),
        anchor: new this.state.mapsapi.Point(17, 34),
        scaledSize: new this.state.mapsapi.Size(50, 50),
        style: { zIndex: 999999 },
      };

      new this.state.mapsapi.Marker({
        map: this.state.map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
      });

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.state.map.fitBounds(bounds);
  };

  render() {
    const { placeholder } = this.props;

    return (
      <input
        ref={this.searchInput}
        placeholder={placeholder}
        type="text"
        style={{
          width: '392px',
          height: '48px',
          fontSize: '20px',
          padding: '12px',
        }}
      />
    );
  }
}

export default SearchBox;
