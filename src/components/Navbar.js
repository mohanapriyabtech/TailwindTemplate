import React, { useState } from 'react';
import logo from '../webim/logo.png';
import '../components/css/Navbar.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav id="Home" className="fixed top-0 left-0 right-0 w-full py-5 bg-sky-200">
      <div className="w-full flex justify-between items-center custom-background">

        <div className="mx-auto w-full flex justify-between items-center px-10">
          <a href="/" className="cursor-pointer">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" className="h-8 animate-bounce" />
            <span style={{ 
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'black',
            }} className="animate-pulse">Xpert</span>
          </div>
          </a>
          <ul className="text-sm tracking-wide items-center flex justify-center space-x-6">
            <li className="hover:scale-125 duration-300 py-1 hover:text-black large-font">
              <a href="#home" className="cursor-pointer">Home</a>
            </li>
            <li className="hover:scale-125 duration-300 py-1 hover:text-black large-font">
              <a href="#product" className="cursor-pointer">Product</a>
            </li>
            <li className="relative group  hover:text-black large-font">
              <a href="#aboutus"
                onClick={toggleDropdown}
                className="cursor-pointer"
              >
                About us
                {/* <span
                  className={`${
                    showDropdown ? 'block' : 'hidden'
                  } absolute z-10 mt-2 py-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg group-hover:block`}
                >
                  <a
                    href="#team"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-black"
                  >
                    Our Team
                  </a>
                  <a
                    href="#mission"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-black"
                  >
                    Our Mission
                  </a>
                </span> */}
              </a>
            </li>
            <li className="hover:scale-125 duration-300 py-1 hover:text-black">
              <a href="#contact" className="cursor-pointer large-font">Contact</a>
            </li>
            <button className="relative bg-teal-600 px-7 rounded-full tracking-wide py-3 text-xs hover:scale-110 duration-300 hover:animate-spark">
              LogOut
            </button>
            {/* <button className="relative bg-teal-600 px-7 rounded-full tracking-wide py-3 text-xs hover:scale-110 duration-300 hover:animate-spark">
              Sign Up
            </button> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
