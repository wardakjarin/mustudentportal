const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true
  },
  prerequisites: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Course', CourseSchema);