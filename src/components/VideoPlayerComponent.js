// LessonVideoPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function LessonVideoPage() {
  const { lessonId } = useParams();
  const [lessonData, setLessonData] = useState({});

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/mentor/get-lesson/${lessonId}`);
        const lessonData = response.data.data;
        setLessonData(lessonData);
      } catch (error) {
        console.error('Error fetching lesson details:', error);
      }
    };

    fetchLessonDetails();
  }, [lessonId]);

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">{lessonData.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="md:col-span-2">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src={`${lessonData.video_url}`}
                title="YouTube Video Player"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{lessonData.title}</h2>
              <p className="text-sm">Code: {lessonData.github_url}</p>
              <p className="text-sm">Duration: {lessonData.duration} hours</p>
            </div>
          </div>

          {/* Related Videos */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Related Videos</h3>
            {/* You can map through related videos and display thumbnails or titles */}
            <div className="mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Related Video Thumbnail"
                className="w-full h-32 object-cover mb-2"
              />
              <p className="text-sm font-semibold">Related Video Title 1</p>
            </div>
            <div className="mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Related Video Thumbnail"
                className="w-full h-32 object-cover mb-2"
              />
              <p className="text-sm font-semibold">Related Video Title 2</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LessonVideoPage;
