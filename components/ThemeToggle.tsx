import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import { Theme } from '../App';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full text-blue-600 dark:text-yellow-400 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-8 w-8" />
      ) : (
        <SunIcon className="h-8 w-8" />
      )}
    </button>
  );
};

export default ThemeToggle;
