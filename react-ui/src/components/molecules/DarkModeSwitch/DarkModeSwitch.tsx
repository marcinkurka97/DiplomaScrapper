import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { DarkModeContainer, SwitchWrapper } from './DarkModeSwitch.style';
import SunSVG from '../../../assets/sunSVG';
import MoonSVG from '../../../assets/moonSVG';
import { DarkModeSwitchProps } from './DarkModeSwitch.types';

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ setDarkMode }) => {
  const themeState = useTheme();

  const switchTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      themeState.toggle(true);
      setDarkMode(true);
    } else {
      themeState.toggle(false);
      setDarkMode(false);
    }
  };

  return (
    <DarkModeContainer>
      <SunSVG />
      <SwitchWrapper className="theme-switch-wrapper">
        <label className="theme-switch" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            onChange={e => switchTheme(e)}
            checked={localStorage.getItem('dark') === 'true' ? true : false}
          />
          <div className="slider round" />
        </label>
      </SwitchWrapper>
      <MoonSVG />
    </DarkModeContainer>
  );
};

export default DarkModeSwitch;
