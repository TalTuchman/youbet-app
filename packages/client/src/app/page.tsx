'use client'; // This page is now interactive

import { useState } from 'react';
import AuthForm from './AuthForm'; // Import our new component

export default function HomePage() {
  // State to hold feedback messages for the user
  const [message, setMessage] = useState('');

  const handleSignup = async (email: string, password: string) => {
    setMessage('Signing up...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        // If the response is not OK (e.g., 400, 403, 500), use the error message from the backend
        throw new Error(data.message || 'Something went wrong');
      }
      setMessage(`Signup successful! Welcome, ${data.email}. Your ID is ${data.id}.`);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setMessage('Logging in...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      // Truncate the token for display purposes
      const truncatedToken = data.access_token.substring(0, 30);
      setMessage(`Login successful! Token: ${truncatedToken}...`);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
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