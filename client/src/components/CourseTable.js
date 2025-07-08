import React from 'react';

const CourseTable = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <p className="text-gray-500 text-center py-4">No courses found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course, index) => (
            <tr key={course._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{course.title}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{course.credits} Cr.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;