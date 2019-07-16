const express = require('express');
const router = express.Router();

const employeeService = require('./employee.service');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/add', add);
router.get('/delete/:id', remove);
router.post('/update/:id', update);

module.exports = router;

function authenticate(req, res, next) {
  employeeService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  employeeService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}
function add(req, res, next) {
  employeeService
    .add(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
}
function remove(req, res, next) {
  employeeService
    .remove(req.params.id)
    .then(user => res.json('Successfully removed'))
    .catch(err => next(err));
}

function update(req, res, next) {
  employeeService
    .update(req.body, req.params.id)
    .then(user => {
      res.json('Update complete');
    })
    .catch(err => next(err));
}
