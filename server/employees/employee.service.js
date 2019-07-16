const config = require('../config.json');
const jwt = require('jsonwebtoken');

// Require Employees model in our routes module
const Employees = require('./employee.model');

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
  }
}

async function getAll() {
  try {
    // don't return the password to the client
    return await Employees.find({}, { password: 0 });
  } catch (err) {
    console.log(err);
  }
}

async function add(user) {
  try {
    const employee = new Employees(user);
    return await employee.save();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  authenticate,
  getAll,
  add
};
