import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import NoteList from '../../components/NoteInfo/NoteList';
import renderer from 'react-test-renderer';

describe('<NoteList />', () => {
  it('should match snapshot', () => {
	  const wrapper = shallow(
	  	<MemoryRouter initialEntries={['/notes']}>
	      <NoteList />
	    </MemoryRouter>
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});

