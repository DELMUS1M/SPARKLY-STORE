import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoOption3: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
        <circle cx="50" cy="35" r="10" opacity="0.9" />
        <circle cx="35" cy="65" r="12" opacity="0.7" />
        <circle cx="65" cy="65" r="8" opacity="0.8" />
        <path d="M50 22 L51.5 28 L57 29 L52.5 32.5 L54 38 L50 35 L46 38 L47.5 32.5 L43 29 L48.5 28 Z" fill="white" opacity="0.8" />
    </svg>
  );
};

export default LogoOption3;