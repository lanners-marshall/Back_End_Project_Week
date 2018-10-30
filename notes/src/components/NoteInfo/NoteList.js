import React from 'react';
import Note from './Note';
import axios from 'axios';
import { NotesContainer, MainContainer, SearchInput } from './css'


class NoteList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			notesData: []
		};
	}

	componentDidMount(){

		const token = localStorage.getItem('jwt')
		const reqOptions = {
			headers: {
				Authorization: token,
			}
		};

		axios
			.get('http://localhost:5555/notes', reqOptions)
			.then(response => {
				console.log(response)
				this.setState({
					notesData: response.data
				})
			})
			.catch(error => {
				console.log(error)
				localStorage.setItem("error", "Please Log In");
				this.props.history.push('/signin')
			})
	}

	handleInput = event => {
    this.setState({
      inputText: event.target.value,
    });
  };


  searchNotes = e => {
    e.preventDefault();
    let newState = {...this.state};

    const filter = newState.notesData.filter((note) => note.author === newState.inputText);

    for (let i = 0; i < newState.notesData.length; i++){
      if (newState.inputText === newState.notesData[i].author){
        newState.boolVal = true;
      }
    }

    if (newState.boolVal === false){
      axios.get("http://localhost:5555/notes").then(response => {this.setState({notesData: response.data, });})
    }

    if (newState.boolVal === true){
      this.setState({
        notesData: filter,
        inputText: '',
      })
    }
  }

  swapNotes = (fromNote, toNote) => {
    let notes = this.state.notesData.slice();
    let fromIndex = -1;
    let toIndex = -1;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === fromNote.id){
        fromIndex = i;
      }
      if (notes[i].id === toNote.id) {
        toIndex = i;
      }
    }

    if (fromIndex != -1 && toIndex != -1) {
      let {fromId, ...fromRest } = notes[fromIndex]
      let { toId, ...toRest } = notes[toIndex];
      notes[fromIndex] = { id: fromNote.id, ...toRest };
      notes[toIndex] = {id: toNote.id, ...fromRest };
    }

    this.setState({notesData: notes})
  }

  handleDragStart = data => event => {
    let fromNote = JSON.stringify({ id: data.id})
    event.dataTransfer.setData("dragContent", fromNote);
  }

  handleDragOver = data => event => {
    event.preventDefault();
    return false;
  }

  handleDrop = data => event => {
    event.preventDefault();

    let fromNote = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toNote = { id: data.id };

    this.swapNotes(fromNote, toNote);
    return false;
  };


	render() {

		return (
			<MainContainer>
				<h2>Your Notes:</h2>
				<NotesContainer>
					{this.state.notesData.map(note  => (
							<Note
								note={note}
								key={note.id}
					      draggable="true"
					      onDragStart={this.handleDragStart}
					      onDragOver={this.handleDragOver}
					      onDrop={this.handleDrop}
							/>
					))}
				</NotesContainer>
			</MainContainer>
		)
	}
}

export default NoteList;



				// <form onSubmit={this.searchNotes}>
				// 	<SearchInput onChange={props.handleInput} placeholder="Search by Author" value={props.input} />
				// </form>