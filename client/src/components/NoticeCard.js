import React from 'react';

const NoticeCard = ({ title, date, description }) => {
  return (
    <div className="notice-box bg-blue-50 p-4 rounded border-l-4 border-blue-500">
      <h3 className="font-medium text-blue-800">{title}</h3>
      <p className="text-gray-500 text-sm">{date}</p>
      {description && <p className="text-gray-700 mt-1 text-sm">{description}</p>}
    </div>
  );
};

export default NoticeCard;
