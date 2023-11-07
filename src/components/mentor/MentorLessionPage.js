import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import PaginationInfo from '../TablePagination';
import logo from '../../webim/logo.png';
import { MailIcon, BellIcon } from '@heroicons/react/solid';


const MentorLessionPage = () => {
  const editButtonRef = useRef(null);
  const [editButton , setEditButton] = useState([])

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');

  const [searchCourseQuery, setSearchCourseQuery] = useState('');

  // course pagination
  const [totalItems, setTotalItems] = useState(0);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categorysPerPage = 10;

  const [courseList, setCourseList] = useState([]);

  const [searchAuthorQuery, setSearchAuthorQuery] = useState('');
  const [authorList, setAuthorList] = useState([]);
  const [currentAuthorPage, setCurrentAuthorPage] = useState(1);
  const [selectedMentorIds, setSelectedMentorIds] = useState([]);


  // Fetch category data from an API
  const apiUrl = "http://localhost:4000/api/v1/admin/list-category";

  const mentorId = localStorage.getItem('mentor_id')


  const fetchCourseList = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/mentor/get-course-by-mentor/${mentorId}`);
      const courseData = response.data.data;
      setCourseList(courseData);
      setTotalItems(courseData.length)
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(apiUrl);
      const categoryData = response.data.data;
      setCategoryList(categoryData);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const fetchAuthorList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/mentor/list-mentor");
      const categoryData = response.data.data;
      setAuthorList(categoryData);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const fetchDataWithCourseSearch = async () => {
    try {

      console.log("enter")
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://localhost:4000/api/v1/mentor/search-course?course=${searchCourseQuery}`,
        { headers }
      );
      setCourseList(response.data.data);
      setTotalItems(response.data.data.length)
    } catch (error) {
      console.error('Error searching for categorys:', error);
    }
  };

  useEffect(() => {
    console.log(currentPage, "current page")
    fetchAuthorList();
    fetchCourseList();
    fetchCategoryList();
   

  }, []);


  useEffect(() => {
    if (searchCourseQuery) {
      fetchDataWithCourseSearch()
    } else {
      fetchCourseList();
    }
  }, [searchCourseQuery]);

  useEffect(() => {
    if (searchQuery) {
      fetchDataWithSearch();
    } else {
      fetchCategoryList();
    }
  }, [searchQuery]);



  const fetchDataWithSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://localhost:4000/api/v1/admin/search-category?category=${searchQuery}`,
        { headers }
      );
      setCategoryList(response.data.data);
    } catch (error) {
      console.error('Error searching for categorys:', error);
    }
  };

  useEffect(() => {
    if (searchAuthorQuery) {
      fetchDataWithAuthorSearch();
    } else {
      fetchAuthorList();
    }
  }, [searchAuthorQuery]);

  const fetchDataWithAuthorSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://localhost:4000/api/v1/mentor/search-mentor?mentor=${searchAuthorQuery}`,
        { headers }
      );
      setAuthorList(response.data.data);
    } catch (error) {
      console.error('Error searching for categorys:', error);
    }
  };


 

  // category pagination

  const indexOfLastCourse = currentPage * categorysPerPage;
  const indexOfFirstCourse = indexOfLastCourse - categorysPerPage;
  const currentCategories = categoryList.slice(indexOfFirstCourse, indexOfLastCourse);

  // author pagination

  const indexOfLastAuthor = currentAuthorPage * categorysPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - categorysPerPage;
  const currentAuthors = authorList.slice(indexOfFirstAuthor, indexOfLastAuthor);



  const nextPage = () => {
    if (indexOfLastCourse < categoryList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextAuthorPage = () => {
    if (indexOfLastAuthor < authorList.length) {
      setCurrentAuthorPage(currentAuthorPage + 1);
    }
  };

  const prevAuthorPage = () => {
    if (currentAuthorPage > 1) {
      setCurrentAuthorPage(currentAuthorPage - 1);
    }
  };



  // if edit click redirect to edit page

  const handleCreateProjectClick = () => {
    navigate('/mentor-create-course');
  };

  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const itemsPerCoursePage = 10;
  const lastCourseIndex = currentCoursePage * itemsPerCoursePage;
  const firstCourseIndex = lastCourseIndex - itemsPerCoursePage;
  const displayedCourses = courseList.slice(firstCourseIndex, lastCourseIndex);

  // set pagination


  const totalItem = displayedCourses.length; // Total number of items


  const handleCheckboxChange = (categoryId) => {
    if (selectedCourses.includes(categoryId)) {
      setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse !== categoryId));
    } else {
      setSelectedCourses([...selectedCourses, categoryId]);
    }
  };
  
  // Pagination for filtered courses
  const [currentFilteredCoursePage, setCurrentFilteredCoursePage] = useState(1);
  const itemsPerFilteredCoursePage = 10;
  
  const filteredCourses = selectedCourses.length
    ? courseList.filter((course) => selectedCourses.includes(course.category_id._id))
    : courseList;
  
    const lastFilteredCourseIndex = currentFilteredCoursePage * itemsPerFilteredCoursePage;
    const firstFilteredCourseIndex = lastFilteredCourseIndex - itemsPerFilteredCoursePage;
    const displayedFilteredCourses = filteredCourses.slice(firstFilteredCourseIndex, lastFilteredCourseIndex);
    
    const itemsPerTablePage = 10 // Number of items per page
   console.log(currentFilteredCoursePage,"tottttttttt")



  const courseNextPage = () => {
    if (lastFilteredCourseIndex < courseList.length) {
      setCurrentFilteredCoursePage(currentFilteredCoursePage + 1);
    }
  };


  const coursePrevPage = () => {
    if (currentFilteredCoursePage > 1) {
      setCurrentFilteredCoursePage(currentFilteredCoursePage - 1);
    }
  };

  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:4000/api/v1/mentor/delete-course/${projectId}`, { headers });

      setCourseList(courseList.filter(project => project.id !== projectId));
      fetchCourseList()
      setTotalItems((prevTotalItems) => prevTotalItems - 1);

    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEditClick = async (project) => {

    localStorage.setItem("description", project.description);
    localStorage.setItem("instructor", project.instructor);
    localStorage.setItem("course", project.course);
    localStorage.setItem("profile_image", project.profile_image);
    localStorage.setItem("category_id", project.category_id._id);
    setEditButton(project)
    navigate(`/mentor-edit-course/${project._id}`)
  };
  const name = localStorage.getItem('mentor_name')
  const handleDocumentUpload = (courseId) => {
    navigate(`/mentor-lesson-details/${courseId}`);
  };

  const [notifications, setNotifications] = useState(false)

  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

  //log out function
  const handleLogoutClick = () => {
    localStorage.removeItem('token')
    navigate("/")
}


useEffect(() => {
  // Use the ref to focus 
  if (editButtonRef.current) {
    setTimeout(() => {
      editButtonRef.current.focus();
    }, 100); // Adjust the delay as needed
  }
}, [editButton]);













  return (

    <>
      <div className="w-full flex-col md:flex-row p-4 md:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }} className="animate-pulse">{`${name}`}</span>
          </div>
          <div className="flex flex-row justify-end w-full">
            <div className="flex items-center">
              {/* <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded px-2 py-1 mr-4"
                value={searchAuthorQuery}
                onChange={(e) => setSearchAuthorQuery(e.target.value)}
              /> */}
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
              <button className="text-white bg-green-700 hover-bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick= {handleLogoutClick}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        <div className="w-2/8 p-4 bg-gray-300">
          <h2 className="text-lg font-semibold mb-3">Category List</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-500 rounded-lg"
              placeholder="Search Category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {currentCategories.length === 0 ? (
             <div className="w-32 h-32 mx-auto flex items-center justify-center ">
              <p className="px-6 text-center text-gray-600 dark:text-gray-400">
                No category found.
              </p>
            </div>
          ) : (
          <ul>
            {currentCategories.map((category) => (
              <li key={category._id} className="flex items-center mb-2 ml-2" style={{ marginLeft: '2rem' }}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCourses.includes(category._id)}
                  onChange={() => handleCheckboxChange(category._id)}
                />
                {category.category_name}
              </li>
            ))}
          </ul>
          )}
          <div>
            {categoryList.length > categorysPerPage && (
              <div className="flex justify-end mt-3">
                {currentPage > 1 && (
                  <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={prevPage}
                    style={{ marginRight: 'auto' }}
                  >
                    Prev
                  </button>
                )}
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={nextPage}
                  disabled={lastCourseIndex >= courseList.length}
                  style={{ marginLeft: 'auto' }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-3/4 p-4 bg-gray-100 ml-10">
          <h1 className="text-xl mb-4 font-bold">Courses</h1>

          <div className="w-3/4 md:w-full flex justify-end gap-3 ">
            <input
              type="text"
              className="input-sm border border-black-500 rounded-lg p-2"
              placeholder="Search"
              value={searchCourseQuery}
              onChange={(e) => setSearchCourseQuery(e.target.value)}
            />
            <button className="input-sm border dark:border-black-900 rounded-lg p-2" onClick={handleCreateProjectClick}>
              Create course
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </button>
          </div>

          {/* course table */}

          <table className="w-full mt-4 border-b-2 border-gray-300">
            <thead>
              <tr className="p-3 border-t-2 border-b border-gray-300 text-sm text-left">
                <th className="p-3">COURSE</th>
                <th>CATEGORY</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
                <th>VIEW</th>
              </tr>
            </thead>
            {displayedFilteredCourses.length === 0 ? (
             <div className="w-100 h-32 mx-auto flex items-center justify-center ">
              <p className="px-6 text-center text-gray-600 dark:text-gray-400">
                No courses found.
              </p>
            </div>
          ) : (
            <tbody>
              {displayedFilteredCourses.map((project, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="border-t-2 border-b border-gray-300 p-2" >{project.course}</td>
                  <td className="border-t-2 border-b border-gray-300 p-2">{project.category_id.category_name}</td>
                  <td className="border-t-2 border-b border-gray-300 p-2">
                    {project.status === 1 ? 'Approved' : 'Pending'}
                  </td>
                  <td className="border-t-2 border-b border-gray-300 p-2">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="border-t-2 border-b border-gray-300">
                    <div className="space-x-2">
                      <button ref={editButtonRef} layout="link" size="icon" aria-label="Edit" onClick={() => handleEditClick(project)} autoFocus>
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </button>
                      <button layout="link" size="icon" aria-label="Delete" onClick={() => { handleDeleteClick(project._id) }}>
                        <DeleteIcon className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                  <td className="border-t-2 border-b border-gray-300 p-2">
                    <button
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleDocumentUpload(project._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
          </table>

          {/* pagination */}

          <PaginationInfo
            currentPage={currentFilteredCoursePage}
            itemsPerPage={itemsPerTablePage}
            totalItems={displayedFilteredCourses.length}
          />
          <div className="flex justify-end mt-3">
            
            {currentFilteredCoursePage > 1 && (
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={coursePrevPage}
                style={{ marginRight: 'auto' }}
              >
                Prev
              </button>
            )}
            {currentFilteredCoursePage < Math.ceil(totalItems / itemsPerCoursePage) && (
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={courseNextPage}
                style={{ marginLeft: 'auto' }}
              >
                Next
              </button>
            )}
          </div>

        </div>
      </div>



      {/* <div className="flex h-screen">
        <div className="w-2/8 p-4 bg-gray-300">
          <h2 className="text-lg font-semibold mb-3">Author List</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-500 rounded-lg"
              placeholder="Search Authors"
              value={searchAuthorQuery}
              onChange={(e) => setSearchAuthorQuery(e.target.value)}
            />
          </div>
          <ul>
            {currentAuthors.map((mentor) => (
              <li key={mentor._id} className="flex items-center mb-2 ml-2" style={{ marginLeft: '2rem' }}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedAuthorCourses.includes(mentor._id)}
                  onChange={() => handleCheckboxChange(mentor._id)}
                />
                {mentor.mentor_name}
              </li>
            ))}
          </ul>
          {authorList.length > categorysPerPage && (
            <div className="flex justify-end mt-3">
              {currentAuthorPage > 1 && (
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={prevAuthorPage}
                  style={{ marginRight: 'auto' }}
                >
                  Prev
                </button>
              )}
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={nextAuthorPage}
                disabled={indexOfLastAuthor >= 10}
                style={{ marginLeft: 'auto' }}
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div> */}


    </>
  );
};

export default MentorLessionPage;
