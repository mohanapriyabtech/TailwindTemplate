import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
import signup from "../../webim/signup.webp";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
  


function Signup() {
  const apiUrl = process.env.REACT_APP_API_URL || '';
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignupSubmit = async (values) => {
    try {
    
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/mentor/signup`, values);
      localStorage.setItem('token', response.data.data.session.session_token);
      navigate('/mentor-course');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };


  const signupFormik = useFormik({
    initialValues: {
      mentor_name: '',
      email: '',
      password: '',
      phone_number: ''
    },
    validationSchema: Yup.object({
      mentor_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must contain at least one letter, one number, and one special character'
      ),
      phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be a 10-digit number'),
    }),
    onSubmit: handleSignupSubmit,
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="pr-4">
          <img
            src={signup}
            alt="signup"
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
          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Sign Up</h2>
          <form onSubmit={signupFormik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow appearance-none"
                id="name"
                name="mentor_name"
                type="text"
                placeholder="Name"
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                value={signupFormik.values.mentor_name}
              />
            </div>
            {signupFormik.touched.mentor_name && signupFormik.errors.mentor_name ? (
              <div className="text-red-600">{signupFormik.errors.mentor_name}</div>
            ) : null}

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
            {signupFormik.touched.email && signupFormik.errors.email ? (
              <div className="text-red-600">{signupFormik.errors.email}</div>
            ) : null}
            
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone_number">Mobile Number</label>
              <input
                className="w-full px-3 py-2 border rounded shadow appearance-none"
                rows="3"
                placeholder="0000000000"
                name="phone_number"
                value={signupFormik.values.phone_number}
                onChange={signupFormik.handleChange}
              />
            
            {signupFormik.touched.phone_number && signupFormik.errors.phone_number ? (
              <div className="text-red-600">{signupFormik.errors.phone_number}</div>
            ) : null}
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
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                value={signupFormik.values.password}
              />
            </div>
            {signupFormik.touched.password && signupFormik.errors.password ? (
              <div className="text-red-600">{signupFormik.errors.password}</div>
            ) : null}

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
            <Link to="/mentor-login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
