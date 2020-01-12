import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ClusterMarker from './ClusterMarker';

configure({ adapter: new Adapter() });

describe('<ClusterMarker />', () => {
  it('should render without throwing an error', () => {
    shallow(<ClusterMarker />);
  });

  it('should receive markerId', () => {
    const wrapper = shallow(<ClusterMarker markerId="markerId" />);
    expect(wrapper.props().markerId).toEqual('markerId');
  });

  it('should set state "clusterFaceMarkers" to first element of points props', () => {
    const wrapper = shallow(<ClusterMarker points={[1, 2, 3]} />);
    expect(wrapper.state().clusterFaceMarkers).toEqual([1]);
  });
});
