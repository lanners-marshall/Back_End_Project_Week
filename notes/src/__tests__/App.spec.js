import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import App from '../App';
import renderer from 'react-test-renderer';

describe('<App />', () => {
  it('should match snapshot', () => {
	  const wrapper = mount(
	  	<MemoryRouter initialEntries={['/notes']}>
	    <App />
	    </MemoryRouter>
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});