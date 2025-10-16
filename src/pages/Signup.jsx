 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../config/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/'); // Redirect to login page after signup
      })
      .catch(() => {
        setError('Registration failed');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md mx-4 md:mx-0"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-yellow-900 text-center">
          Sign Up
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </div>

        <p
          className="text-blue-600 text-center mb-6 cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Already have an account? Login here
        </p>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
