import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Header from '../components/organisms/Header/Header';
import FilterBar from '../components/organisms/FiltersBar/FilterBar';
import GoogleMap from '../components/organisms/GoogleMap/GoogleMap/Geolocation';
import List from '../components/organisms/ListView/List';
import { fetchItems } from '../actions';
import { theme } from '../theme/mainTheme';
import LoaderBackground from '../assets/loaderBackground.png';

const ListAndMapWrapper = styled.div`
  position: relative;
  height: 70vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${theme.light};
`;

const AppWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ldsRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.span`
  position: relative;
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${LoaderBackground});
    background-size: cover;
    filter: blur(3px);
    z-index: -1;
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 120px;
    height: 120px;
    filter: blur(0);
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 96px;
    height: 96px;
    margin: 12px;
    border: 12px solid ${theme.blue};
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${theme.blue} transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const OFFERS_CHUNK = 20;

class MainAppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeOffers: [],
      hover: false,
      hoverId: '',
      geolocation: {},
      center: {},
      myLatLng: {
        lat: 50.264821,
        lng: 19.01105,
      },
      offers: [],
      // Filtering offers
      filteredHomeOffers: [],
      currentActiveType: 'All',
      dateDuration: 3,
      radius: 0,
      pinCenter: null,
      price: {
        min: 0,
        max: Infinity,
      },
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
    };
  }

  // Assign props from redux to state
  static getDerivedStateFromProps(props, state) {
    if (state.offers.length === 0) {
      state.offers = props.homeOffers.slice(0, OFFERS_CHUNK);
    }
    state.homeOffers = props.homeOffers.slice(0, 500);

    return props.homeOffers;
  }

  // Call to redux reducer
  componentDidMount() {
    const { fetchHomeOffers } = this.props;
    fetchHomeOffers();
  }

  // Initial fill filtered array with whole array
  componentDidUpdate() {
    if (this.state.filteredHomeOffers.length === 0) {
      this.setState({ filteredHomeOffers: this.state.homeOffers });
    }
  }

  // Helper functions (state setters)
  setMapsApiLoaded = () => {
    this.setState({ mapsApiLoaded: true });
  };

  setMapInstance = mapInst => {
    this.setState({ mapInstance: mapInst });
  };

  setMapAPI = mapAPI => {
    this.setState({ mapsapi: mapAPI });
  };

  handleSettingOffersState = newOffers => {
    this.setState({ offers: newOffers });
  };

  // Callback function from geolocation children
  callbackSettingGeolocation = childData => {
    this.setState({ geolocation: childData });
    this.setState({ center: childData });
  };

  // Mouse enter handler for list view
  onMouseEnterHandler = (objId, objLat, objLng) => {
    if (!this.state.hover) {
      this.setState({ hover: true });
      this.setState({ hoverId: objId });
      this.setState({ center: { lat: objLat, lng: objLng } });
    }
  };

  // Mouse leave handler for list view
  onMouseLeaveHandler = () => {
    if (this.state.hover) {
      this.setState({ hover: false });
      this.setState({ hoverId: '' });
    }
  };

  // OnChange handler for changing dropdown date values
  handleDurationChange = async e => {
    await this.setState({ dateDuration: parseInt(e) });
    this.filterOffers();
  };

  priceChange = debounce(async value => {
    const currPrice = this.state.price;
    if (Array.isArray(value)) {
      await this.setState(prevState => ({
        price: {
          ...prevState.price,
          min: value[0] * 1000,
          max: value[1] * 1000,
        },
      }));
    } else {
      if (value.dataset.min) {
        await this.setState(prevState => ({
          price: {
            ...prevState.price,
            min: parseInt(value.value),
            max: currPrice.max,
          },
        }));
      }
      if (value.dataset.max) {
        await this.setState(prevState => ({
          price: {
            ...prevState.price,
            min: currPrice.min,
            max: parseInt(value.value),
          },
        }));
      }
    }

    this.filterOffers();
  }, 1000);

  // Filtering by offer type ('Wynajem','Sprzedaz','Zamiana')
  filterByType = async offerType => {
    await this.setState({ currentActiveType: offerType });
    this.filterOffers();
  };

  // Check if markers are within radius range
  filterByDistance = async (mapsapi, radius, pinCenter) => {
    await this.setState({ mapsapi });
    await this.setState({ radius });
    await this.setState({ pinCenter });

    this.filterOffers();
  };

  // Accumulated filter
  filterOffers = () => {
    const filteredOffers = this.state.homeOffers.filter(offer => {
      // Parse string price to int value
      const splited = offer.price.split(' ');
      const intPrice = parseInt(splited.join(''));

      const dateArr = offer.date.split('-');

      const monthNames = [
        'sty',
        'lut',
        'mar',
        'kwi',
        'maj',
        'cze',
        'lip',
        'sie',
        'wrz',
        'paź',
        'lis',
        'gru',
      ];

      let day = dateArr[0];
      let month = monthNames.indexOf(dateArr[1]);
      let year = dateArr[2];

      const dateFormat = new Date(year, month, parseInt(day) + 1)
        .toISOString()
        .replace(/T.*/, '')
        .split('-')
        .reverse()
        .join('-');

      const today = new Date();
      let lastXDays = new Date();

      if (this.state.dateDuration === 1) {
        lastXDays = today;
      } else {
        lastXDays.setDate(today.getDate() - this.state.dateDuration + 1);
      }

      // Get distance from current offer to circle center
      if (this.state.pinCenter) {
        const distanceFromCenter = this.state.mapsapi.geometry.spherical.computeDistanceBetween(
          { lat: () => offer.lat, lng: () => offer.long },
          this.state.pinCenter,
        );
        if (
          dateFormat >=
            lastXDays
              .toISOString()
              .replace(/T.*/, '')
              .split('-')
              .reverse()
              .join('-') &&
          distanceFromCenter < this.state.radius - 100 &&
          (this.state.currentActiveType === 'All'
            ? offer.type
            : offer.type === this.state.currentActiveType) &&
          (offer.price !== ''
            ? intPrice >= this.state.price.min && intPrice <= this.state.price.max
            : offer)
        ) {
          return offer;
        }
      } else {
        if (
          dateFormat >=
            lastXDays
              .toISOString()
              .replace(/T.*/, '')
              .split('-')
              .reverse()
              .join('-') &&
          (this.state.currentActiveType === 'All'
            ? offer.type
            : offer.type === this.state.currentActiveType) &&
          (offer.price !== ''
            ? intPrice >= this.state.price.min && intPrice <= this.state.price.max
            : offer)
        ) {
          return offer;
        }
      }

      return null;
    });

    if (filteredOffers.length > 0) {
      this.setState({ filteredHomeOffers: filteredOffers });
    } else {
      this.setState({ filteredHomeOffers: [0] });
    }
  };

  render() {
    return (
      <AppWrapper>
        <Header />
        {this.state.mapsApiLoaded ? (
          <FilterBar
            filterByType={this.filterByType}
            filterByDistance={this.filterByDistance}
            currentActiveType={this.state.currentActiveType}
            mapsApiLoaded={this.state.mapsApiLoaded}
            mapInstance={this.state.mapInstance}
            mapsapi={this.state.mapsapi}
            priceChange={this.priceChange}
            handleDurationChange={this.handleDurationChange}
          />
        ) : (
          'Loading'
        )}
        {this.state.filteredHomeOffers.length > 0 ? (
          <ListAndMapWrapper>
            <List
              filteredHomeOffers={this.state.filteredHomeOffers}
              onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
              offers={this.state.offers}
              handleSettingOffersState={this.handleSettingOffersState}
            />
            <GoogleMap
              filteredHomeOffers={this.state.filteredHomeOffers}
              hoverState={this.state.hover}
              hoverIdState={this.state.hoverId}
              center={this.state.center}
              parentCallback={this.callbackSettingGeolocation}
              setMapsApiLoaded={this.setMapsApiLoaded}
              setMapInstance={this.setMapInstance}
              setMapAPI={this.setMapAPI}
            />
          </ListAndMapWrapper>
        ) : (
          <Loader>
            <div className="background" />
            <div className="lds-ring">
              <div />
              <div />
              <div />
              <div />
            </div>
          </Loader>
        )}
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { homeOffers } = state;
  return { homeOffers };
};

const mapDispatchToProps = dispatch => ({
  fetchHomeOffers: () => dispatch(fetchItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainAppView);
