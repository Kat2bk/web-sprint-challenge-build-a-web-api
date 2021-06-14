const Projects = require('../projects/projects-model');


async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({message: "project not found"})
        } else {
            req.projects = req.params.id
            next()
        }
    } catch (error) {
        next(error)
    }
}

async function validateProject(req, res, next) {
    try {
        if (!req.body.name.trim() || !req.body.description.trim()) {
            res.status(400).json({message: "please fill out all required fields"})
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    validateProjectId,
    validateProject
};