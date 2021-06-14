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
// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

router.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message,
        message: "Something went wrong, try again"
    })
  })

module.exports = router;
