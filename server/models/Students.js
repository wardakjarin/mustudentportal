const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  currentSemester: {
    type: Number,
    required: true
  },
  cgpa: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', StudentSchema);