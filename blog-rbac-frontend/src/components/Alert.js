// src/components/Alert.js
import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-lg flex items-center space-x-4 z-50 animate-fadeIn">
      <svg
        className="w-6 h-6 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
        />
      </svg>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-red-700 hover:text-red-900 font-bold focus:outline-none"
        aria-label="Close alert"
      >
        ✕
      </button>
    </div>
  );
};

export default Alert;
