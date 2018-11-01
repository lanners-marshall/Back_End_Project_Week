import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import LinkedNote from '../../components/NoteInfo/LinkedNote';

describe('<LinkedNote />', () => {
  it('should display loading note information if no note on state', () => {
	  const wrapper = shallow(
	    <LinkedNote match={ {params: {id: 1}} } />
  	)
  	expect(wrapper.text()).toBe('Loading note information...')
	})

	it('should display note in view is on state', () => {
		let note = {id: 1, title: "updated note 1", text: "Sample Text One", author: "Cool-Dude", collaborators: [{id: 1, name: 'test name'}]};
		const wrapper = shallow(
			<LinkedNote match={ {params: {id: 1}} } />
		)
		wrapper.setState({ 
			note: note,
			toggleEdit: true,
			toggleDelete: true,
			toggleLinks: true,
			editTitle: '',
			editContent: '',
			deleteDiv: 'deleteDivIn',
		});

		const h2 = wrapper.find('h2')
		const testh2 = h2.at(0)

		//if state was updated correctly the note should render in the view
		//I'm checking based on a sample paramgraph
		expect(testh2.text()).toBe('updated note 1')
		// console.log(wrapper.debug())
	})
});