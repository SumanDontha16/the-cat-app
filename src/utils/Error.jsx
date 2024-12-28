import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Error = ({ statusCode, message }) => {
    return (
        <div className="flex items-center  mx-auto mt-4 p-4 border border-gray-500 rounded-lg text-gray-700 shadow-sm">
            <ExclamationCircleIcon className="w-10 h-10 mr-3" aria-hidden="true" />
            <div>
                <h2 className="text-lg font-bold">Error {statusCode}</h2>
                <p className="mt-1 text-sm">{message}</p>
            </div>
        </div>
    );
};

export default Error;
