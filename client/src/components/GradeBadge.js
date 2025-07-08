import React from 'react';

const gradeColors = {
  'A': 'text-green-700',
  'A-': 'text-green-600',
  'B+': 'text-blue-500',
  'B': 'text-blue-600',
  'B-': 'text-blue-700',
  'C+': 'text-yellow-600',
  'C': 'text-yellow-700',
  'C-': 'text-yellow-800',
  'D+': 'text-orange-600',
  'D': 'text-orange-700',
  'F': 'text-red-600'
};

const GradeBadge = ({ grade }) => {
  if (!grade) return null;
  
  const baseClass = gradeColors[grade[0]] || 'text-gray-700';
  
  return (
    <span className={`${baseClass} font-medium`}>
      {grade}
    </span>
  );
};

export default GradeBadge;