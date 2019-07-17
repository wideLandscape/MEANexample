// Require Reviews model in our routes module
const Reviews = require('./review.model');

async function getAll() {
  try {
    return await Reviews.find({});
  } catch (err) {
    console.log(err);
    throw new Error('Unable to query the database');
  }
}

async function add(data) {
  try {
    const review = new Reviews(data);
    return await review.save();
  } catch (err) {
    console.log(err);
    throw new Error('Unable to add the review');
  }
}

async function update(body, id) {
  try {
    const review = await getById(id);
    review.employee = body.employee;
    review.questions = body.questions;
    review.active = body.active;
    return await review.save();
  } catch (err) {
    console.log(err);
    throw new Error('Unable to update the database');
  }
}

async function getById(id) {
  try {
    return await Reviews.findById(id);
  } catch (err) {
    console.log(err);
    throw new Error('Unable to get the document');
  }
}

module.exports = {
  getAll,
  add,
  update,
  getById
};
