import React from "react";
import styled from "styled-components";

const FilterBarWrapper = styled.div`
  height: 15vh;
  background: #f8f8f8;
`;

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <FilterBarWrapper>
        <p>Filter Bar</p>
      </FilterBarWrapper>
    );
  }
}

export default FilterBar;
