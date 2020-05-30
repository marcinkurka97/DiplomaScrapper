import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Header from '../../components/organisms/Header/Header';
import FilterBar from '../../components/organisms/FiltersBar/FilterBar';
import GoogleMap from '../../components/organisms/GoogleMap/GoogleMap/Geolocation';
import List from '../../components/organisms/ListView/List';
import { fetchItems } from '../../actions';
import { AppWrapper, ListAndMapWrapper, Loader } from './MainAppView.style';

export const GoogleMapContext = React.createContext();

const OFFERS_CHUNK = 20;

class MainAppView extends React.Component {
  priceChange = debounce(async value => {
    const { price } = this.state;

    const currPrice = price;
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
            min: parseInt(value.value, 10),
            max: currPrice.max,
          },
        }));
      }
      if (value.dataset.max) {
        await this.setState(prevState => ({
          price: {
            ...prevState.price,
            min: currPrice.min,
            max: parseInt(value.value, 10),
          },
        }));
      }
    }

    this.filterOffers();
  }, 1000);

  constructor(props) {
    super(props);
    this.state = {
      homeOffers: [],
      hover: false,
      hoverId: '',
      center: {},
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
      // Google Map
      mapsApiLoaded: false,
      mapInstance: null,
      mapsapi: null,
      darkModeEnabled: localStorage.getItem('dark') === 'true',
    };
  }

  // Assign props from redux to state
  static getDerivedStateFromProps(props, state) {
    if (state.offers.length === 0) {
      state.offers = props.homeOffers.slice(0, OFFERS_CHUNK);
    }
    state.homeOffers = props.homeOffers;

    return props.homeOffers;
  }

  // Call to redux reducer
  async componentDidMount() {
    const { fetchHomeOffers } = this.props;
    await fetchHomeOffers();

    // Initial fill filtered array with whole array
    const { homeOffers, filteredHomeOffers } = this.state;
    if (filteredHomeOffers.length === 0) {
      this.setState({ filteredHomeOffers: homeOffers });
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

  // Set darkMode state
  setDarkMode = value => {
    this.setState({ darkModeEnabled: value });
  };

  handleSettingOffersState = newOffers => {
    this.setState({ offers: newOffers });
  };

  // Callback function from geolocation children
  callbackSettingGeolocation = childData => {
    this.setState({ center: childData });
  };

  // Mouse enter handler for list view
  onMouseEnterHandler = (objId, objLat, objLng) => {
    const { hover } = this.state;

    if (!hover) {
      this.setState({ hover: true });
      this.setState({ hoverId: objId });
      this.setState({ center: { lat: objLat, lng: objLng } });
    }
  };

  // Mouse leave handler for list view
  onMouseLeaveHandler = () => {
    const { hover } = this.state;

    if (hover) {
      this.setState({ hover: false });
      this.setState({ hoverId: '' });
    }
  };

  // OnChange handler for changing dropdown date values
  handleDurationChange = async e => {
    await this.setState({ dateDuration: parseInt(e, 10) });
    this.filterOffers();
  };

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
    const {
      dateDuration,
      currentActiveType,
      radius,
      price,
      pinCenter,
      mapsapi,
      homeOffers,
    } = this.state;

    const filteredOffers = homeOffers.filter(offer => {
      // Parse string price to int value
      const splitedPrice = offer.price.split(' ');
      const intPrice = parseInt(splitedPrice.join(''), 10);

      // const dateArr = offer.date.split('-');

      // const monthNames = [
      //   'sty',
      //   'lut',
      //   'mar',
      //   'kwi',
      //   'maj',
      //   'cze',
      //   'lip',
      //   'sie',
      //   'wrz',
      //   'paź',
      //   'lis',
      //   'gru',
      // ];

      // const day = dateArr[0];
      // const month = monthNames.indexOf(dateArr[1]);
      // const year = dateArr[2];

      // const dateFormat = new Date(year, month, parseInt(day, 10) + 1)
      //   .toISOString()
      //   .replace(/T.*/, '')
      //   .split('-')
      //   .reverse()
      //   .join('-');

      // const today = new Date();
      // let lastXDays = new Date();

      // if (dateDuration === 1) {
      //   lastXDays = today;
      // } else {
      //   lastXDays.setDate(today.getDate() - dateDuration + 1);
      // }

      // Get distance from current offer to circle center
      if (pinCenter) {
        const distanceFromCenter = mapsapi.geometry.spherical.computeDistanceBetween(
          { lat: () => offer.position.lat, lng: () => offer.position.lng },
          pinCenter,
        );
        if (
          // dateFormat >=
          //   lastXDays
          //     .toISOString()
          //     .replace(/T.*/, '')
          //     .split('-')
          //     .reverse()
          //     .join('-') &&
          distanceFromCenter < radius - 100 &&
          (currentActiveType === 'All' ? offer.type : offer.type === currentActiveType) &&
          (offer.price !== '' ? intPrice >= price.min && intPrice <= price.max : offer)
        ) {
          return offer;
        }
      } else if (
        // dateFormat >=
        //   lastXDays
        //     .toISOString()
        //     .replace(/T.*/, '')
        //     .split('-')
        //     .reverse()
        //     .join('-') &&
        (currentActiveType === 'All' ? offer.type : offer.type === currentActiveType) &&
        (offer.price !== '' ? intPrice >= price.min && intPrice <= price.max : offer)
      ) {
        return offer;
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
    const {
      mapsApiLoaded,
      currentActiveType,
      mapInstance,
      mapsapi,
      filteredHomeOffers,
      offers,
      hover,
      hoverId,
      center,
      darkModeEnabled,
    } = this.state;
    return (
      <AppWrapper>
        <Header darkModeEnabled={darkModeEnabled} />

        <FilterBar
          filterByType={this.filterByType}
          filterByDistance={this.filterByDistance}
          currentActiveType={currentActiveType}
          mapsApiLoaded={mapsApiLoaded}
          mapInstance={mapInstance}
          mapsapi={mapsapi}
          priceChange={this.priceChange}
          handleDurationChange={this.handleDurationChange}
          setDarkMode={this.setDarkMode}
        />
        {filteredHomeOffers.length > 0 ? (
          <ListAndMapWrapper>
            <GoogleMapContext.Provider
              value={{
                filteredHomeOffers,
                hoverState: hover,
                hoverIdState: hoverId,
                center,
                setMapsApiLoaded: this.setMapsApiLoaded,
                setMapInstance: this.setMapInstance,
                setMapAPI: this.setMapAPI,
                darkModeEnabled,
              }}
            >
              <List
                filteredHomeOffers={filteredHomeOffers}
                onMouseEnter={this.onMouseEnterHandler}
                onMouseLeave={this.onMouseLeaveHandler}
                offers={offers}
                handleSettingOffersState={this.handleSettingOffersState}
              />
              <GoogleMap parentCallback={this.callbackSettingGeolocation} />
            </GoogleMapContext.Provider>
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
