const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.

router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        return res.status(200).json(actions)
    })
    .catch(error => {
        next(error)
    })
})
// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it respaonds with a status code 404.

router.get('/:id', (req, res, next) => {
    Actions.get(req.params.id)
    .then(action => {
        if (!action) {
          return  res.status(404).json({message: "Could not find actions"})
        } else {
           return res.json(action)
        }
    })
    .catch(error => {
        next(error)
    })
})

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.

router.post('/:id', (req, res, next) => {
    Actions.insert({    
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed
    })
    .then(newPost => {
        if (!req.params.id) {
           return res.status(404).json({message: "project not found"})
        } else if (!req.body.description || !req.body.notes) {
            return res.status(400).json({message: "please fill out all required fields"})
        } else {
          return  res.status(201).json(newPost)
        }
    })
    .catch(error => {
        next(error)
    })
})

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put('/:id', (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        if (!req.params.id) {
            res.status(404).json({message: "action not found"})
        } else if (!req.body.description || !req.body.notes) {
            res.status(400).json({message: "please fill out all required fields"})
        } else {
            res.status(200).json(action)
        }
    })
    .catch(error => {
        next(error)
    })
})

// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
    .then(action => {
        if (!action) {
            res.status(404).json({message: "action not found"})
        } else {
            res.status(204).json(action)
        }
    })
    .catch(error => {
        next(error)
    })
})

router.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message,
        message: "Something went wrong, try again"
    })
  })

  //testing

module.exports = router;
