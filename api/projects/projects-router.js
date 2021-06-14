const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const {validateProjectId, validateProject} = require('../middleware/middleware');

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.json(projects)
    } catch (error) {
        next(error)
    }
})

// - Returns an array of projects as the body of the response.

router.get('/:id', validateProjectId, async (req, res, next) => {
    try {
       const project = await Projects.get(req.params.id)
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
})

// - Returns a project with the given `id` as the body of the response.
// - If there is no project with the given `id` it responds with a status code 404.

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert({name: req.body.name, description: req.body.description, completed: req.body.completed})
        res.status(201).json(newProject)
    } catch (error) {
        next(error)
    }
})
// - Returns the newly created project as the body of the response.
// - If the request body is missing any of the required fields it responds with a status code 400.

router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
        const updated = await Projects.update(req.params.id, req.body)
        res.status(200).json(updated)
    } catch (error) {
        next(error)
    }
})

// - Returns the updated project as the body of the response.
// - If there is no project with the given `id` it responds with a status code 404.
// - If the request body is missing any of the required fields it responds with a status code 400.

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
       const deleted = await Projects.remove(req.params.id)
       res.status(204).json(deleted)
    } catch (error) {
        next(error)
    }
})

// - Returns no response body.
// - If there is no project with the given `id` it responds with a status code 404.

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (error) {
        next(error)
    }
})
// - [ ] `[GET] /api/projects/:id/actions`
// - Returns an array of actions (could be empty) belonging to a project with the given `id`.
// - If there is no project with the given `id` it responds with a status code 404.

router.use((err, req, res, next) => {
  res.status(500).json({
      error: err.message,
      message: "Something went wrong, try again"
  })
})

module.exports = router;
