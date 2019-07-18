// Require Reviews model in our routes module
const Reviews = require('./review.model');

async function getAll() {
  try {
    const reviews = await Reviews.find({}).sort({ 'employee.username': 1 });
    await Reviews.populate(reviews, {
      path: 'assignments',
      select: { employee_id: 1 },
      options: { lean: true }
    });
    await Reviews.populate(reviews, {
      path: 'assignments.employee_id',
      select: { username: 1 },
      options: { lean: true }
    });
    return reviews;
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
async function push(doc) {
  try {
    return await Reviews.updateOne(
      { _id: doc.review_id },
      {
        $push: {
          assignments: doc._id
        }
      }
    );
  } catch (err) {
    console.log(err);
    throw new Error('Unable to push the assignment');
  }
}
async function pull(doc) {
  try {
    return await Reviews.updateOne(
      { _id: doc.review_id },
      {
        $pull: {
          assignments: doc._id
        }
      }
    );
  } catch (err) {
    console.log(err);
    throw new Error('Unable to pull the assignment');
  }
}

module.exports = {
  getAll,
  add,
  update,
  getById,
  push,
  pull
};
