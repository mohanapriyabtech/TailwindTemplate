import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ellipse from '../webim/Ellipse.png'; 
import Wave3 from '../webim/wave3.png';
import Wave from '../webim/wave3.png';
import Loading from '../webim/loading.png';
import staff from "../webim/Rectangle 19.png";
import student from "../webim/Rectangle 21.png";
import backgroundImage from "../webim/photo-1559144975-22228b3bb1d3.avif"
import mainPicture from "../webim/person-working-html-computer.jpg"
import "../components/css/Header.css"


function Header() {
  const navigate = useNavigate();
  
  const handleOnClick = () => {
    navigate('/login')
  }
  const handleMentorOnClick = () => {
    navigate('/mentor-login')
  }


  return (
    <>
      <div className="ml-20 h-screen bg-cream" style={{ marginTop: '100px' }}>
        <div id="home" className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start">
          {/* Content Div */}
          <div className="flex flex-col w-full lg:w-12/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
            <h1 data-aos="fade-right" data-aos-once="true" className="my-4 text-5xl font-bold leading-tight text-darken">
              <span className="text-yellow-500">Studying</span> Online is now much easier
            </h1>
            <p data-aos="fade-down" data-aos-once="true" data-aos-delay="300" className="leading-normal text-2xl mb-8">Xpert is an interesting platform that will teach you in a more interactive way</p>
            <div data-aos="fade-up" data-aos-once="true" data-aos-delay="700" className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5">
              {/* <button className="lg:mx-0 bg-yellow-500 text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out animate-bounce" onClick={handleOnClick}>
                User Login
              </button>
              <button className="lg:mx-0 bg-yellow-500 text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out animate-bounce" onClick={handleOnClick}>
                Mentor Login
              </button> */}
              {/* <div className="flex items-center justify-center space-x-3 mt-5 md:mt-0 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out"> */}
                {/* <button className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5751 12.8097C23.2212 13.1983 23.2212 14.135 22.5751 14.5236L1.51538 27.1891C0.848878 27.5899 5.91205e-07 27.1099 6.25202e-07 26.3321L1.73245e-06 1.00123C1.76645e-06 0.223477 0.848877 -0.256572 1.51538 0.14427L22.5751 12.8097Z" fill="#23BDEE" />
                  </svg>
                </button>
                <span className="cursor-pointer">Watch how it works</span> */}
              {/* </div> */}
              <div data-aos="fade-up" className="flex flex-col mb-5 md:flex-row justify-left space-y-5 md:space-y-0 md:space-x-6 lg:space-x-10 mt-7 ml-0">
              <div className="relative md:w-5/12" >
                <img className="rounded-2xl" src={staff} alt="" />
                <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3 mr-20">FOR INSTRUCTORS</h1>
                    <button className="rounded-full text-white text-xl lg:text-xl px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out animate-pulse" onClick={handleMentorOnClick} style={{ background: 'rgba(35, 18, 255, 0.9)',width:"180px" }}>click</button>
                  </div>
                </div>
              </div>
              <div className="relative md:w-5/12">
                <img className="rounded-2xl bg-opacity-20" src={student} alt="" style={{ zIndex: -4 }} />
                <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3 mr-20">FOR STUDENTS</h1>
                    <button className="rounded-full text-white text-xl lg:text-xl px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out animate-pulse" onClick={handleOnClick} style={{ background: 'rgba(35, 18, 255, 0.9)',width:"180px", }}>click</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
         
          {/* Image Div */}
          <div className="ml-20 w-full lg:w-6/12 lg:-mt-30 relative flex justify-end " id="girl" style={{ marginRight: '100px' }}>
            <div className="flexCenter" style={{ zIndex: 1, position: 'relative', marginTop: '200px', marginRight: '-50px', textAlign: 'center' }}>
              {/* <div className="additional-content" style={{ backgroundColor: 'rgba(35, 189, 238, 0.5)', color: 'rgba(255, 255, 255, 0.6)', color: 'white', width: '300px', height: '100px', border: '1px solid black', borderRadius: '8px',fontSize: '12px', textAlign: 'center',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div className="content-box">
                  <p className="content-text">
                    <span className="quote-mark">&ldquo;</span> Friends, such as we desire, are dreams and fables. Friendship demands the ability to do without it. <span className="quote-mark">&rdquo;</span>
                  </p>
                </div>
                <p className="author-name" style={{color: 'yellow',fontSize: '12px'}} >- Ralph Waldo Emerson</p>
              </div> */}
            </div>
            <img src={mainPicture} alt="mainPicture" style={{ width: '100%', height: 'auto',marginTop: '100px',marginLeft: '100px',position: 'relative',zIndex:"-4" , float:'right'}} />
            <img src={Ellipse} alt="Ellipse" className="z-20 w-6 absolute right-96 top-20 mt-20 animate-ping animate-delay-300 animate-duration-500" />
          </div>
        </div>
        
      </div>
      




      <section id="product" className="bg-[#f8f6f8] h-screen flex px-[10%] py-[6%]">
        <div className="mt-15">
          <div data-aos="flip-down" className="text-center max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">What is<span className="text-yellow-500">Xpert?</span></h1>
            <p className="text-gray-500">Xpert is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.</p>
          </div>
          <div data-aos="fade-up" className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-6 lg:space-x-10 mt-7">
            <div className="relative md:w-5/12" >
              <img className="rounded-2xl" src={staff} alt="" />
              <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* <h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3">FOR INSTRUCTORS</h1>
                  <button className="rounded-full text-white border text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out">Start a class today</button> */}
                </div>
              </div>
            </div>
            <div className="relative md:w-5/12">
              <img className="rounded-2xl bg-opacity-20" src={student} alt="" style={{ zIndex: -4 }} />
              <div className="absolute bg-black bg-opacity-20 bottom-0 left-0 right-0 w-full h-full rounded-2xl">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* <h1 className="uppercase text-white font-bold text-center text-sm lg:text-xl mb-3">FOR STUDENTS</h1>
                  <button className="rounded-full text-white text-xs lg:text-md px-6 py-3 w-full font-medium focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out" style={{ background: 'rgba(35, 189, 238, 0.9)' }}>Enter access code</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="card bg-blue-500 text-white p-4">
        <div className="card-title">Card Title</div>
        <div className="card-content">
          This is some example content for the card. You can put text, images, or other elements here.
        </div>
      </div> */}
      {/* <section className="bg-[#f3f5f5] h-100 flex px-[10%] py-[6%] flex-col items-center ">
        <h4 className="p-4 text-center text-3xl font-bold text-black-500">Courses</h4>
        <div className="h-40 w-full overflow-hidden">
          <div id="scroll-slider" className="animate-slide-right flex w-96 p-4">
            <div className="m-4 h-40 w-80 flex-shrink-0 rounded-lg border bg-gray-300 p-4">
              <h2 className="text-lg font-semibold">Computer foundamentals</h2>
            </div>
            <div className="m-4 h-40 w-80 flex-shrink-0 rounded-lg border bg-gray-300 p-4">
              <h2 className="text-lg font-semibold">HTML</h2>
            </div>
            <div className="m-4 h-40 w-80 flex-shrink-0 rounded-lg border bg-gray-300 p-4">
              <h2 className="text-lg font-semibold">CSS Styling</h2>
            </div>
            <div className="m-4 h-40 w-80 flex-shrink-0 rounded-lg border bg-gray-300 p-4">
              <h2 className="text-lg font-semibold">Javascript Basics</h2>
            </div>

            <div className="m-4 h-40 w-80 flex-shrink-0 rounded-lg border bg-gray-300 p-4">
              <h2 className="text-lg font-semibold">React</h2>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Header;