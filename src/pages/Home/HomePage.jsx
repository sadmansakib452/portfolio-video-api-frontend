// import React, { useState, useEffect } from "react";

import { useState } from "react";
import { useEffect } from "react";

const HomePage = () => {
  const [workVideos, setWorkVideos] = useState([]);

  // Load data from JSON
  useEffect(() => {
    fetch("/videos.json") // Replace with the correct JSON file path
      .then((response) => response.json())
      .then((data) => setWorkVideos(data));
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      {/* Header Section */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">Dream Radio</h1>
        <p className="mt-4 text-lg">
          Where words leave off, <span className="text-yellow-400">music</span> begins.
        </p>
      </header>

      {/* Clients Section */}
      <section className="py-10 bg-gray-800">
        <h2 className="text-center text-xl font-semibold mb-6">Clients</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Add client logos here */}
          <img src="/path-to-logo.png" alt="Nike" className="h-12" />
          <img src="/path-to-logo.png" alt="Google" className="h-12" />
          {/* Add more logos */}
        </div>
      </section>

      {/* Work Section */}
      <section className="py-10 bg-black">
        <h2 className="text-center text-xl font-semibold mb-6">Work</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6">
          {workVideos.map((video, index) => (
            <div key={index} className="relative group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-64 object-cover group-hover:hidden"
              />
              <video
                src={video.url}
                className="absolute top-0 left-0 w-full h-full object-cover hidden group-hover:block"
                muted
                autoPlay
                loop
              />
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 bg-yellow-500 text-black">
        <h2 className="text-center text-xl font-semibold mb-6">About</h2>
        <div className="px-6 max-w-4xl mx-auto text-center">
          <p>
            A benchmark of excellence in music and audio services, DREAM RADIO
            represents the intersection of artistry and technology.
          </p>
          <p className="mt-4">
            Our mission is to push beyond mere sound—to elevate visions and
            craft moments that leave an emotional legacy.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 bg-gray-900">
        <h2 className="text-center text-xl font-semibold text-yellow-400 mb-6">
          Contact
        </h2>
        <div className="px-6 max-w-4xl mx-auto text-center">
          <p>
            Original Music, Sonic Branding, Sound Design, Audio Strategy. Music
            Supervision. <span className="text-yellow-400">Sounds good.</span>
          </p>
          <p className="mt-4">Email: get@dreamradio.com</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
