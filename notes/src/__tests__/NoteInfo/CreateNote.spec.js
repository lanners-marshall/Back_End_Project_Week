import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreateNote from '../../components/NoteInfo/CreateNote';
import renderer from 'react-test-renderer';

describe('<CreateNote />', () => {
  it('should match snapshot', () => {
	  const wrapper = shallow(
	      <CreateNote />
  	)
  	const tree = renderer.create(wrapper).toJSON()
  	expect(tree).toMatchSnapshot()
	})
});
