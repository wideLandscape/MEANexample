// Require Assignment model in our routes module
const Assignment = require('./assignment.model');

const reviewService = require('../reviews/review.service');

async function add(data) {
  try {
    const assignment = new Assignment(data);
    const doc = await assignment.save();
    await reviewService.push(doc);
    return doc;
  } catch (err) {
    console.log(err);
    throw new Error('Unable to assign the reviewer');
  }
}

async function remove(id, from) {
  try {
    const doc = await Assignment.findOneAndRemove({
      review_id: from,
      employee_id: id
    });
    await reviewService.pull(doc);
    return doc;
  } catch (err) {
    console.log(err);
    throw new Error('Unable to remove the reviewer');
  }
}
async function getReviewers(review_id) {
  try {
    return await Assignment.find({ review_id }, { employee_id: 1 }).populate(
      'employee_id',
      { username: 1, _id: 1 }
    );
  } catch (err) {
    console.log(err);
    throw new Error('Unable to query the database');
  }
}

async function byReviewer(employee_id, todo = true) {
  try {
    return await Assignment.find({ employee_id, done: !todo })
    .populate('review_id', {
      assignments: 0
    });
  } catch (err) {
    console.log(err);
    throw new Error('Unable to get assignments by reviewer');
  }
}

async function removeEmployeeAssignments(id) {
  try {
    const doc = await Assignment.findAndRemove({
      employee_id: id
    });
    await reviewService.pull(doc);
    return doc;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  add,
  remove,
  getReviewers,
  removeEmployeeAssignments,
  byReviewer
};
