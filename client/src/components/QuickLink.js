import React from 'react';

const QuickLink = ({ icon, text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="quick-link bg-blue-50 hover:bg-blue-100 p-3 rounded-lg text-blue-700 text-sm font-medium flex flex-col items-center justify-center transition duration-200"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 mb-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
      </svg>
      {text}
    </button>
  );
};

export default QuickLink;
