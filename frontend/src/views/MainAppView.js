import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
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
      filteredHomeOffers: [],
      hover: false,
      hoverId: '',
      geolocation: {},
      center: {},
      offers: [],
      currentActiveType: 'All',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.offers.length === 0) {
      state.offers = props.homeOffers.slice(0, OFFERS_CHUNK);
    }
    state.homeOffers = props.homeOffers;

    return props.homeOffers;
  }

  componentDidMount() {
    const { fetchHomeOffers } = this.props;
    fetchHomeOffers();
  }

  componentDidUpdate() {
    if (this.state.filteredHomeOffers.length === 0) {
      this.setState({ filteredHomeOffers: this.state.homeOffers });
    }
  }

  handleSettingOffersState = newOffers => {
    this.setState({ offers: newOffers });
  };

  callbackSettingGeolocation = childData => {
    this.setState({ geolocation: childData });
    this.setState({ center: childData });
  };

  onMouseEnterHandler = (objId, objLat, objLng) => {
    if (!this.state.hover) {
      this.setState({ hover: true });
      this.setState({ hoverId: objId });
      this.setState({ center: { lat: objLat, lng: objLng } });
    }
  };

  onMouseLeaveHandler = () => {
    if (this.state.hover) {
      this.setState({ hover: false });
      this.setState({ hoverId: '' });
    }
  };

  filterByType = offerType => {
    this.setState({ currentActiveType: offerType });
    if (offerType === 'All') {
      this.setState({ filteredHomeOffers: this.state.homeOffers });
    }

    const filteredOffers = this.state.homeOffers.filter(offer => {
      return offer.type === offerType;
    });

    this.setState({ filteredHomeOffers: filteredOffers });
  };

  render() {
    return (
      <AppWrapper>
        <Header />
        <FilterBar
          filterByType={this.filterByType}
          currentActiveType={this.state.currentActiveType}
        />
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
              scrapes={this.state.filteredHomeOffers}
              hoverState={this.state.hover}
              hoverIdState={this.state.hoverId}
              center={this.state.center}
              parentCallback={this.callbackSettingGeolocation}
            />
          </ListAndMapWrapper>
        ) : (
          <Loader>
            <div className="background" />
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
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
