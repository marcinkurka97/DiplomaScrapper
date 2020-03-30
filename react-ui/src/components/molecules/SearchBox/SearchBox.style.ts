import styled from '@emotion/styled';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import Input from '../../atoms/Input/Input';

export const SearchBoxContainer = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  width: 30%;
  height: 40px;
`;

export const StyledInput = styled(Input)`
  width: 60%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15), 0 1px 5px 0 rgba(0, 0, 0, 0.14);

  &:focus {
    outline: ${({ theme }: { theme: { blue: string } }) => theme.blue} auto 1px;
  }
`;

// Create Slirder with text above it
const SliderWithTooltip = createSliderWithTooltip(Slider);

export const StyledSliderWithTooltip = styled(SliderWithTooltip)`
  width: 25% !important;
  margin-left: 40px;

  .rc-slider-rail {
    height: 10px;
    background: ${({ theme }: { theme: { blue: string; backgroundDarkGray: string } }) =>
      theme.backgroundDarkGray};
    transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;
