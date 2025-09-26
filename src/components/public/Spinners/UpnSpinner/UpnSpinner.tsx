"use client";

import React from 'react';

const UpnSpinner: React.FC = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-transparent'>
            <div className="grid gap-3">
                <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-manrope font-extrabold text-transparent bg-gradient-to-tr from-indigo-800 to-blue-600 bg-clip-text flex items-center">
                    UPN 2
                    <div className="flex rounded-full w-7 h-7 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 p-0.5 bg-gradient-to-tr from-indigo-800 to-blue-500 animate-spin">
                        <div className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full bg-white"></div>
                    </div>
                    1
                </h2>
            </div>
        </div>
    );
}

export default UpnSpinner;
