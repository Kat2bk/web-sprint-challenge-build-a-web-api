require('dotenv').config()

const express = require('express');
const server = express();
const projectsRouter = require('../api/projects/projects-router');
server.use(express.json());

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.json({message: 'Welcome to the API'})
})

module.exports = server;
