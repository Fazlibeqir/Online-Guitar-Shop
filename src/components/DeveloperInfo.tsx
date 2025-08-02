'use client';

import { useState } from 'react';

export const DeveloperInfo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300"
        title="Developer Info"
      >
        🎸
      </button>
      
      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-64">
          <div className="text-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Developer Info</h3>
            <p className="text-gray-600 mb-2">
              🎸 Built with passion by [Your Name]
            </p>
            <p className="text-gray-500 text-xs">
              Guitar enthusiast & Full-stack developer
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Tech: Next.js, TypeScript, Apollo Client
            </p>
            <button
              onClick={() => setIsVisible(false)}
              className="text-orange-500 text-xs mt-2 hover:text-orange-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 