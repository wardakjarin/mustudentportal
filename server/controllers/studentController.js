const Student = require('../models/Student');
const Result = require('../models/Result');
const Course = require('../models/Course');

// @desc    Get student dashboard data
// @route   GET /api/students/dashboard
// @access  Private
exports.getDashboardData = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    
    // Get upcoming courses
    const upcomingCourses = await Course.find({
      code: { $in: ['CSE-301', 'CSE-303', 'MAT-305'] }
    });
    
    // Get recent results
    const recentResults = await Result.find({ 
      studentId: student.studentId 
    }).sort({ semester: -1 }).limit(5);
    
    // Get notices (could be from a Notice model)
    const notices = [
      {
        title: 'Supplementary exam form deadline',
        date: 'June 15, 2023',
        description: 'Last date to submit supplementary exam forms is June 15'
      },
      {
        title: 'Next semester registration starts',
        date: 'July 1, 2023',
        description: 'Registration for Fall 2023 semester begins July 1'
      }
    ];
    
    res.json({
      student,
      upcomingCourses,
      recentResults,
      notices
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get student results by semester
// @route   GET /api/students/results/:semester
// @access  Private
exports.getSemesterResults = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select('-password');
    
    const results = await Result.find({
      studentId: student.studentId,
      semester: req.params.semester
    }).populate('course', ['code', 'title', 'credits']);
    
    if (!results) {
      return res.status(404).json({ msg: 'No results found for this semester' });
    }
    
    // Calculate semester GPA
    const gradePoints = {
      'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    results.forEach(result => {
      if (result.grade && gradePoints[result.grade]) {
        totalGradePoints += gradePoints[result.grade] * result.course.credits;
        totalCredits += result.course.credits;
      }
    });
    
    const semesterGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    
    res.json({
      semester: req.params.semester,
      results,
      semesterGPA,
      cgpa: student.cgpa
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};