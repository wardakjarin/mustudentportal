import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SemesterResults from './components/SemesterResults';
import DetailedMarks from './components/DetailedMarks';
import RetakeInfo from './components/RetakeInfo';
import UpcomingCourses from './components/UpcomingCourses';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/results/:semester" element={<PrivateRoute><SemesterResults /></PrivateRoute>} />
          <Route path="/results/:semester/:courseCode" element={<PrivateRoute><DetailedMarks /></PrivateRoute>} />
          <Route path="/retakes" element={<PrivateRoute><RetakeInfo /></PrivateRoute>} />
          <Route path="/courses" element={<PrivateRoute><UpcomingCourses /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;