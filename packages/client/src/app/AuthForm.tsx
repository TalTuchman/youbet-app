// We need this to make it an interactive client component
'use client'; 

import { useState, FormEvent } from 'react';

export default function AuthForm() {
  // State for the Sign Up form
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  // State for the Log In form
  const [logInEmail, setLogInEmail] = useState('');
  const [logInPassword, setLogInPassword] = useState('');

  // State to display messages back to the user
  const [message, setMessage] = useState('');

  // Handler for the Sign Up form submission
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    setMessage('Signing up...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If response is not 2xx, throw an error with the message from the backend
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(`Success! User created with email: ${data.email}`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handler for the Log In form submission
  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('Logging in...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: logInEmail, password: logInPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // In a real app, you would save this token
      setMessage(`Success! Your token starts with: ${data.access_token.substring(0, 30)}...`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // The JSX remains largely the same, but we connect the state and handlers
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">YouBet</h1>
        <p className="text-gray-400">Create an account or log in to place your bets.</p>
      </div>

      {/* Display message area */}
      {message && (
        <div className="text-center p-4 mb-4 bg-gray-700 rounded-md text-white">
          <p>{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Account Form */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">Create Account</h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="signup-email">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                minLength={8}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Log In Form */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">Log In</h2>
          <form onSubmit={handleLogIn}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={logInEmail}
                onChange={(e) => setLogInEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={logInPassword}
                onChange={(e) => setLogInPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}