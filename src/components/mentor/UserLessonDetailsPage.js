import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
import { useParams ,useNavigate} from 'react-router-dom';
import courseImage from "../../webim/program.jpg"
import { MailIcon, BellIcon } from '@heroicons/react/solid';
import { FaSearch } from 'react-icons/fa';
import userData from "../../components/userData.json";
import video from "/home/sparkout/Documents/projects/TailwindTemplate/src/webim/pex.mp4"
  



function UserLessonDetailsPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  console.log(courseId, "course details")
  const [lessonData, setLessonData] = useState([]);
  const [mentorName, setMentorName] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, recommendedVideos, authors } = userData;



  useEffect(() => {

    const fetchLessonList = async () => {
      try {
        const course_id = localStorage.getItem('course_id')
        const response = await axios.get(`https://learning-application.onrender.com/api/v1/mentor/get-lesson-by-course/${courseId}`);
        const lessonData = response.data.data;
        setLessonData(lessonData);
        // Get the mentor name using mentor_id
        const mentorId = lessonData[0].mentor_id;
        const mentorResponse = await axios.get(`https://learning-application.onrender.com/api/v1/mentor/get-mentor/${mentorId}`);
        const mentorData = mentorResponse.data.data;
        setMentorName(mentorData.mentor_name);

      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    };
    fetchLessonList()

  }, []);

  //log out function
  const handleLogoutClick = () => {
    localStorage.removeItem('token')
    navigate("/")
 
   }


  const [notifications, setNotifications] = useState(false)

  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

  const name = localStorage.getItem("user_name")

  return (
    <>
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
          <h2 className="text-2xl font-bold mb-4">Lession List</h2>
        
          {lessonData.length === 0 ? (
             <div className="w-100 mb-20 mx-auto flex items-center justify-center ">
              <p className="px-6 text-center text-gray-600 dark:text-gray-400">
                No lessions found.
              </p>
            </div>
          ) : (
            
            <div className="flex flex-wrap -mx-4">
            {lessonData.map((lesson) => (
              <div key={lesson._id} className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
                <a href={`/lessons/${lesson._id}`} className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                  <div className="relative pb-48 overflow-hidden">
                  <video
                    controls
                    className="absolute inset-0 h-full w-full object-cover"
                    src={video}  
                    alt="Video"
                  >
                    Your browser does not support the video tag.
                  </video>
                  </div>
                  <div className="p-4">
                    <h2 className="mt-2 mb-2 font-bold">{lesson.title}</h2>
                    <p className="text-sm">code: {lesson.github_url}</p>
                    <p className="text-sm">Duration: 2.30 hours</p>
                    <div className="mt-3 flex items-center">
                      <span className="text-sm font-semibold"></span>
                      <span className="font-bold text-md">Mentor: {mentorName}</span>
                      {/* <span className="text-sm font-semibold">$</span> */}
                    </div>
                  </div>
                  <div className="p-4 border-t border-b text-xs text-gray-700 flex  justify-between">
                    <span className="flex items-center mb-1">
                      {/* <i className="far fa-clock fa-fw mr-2 text-gray-900"></i>Duration: {lesson.duration} */}
                    </span>
                    <span className="flex items-center">
                      {/* <i className="far fa-address-card fa-fw text-gray-900 mr-2"></i>Discount : {lesson.discount}% */} completed
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
         
          )}
        
        </div>
      </div>
    </>
  );
}

export default UserLessonDetailsPage;
