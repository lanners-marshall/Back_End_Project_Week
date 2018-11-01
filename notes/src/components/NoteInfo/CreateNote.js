import React from 'react';
import axios from 'axios';
import { BGColor, SubmitContainer, InputTitle, InputContent, DivClick, Flexdiv, Red, SelectDiv} from './css';
import Select from 'react-select';

console.log()

class CreateNote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			text: '',
			author: '',
			errorTitle: '',
			errorBody: '',
			collaborators: '',
			selectedOption: [],
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
				//console.log(response)
			})
			.catch(error => {
				//console.log(error)
				localStorage.setItem("error", "Please Log In");
				this.props.history.push('/signin')
			})

		axios
			.get('http://localhost:5555/collaborators')
			.then(response => {
				this.setState({
					collaborators: response.data
				})
			})
			.catch(error => {
				//console.log(error)
			})
	}

  handleSelect = (selectedOption) => {
    this.setState({ selectedOption });
    //console.log(`Option selected:`, selectedOption);
  }

	createNote = () => {

		let obj = {};
		let collabs = this.state.selectedOption
		
		for (let i = 0; i < this.state.collaborators.length; i++){
			if (this.state.collaborators[i].name === localStorage.getItem('loggedInAs')){
				obj = {value: this.state.collaborators[i].id, label: localStorage.getItem('loggedInAs') }
			}
		}

		collabs.push(obj);

		const note = {
			title: this.state.title, 
			text: this.state.text, 
			author: localStorage.getItem('loggedInAs'),
			collaborators: collabs,
		};

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

// [
// 	{
// 		label: “sam”
// 		value: 2
// 	}
// 	{
// 		label: “carl”
// 		value: 2
// 	}
// 	{
// 		label: “Timmy”
// 		value: 5
// 	}
// ]

		//{note_id: 1, collaborator_id: 2}, // jessica

		//need a post to notes_collaborators table
		// axios
		// 	.post
	}

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

	render(){		

		//console.log(this.props)
		let currentUser = localStorage.getItem('loggedInAs')
		let options = []
		//console.log(this.state.collaborators)
		for (let i = 0; i < this.state.collaborators.length; i++){
			//filter out who is currently logged in from list of users
			if (this.state.collaborators[i].name === currentUser){
				{continue}
			} else {
				options.push({value: this.state.collaborators[i].id, label: this.state.collaborators[i].name})
			}
		}

		// console.log(options)

		const { selectedOption } = this.state;
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
					<SelectDiv>
						<p>Select Collaborators</p>
						<Select
			        value={selectedOption}
			        onChange={this.handleSelect}
			        options={options}
			        isMulti={true}
			        isSearchable={true}
			      />
		      </SelectDiv>

					<Flexdiv>
						<DivClick onClick={this.createNote}>Save</DivClick>
					</Flexdiv>
				</SubmitContainer>
			</BGColor>
		)
	}
}

export default CreateNote;
