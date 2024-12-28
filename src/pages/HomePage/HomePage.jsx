import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

export const HomePage = () => {
    return (
        <div>
            <NavBar />
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <h1>Home Page</h1>
            </main>
        </div>
    );
};
