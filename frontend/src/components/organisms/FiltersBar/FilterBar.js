import React from 'react';
import styled from '@emotion/styled';
import Button from '../../atoms/Button/Button';
import RangeSlider from '../../atoms/RangeSlider/RangeSlider';
import Input from '../../atoms/Input/Input';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import SearchBox from '../../molecules/SearchBox/SearchBox';
import DarkModeSwitch from '../../molecules/DarkModeSwitch/DarkModeSwitch';

const FilterBarWrapper = styled.div`
  position: relative;
  height: 17.5vh;
  background: ${({ theme }) => theme.backgroundGray};
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FilterBarRowOne = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  align-items: center;
`;

const TypeButtons = styled.div`
  display: flex;
  width: 30%;
`;

const StyledButton = styled(Button)`
  margin: 0 15px 0 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);
  background: ${({ theme, active, rent, sell, swap }) =>
    active && rent // eslint-disable-line no-nested-ternary
      ? theme.orange
      : active && sell // eslint-disable-line no-nested-ternary
      ? theme.green
      : active && swap
      ? theme.blue
      : theme.backgroundDarkGray};

  &:hover {
    background: ${({ theme, rent, sell, swap }) =>
      // eslint-disable-next-line no-nested-ternary
      rent ? theme.orange : sell ? theme.green : swap ? theme.blue : theme.orange};
  }
  transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const Price = styled.h3`
  width: 15%;
  display: flex;
  align-items: center;

  span {
    margin: 0 10px;
  }
`;

const StyledInput = styled(Input)`
  position: relative;
  width: 40%;
  height: 40px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);
  font-size: 16px;
  padding: 5px 15px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const FilterBarRowTwo = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  align-items: center;
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rangeValue: [0, 1.5] };
  }

  changeHandler = value => {
    const { priceChange } = this.props;
    this.setState({ rangeValue: value });
    priceChange(value);
  };

  render() {
    const {
      currentActiveType,
      filterByType,
      priceChange,
      mapsApiLoaded,
      mapInstance,
      mapsapi,
      filterByDistance,
      handleDurationChange,
      setDarkMode,
    } = this.props;
    const { rangeValue } = this.state;
    return (
      <FilterBarWrapper>
        <FilterBarRowOne>
          <TypeButtons>
            <StyledButton
              swap
              dark
              onClick={() => filterByType('All')}
              active={currentActiveType === 'All'}
            >
              All
            </StyledButton>
            <StyledButton
              rent
              dark
              onClick={() => filterByType('Mieszkania » Wynajem')}
              active={currentActiveType === 'Mieszkania » Wynajem'}
            >
              Wynajem
            </StyledButton>
            <StyledButton
              sell
              dark
              onClick={() => filterByType('Mieszkania » Sprzedaż')}
              active={currentActiveType === 'Mieszkania » Sprzedaż'}
            >
              Sprzedaż
            </StyledButton>
            <StyledButton
              swap
              dark
              onClick={() => filterByType('Mieszkania » Zamiana')}
              active={currentActiveType === 'Mieszkania » Zamiana'}
            >
              Zamiana
            </StyledButton>
          </TypeButtons>
          <Price>
            <StyledInput
              type="number"
              placeholder={`${rangeValue[0] * 1000} zł`}
              onChange={event => priceChange(event.target)}
              data-min
            />
            <span>-</span>
            <StyledInput
              type="number"
              placeholder={`${rangeValue[1] * 1000} zł`}
              onChange={event => priceChange(event.target)}
              data-max
            />
          </Price>
          <DarkModeSwitch setDarkMode={setDarkMode} />
        </FilterBarRowOne>
        <FilterBarRowTwo>
          {mapsApiLoaded && (
            <SearchBox
              mapInstance={mapInstance}
              mapsapi={mapsapi}
              filterByDistance={filterByDistance}
            />
          )}
          <RangeSlider rangeValue={rangeValue} changeHandler={this.changeHandler} />
          <Dropdown handleDurationChange={handleDurationChange} />
        </FilterBarRowTwo>
      </FilterBarWrapper>
    );
  }
}

export default FilterBar;
