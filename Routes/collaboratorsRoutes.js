const express = require('express');
const router = express.Router();
const knex = require('knex')

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

router.get('', (req, res) => {
	db('collaborators')
		.then(response => {
			res.status(200).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json(error)
		})
})

router.post('', (req, res) => {
	const {name} = req.body
	db('collaborators').insert({name}).into('collaborators')
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'there was an error creating collaborator'})
		})
})

module.exports = router;