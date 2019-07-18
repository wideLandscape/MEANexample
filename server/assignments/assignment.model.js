const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// Define collection and schema for Review
const Assignment = new Schema(
  {
    review_id: {
      type: ObjectId,
      required: true
    },
    employee_id: {
      type: ObjectId,
      required: true
    },
    results: {
      type: [{ question: { type: String }, value: { type: Number } }]
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'assignments'
  }
);

module.exports = mongoose.model('Assignment', Assignment);
