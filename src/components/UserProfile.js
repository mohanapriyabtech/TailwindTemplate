import React, { useState } from 'react';
import { MailIcon, BellIcon } from '@heroicons/react/solid';
import { FaSearch } from 'react-icons/fa';
import userData from "../components/userData.json"



function UserProfile() {
  const { user, recommendedVideos, authors } = userData;
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoDetails = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-gray-100 p-2">
  <div className="user-profile bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
    <div className="flex items-center">
      <img
        src={process.env.PUBLIC_URL + user.avatar}
        alt={user.name}
        className="w-16 h-16 rounded-full"
      />
      <div className="ml-4">
        <h1 className="text-xl font-bold text-blue-900">Welcome, {user.name}!</h1>
      </div>
    </div>
   

    <div className="flex items-center">
    <div className="relative">
  <input
    type="text"
    placeholder="Search"
    className="bg-gray-200 text-gray-800 rounded-full pl-6 pr-12 py-2 focus:outline-none focus:ring focus:ring-blue-400"
  />
  <span className="absolute right-4 top-2 text-gray-500"> 
    <FaSearch className="w-5 h-5" />
  </span>
</div>


  <div className="ml-4 relative">
    <span className="text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-blue-100 mr-6">
      <MailIcon className="w-5 h-5" />
    </span>
    <span className="absolute -top-2 right-4 text-white bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
      3
    </span>
  </div>

  <div className="relative">
    <span className="text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center bg-yellow-100 mr-6">
      <BellIcon className="w-5 h-5" />
    </span>
    <span className="absolute -top-2 right-4 text-white bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
      7
    </span>
  </div>

  <button className="bg-white-500 hover:bg-blue-200 text-black border border-blue-500 font-bold py-2 px-4 rounded-full">
  Log Out
</button>
</div>

  </div>









  <div className="container mx-auto">
  <h2 className="text-2xl font-bold mb-4">Course List</h2>
  <div className="flex flex-wrap -mx-4">
    {recommendedVideos.map((course) => (
      <div key={course.id} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
        <a href="" className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
          <div className="relative pb-48 overflow-hidden">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={course.image}
              alt=""
            />
          </div>
          <div className="p-4">
            {course.highlight && (
              <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                {course.highlight}
              </span>
            )}
            <h2 className="mt-2 mb-2 font-bold">{course.title}</h2>
            <p className="text-sm">{course.description}</p>
            <div className="mt-3 flex items-center">
              <span className="text-sm font-semibold">ab</span>
              <span className="font-bold text-xl">{course.price}</span>
              <span className="text-sm font-semibold">€</span>
            </div>
          </div>
          <div className="p-4 border-t border-b text-xs text-gray-700">
            <span className="flex items-center mb-1">
              <i className="far fa-clock fa-fw mr-2 text-gray-900"></i> {course.duration}
            </span>
            <span className="flex items-center">
              <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i> {course.discount}
            </span>
          </div>
          <div className="p-4 flex items-center text-sm text-gray-600">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current text-yellow-500"
              >
                <path
                  d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
                ></path>
              </svg>
            ))}
            <span className="ml-2">{course.rating} Bewertungen</span>
          </div>
        </a>
      </div>
    ))}
  </div>
  <button>next</button>
</div>



      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Authors</h2>
        <div className="flex">
          {authors.map((author) => (
            <div
              key={author.id}
              className="author-card transition-transform transform hover:scale-105"
            >
              <img
                src={process.env.PUBLIC_URL + author.avatar}
                alt={author.name}
                className="w-20 h-20 rounded-full"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{author.name}</h3>
                <p className="text-sm text-gray-600">{author.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




export default UserProfile;
