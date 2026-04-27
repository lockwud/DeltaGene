import React from 'react';

type Props = {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'gray';
};

const Badge: React.FC<Props> = ({ children, color = 'gray' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    gray: 'bg-gray-100 text-gray-700',
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[color]}`}>
      {children}
    </span>
  );
};

export default Badge;