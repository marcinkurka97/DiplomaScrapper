import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import { theme } from '../../../theme/mainTheme';
import SearchBox from '../GoogleMap/GoogleMap/SearchBox';

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

const FilterBarRowTwo = styled.div`
  width: 95%;
  height: 40%;
  display: flex;
  align-items: center;
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FilterBarWrapper>
        <FilterBarRowOne>
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
        </FilterBarRowOne>
        <FilterBarRowTwo>
          {this.props.mapsApiLoaded && (
            <SearchBox
              mapInstance={this.props.mapInstance}
              mapsapi={this.props.mapsapi}
              filterByDistance={this.props.filterByDistance}
            />
          )}
        </FilterBarRowTwo>
      </FilterBarWrapper>
    );
  }
}

export default FilterBar;
