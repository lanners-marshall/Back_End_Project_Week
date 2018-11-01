const express = require('express');
const router = express.Router();
const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

const secret = require('./keys').jwtKey;

function generateToken(user){
	const payload = {
		username: user.username,
	};
	const options = {
		expiresIn: '1h',
		jwtid: '12345'
	}
	return jwt.sign(payload, secret, options)
}

router.post('/register', (req, res) => {
	const creds = req.body
	
	let e1 = '';
	let e2 = '';
	let bol = false;

	if (creds.password.length < 5){
		e1 = 'password must be 5 characters in length';
		bol = true;
	}

	if (creds.username.length < 5){
		e2 = 'username must be 5 characters in length';
		bol = true;
	}

	//if form not filled out correctly end and send error msg
	if (bol === true){
		res.status(400).json({error1: e1, error2: e2})
	}

	//if form is filled out correctly add user and give token
	if (bol === false){

		const hash = bcrypt.hashSync(creds.password, 12);
		creds.password = hash;

		db('users')
			.insert(creds)
			.then(ids => {
				//console.log(ids)
				const id = ids[0]
				db('users') 
					.where({id})
					.first()
					.then(user => {
						const token = generateToken(user);
						res.status(200).json({token})
					})
					.catch(err => {
						console.log(err)
						res.status(500).json({msg: 'error generating token'})
					})
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({msg: "there was an error registering user"})
			})
	}
})

router.post('/login', (req, res) => {
	const creds = req.body;
	db('users')
		.where({username: creds.username})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				//console.log(user)
				const token = generateToken(user);
				res.status(200).json({token})
			} else {
				res.status(401).json({msg: 'You have failed to log in'})
			} 
		})
})

module.exports = router;