import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import CreateNote from '../components/NoteInfo/CreateNote';
import renderer from 'react-test-renderer';

describe('<CreateNote />', () => {
  it('should match snapshot', () => {
	  const wrapper = shallow(
	  	<MemoryRouter initialEntries={['/notes']}>
	      <CreateNote />
	    </MemoryRouter>
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});
