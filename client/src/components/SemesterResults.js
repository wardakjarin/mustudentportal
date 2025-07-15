import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import LoadingSpinner from './LoadingSpinner';
import GradeBadge from './GradeBadge';
import StatusBadge from './StatusBadge';

const SemesterResults = () => {
  const { semester } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authTokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/students/results/${semester}`, {
          headers: {
            'x-auth-token': authTokens
          }
        });
        setResults(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [semester, authTokens]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">SPRING 2025 RESULTS - SEMESTER {semester}</h1>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.results.map((result) => (
                  <tr key={result._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.course.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {result.course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <GradeBadge grade={result.grade} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={result.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => navigate(`/results/${semester}/${result.course.code}`)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-700 mb-2 sm:mb-0">
              <span className="font-medium">SEMESTER GPA:</span> {results.semesterGPA} | <span className="font-medium">CGPA:</span> {results.cgpa}
            </div>
            <div className="flex space-x-3">
              <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
                Print Result
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SemesterResults;