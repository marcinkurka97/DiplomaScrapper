import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from './ListItem';

configure({ adapter: new Adapter() });

describe('<ListItem />', () => {
  it('should render without throwing an error', () => {
    shallow(<ListItem scrape={{ link: 'test Link' }} userID={null} />);
  });

  it('should not render star when user is not logged in', () => {
    const wrapper = shallow(<ListItem scrape={{ link: 'test Link' }} userID={null} />);
    expect(wrapper.find('.offer__star')).toHaveLength(0);
  });

  it('should render star when user is logged in', () => {
    const wrapper = shallow(<ListItem scrape={{ link: 'test Link' }} userID={123} />);
    expect(wrapper.find('.offer__star')).toHaveLength(1);
  });

  it('should render text from props', () => {
    const wrapper = shallow(
      <ListItem scrape={{ title: 'test Title', link: 'test Link' }} userID={null} />,
    );
    expect(wrapper.find('.offer__title').text()).toEqual('test Title');
  });
});
