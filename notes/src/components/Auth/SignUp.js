import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Contain, MainH1, FlexForm, BTN, SubmitBtn, BTNDiv, Errors } from './css';

class SignUp extends React.Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			email: '',
			error: ''
		};
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

 	register = event => {
 		event.preventDefault()

 		const newUser = {
 			username: this.state.username,
 			password: this.state.password,
 			email: this.state.email
 		}

 		if (newUser.username.length < 5 || newUser.password.length < 5 || newUser.email.length < 5){
 			this.setState({
 				error: 'Please provide all information. Min length for each is 5 characters'
 			})
 		} else {

		 	axios.post('http://localhost:5555/users/register', newUser)
		 		.then(response => {
		 			console.log(response)
		 			localStorage.setItem('jwt', response.data.token);
		 			localStorage.setItem('loggedInAs', this.state.username);
		 			this.setState({
		 				error: ''
		 			})
		 			this.props.history.push('/notes')
		 		})
		 		.catch(error => {
		 			console.log(error)
		 			this.setState({
		 				error: error.response.data,
		 			})
		 		})

		 	const collaborator = {name: this.state.username}
		 	axios.post('http://localhost:5555/collaborators', collaborator)
		 		.then(response => {
		 			console.log(response)
		 		})
		 		.catch(error => {
		 			console.log(error)
		 		})
 		}
 	}

	render() {
		return (
			<div>
				<Contain>
					<MainH1>Sign Up Below</MainH1>
					<FlexForm>
						<input
							type="text"
							placeholder='username'
							onChange={this.handleChange}
							name="username"
							value={this.state.username}
						/>
						<input
							type="text"
							placeholder='email'
							onChange={this.handleChange}
							name="email"
							value={this.state.email}
						/>
						<input
							type="password"
							placeholder='password'
							onChange={this.handleChange}
							name="password"
							value={this.state.password}
						/>
						<SubmitBtn onClick={this.register}>Submit</SubmitBtn>
					</FlexForm>
				</Contain>
				<Link to='/signin'><BTNDiv><BTN>Need to go back click here!</BTN></BTNDiv></Link>
				<Errors>
					<p>{this.state.error}</p>
				</Errors>
			</div>
		)
	}
}

export default SignUp;

