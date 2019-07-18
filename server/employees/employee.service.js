const config = require('../config.json');
const jwt = require('jsonwebtoken');

// Require Employees model in our routes module
const Employees = require('./employee.model');
const AssignmentService = require('../assignments/assignment.service');

async function authenticate({ username, password }) {
  try {
    // don't return the password to the client
    const employee = await Employees.findOne(
      { username, password },
      { password: 0 }
    );
    if (employee) {
      const token = jwt.sign({ sub: employee.id }, config.secret);
      return {
        ...employee.toObject(),
        token
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error('Unable to authenticate');
  }
}

async function getAll() {
  try {
    // don't return the password to the client
    return await Employees.find({}, { password: 0 }).sort({ username: 1 });
  } catch (err) {
    console.log(err);
    throw new Error('Unable to query the database');
  }
}

async function add(user) {
  try {
    const employee = new Employees(user);
    return await employee.save();
  } catch (err) {
    console.log(err);
    throw new Error('Unable to add the user');
  }
}

async function remove(id) {
  try {
    const employee = await Employees.findByIdAndRemove({ _id: id });
    await AssignmentService.removeEmployeeAssignments(id);
    return employee;
  } catch (err) {
    console.log(err);
    throw new Error('Unable to delete the user');
  }
}
async function update(body, id) {
  try {
    const employee = await getById(id);
    employee.username = body.username;
    employee.firstName = body.firstName;
    employee.lastName = body.lastName;
    employee.password = body.password;
    employee.isAdmin = body.isAdmin;
    return await employee.save();
  } catch (err) {
    console.log(err);
    throw new Error('Unable to update the database');
  }
}

async function getById(id) {
  try {
    return await Employees.findById(id);
  } catch (err) {
    console.log(err);
    throw new Error('Unable to get the document');
  }
}

module.exports = {
  authenticate,
  getAll,
  add,
  remove,
  update,
  getById
};
