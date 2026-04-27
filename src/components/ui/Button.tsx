import React from 'react';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<Props> = ({ children, variant = 'primary' }) => {
  const base =
    'px-4 py-2 rounded-lg text-sm font-medium transition';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };

  return (
    <button className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default Button;