'use client';
import React from 'react';

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <div className="flex justify-center py-6">
      <div className="w-full max-w-[400px]">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
