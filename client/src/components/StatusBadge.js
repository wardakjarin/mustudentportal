import React from 'react';

const StatusBadge = ({ status }) => {
  const color = status === 'Pass' ? 'green' : status === 'Fail' ? 'red' : 'gray';
  return (
    <span style={{
      padding: '3px 8px',
      borderRadius: '8px',
      background: color,
      color: 'white',
      fontSize: '0.85em',
      marginLeft: '8px'
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;
