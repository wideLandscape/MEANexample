const config = require('../config.json');
const jwt = require('jsonwebtoken');

// TODO: move employees to mongoDB
const employees = [
  {
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'Test',
    lastName: 'employee',
    isAdmin: true
  }
];

async function authenticate({ username, password }) {
  const employee = employees.find(
    u => u.username === username && u.password === password
  );
  if (employee) {
    const token = jwt.sign({ sub: employee.id }, config.secret);
    // don't return the password to the client
    const { password, ...employeeWithoutPassword } = employee;
    return {
      ...employeeWithoutPassword,
      token
    };
  }
}

async function getAll() {
  return employees.map(u => {
    // don't return the password to the client
    const { password, ...employeeWithoutPassword } = u;
    return employeeWithoutPassword;
  });
}
module.exports = {
  authenticate,
  getAll
};
