import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoOption5: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4ade80' }} />
          <stop offset="100%" style={{ stopColor: '#22c55e' }} />
        </linearGradient>
      </defs>
      <path
        d="M50 5 C25 25, 30 60, 50 95 C70 60, 75 25, 50 5 Z"
        fill="url(#ecoGradient)"
      />
      <path
        d="M50 40 C60 50, 60 70, 50 95 C40 70, 40 50, 50 40 Z"
        fill="white"
        opacity="0.3"
      />
    </svg>
  );
};

export default LogoOption5;