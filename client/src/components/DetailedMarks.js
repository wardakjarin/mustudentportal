import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import LoadingSpinner from './LoadingSpinner';
import GradeBadge from './GradeBadge';

const DetailedMarks = () => {
  const { semester, courseCode } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authTokens } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/api/students/courses/${courseCode}`, {
          headers: {
            'x-auth-token': authTokens
          }
        });
        setDetails(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [semester, courseCode, authTokens]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {details.course.code}: {details.course.title.toUpperCase()} - DETAILED MARKS
            </h1>
            <button 
              onClick={() => history.push(`/results/${semester}`)}
              className="bg-white text-blue-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
            >
              Back to Results
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
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Type</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weighted Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {details.assessments.map((assessment, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {assessment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {assessment.marks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {assessment.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {assessment.weightedScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              <span className="font-medium">TOTAL:</span> {details.totalPercentage} | 
              <span className="font-medium">GRADE:</span> <GradeBadge grade={details.grade} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailedMarks;