'use client'; // Required directive for components with interactivity and state.

import { useState } from 'react';

// Define the props (inputs) our component will accept.
interface AuthFormProps {
  formType: 'signup' | 'login'; // Determines the form's title and button text.
  onSubmit: (email: string, password: string) => void; // The function to call when the form is submitted.
}

export default function AuthForm({ formType, onSubmit }: AuthFormProps) {
  // Manage the state of the email and password inputs.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the browser from reloading the page on form submission.
    onSubmit(email, password); // Call the function passed via props with the current state.
  };

  // The JSX that defines the component's appearance.
  return (
    <div className="mt-8 w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">
        {formType === 'signup' ? 'Create Account' : 'Log In'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {formType === 'signup' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
}