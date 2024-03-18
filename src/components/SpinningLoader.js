import React from 'react';

const SpinningLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-40"></div>
    </div>
  );
};

export default SpinningLoader;
