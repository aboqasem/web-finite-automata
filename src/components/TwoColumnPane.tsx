import React, { ReactNode } from 'react';

export interface TwoColumnPaneProps {
  children: [ReactNode, ReactNode];
}

export default function TwoColumnPane({ children }: TwoColumnPaneProps) {
  return (
    <div className="relative flex flex-col min-h-full">
      {/* Left sidebar & main wrapper */}
      <div className="flex-1 min-w-0 lg:flex">
        <div className="border-b border-gray-200 lg:border-b-0 lg:flex-shrink-0 lg:w-80 xl:w-96 lg:border-r lg:border-gray-200">
          <div className="flex h-full px-4 py-6 sm:px-6 lg:px-8">
            {/* Start left column area */}
            <div className="relative flex-1 h-full">{children[0]}</div>
            {/* End left column area */}
          </div>
        </div>

        <div className="lg:min-w-0 lg:flex-1">
          <div className="flex h-full px-4 py-6 sm:px-6 lg:px-8">
            {/* Start main area*/}
            <div className="relative flex-1 h-full">{children[1]}</div>
            {/* End main area */}
          </div>
        </div>
      </div>
    </div>
  );
}
