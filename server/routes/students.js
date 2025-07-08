const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../models/Student');

// @route   GET api/students/me
// @desc    Get current student profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    
    if (!student) {
      return res.status(400).json({ msg: 'There is no profile for this student' });
    }
    
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;