
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
 
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/trash.svg';
import PaginationInfo from '../TablePagination';
import logo from '../../webim/logo.png';
import { useParams } from 'react-router-dom';
import { MailIcon, BellIcon } from '@heroicons/react/solid';
  


const MentorLessonDetailsPage = () => {
  const { courseId } = useParams()

  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  // lesson pagination
  const [totalItems, setTotalItems] = useState(0);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const categorysPerPage = 10;

  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [lessonList, setLessonList] = useState([]);


  const [searchAuthorQuery, setSearchAuthorQuery] = useState('');



  // Fetch category data from an API
  const apiUrl = `https://learning-application.onrender.com/api/v1/admin/list-category`;


  const fetchLessonList = async () => {
    try {
      const response = await axios.get(`https://learning-application.onrender.com/api/v1/mentor/get-lesson-by-course/${courseId}`);
      const lessonData = response.data.data;
      setLessonList(lessonData);
      setTotalItems(lessonData.length)
    } catch (error) {
      console.error('Error fetching lesson data:', error);
    }
  };

  //   const fetchCategoryList = async () => {
  //     try {
  //       const response = await axios.get(apiUrl);
  //       const categoryData = response.data.data;
  //       setCategoryList(categoryData);
  //     } catch (error) {
  //       console.error('Error fetching category data:', error);
  //     }
  //   };



  useEffect(() => {

    fetchLessonList();
    // fetchCategoryList();
  }, []);


  useEffect(() => {
    if (searchQuery) {
      fetchDataWithSearch();
    } else {
      fetchLessonList();
    }
  }, [searchQuery]);


    const fetchDataWithSearch = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `https://learning-application.onrender.com/api/v1/mentor/search-lesson?lesson=${searchQuery}`,
          { headers }
        );
        setLessonList(response.data.data);
      } catch (error) {
        console.error('Error searching for categorys:', error);
      }
    };





  const handleCheckboxChange = (categoryId) => {
    if (selectedCourses.includes(categoryId)) {
      setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse !== categoryId));
    } else {
      setSelectedCourses([...selectedCourses, categoryId]);
    }
  };

  const filteredCourses = selectedCourses.length
    ? lessonList.filter((lesson) => selectedCourses.includes(lesson.category_id))
    : lessonList;

  // category pagination

  //   const indexOfLastCourse = currentPage * categorysPerPage;
  //   const indexOfFirstCourse = indexOfLastCourse - categorysPerPage;
  //   const currentCourses = categoryList.slice(indexOfFirstCourse, indexOfLastCourse);





  // if edit click redirect to edit page

  const handleCreateProjectClick = () => {
    navigate('/mentor-create-lesson');
  };

  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const itemsPerCoursePage = 10;
  const lastCourseIndex = currentCoursePage * itemsPerCoursePage;
  const firstCourseIndex = lastCourseIndex - itemsPerCoursePage;
  const displayedCourses = lessonList.slice(firstCourseIndex, lastCourseIndex);

  // set pagination

  const itemsPerTablePage = displayedCourses.length; // Number of items per page
  const totalItem = displayedCourses.length; // Total number of items




  const lessonNextPage = () => {
    if (lastCourseIndex < lessonList.length) {
      setCurrentCoursePage(currentCoursePage + 1);
    }
  };


  const lessonPrevPage = () => {
    if (currentCoursePage > 1) {
      setCurrentCoursePage(currentCoursePage - 1);
    }
  };

  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`https://learning-application.onrender.com/api/v1/mentor/delete-lesson/${projectId}`, { headers });

      setLessonList(lessonList.filter(project => project.id !== projectId));
      fetchLessonList()
      setTotalItems((prevTotalItems) => prevTotalItems - 1);

    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEditClick = async (project) => {

    localStorage.setItem("description", project.description);
    localStorage.setItem("instructor", project.instructor);
    localStorage.setItem("lesson", project.lesson);
    localStorage.setItem("profile_image", project.profile_image);
    localStorage.setItem("category_id", project.category_id);
    localStorage.setItem("course_id", project._id)

    navigate(`/mentor-edit-lesson/${project._id}`)
  };

  const handleDocumentUpload = () => {
    navigate('/mentor-lesson-details')
  }

  const [notifications, setNotifications] = useState(false)

  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

  //log out function
  const handleLogoutClick = () => {
    localStorage.removeItem('token')
    navigate("/")
}




  return (

    <>
      <div className="w-full flex-col md:flex-row p-4 md:p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }} className="animate-pulse">Xpert</span>
          </div>
          <div className="flex flex-row justify-end w-full">
            <div className="flex items-center">
              
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

      <div className="flex ">
        <div className="w-full p-4 bg-gray-300">
          {/* <h2 className="text-lg font-semibold mb-3">Lesson details</h2> */}
          <div className="mb-4">
          </div>

          <div className="w-3/4 p-4 bg-gray-100 ml-10">
            <h1 className="text-xl mb-4 font-bold">Lesson Details</h1>

            <div className="w-3/4 md:w-full flex justify-end gap-3 ">
              <input
                type="text"
                className="input-sm border border-black-500 rounded-lg p-2"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="input-sm border dark:border-green-900 rounded-lg p-2" onClick={handleCreateProjectClick}>
                Create lesson
                <span className="ml-2" aria-hidden="true">
                  +
                </span>
              </button>
            </div>

            {/* lesson table */}

            <table className="w-full mt-4 border-b-2 border-gray-300">
              <thead>
                <tr className="p-3 border-t-2 border-b border-gray-300 text-sm text-left">
                  <th className="p-3">LESSON</th>
                  <th>COURSE NAME</th>
                  <th>GITHUB</th>
                  <th>VIDEO</th>
                  <th>DOCUMENT</th>
                  <th>ACTIONS</th>
                  <th>FINISH</th>
                </tr>
              </thead>
              {lessonList.length === 0 ? (
                <div className="w-100 h-32 mx-auto flex items-center justify-center ">
                  <p className="px-6 text-center text-gray-600 dark:text-gray-400">
                    No lessons found.
                  </p>
                </div>
              ) : (
              <tbody>
                {lessonList.map((project, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="border-t-2 border-b border-gray-300 p-2">{project.title}</td>
                    <td className="border-t-2 border-b border-gray-300 p-2">{project.course_id}</td>
                    <td className="border-t-2 border-b border-gray-300 p-2">{project.github_url}</td>
                    <td className="border-t-2 border-b border-gray-300 p-2">video url</td>
                    <td className="border-t-2 border-b border-gray-300 p-2">document url</td>
                    {/* <td className="border-t-2 border-b border-gray-300 p-2">
                    {project.status === 1 ? 'Approved' : 'Pending'}
                  </td> */}
                    <td className="border-t-2 border-b border-gray-300 p-2">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td className="border-t-2 border-b border-gray-300">
                      <div className="space-x-2">
                        <button layout="link" size="icon" aria-label="Edit" onClick={() => handleEditClick(project)}>
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
                        onClick={handleDocumentUpload}
                      >
                        FINISH
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              )}
            </table>

            {/* pagination */}

            <PaginationInfo
              currentPage={currentCoursePage}
              itemsPerPage={itemsPerTablePage}
              totalItems={totalItems}
            />
            <div className="flex justify-end mt-3">
              {currentCoursePage > 1 && (
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={lessonPrevPage}
                  style={{ marginRight: 'auto' }}
                >
                  Prev
                </button>
              )}
              {currentCoursePage < Math.ceil(totalItems / itemsPerCoursePage) && (
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={lessonNextPage}
                  style={{ marginLeft: 'auto' }}
                >
                  Next
                </button>
              )}
            </div>

          </div>
        </div>





      </div>


    </>
  );
};

export default MentorLessonDetailsPage;
