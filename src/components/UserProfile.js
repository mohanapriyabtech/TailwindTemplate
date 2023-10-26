import React, { useState } from 'react';
import userData from './userData.json';

function UserProfile() {
  const { user, recommendedVideos, authors } = userData;
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoDetails = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="user-profile bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
        <img src={process.env.PUBLIC_URL + user.avatar} alt={user.name} className="w-20 h-20 rounded-full" />
        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-gray-600">{user.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendedVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative" onClick={() => handleVideoClick(video)}>
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover cursor-pointer" />
              <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-bl">
                New
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
              <p className="text-sm text-gray-700">Author: {video.authorName}</p>
            
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="video-details-modal fixed top-0 left-0 right-0 bottom-0 bg-white p-4">
          <button onClick={closeVideoDetails} className="text-blue-500 hover:underline text-right cursor-pointer">
            Close
          </button>
          <h2 className="text-2xl font-bold mb-4">{selectedVideo.title}</h2>
          <p className="text-gray-600">{selectedVideo.description}</p>
          {/* Add more video details here */}
        </div>
      )}

      <div className="author-list mt-8">
        <h2 className="text-2xl font-bold mb-4">Authors</h2>
        <div className="flex">
          {authors.map((author) => (
            <div key={author.id} className="author-card">
              <img src={process.env.PUBLIC_URL + author.avatar} alt={author.name} className="w-20 h-20 rounded-full" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{author.name}</h3>
                <p className="text-sm text-gray-600">{author.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
