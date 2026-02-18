import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-beige">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-wedding-gold"></div>
    </div>
  );
};

export default LoadingSpinner;
