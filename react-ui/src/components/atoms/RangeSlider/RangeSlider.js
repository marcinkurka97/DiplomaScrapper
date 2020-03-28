import React, { useRef } from 'react';
import { theme as MainTheme } from '../../../theme/mainTheme';
import { RangeContainer, StyledRange } from './RangeSlider.style';

const RangeSlider = ({ rangeValue, changeHandler }) => {
  const rangeRef = useRef(null);

  return (
    <RangeContainer>
      <StyledRange
        ref={rangeRef}
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
};

export default RangeSlider;
