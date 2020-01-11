import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Marker from './Marker';

configure({ adapter: new Adapter() });

describe('<Marker />', () => {
  it('should render without throwing an error', () => {
    shallow(<Marker />);
  });

  it('should not render marker in group when not inGroup', () => {
    const wrapper = shallow(<Marker inGroup={false} />);
    expect(wrapper.find('#marker-grouped')).toHaveLength(0);
  });

  it('should render marker in group when inGroup', () => {
    const wrapper = shallow(<Marker inGroup />);
    expect(wrapper.find('#marker-grouped')).toHaveLength(1);
  });

  it('should not render solo marker when inGroup', () => {
    const wrapper = shallow(<Marker inGroup />);
    expect(wrapper.find('#marker-solo')).toHaveLength(0);
  });

  it('should render solo marker when not inGroup', () => {
    const wrapper = shallow(<Marker inGroup={false} />);
    expect(wrapper.find('#marker-solo')).toHaveLength(1);
  });

  it('should not render info window initially', () => {
    const wrapper = shallow(<Marker />);
    expect(wrapper.find('#info-window')).toHaveLength(0);
  });

  it('should render info window when clicked', () => {
    const wrapper = shallow(<Marker showingInfoWindow keyId="test" selectedPlace="test" />);
    expect(wrapper.find('#info-window')).toHaveLength(1);
  });
});
