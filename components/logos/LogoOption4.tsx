import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoOption4: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none" />
      <path d="M35 25 H65 L75 40 V75 H25 V40 Z" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <path d="M45 40 C45 32, 55 32, 55 40" stroke="currentColor" strokeWidth="4" fill="none"/>
      <path d="M30 20 L35 25 L40 20" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  );
};

export default LogoOption4;