import React from 'react'
import logo from "../webim/package.png"

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full py-6">
    <div className="container mx-auto flex justify-between">
      <img src={logo} alt="Logo" className="h-8 animate-bounce" />
      <ul className="text-sm tracking-wide items-center flex gap-x-8">
      <li class="hover:scale-125 duration-300 py-1 hover:text-teal-400">
            <a class="cursor-pointer">Home</a>
          </li>
          <li class="hover:scale-125 duration-300 py-1 hover:text-teal-400">
            <a class="cursor-pointer">Product</a>
          </li>
          <li class="hover:scale-125 duration-300 py-1 hover:text-teal-400">
            <a class="cursor-pointer">About us</a>
          </li>
          <li class="hover:scale-125 duration-300 py-1 hover:text-teal-400">
            <a class="cursor-pointer">Contact</a>
          </li>
          <button
            class="bg-teal-600 px-7 rounded-full tracking-wide py-3 text-xs hover:scale-110 duration-300"
          >
            GET STARTED
          </button>
      </ul>
    </div>
  </nav>
  )
}

export default Navbar