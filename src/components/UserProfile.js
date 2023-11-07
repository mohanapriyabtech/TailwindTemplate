import React, { useState, useEffect } from 'react';
import { MailIcon, BellIcon } from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import userData from "../components/userData.json"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import mentor from "../webim/mentor1.webp"
import courseImage from "../webim/program.jpg"






function UserProfile() {
  const navigate = useNavigate();
  const { user, recommendedVideos, authors } = userData;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const apiUrl = "http://localhost:4000/api/v1/user/list-course"

  useEffect(() => {
    fetchAuthorList()

    const fetchCourseList = async () => {
      try {

        const response = await axios.get("http://localhost:4000/api/v1/user/list-course");
        const courseData = response.data.data;
        console.log(courseData, "courseData")
        setCourseList(courseData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseList();
    if (searchQuery) {
      fetchDataWithSearch();
    }
  }, [searchQuery]);



  const fetchDataWithSearch = async () => {
    try {
      console.log("token")
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${apiUrl}/api/v1/user/search-course?course=${searchQuery}`,
        { headers }
      );
      setCourseList(response.data.data);
    } catch (error) {
      // setError(error.message);
    }

  };

  const fetchAuthorList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/mentor/list-mentor");
      const authorData = response.data.data;
      console.log(authorData, "authorData");
      setAuthorList(authorData);
    } catch (error) {
      console.error('Error fetching author data:', error);
    }
  };


  //log out function
  const handleLogoutClick = () => {
    localStorage.removeItem('token')
    navigate("/")
  }

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoDetails = () => {
    setSelectedVideo(null);
  };

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  console.log(courseList, "course")
  const displayedCourses = courseList.slice(startIndex, endIndex);

  const handleNextClick = () => {
    if (endIndex < courseList.length) {
      setPreviousPage(currentPage);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (startIndex > 0) {
      setCurrentPage(previousPage);
    }
  };


  const itemsPerPage1 = 5;
  const [currentAuthorPage, setCurrentAuthorPage] = useState(1);
  const [notifications, setNotifications] = useState(false)

  const toggleNotifications = () => {
    setNotifications(!notifications)
  }
  const [previousAuthorPage, setPreviousAuthorPage] = useState(1);

  const startAuthorIndex = (currentPage - 1) * itemsPerPage1;
  const endAuthorIndex = currentPage * itemsPerPage1;
  const displayedAuthorCourses = authorList.slice(startAuthorIndex, endAuthorIndex);
  const name = localStorage.getItem("user_name")

  const handleAuthorNextClick = () => {
    if (endAuthorIndex < authorList.length) {
      setPreviousAuthorPage(currentAuthorPage)
      setCurrentAuthorPage(currentAuthorPage + 1);
    }
  };
  const handleAuthorPreviousClick = () => {
    if (startAuthorIndex > 0) {
      setCurrentAuthorPage(previousPage);
    }
  };






  return (
    <div className="bg-gray-100 p-2 w-full ">
      <div className="user-profile bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={process.env.PUBLIC_URL + user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h1 className="text-xl font-bold text-blue-900">Welcome, {name}!</h1>
          </div>
        </div>


        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-200 text-gray-800 rounded-full pl-6 pr-12 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-4 top-2 text-gray-500">
              <FaSearch className="w-5 h-5" />
            </span>
          </div>


          {/* <div className="ml-4 relative">
            <span className="text-blue-500 rounded-full w-8 h-8 flex items-center justify-center bg-blue-100 mr-6">
              <MailIcon className="w-5 h-5" />
            </span>
            <span className="absolute -top-2 right-4 text-white bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
              3
            </span>
          </div> */}

          <div className="ml-4 relative">
            <span className="text-yellow-500 rounded-full w-8 h-8 flex items-center justify-center bg-yellow-100 mr-6" onClick={toggleNotifications}>
              <BellIcon className="w-5 h-5" />
            </span>
            <span className="absolute -top-2 right-4 text-white bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
              7
            </span>
            {notifications && (
              <div className="fixed top-20 right-10 md:right-20 lg:right-20 xl:right-30 z-50">
                <div className="bg-white border border-gray-300 shadow-md rounded-lg w-72 md:w-80 p-4">
                  <h2 className="text-xl font-bold mb-3">Notifications</h2>
                  <ul className="list-disc pl-4">
                    <li className="notification text-green-600 mb-2">
                      <i className="fas fa-check-circle text-xl mr-2"></i>
                      Notification 1 - This is a success message.
                    </li>
                    <li className="notification text-green-600 mb-2">
                      <i className="fas fa-check-circle text-xl mr-2"></i>
                      Notification 2 - Operation was successful.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <button className="bg-white-500 hover:bg-blue-200 text-black border border-blue-500 font-bold py-2 px-4 rounded-full" onClick={handleLogoutClick}>
            Log Out
          </button>
        </div>

      </div>
      <div className="border border-gray-300 rounded p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Course List</h2>
          <div className="flex flex-wrap -mx-4">
            {displayedCourses.map((course) => (
              <div key={course._id} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
                <a href={`/user-lesson-details/${course._id}`} className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                  <div className="relative pb-48 overflow-hidden">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={courseImage}
                      alt="courseImage"
                    />
                  </div>
                  <div className="p-4">

                    {/* <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                        
                      </span> */}

                    <h2 className="mt-2 mb-2 font-bold">{course.course}</h2>

                    {course.description ? (
                      <p className="text-sm">{course.description}</p>
                    ) : (
                      <p className="text-sm">&nbsp;</p>
                    )}


                    <div className="mt-3 flex items-center">
                      <span className="text-sm font-semibold"></span>
                      <span className="font-bold text-xl">300</span>
                      <span className="text-sm font-semibold">$</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-b text-xs text-gray-700">
                    <span className="flex items-center mb-1">
                      <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>Course: 10 lessons
                    </span>
                    <span className="flex items-center">
                      <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>Discount : 10%
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
                    <span className="ml-2">5 Bewertungen</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            {displayedCourses.length > 0 && endIndex < courseList.length && (

              <button onClick={handleNextClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )}
          </div>
          <div className="flex justify-start">
            {startIndex >= 4 && (

              <button onClick={handlePreviousClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            )}
          </div>
        </div>
      </div>


      <div className="border border-gray-300 rounded p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Authors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {displayedAuthorCourses.map((author) => (
              <div key={author.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 p-4">
                <div className="relative mx-auto">
                  <img
                    // src={process.env.PUBLIC_URL + author.avatar}
                    src={mentor}
                    alt={author.mentor_name}
                    className="w-20 h-20 mx-auto object-cover rounded-full"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{author.mentor_name}</h3>
                  <p className="text-sm text-gray-600 ">Mentor</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            {displayedAuthorCourses.length > 0 && endAuthorIndex < authors.length && (

              <button onClick={handleAuthorNextClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )}
          </div>
          <div className="flex justify-start"></div>
          {startAuthorIndex > 4 && (

            <button onClick={handleAuthorPreviousClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}




export default UserProfile;
