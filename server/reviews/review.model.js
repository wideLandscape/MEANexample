const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// Define collection and schema for Review
const Review = new Schema(
  {
    employee: {
      type: {
        _id: {
          type: ObjectId,
          required: true
        },
        username: {
          type: String,
          required: true
        },
        firstName: {
          type: String
        },
        lastName: {
          type: String
        }
      },
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
