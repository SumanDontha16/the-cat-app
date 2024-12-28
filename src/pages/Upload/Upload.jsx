import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';

export const Upload = () => {
    return (
        <div>
            <NavBar />
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upload a Cat Image</h2>
                    <p className="mt-4 text-gray-500">
                        Any uploads must comply with the{' '}
                        <Link to="https://thecatapi.com/privacy" className="text-indigo-600">
                            {' '}
                            upload guidelines
                        </Link>{' '}
                        or face deletion.
                    </p>
                </div>
            </main>
        </div>
    );
};
