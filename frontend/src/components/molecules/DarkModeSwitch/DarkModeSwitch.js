import React from 'react';
import styled from 'styled-components';

const DarkModeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  width: 10%;
  margin-left: auto;
`;

const StyledIcon = styled.svg`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-of-type {
    width: 24px;
    height: 24px;
  }
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;

  .theme-switch {
    display: inline-block;
    height: 30px;
    position: relative;
    width: 56px;
  }

  .theme-switch input {
    display: none;
  }

  .slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: '';
    height: 22px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 22px;
  }

  input:checked + .slider {
    background-color: #4e862a;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

class DarkModeSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);

      if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
      }
    }
  }

  switchTheme = e => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  render() {
    return (
      <DarkModeContainer>
        <StyledIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g>
            <g>
              <path
                d="M501.352,245.336h-64c-5.906,0-10.688,4.773-10.688,10.664s4.781,10.672,10.688,10.672h63.984c0,0,0,0,0.016,0
			c5.875,0,10.656-4.781,10.656-10.672S507.227,245.336,501.352,245.336z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M74.672,245.336H10.68h-0.008c-5.891,0-10.664,4.774-10.664,10.664s4.773,10.672,10.664,10.672h63.992h0.008
			c5.891,0,10.672-4.781,10.672-10.664C85.344,250.117,80.563,245.336,74.672,245.336z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M437.04,74.984c-4.188-4.164-10.938-4.164-15.094,0l-45.25,45.25v0.008c-4.172,4.164-4.172,10.914,0,15.086
			c4.156,4.164,10.906,4.164,15.078,0l0.016-0.016l45.218-45.234c0.016,0,0.016-0.008,0.016-0.008
			C441.196,85.906,441.196,79.148,437.04,74.984z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M135.328,376.688c-4.164-4.172-10.922-4.172-15.086,0c0,0,0,0-0.008,0l-45.242,45.234c0,0,0,0.016-0.008,0.016
			c-4.164,4.172-4.164,10.922,0,15.078c4.172,4.172,10.922,4.172,15.086,0c0,0,0,0,0.008,0l45.234-45.234l0.016-0.016
			C139.492,387.61,139.492,380.86,135.328,376.688z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M256.008,0c-5.891,0-10.664,4.781-10.664,10.672v63.984c0,0.008,0,0.008,0,0.008c0,5.899,4.773,10.672,10.664,10.672
			s10.664-4.773,10.664-10.664v-64C266.672,4.781,261.899,0.008,256.008,0z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M256.008,426.672c-5.891,0-10.664,4.781-10.664,10.656v0.031v63.969c0,5.906,4.773,10.672,10.664,10.688
			c5.891,0,10.664-4.781,10.664-10.688v-64C266.672,431.453,261.899,426.672,256.008,426.672z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M135.328,120.242l-45.25-45.257c-4.172-4.164-10.922-4.164-15.094,0c-4.164,4.164-4.156,10.922,0,15.086
			c0.008-0.001,0.008-0.001,0.008,0.007l45.234,45.227c0,0,0.008,0.016,0.016,0.023c4.164,4.164,10.922,4.164,15.086,0
			C139.492,131.156,139.492,124.406,135.328,120.242z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M437.04,421.938l-0.016-0.016l-45.234-45.234l-0.016-0.016c-4.172-4.156-10.922-4.156-15.078,0
			c-4.172,4.172-4.172,10.938,0,15.094c0,0,0,0,0,0.016l45.25,45.234c4.156,4.172,10.906,4.172,15.094,0
			C441.196,432.86,441.196,426.11,437.04,421.938z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M256.008,106.672c-82.477,0-149.336,66.859-149.336,149.336s66.859,149.32,149.336,149.32
			c82.469,0,149.344-66.844,149.344-149.32S338.477,106.672,256.008,106.672z M346.508,346.516
			c-24.156,24.172-56.312,37.5-90.5,37.5s-66.336-13.328-90.508-37.5c-24.18-24.188-37.492-56.313-37.492-90.508
			s13.312-66.336,37.492-90.516c24.172-24.172,56.32-37.484,90.508-37.484s66.344,13.312,90.5,37.484
			c24.188,24.18,37.5,56.32,37.5,90.516S370.696,322.328,346.508,346.516z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </StyledIcon>
        <SwitchWrapper className="theme-switch-wrapper">
          <label className="theme-switch" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" onChange={e => this.switchTheme(e)} />
            <div className="slider round"></div>
          </label>
        </SwitchWrapper>
        <StyledIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 476 476">
          <path
            d="M466.535,257.983c-6.739-2.791-14.15-0.675-18.441,5.262c-17.213,23.816-40.396,42.803-67.043,54.908
	c-27.774,12.617-58.786,17.396-89.672,13.826c-76.464-8.843-138.378-70.759-147.219-147.223c-3.571-30.889,1.21-61.896,13.828-89.67
	c12.105-26.646,31.092-49.828,54.907-67.041c5.937-4.292,8.052-11.703,5.262-18.441c-2.81-6.787-9.593-10.562-16.881-9.394
	C143.081,9.544,90.503,40.047,53.226,86.101C15.378,132.862-3.35,191.883,0.493,252.293c3.662,57.562,28.479,112.064,69.882,153.468
	s95.904,66.223,153.467,69.886c5.18,0.329,10.343,0.493,15.496,0.493c54.939-0.002,107.947-18.623,150.699-53.226
	c46.055-37.276,76.559-89.855,85.893-148.051C477.098,267.577,473.323,260.792,466.535,257.983z M461.119,272.488
	c-8.748,54.539-37.343,103.82-80.519,138.767c-43.829,35.475-99.156,53.036-155.806,49.422
	c-53.918-3.431-104.992-26.7-143.812-65.521c-38.821-38.821-62.089-89.896-65.519-143.814
	C11.86,194.698,29.412,139.366,64.886,95.538c34.946-43.175,84.227-71.77,138.766-80.518c0.1-0.016,0.177-0.022,0.238-0.022
	c0.168,0,0.215,0.053,0.27,0.115c0.176,0.202,0.216,0.473,0.195,0.543c-0.01,0.021-0.077,0.109-0.246,0.232
	c-25.925,18.736-46.596,43.978-59.777,72.993c-13.744,30.253-18.956,64.002-15.071,97.597
	c9.632,83.308,77.088,150.767,160.396,160.4c33.598,3.888,67.346-1.326,97.6-15.069c29.017-13.183,54.259-33.854,72.996-59.778
	c0.122-0.169,0.21-0.236,0.23-0.245c0.068-0.026,0.343,0.018,0.545,0.194C461.111,272.055,461.179,272.114,461.119,272.488z"
          />
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </StyledIcon>
      </DarkModeContainer>
    );
  }
}

export default DarkModeSwitch;
