import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './DarkModeToggle.css';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`dark-mode-toggle ${darkMode ? 'active' : ''}`}
    >
      {darkMode ? <FaSun size={20} color="yellow" /> : <FaMoon size={20} color="gray" />}
    </button>
  );
};

export default DarkModeToggle;
