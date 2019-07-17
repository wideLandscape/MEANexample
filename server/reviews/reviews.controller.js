const express = require('express');
const router = express.Router();

const reviewService = require('./review.service');

// routes
router.get('/', getAll);
router.post('/add', add);
router.post('/update/:id', update);
router.get('/get/:id', get);

module.exports = router;

function getAll(req, res, next) {
  reviewService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}
function add(req, res, next) {
  reviewService
    .add(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
}
function update(req, res, next) {
  reviewService
    .update(req.body, req.params.id)
    .then(user => {
      res.json('Update complete');
    })
    .catch(err => next(err));
}
function get(req, res, next) {
  reviewService
    .getById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err));
}
