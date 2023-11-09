import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from '../src/components/Navbar';
import Header from '../src/components/Header';
import FeatureSection from './components/FeatureSection';
import DemoPages from './components/DemoPages';
import ContactPage from './components/ContactPage'
import Signup from './components/Signup';
import MainPage from './components/MainPage';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AuthorCourses from './components/AuthorCourses';
import MentorLogin from "./components/mentor/Login";
import MentorSignup from "./components/mentor/Signup";
import MentorPage from './components/mentor/MentorPage';
import MentorLessionPage from './components/mentor/MentorLessionPage';
import EditCourse from './components/mentor/MentorEditCoursePage';
import CourseCreatePage from './components/mentor/CourseCreatePage';
import MentorLessonDetailsPage from './components/mentor/MentorLessonDetailsPage';
import UserLessonDetailsPage from './components/mentor/UserLessonDetailsPage';






function MainLayout() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <FeatureSection />
      <DemoPages />
      <ContactPage />
    </div>
  );
}

function App() {
  return (
    <Router>
       {/* // if we need this in all pages  example like toast ,navbar*/}
       <ToastContainer />  
      
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path= "/login" element= {<Login />} />
        <Route path= "/user-profile" element= {<UserProfile />} />
        <Route path= "/user-lesson-details/:courseId" element= {<UserLessonDetailsPage />} />

        <Route path = "/mentor-login" element= {<MentorLogin />}/>
        <Route path = "/mentor-signup" element= {<MentorSignup />}/>
        <Route path= "/mentor-profile" element= {<MentorPage />} />
        <Route path= "/mentor-course" element= {<MentorLessionPage />} /> 
        <Route path= "/mentor-create-course" element= {<CourseCreatePage />} />
        <Route path="/mentor-edit-course/:id" element={<EditCourse />} />

        <Route path="/mentor-lesson-details/:courseId" element={<MentorLessonDetailsPage/>} />
        <Route path= "/auth-courses" element= {<AuthorCourses />} />
       
      </Routes>
    </Router>
  );
}
export default App;
