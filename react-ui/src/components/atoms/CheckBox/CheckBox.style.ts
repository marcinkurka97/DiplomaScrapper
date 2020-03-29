import styled from 'styled-components';
import { theme } from '../../../theme/mainTheme';

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const StyledCheckbox = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: ${({ checked }: { checked: boolean }) => (checked ? `${theme.blue}` : '#fff')};
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px rgba(36, 28, 21, 0.15);
  }

  ${Icon} {
    visibility: ${({ checked }: { checked: boolean }) => (checked ? 'visible' : 'hidden')};
  }
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
