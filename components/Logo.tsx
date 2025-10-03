import React from 'react';

interface LogoProps {
  className?: string;
}

const LOGO_URL = 'https://i.ibb.co/9v0Fz1B/sparkly-logo.png';

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src={LOGO_URL}
      alt="Sparkly Detergents Logo"
      className={className}
    />
  );
};

export default Logo;
