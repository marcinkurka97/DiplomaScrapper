import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Header from '../components/organisms/Header/Header';
import FilterBar from '../components/organisms/FiltersBar/FilterBar';
import GoogleMap from '../components/organisms/GoogleMap/GoogleMap/Geolocation';
import List from '../components/organisms/ListView/List';
import { fetchItems } from '../actions';
import { theme } from '../theme/mainTheme';

const ListAndMapWrapper = styled.div`
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
      offers: [],
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

  render() {
    return this.state.offers.length > 0 ? (
      <AppWrapper>
        <Header />
        <FilterBar />
        <ListAndMapWrapper>
          <List
            scrapes={this.state.homeOffers}
            onMouseEnter={this.onMouseEnterHandler}
            onMouseLeave={this.onMouseLeaveHandler}
            offers={this.state.offers}
            handleSettingOffersState={this.handleSettingOffersState}
          />
          <GoogleMap
            scrapes={this.state.offers}
            hoverState={this.state.hover}
            hoverIdState={this.state.hoverId}
            center={this.state.center}
            parentCallback={this.callbackSettingGeolocation}
          />
        </ListAndMapWrapper>
      </AppWrapper>
    ) : (
      <span>Loading</span>
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
