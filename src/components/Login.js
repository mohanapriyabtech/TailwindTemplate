import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loginImage from "../webim/login1.webp";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const apiUrl = process.env.REACT_APP_API_URL || '';
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/login", values);
      console.log(response.data.data,"data")
      if (response.data.data && response.data.data.session.session_token) {
        localStorage.setItem('token', response.data.data.session.session_token);
        navigate('/user-profile');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again later.');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="pr-4 mr-10">
        <img
          src={loginImage}
          alt="login"
          style={{
            width: '100%',
            height: 'auto',
            marginTop: '100px',
            marginRight: '10px',
            marginBottom: '100px',
            position: 'relative',
            zIndex: '1',
          }}
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 animate-fade-in">
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Login</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={loginFormik.handleSubmit}>
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
          {loginFormik.touched.email && loginFormik.errors.email ? (
            <div className="text-red-600">{loginFormik.errors.email}</div>
          ) : null}
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
          {loginFormik.touched.password && loginFormik.errors.password ? (
            <div className="text-red-600">{loginFormik.errors.password}</div>
          ) : null}

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
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
