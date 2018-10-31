import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Weather from '../../components/Weather/Weather';
import renderer from 'react-test-renderer';

describe('<Weather />', () => {
  it('should match snapshot', () => {
	  const wrapper = shallow(
	      <Weather />
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});