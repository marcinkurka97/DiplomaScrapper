import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import RangeSlider from '../../atoms/RangeSlider/RangeSlider';
import Input from '../../atoms/Input/Input';
import { theme } from '../../../theme/mainTheme';
import SearchBox from '../../molecules/SearchBox/SearchBox';
import DarkModeSwitch from '../../molecules/DarkModeSwitch/DarkModeSwitch';

const FilterBarWrapper = styled.div`
  position: relative;
  height: 17.5vh;
  background: ${theme.light};
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
  width: 30%;
  display: flex;
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
  margin: 0 15px 0 0;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);
  background: ${({ theme, active, rent, sell, swap }) =>
    active && rent
      ? theme.orange
      : active && sell
      ? theme.green
      : active && swap
      ? theme.blue
      : 'initial'};

  &:hover {
    background: ${({ theme, rent, sell, swap }) =>
      rent ? theme.orange : sell ? theme.green : swap ? theme.blue : theme.orange};
  }
  transition: background 1s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const Price = styled.h3`
  width: 15%;
  margin-left: 100px;
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
    this.state = { rangeValue: [0, 1] };
  }

  changeHandler = value => {
    this.setState({ rangeValue: value });
  };

  render() {
    return (
      <FilterBarWrapper>
        <FilterBarRowOne>
          <TypeButtons>
            <StyledButton
              swap
              dark
              onClick={() => this.props.filterByType('All')}
              active={this.props.currentActiveType === 'All'}
            >
              All
            </StyledButton>
            <StyledButton
              rent
              dark
              onClick={() => this.props.filterByType('Mieszkania » Wynajem')}
              active={this.props.currentActiveType === 'Mieszkania » Wynajem'}
            >
              Wynajem
            </StyledButton>
            <StyledButton
              sell
              dark
              onClick={() => this.props.filterByType('Mieszkania » Sprzedaż')}
              active={this.props.currentActiveType === 'Mieszkania » Sprzedaż'}
            >
              Sprzedaż
            </StyledButton>
            <StyledButton
              swap
              dark
              onClick={() => this.props.filterByType('Mieszkania » Zamiana')}
              active={this.props.currentActiveType === 'Mieszkania » Zamiana'}
            >
              Zamiana
            </StyledButton>
          </TypeButtons>
          <Price>
            <StyledInput type="number" placeholder={`${this.state.rangeValue[0] * 1000} zł`} />
            <span>-</span>
            <StyledInput type="number" placeholder={`${this.state.rangeValue[1] * 1000} zł`} />
          </Price>
          <DarkModeSwitch />
        </FilterBarRowOne>
        <FilterBarRowTwo>
          {this.props.mapsApiLoaded && (
            <SearchBox
              mapInstance={this.props.mapInstance}
              mapsapi={this.props.mapsapi}
              filterByDistance={this.props.filterByDistance}
            />
          )}
          <RangeSlider rangeValue={this.state.rangeValue} changeHandler={this.changeHandler} />
        </FilterBarRowTwo>
      </FilterBarWrapper>
    );
  }
}

export default FilterBar;
