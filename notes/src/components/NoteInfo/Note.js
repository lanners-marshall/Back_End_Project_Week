import React from 'react';
import { Link } from "react-router-dom";
import { NoteTitle, NoteHR, NoteContainer, WrapP, AuthorL } from './css'

const Note = (props) => {
	return (
		<NoteContainer
				draggable={props.draggable}
        onDragStart={props.onDragStart({ id: props.note.id })}
        onDragOver={props.onDragOver({ id: props.note.id })}
        onDrop={props.onDrop({ id: props.note.id })}
        >
			<Link to={`/notes/${props.note.id}`}>
				<NoteTitle>{props.note.title}</NoteTitle>
				<NoteHR />
					<WrapP>{props.note.text}</WrapP>
			</Link>
		</NoteContainer>
	)
}

export default Note;