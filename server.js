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

const userRoutes = require('./Routes/usersRoutes')
const notesRoutes = require('./Routes/notesRoutes')

server.use('/users', userRoutes)
server.use('/notes', notesRoutes)



server.listen(port, () => console.log(`server running on port 5555`));

