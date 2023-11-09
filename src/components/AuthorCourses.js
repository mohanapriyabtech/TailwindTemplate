import React from 'react';
import { useParams } from 'react-router-dom';
 
import userData from './userData.json';
  





function AuthorCourses() {
  const { authorId } = useParams();
  const author = userData.authors.find((author) => author.id === parseInt(authorId, 10));

//   if (!author) {
//     return <div>Author not found.</div>;
//   }

  // Sample list of courses related to the author
  const authorCourses = [
    {
      id: 1,
      title: 'Course 1',
      description: 'This is the description for Course 1.',
    },
    {
      id: 2,
      title: 'Course 2',
      description: 'This is the description for Course 2.',
    },
    // Add more courses as needed
  ];

  return (
    <div className="author-courses-container">
      {/* <div className="author-header">
        <img
          src={process.env.PUBLIC_URL + author.avatar}
          alt={author.name}
          className="author-avatar"
        />
        <div className="author-info">
          <h2>{author.name}</h2>
          <p className="author-description">{author.description}</p>
        </div>
      </div> */}

      {/* <h3 className="courses-title">Courses by {author.name}:</h3> */}

      <ul className="course-list">
        {authorCourses.map((course) => (
          <li key={course.id} className="course-item">
            <div className="course-details">
              <h4 className="course-title">{course.title}</h4>
              <p className="course-description">{course.description}</p>
            </div>
            <button className="start-course-button">
              Start Course
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorCourses;
