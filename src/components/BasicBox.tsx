'use client';

import React from 'react';

const BasicBox = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div
      className={`bg-white p-8 flex flex-col flex-1 border rounded-sm text-[14px] ${className}`}
      style={{ boxShadow: '0 1px 2px 0 var(--gray-warm)' }}
    >
      {children}
    </div>
  );
};

export default BasicBox;