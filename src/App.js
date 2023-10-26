import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path= "/login" element= {<Login />} />
        <Route path= "/user-profile" element= {<UserProfile />} />
        <Route path= "/auth-courses" element= {<AuthorCourses />} />
      </Routes>
    </Router>
  );
}
export default App;
