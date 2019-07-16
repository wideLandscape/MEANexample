const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Employee
const Employee = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'employees'
  }
);

module.exports = mongoose.model('Employee', Employee);
