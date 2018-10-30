import React from 'react';
import axios from 'axios';
import { BGColor, SubmitContainer, InputTitle, InputContent, DivClick, Flexdiv, Red} from './css';

class CreateNote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			text: '',
			author: '',
			errorTitle: '',
			errorBody: '',
		};
	}

	componentDidMount(){
		console.log(Object.keys(localStorage))
		console.log(Object.values(localStorage))
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
			})
			.catch(error => {
				console.log(error)
				localStorage.setItem("error", "Please Log In");
				this.props.history.push('/signin')
			})
	}

	createNote = () => {
		const note = {title: this.state.title, text: this.state.text, author: localStorage.getItem('loggedInAs')};

		axios
			.post("http://localhost:5555/notes", note)
			.then(response => {
				console.log("post response: ", response);
				this.setState({title: '', text: ''})

				//I will update state to show the new post in view
				axios
					.get("http://localhost:5555/notes")
					.then(response => {
						this.props.handleData(response.data)
					})
					.catch(err => {
						console.log(err)
					})
			})
			.catch(error => console.log(error));
			this.props.history.push("/notes")
	}

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

	render(){
		return (
			<BGColor>
				<SubmitContainer>
					<h3>Create New Note:</h3>
					<form>
						<InputTitle
							type="text"
							placeholder='Note Title'
							onChange={this.handleChange}
							name="title"
							value={this.state.title}
							maxLength="30"
						/>
						<InputContent
							type="text"
							placeholder='Note Content'
							onChange={this.handleChange}
							name="text"
							value={this.state.text}
							maxLength="229"
						/>
					</form>
					<Flexdiv>
						<DivClick onClick={this.createNote}>Save</DivClick>
					</Flexdiv>
				</SubmitContainer>
			</BGColor>
		)
	}
}

export default CreateNote;
