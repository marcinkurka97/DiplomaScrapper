import React, { useState } from 'react';
import RangeSlider from '../../atoms/RangeSlider/RangeSlider';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import SearchBox from '../../molecules/SearchBox/SearchBox';
import DarkModeSwitch from '../../molecules/DarkModeSwitch/DarkModeSwitch';
import {
  FilterBarWrapper,
  FilterBarRowOne,
  TypeButtons,
  StyledButton,
  Price,
  StyledInput,
  FilterBarRowTwo,
} from './FilterBar.style';
import { FilterBarProps } from './FilterBar.types';

const FilterBar: React.FC<FilterBarProps> = ({
  currentActiveType,
  filterByType,
  priceChange,
  mapsApiLoaded,
  mapInstance,
  mapsapi,
  filterByDistance,
  handleDurationChange,
  setDarkMode,
}) => {
  const [rangeValue, setRangeValue] = useState([0, 1.5]);

  const changeHandler = (value: number[]) => {
    setRangeValue(value);
    priceChange(value);
  };

  return (
    <FilterBarWrapper>
      <FilterBarRowOne>
        <TypeButtons>
          <StyledButton
            swap
            onClick={() => filterByType('All')}
            active={currentActiveType === 'All'}
          >
            Wszystko
          </StyledButton>
          <StyledButton
            rent
            onClick={() => filterByType('Mieszkania » Wynajem')}
            active={currentActiveType === 'Mieszkania » Wynajem'}
          >
            Wynajem
          </StyledButton>
          <StyledButton
            sell
            onClick={() => filterByType('Mieszkania » Sprzedaż')}
            active={currentActiveType === 'Mieszkania » Sprzedaż'}
          >
            Sprzedaż
          </StyledButton>
          <StyledButton
            swap
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
        <RangeSlider rangeValue={rangeValue} changeHandler={changeHandler} />
        <Dropdown handleDurationChange={handleDurationChange} />
      </FilterBarRowTwo>
    </FilterBarWrapper>
  );
};

export default FilterBar;
