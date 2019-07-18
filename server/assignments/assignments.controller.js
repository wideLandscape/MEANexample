const express = require('express');
const router = express.Router();

const assignmentService = require('./assignment.service');

// routes
router.post('/add', add);
router.get('/delete/:id.:from', remove);
router.get('/reviewers/:id', getReviewers);

module.exports = router;

function add(req, res, next) {
  assignmentService
    .add(req.body)
    .then(assignment => res.json(assignment))
    .catch(err => next(err));
}
function remove(req, res, next) {
  assignmentService
    .remove(req.params.id, req.params.from)
    .then(assignment => res.json('Successfully removed'))
    .catch(err => next(err));
}
function getReviewers(req, res, next) {
  assignmentService
    .getReviewers(req.params.id)
    .then(reviewers => res.json(reviewers))
    .catch(err => next(err));
}
