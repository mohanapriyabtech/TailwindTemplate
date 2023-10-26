import React, { useEffect, useState } from 'react';
import axios from 'axios';
import signup from "../webim/signup.webp";
import loginImage from "../webim/login1.webp";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';



function AuthPage() {
    const apiUrl = process.env.REACT_APP_API_URL || '';
    const navigate = useNavigate();
    const [error, setError] = useState(null);
  
    const handleLoginSubmit = async (values) => {
        try {
          const response = await axios.post('http://localhost:3000/api/v1/user/login', values);
          console.log(response.data.data)
          localStorage.setItem('token', response.data.data.token);
          navigate('/user-profile');
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
    
      const handleSignupSubmit = async (values) => {
        try {
         
          const response = await axios.post('http://localhost:3000/api/v1/user/signup', values);
          localStorage.setItem('token', response.data.token);
          navigate('/user-profile');
        } catch (error) {
          console.error('Signup failed:', error);
        }
      };
    
      const loginFormik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
        }),
        onSubmit: handleLoginSubmit,
      });
    
      const signupFormik = useFormik({
        initialValues: {
          email: '',
          password: '',
          name: '', 
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
          name: Yup.string().required('Required'), 
        }),
        onSubmit: handleSignupSubmit,
      });
    
  
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(false);
  };

  const handleSignupClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="pr-4">
        <img
          src={showLogin ? signup : loginImage}
          alt={showLogin ? "signup" : "login"}
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
            <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Sign Up</h2>
            <form onSubmit={loginFormik.onSubmit} >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password-confirm">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              value={loginFormik.values.name}
            />
          </div>
          { loginFormik.touched.name && loginFormik.errors.name ? (
            <div className="text-red-600">{loginFormik.errors.name}</div>
            ) : null }

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="email"
              type="email"
              placeholder="Email"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              value={loginFormik.values.email}
            />
          </div>
          { loginFormik.touched.email && loginFormik.errors.email ? (
            <div className="text-red-600">{loginFormik.errors.email}</div>
            ) : null }
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              id="password"
              type="password"
              placeholder="Password"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              value={loginFormik.values.password}
              />
            </div>
            { loginFormik.touched.password && loginFormik.errors.password ? (
              <div className="text-red-600">{loginFormik.errors.password}</div>
              ) : null }
          
          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2"  onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} value={loginFormik.values.agreement}/>
              <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full transform transition hover:scale-105 duration-300 ease-in-out"
              type="submit"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default form submission
                // Additional actions for handling the "Sign Up" button click
              }}
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
        ):(
            <>
              <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Login</h2>
              
              <form onSubmit={signupFormik.onSubmit} >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow appearance-none"
                id="email"
                type="email"
                placeholder="Email"
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                value={signupFormik.values.email}
                />
              </div>
              { signupFormik.touched.email && signupFormik.errors.email ? (
                <div className="text-red-600">{signupFormik.errors.email}</div>
                ) : null }
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow appearance-none"
                id="password"
                type="password"
                placeholder="Password"
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                value={signupFormik.values.password}
              />
            </div>
            { signupFormik.touched.password && signupFormik.errors.password ? (
              <div className="text-red-600">{signupFormik.errors.password}</div>
              ) : null }
          
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
                onClick={(e) => {
                    e.preventDefault(); // Prevent the default form submission
                    // Additional actions for handling the "Sign Up" button click
                  }}
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
                  SignUp
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
