import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import SignUp from '../../components/Auth/SignUp';
import renderer from 'react-test-renderer';

describe('<SignUp />', () => {
  it('should match snapshot', () => {
	  const wrapper = shallow(
	  	<MemoryRouter initialEntries={['/signup']}>
	      <SignUp />
	    </MemoryRouter>
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});