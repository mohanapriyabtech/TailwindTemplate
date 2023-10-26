import React from 'react';
import gradeBook from "../webim/gradebook.png"
import meeting from "../webim/meeting.jpg"

function DemoPages() {
  return (
    <>
   
    <div id="aboutus" className="ml-20 flex flex-col md:flex-row items-center">
      <div data-aos="fade-right" className="md:w-5/12">
        <h1 className="text-darken font-semibold text-3xl leading-tight lg:pr-32">
          <span className="text-yellow-500">Class Management</span> Tools for Educators
        </h1>
        <p className="my-5 lg:pr-14">
          Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.
        </p>
      </div>
      <img data-aos="fade-left" className="md:w-7/12" src={gradeBook} alt="Gradebook" style={{ width: '40rem', height: 'auto' ,marginTop: '100px'}} />
    </div>
    <div className="ml-20 flex flex-col-reverse md:flex-row items-center md:space-x-10">
      <div data-aos="fade-right" className="md:w-7/12">
        <img className="md:w-11/12" src={meeting} alt="Discussion" style={{ width: '40rem', height: 'auto', marginTop: '100px'}} />
      </div>
      <div data-aos="fade-left" className="md:w-5/12 md:transform md:-translate-y-6">
        <h1 className="font-semibold text-darken text-3xl lg:pr-64">
          One-on-One <span className="text-yellow-500">Discussions</span>
        </h1>
        <p className="text-gray-500 my-5 lg:pr-24">
          Teachers and teacher assistants can talk with students privately without leaving the Zoom environment.
        </p>
      </div>
    </div>
    </>
  );
}

export default DemoPages;
