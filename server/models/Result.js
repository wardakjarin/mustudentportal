const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  type: String,
  marks: String,
  weight: String,
  weightedScore: String
});

const ResultSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  assessments: [AssessmentSchema],
  totalPercentage: String,
  grade: String,
  status: {
    type: String,
    enum: ['Passed', 'Retake'],
    default: 'Passed'
  }
});

module.exports = mongoose.model('Result', ResultSchema);