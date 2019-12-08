import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from '@emotion/styled';
import { theme as MainTheme } from '../../../theme/mainTheme';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const RangeContainer = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
`;

const StyledRange = styled(Range)`
  margin: 0 20px;
  width: 85%;
  display: flex;
  align-items: center;

  .rc-slider-rail {
    height: 10px;
    background: ${({ theme }) => theme.backgroundDarkGray} !important;
    transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

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
      color: ${({ theme }) => theme.body};
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
    const { rangeValue, changeHandler } = this.props;
    return (
      <RangeContainer>
        <StyledRange
          ref={this.rangeRef}
          min={0}
          max={10}
          value={rangeValue}
          onChange={changeHandler}
          step={0.1}
          allowCross={false}
          tipFormatter={value => `${value}k zł`}
          defaultValue={[0, 1.5]}
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
            backgroundColor: MainTheme.blue,
          }}
        />
      </RangeContainer>
    );
  }
}

export default RangeSlider;
