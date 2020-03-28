import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from '@emotion/styled';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export const RangeContainer = styled.div`
  margin-left: 5%;
  width: 15%;
  display: flex;
  align-items: center;
`;

export const StyledRange = styled(Range)`
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
