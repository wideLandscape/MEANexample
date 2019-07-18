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
async function getReviewers(review_id) {
  try {
    // don't return the password to the client
    return await Assignment.find({ review_id }, { employee_id: 1 }).populate(
      'employee_id',
      { username: 1 }
    );
  } catch (err) {
    console.log(err);
    throw new Error('Unable to query the database');
  }
}

module.exports = {
  add,
  remove,
  getReviewers
};
