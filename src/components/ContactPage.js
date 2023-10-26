import React from 'react';
import contact from "../webim/images.jpeg"

function ContactPage() {
  return (
    <div id="contact" className="container mx-auto mt-40 p-6">
      <div className="flex flex-wrap">
      {/* <div className="w-full md:w-1/2 p-4 mt-10"> 
      <img src={contact} alt="Your Image" className="w-full h-auto" />
    </div> */}
        <div className="w-full md:w-1/2 p-4 mt-10">
          <div className="bg-white  mt-70 p-6 rounded-lg shadow-md">
            <h2 className=" text-2xl font-bold text-gray-800 mb-2">Contact Information</h2>
            <address>
              <p className="text-gray-600">123 Main Street</p>
              <p className="text-gray-600">City, State 12345</p>
              <p className="text-gray-600">Email: example@example.com</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Your Message"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
