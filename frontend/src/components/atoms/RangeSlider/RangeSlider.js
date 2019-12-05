import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { theme } from '../../../theme/mainTheme';
import styled from 'styled-components';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const RangeContainer = styled.div`
  width: 15%;
  display: flex;
  margin-left: 100px;
  align-items: center;
`;

const StyledRange = styled(Range)`
  margin: 0 20px;
  width: 85% !important;
  display: flex;
  align-items: center;

  .rc-slider-step {
    height: 10px;

    .rc-slider-dot {
      display: none;
    }
  }

  .rc-slider-mark {
    .rc-slider-mark-text {
      width: 70px;
      transition: font-size 0.1s ease-in;
    }

    .rc-slider-mark-text-active {
      font-weight: 800;
      font-size: 14px;
    }
  }

  .rc-slider-handle {
    margin-top: 0 !important;
  }

  .rc-slider-handle-2 {
    background-color: #f28d52 !important;
  }
`;

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.rangeRef = React.createRef();
  }

  render() {
    return (
      <RangeContainer>
        <StyledRange
          ref={this.rangeRef}
          min={0}
          max={10}
          value={this.props.rangeValue}
          onChange={this.props.changeHandler}
          step={0.1}
          allowCross={false}
          tipFormatter={value => `${value}k zł`}
          marks={{ 0: '0 zł', 2.5: '2 000 zł', 5: '5 000 zł', 10: '10 000 zł' }}
          trackStyle={[
            {
              backgroundImage:
                'linear-gradient(to right, #69bfa7, #80bb82, #a4b35e, #cca349, #f28d52)',
              height: 10,
            },
          ]}
          handleStyle={{
            border: 0,
            height: 24,
            width: 24,
            marginTop: -7,
            backgroundColor: theme.blue,
          }}
          railStyle={{ backgroundColor: '#dfe0df', height: 10 }}
        />
      </RangeContainer>
    );
  }
}

export default RangeSlider;
