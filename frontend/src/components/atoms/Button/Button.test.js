import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';
import 'jest-styled-components';

configure({ adapter: new Adapter() });

describe('<Button />', () => {
  it('should render without throwing an error', () => {
    shallow(<Button />);
  });
});
