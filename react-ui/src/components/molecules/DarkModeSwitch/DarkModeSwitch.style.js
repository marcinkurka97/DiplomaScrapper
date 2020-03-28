import styled from '@emotion/styled';

export const DarkModeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  width: 10%;
  margin-left: auto;
`;

export const StyledIcon = styled.svg`
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

export const SwitchWrapper = styled.div`
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
    transition: 0.5s;
  }

  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: '';
    height: 22px;
    left: 4px;
    position: absolute;
    transition: 0.5s;
    width: 22px;
  }

  input:checked + .slider {
    background-color: ${({ theme }) => theme.backgroundDarkGray};
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
