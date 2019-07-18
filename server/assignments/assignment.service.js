// Require Assignment model in our routes module
const Assignment = require('./assignment.model');

async function add(data) {
  try {
    const assignment = new Assignment(data);
    return await assignment.save();
  } catch (err) {
    console.log(err);
    throw new Error('Unable to assign the reviewer');
  }
}

async function remove(id) {
  try {
    return await Assignment.findByIdAndRemove({ _id: id });
  } catch (err) {
    console.log(err);
    throw new Error('Unable to remove the reviewer');
  }
}

module.exports = {
  add,
  remove
};
