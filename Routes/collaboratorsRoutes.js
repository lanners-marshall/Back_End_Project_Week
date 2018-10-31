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




//get an individual action, 
// its related project info, and its relavant contexts
// router.get('/:id', (req, res) => {
// 	const { id }  = req.params
// 	db('projects')
// 	.join('actions', 'projects.id', '=', 'actions.project_id')
// 	.join('actions_context', 'actions.id', '=', 'actions_context.action_id')
// 	.join('context', 'context.id', '=', 'actions_context.context_id')
// 	.select('project_name', 'project_description', 'action_id', 'action_name', 'action_description', 'notes', 'context_name')
// 	.where('actions.id', id)
// 	.then(response => {
// 		console.log(response.length)
// 		let contextHolder = []
// 		for (let i = 0; i < response.length; i++){
// 			contextHolder.push({context_name: response[i].context_name})
// 		}
// 		res.status(200).json({
// 			action_id: response[0].action_id,
// 			action_name: response[0].action_name,
// 			action_description: response[0].action_description,
// 			notes: response[0].notes,
// 			contexts: contextHolder,
// 			project_information: [{project_name: response[0].project_name},{project_description: response[0].project_description}],
// 		})
// 	})
// })

module.exports = router;