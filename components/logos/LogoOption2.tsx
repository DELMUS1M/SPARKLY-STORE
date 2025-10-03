import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoOption2: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
          <stop offset="100%" style={{ stopColor: '#2563eb' }} />
        </linearGradient>
      </defs>
      <path 
        d="M20 80 C40 20, 60 20, 80 80 S60 140, 40 80 S20 20, 20 80"
        stroke="url(#waveGradient)"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LogoOption2;