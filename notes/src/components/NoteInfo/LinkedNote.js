import React from 'react';
import axios from 'axios';
import './switchAnimate.css';
import { LinkedContainer, NoteLinks, SubmitContainerL, InputTitleL, InputContentL, DivClickL, Overlay, DeleteBTN, NoBTN, ButtonFlex, Author, CollabDiv, NoteLDiv } from './css'

class LinkedNote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			note: null,
			toggleEdit: true,
			toggleDelete: true,
			editTitle: '',
			editContent: '',
			deleteDiv: 'deleteDivIn',
		};
	}

	componentDidMount(){
		this.fetchNote()
	}

	fetchNote = () => {
		const token = localStorage.getItem('jwt')
		const reqOptions = {
			headers: {
				Authorization: token,
			}
		};

		const id = this.props.match.params.id;
		
		axios
			.get(`http://localhost:5555/notes/${id}`, reqOptions)
			.then(response => {
				this.setState( () => ({note: response.data}))

			})
			.catch(error => {
				localStorage.setItem("error", "Please Log In");
				this.props.history.push('/signin')
			})

	}

	toggle = () => {
		this.setState({
			toggleEdit: !this.state.toggleEdit,
			toggleLinks: !this.state.toggleLinks,
		})
	}

	deleteIn = () => {
		this.setState({
			toggleDelete: !this.state.toggleDelete,
			deleteDiv: 'deleteDivIn',
		})
	}

	deleteOut = () => {
		this.setState({
			deleteDiv: 'deleteDivOut',
		})
		setTimeout(() => {this.setState({toggleDelete: !this.state.toggleDelete})}, 600);
	}

	editNote = () => {
		const editedNote = {
			title: this.state.editTitle,
			text: this.state.editContent,
		}
		axios
			.put(
				`http://localhost:5555/notes/${this.props.match.params.id}`,
				editedNote
			)
			.then(response => {
				console.log("put response: ", response);
				console.log(response.config.data)
				this.setState({
					editTitle: '',
					editContent: '',
				})
				
				this.fetchNote()

				//I will update state to show the new note list
				axios
					.get("http://localhost:5555/notes")
					.then(response => {
						this.props.handleData(response.data)
					})
					.catch(err => {
						console.log(err)
					})

			})
			.catch(error => console.log(error))

		this.toggle()
	}

	deleteNote = () => {
		axios
			.delete(
				`http://localhost:5555/notes/${this.props.match.params.id}`
			)
			.then(response => {
				console.log(response);

				//I will update state to show the new note list
				axios
					.get("http://localhost:5555/notes")
					.then(response => {
						this.props.handleData(response.config.data)
					})
					.catch(err => {
						console.log(err)
					})
			})
			.catch(err => console.log(err));
			this.props.history.push('/notes')
	}


	handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

	render() {
		let bool = false
		if (this.state.note){
			for (let i = 0; i < this.state.note.collaborators.length; i++){
				if (this.state.note.collaborators[i].name === localStorage.getItem('loggedInAs')){
					bool = true
				}
			}
		}

		let collabs = []

		if (this.state.note){
			for (let i = 0; i < this.state.note.collaborators.length; i++) {
				if (this.state.note.collaborators[i].name !== this.state.note.author){
					collabs.push(this.state.note.collaborators[i])
				}
			}
		} else {
			collabs = null
		}

		if (!this.state.note) {
		 return <div>Loading note information...</div>;
		}

		let returnDiv;
		if (collabs.length > 0){
			returnDiv = 
			<CollabDiv>
				<div>
					<h2>Collaberator List</h2>
					{collabs.map((col, i) => (
					<p key={i}>{col.name}</p>
					))}
				</div>
			</CollabDiv>
		} else {
			returnDiv = null
		}

		const { title, text, author } = this.state.note;

		return (
			<LinkedContainer>
				{this.state.toggleDelete ? (
					null
					) :
					<Overlay>
						<div className={this.state.deleteDiv}>
							<h3>Are you sure you want to delete this?</h3>
								<ButtonFlex>
									<DeleteBTN onClick={this.deleteNote}>Delete</DeleteBTN><NoBTN onClick={this.deleteOut}>No</NoBTN>
								</ButtonFlex>
						</div>
					</Overlay>
				}

					{bool ? (
						<NoteLinks>
							<p onClick={this.toggle}><u>edit</u></p>
							<p onClick={this.deleteIn}><u>delete</u></p>
						</NoteLinks> ) : null
					}

					{this.state.toggleEdit ? (
					<div>
						<NoteLDiv>
							<h2>{title}</h2>
							<p>{text}</p>
						</NoteLDiv>
						<Author>- By {author}</Author>
						{returnDiv}
					</div>

					) :

					<SubmitContainerL>
						<h3>Edit Note:</h3>
						<form>
							<InputTitleL
								type="text"
								placeholder='Note Title'
								onChange={this.handleChange}
								name="editTitle"
								value={this.state.editTitle}
							/>
							<InputContentL
								type="text"
								placeholder='Note Content'
								onChange={this.handleChange}
								name="editContent"
								value={this.state.editContent}
							/>
						</form>

						<DivClickL onClick={this.editNote}>Update</DivClickL>
					</SubmitContainerL>
				}
			</LinkedContainer>
		)
	}
}

export default LinkedNote;