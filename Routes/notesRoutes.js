const express = require('express');
const router = express.Router();
const knex = require('knex')

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

const jwt = require('jsonwebtoken')
const secret = require('./keys').jwtKey;

function protects(req, res, next){
	const token = req.headers.authorization
	if(token){
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				//token is invalid
				res.status(401).json({msg: "Invalid Token"})

			} else {
				//token is valid
				req.username = decodedToken.username;
				next()
			}
		});
	} else {
		res.status(401).json({msg: "no token provided"})
	}
}

// -----Create-----
//post to notes
router.post('', (req, res) => {
	const {title, text, author, collaborators} = req.body

	//make sure form is filled out fully
	if (!req.body.title || !req.body.text){
		return res.status(400).json({msg: 'pleasae provide title and text body'})
	}

	db.insert({title, text, author}).into('notes')
		.then(response => {

			let notes_collaborators = []
			let NC = req.body.collaborators 

			res.status(201).json(response);

			for (let i = 0; i < NC.length; i++){
				notes_collaborators.push({note_id: response[0], collaborator_id: NC[i].value})
			}

			return db('notes_collaborators')
				.insert(notes_collaborators)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error creating note'})
		})
})

// -----Read-----
//get notes
router.get('', protects, (req, res) => {
	db('notes')
		.then(response => {
			res.status(200).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error getting notes'})
		})
})

//get notes/:id
router.get('/:id', protects, (req, res) => {

	const { id } = req.params

	db('notes')
		.join('notes_collaborators', 'notes_collaborators.note_id', '=', 'notes.id')
		.join('collaborators', 'collaborators.id', '=', 'notes_collaborators.collaborator_id')
		.where('notes.id', id)
		.then(response => {
			//if not note found in many to many search
			if (response.length === 0){
				return res.status(404).json({msg: 'note not found'})
			}

		let collaborators = []

		for (let i = 0; i < response.length; i++){
			collaborators.push({name: response[i].name})
		}

			res.status(200).json({
				id: response[0].note_id,
				title: response[0].title,
				text: response[0].text,
				author: response[0].author,
				collaborators: collaborators,
			})
		})
		.catch(error => {
			res.status(500).json({msg: 'there was an error getting note'})
		})
})

// -----Update-----
//update notes/:id
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { title, text } = req.body;

	//make sure form is filled out
	if(!req.body.title || !req.body.text){
		return res.status(400).json({msg: 'please provide information title and text body for update'})
	}

	db('notes')
	.where({id})
	.update({title, text})
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error updating project'})
	})
})

// -----Delete-----
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('notes')
	.where({id})
	.del()
	.then(response => {
		if (response === 0){
			return res.status(404).json({msg: 'no note to delete'})
		}

		if (response === 1){
			return res.status(200).json(response)
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).json(error)
	})
})




module.exports = router;