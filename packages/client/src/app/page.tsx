'use client'; // This page is now interactive

import { useState } from 'react';
import AuthForm from './AuthForm'; // Import our new component

export default function HomePage() {
  // State to hold feedback messages for the user
  const [message, setMessage] = useState('');

  const handleSignup = async (email: string, password: string) => {
    setMessage('Signing up...');
    console.log('Signup attempted with:', { email, password });
    // API call will go here soon
  };

  const handleLogin = async (email: string, password: string) => {
    setMessage('Logging in...');
    console.log('Login attempted with:', { email, password });
    // API call will go here soon
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="container mx-auto flex max-w-4xl flex-col items-center p-4">
        <h1 className="text-4xl font-bold">YouBet</h1>
        <p className="mt-2 text-lg text-gray-400">
          Create an account or log in to place your bets.
        </p>

        {/* Display feedback messages */}
        {message && <p className="mt-4 rounded-md bg-gray-700 p-3">{message}</p>}

        <div className="mt-8 grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <AuthForm formType="signup" onSubmit={handleSignup} />
          <AuthForm formType="login" onSubmit={handleLogin} />
        </div>
      </div>
    </main>
  );
}