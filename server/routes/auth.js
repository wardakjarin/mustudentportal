const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const { check, validationResult } = require('express-validator');

// @route   POST api/auth/login
// @desc    Authenticate student & get token
// @access  Public
router.post(
  '/login',
  [
    check('studentId', 'Student ID is required').not().isEmpty(),
    check('dob', 'Date of birth is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { studentId, dob } = req.body;

    try {
      // See if student exists
      let student = await Student.findOne({ studentId });

      if (!student) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Check if DOB matches (in a real app, we'd use password hashing)
      const dobMatch = new Date(student.dob).toISOString().split('T')[0] === dob;

      if (!dobMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        student: {
          id: student.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;