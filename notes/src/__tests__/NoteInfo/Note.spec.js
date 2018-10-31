import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter, Route } from 'react-router-dom';

import Note from '../../components/NoteInfo/Note';
import renderer from 'react-test-renderer';

describe('<Note />', () => {
	let note = {id: 1, title: "updated note 1", text: "Sample Text One", author: "Cool-Dude"};

	let handleDragStart = data => event => {
    let fromNote = JSON.stringify({ id: data.id})
    event.dataTransfer.setData("dragContent", fromNote);
  }

 let handleDragOver = data => event => {
    event.preventDefault();
    return false;
  }

  let handleDrop = data => event => {
    event.preventDefault();

    let fromNote = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toNote = { id: data.id };

    this.swapNotes(fromNote, toNote);
    return false;
  };

  it('should match snapshot', () => {
	  const wrapper = shallow(
	    <MemoryRouter initialEntries={['/notes']}>
	      <Note note={note} draggable={true} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} key={note.id}/>
	    </MemoryRouter>
	  )
	 	const tree = renderer.create(wrapper).toJSON()
	 	expect(tree).toMatchSnapshot()
  })

});