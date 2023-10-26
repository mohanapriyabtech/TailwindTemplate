import React, { useState } from 'react';
import signup from "../webim/signup.webp";
import loginImage from "../webim/login1.webp";
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="pr-4">
        <img
          src={showLogin ? loginImage : signup}
          alt={showLogin ? "login" : "signup"}
          style={{
            width: '100%',
            height: 'auto',
            marginTop: '100px',
            marginLeft: '10px',
            marginRight: '10px',
            marginBottom: '10px',
            position: 'relative',
            zIndex: '1',
          }}
        />
      </div>
      <div className="pl-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 animate-fade-in">
        {showLogin ? (
          <>
            <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Login</h2>
            
            <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transform transition hover:scale-105 duration-300 ease-in-out"
              type="submit"
            >
              Log In
            </button>
          </div>
        
            </form>
            <div className="text-center text-sm text-gray-700">
              Don't have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={handleSignupClick}
              >
                Sign Up
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Sign Up</h2>
            <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password-confirm">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="name"
              type="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transform transition hover:scale-105 duration-300 ease-in-out"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
            <div className="text-center text-sm text-gray-700">
              Already have an account?{' '}
              <button
                className="text-blue-500 hover:underline"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}

export default AuthPage;
