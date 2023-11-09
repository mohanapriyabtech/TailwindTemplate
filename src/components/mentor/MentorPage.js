import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
import { useNavigate } from "react-router-dom"
import { FaProductHunt } from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import courseImage from "../../webim/program.jpg";
import PaginationInfo from '../TablePagination';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import logo from '../../webim/logo.png';
import { MailIcon, BellIcon } from '@heroicons/react/solid';
  


const MentorPage = () => {
  const navigate = useNavigate()
  const [dataTable, setDataTable] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [open, setOpen] = useState(true);
  const [courseList, setCourseList] = useState([]); 
  const [authorList, setAuthorList] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
   
  // set pagination
  const [currentTablePage, setCurrentTablePage] = useState(1); // Set your current page
  const itemsPerTablePage = 6; // Number of items per page
  const totalItems = 6; // Total number of items

  const apiUrl = `https://learning-application.onrender.com/api/v1/user/list-course`

  useEffect(() => {

    const fetchCourseList = async () => {
      try {
        
        const response = await axios.get(`https://learning-application.onrender.com/api/v1/user/list-course`);
        const courseData = response.data.data;
        console.log(courseData,"courseData")
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

  const Menus = [
    { title: "Dashboard",path:"/" ,src: "Chart_fill" },
    // { title: "Inbox", path:"/",src: "Chat" }
  ];
  

  // // Fetch data from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('your_api_endpoint_here');
  //       setDataTable(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // course list logics

  const itemsPerPage = 4; 
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  console.log(courseList,"course")
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

  //log out function
  const handleLogoutClick = () => {
    localStorage.removeItem('token')
    navigate("/")
}


  return (
      <div >
     <div className="w-full flex-col md:flex-row p-4 md:p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8" /> 
          <span style={{ fontSize: '24px',fontWeight: 'bold',color: 'black'}} className="animate-pulse">Xpert</span>
        </div>
          <div className="flex flex-row justify-end w-full">
             <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-2 py-1 mr-4"
            />
            <span className="mr-4">Notifications</span> {/* Add notification icon here */}
            <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick= {handleLogoutClick} >logout</button>
          </div>
        </div>
        </div>
      </div>
    


    <div className="flex flex-col md:flex-row h-screen ">
      {/* Sidebar
      {sidebarVisible && (
        <div className="w-full md:w-1/4 h-screen bg-gray-800 text-white p-4 md:p-4">
          <h2 className="text-2xl mb-4">Sidebar</h2>
          <ul className="mb-4">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
          <div>Some additional sidebar content</div>
        </div>
      )} */}
    



  
 
    
    <div className="flex bg-blue-500 bg-opacity-75">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <BsArrowLeftCircle
          className={`absolute cursor-pointer -right-3 top-9 w-5 h-5
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          style={{ border: "2px solid white", background: "white" }}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            John
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <FaProductHunt className="w-6 h-6" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 bg-white">
      </div>
    </div>
    <div className={`w-full md:w-${sidebarVisible ? '3/4' : 'full'} p-4 mt-100 md:mt-100`}>
        
      <h1 className="text-xl mb-4 font-bold">Courses</h1>

      <div className={`w-full md:w-${sidebarVisible ? '3/4' : 'full'} p-4 mt-100 md:mt-100`}>
      <div className={`w-full md:w-${sidebarVisible ? '3/4' : 'full'} p-4 mt-100 md:mt-100`}>
    <div className="flex justify-between items-center">
    
      <div className="flex flex-row justify-end ">
      <button className="bg-blue-500 text-white px-4 py-2 ml-auto">
          Add Course
        </button
        >
      </div>
    </div>
    <div className="w-full md:w-full flex justify-end gap-3">
      <input
        type="text"
        className="input-sm border border-black-500 rounded-lg p-2"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <table className="w-full mt-4 border-b-2 border-gray-300">
      <thead>
        <tr className="p-3 border-t-2 border-b border-gray-300 text-sm text-left">
          <th className="p-3" >COURSE</th>
          <th>DESCRIPTION</th>
          <th>STATUS</th>
          <th>DATE</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        
        {courseList.map((project, i) => (
          <tr key={i} className="hover:bg-gray-100">
            <td className="border-t-2 border-b border-gray-300 p-2">{project.course}</td>
            <td className="border-t-2 border-b border-gray-300 p-2">{project.description}</td>
            <td className="border-t-2 border-b border-gray-300 p-2">
              {project.status === 1 ? 'Approved' : 'Pending'}
            </td>
            <td className="border-t-2 border-b border-gray-300 p-2">
              {new Date(project.created_at).toLocaleDateString()}
            </td>
            <td className="border-t-2 border-b border-gray-300">
              <div className="space-x-2">
                <button layout="link" size="icon" aria-label="Edit">
                  <EditIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button layout="link" size="icon" aria-label="Delete">
                  <DeleteIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>


{/* <div className="border border-gray-300 rounded p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Course List</h2>
          <div className="flex flex-wrap -mx-4">
            {displayedCourses.map((course) => (
              <div key={course._id} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
                <a href="" className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                  <div className="relative pb-48 overflow-hidden">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={courseImage}
                      alt="courseImage"
                    />
                  </div>
                  <div className="p-4">
                
                   
                  
                    <h2 className="mt-2 mb-2 font-bold">{course.course}</h2>
                    <p className="text-sm">{course.description}</p>
                    <div className="mt-3 flex items-center">
                      <span className="text-sm font-semibold"></span>
                      <span className="font-bold text-xl">300</span>
                      <span className="text-sm font-semibold">$</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-b text-xs text-gray-700">
                    <span className="flex items-center mb-1">
                      <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>Lesson: 10 
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
          { displayedCourses.length > 0 && endIndex < courseList.length && (
          
            <button onClick={handleNextClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faArrowRight} /> 
            </button>
          )}
          </div>
          <div className="flex justify-start">
            { startIndex >= 4 && (
              
            <button onClick={handlePreviousClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faArrowLeft} /> 
            </button>
              )}
          </div>
        </div>
      </div> */}
    <PaginationInfo
        currentPage={currentTablePage}
        itemsPerPage={itemsPerTablePage}
        totalItems={totalItems}
      />
    </div>
    </div>
      </div>
      
    </div>
  );
};

export default MentorPage;
