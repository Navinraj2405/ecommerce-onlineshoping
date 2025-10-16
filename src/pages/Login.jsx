 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../config/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        setError("Login failed");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md mx-4 md:mx-0"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-yellow-900 text-center">Login</h2>

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

        {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}

        <p
          className="text-blue-600 text-center mb-6 cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          New user? Register here
        </p>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
