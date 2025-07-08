const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const {
  getDashboardData,
  getSemesterResults,
  getCourseDetails,
  getRetakeInfo,
  getUpcomingCourses
} = require('../controllers/studentController');

// @route   GET api/students/dashboard
// @desc    Get dashboard data
// @access  Private
router.get('/dashboard', auth, getDashboardData);

// @route   GET api/students/results/:semester
// @desc    Get semester results
// @access  Private
router.get('/results/:semester', auth, getSemesterResults);

// @route   GET api/students/courses/:code
// @desc    Get course details
// @access  Private
router.get('/courses/:code', auth, getCourseDetails);

// @route   GET api/students/retakes
// @desc    Get retake information
// @access  Private
router.get('/retakes', auth, getRetakeInfo);

// @route   GET api/students/upcoming-courses
// @desc    Get upcoming courses
// @access  Private
router.get('/upcoming-courses', auth, getUpcomingCourses);

module.exports = router;