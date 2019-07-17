const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require('../employees/employee.model');

// Define collection and schema for Review
const Review = new Schema(
  {
    employee: {
      type: Employee.schema,
      required: true
    },
    questions: {
      type: [{ type: String }]
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'reviews'
  }
);

module.exports = mongoose.model('Review', Review);
