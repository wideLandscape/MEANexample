const express = require('express');
const router = express.Router();

const assignmentService = require('./assignment.service');

// routes
router.post('/add', add);
router.get('/delete/:id', remove);

module.exports = router;

function add(req, res, next) {
  console.log(req.body);
  assignmentService
    .add(req.body)
    .then(assignment => res.json(assignment))
    .catch(err => next(err));
}
function remove(req, res, next) {
  assignmentService
    .remove(req.params.id)
    .then(assignment => res.json('Successfully removed'))
    .catch(err => next(err));
}
