import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import LoadingSpinner from './LoadingSpinner';
import NoticeCard from './NoticeCard';
import QuickLink from './QuickLink';
import CourseTable from './CourseTable';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authTokens, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/students/dashboard', {
          headers: {
            'x-auth-token': authTokens
          }
        });
        setDashboardData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [authTokens]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  const { student, upcomingCourses, recentResults, notices } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">METRO UNI - WELCOME, {student.name}</h1>
              <div className="text-sm mt-1">
                ID: {student.studentId} | Program: {student.program}
              </div>
            </div>
            <div className="mt-2 md:mt-0 text-sm">
              Current CGPA: <span className="font-bold">{student.cgpa}</span> | 
              Current Semester: <span className="font-bold">{student.currentSemester}</span>
              <button 
                onClick={logout}
                className="ml-4 bg-white text-blue-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Links Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">QUICK LINKS</h2>
              <div className="grid grid-cols-2 gap-3">
                <QuickLink 
                  icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  text="View Results"
                  onClick={() => navigate('/results')}
                />
                <QuickLink 
                  icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  text="Course Schedule"
                  onClick={() => navigate('/schedule')}
                />
                {/* Add other quick links */}
              </div>
            </div>
          </div>

          {/* Notices Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">NOTICES</h2>
              <div className="space-y-4">
                {notices.map((notice, index) => (
                  <NoticeCard 
                    key={index}
                    title={notice.title}
                    date={notice.date}
                    description={notice.description}
                  />
                ))}
              </div>
            </div>

            {/* Upcoming Courses Preview */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">FALL 2023 - PROPOSED COURSES (SEMESTER {student.currentSemester + 1})</h2>
                <button 
                  onClick={() => navigate('/upcoming-courses')}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                >
                  View Details
                </button>
              </div>
              <CourseTable courses={upcomingCourses.slice(0, 3)} />
              <div className="mt-4 text-right">
                <p className="text-sm text-gray-600">Total Credits: <span className="font-semibold">
                  {upcomingCourses.reduce((sum, course) => sum + course.credits, 0)}
                </span></p>
                <button className="mt-2 text-sm bg-gray-200 text-gray-700 py-2 px-4 rounded cursor-not-allowed">
                  Register Now (opens September 1)
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
