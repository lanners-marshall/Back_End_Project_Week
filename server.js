const express = require('express');
const port = 5555;
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('knex')

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())


// -----Create-----
//post to notes
server.post('/notes', (req, res) => {
	const {title, text, author} = req.body

	//make sure form is filled out fully
	if (!req.body.title || !req.body.text){
		return res.status(400).json({msg: 'pleasae provide title and text body'})
	}

	db.insert({title, text}).into('notes')
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error creating note'})
		})
})

// -----Read-----
//get notes
server.get('/notes', (req, res) => {
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
server.get('/notes/:id', (req, res) => {
	const { id } = req.params
	db('notes')
		.where({id})
		.then(response => {

			//if there is not note located at url param
			if (response.length === 0){
				return res.status(404).json({msg: 'note not found'})
			}

			res.status(200).json(response[0])
		})
		.catch(error => {
			res.status(500).json({msg: 'there was an error getting note'})
		})
})

// -----Update-----
//update notes/:id
server.put('/notes/:id', (req, res) => {
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
server.delete('/notes/:id', (req, res) => {
	const { id } = req.params;
	db('notes')
	.where({id})
	.del()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json(error)
	})
})

server.listen(port, () => console.log(`server running on port 5555`));