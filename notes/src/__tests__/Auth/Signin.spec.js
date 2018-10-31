import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import Signin from '../../components/Auth/Signin';
import renderer from 'react-test-renderer';

describe('<Signin />', () => {
  it('should match snapshot', () => {
	  const wrapper = shallow(
	  	<MemoryRouter initialEntries={['/signin']}>
	      <Signin />
	    </MemoryRouter>
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});