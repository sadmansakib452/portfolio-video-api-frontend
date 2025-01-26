import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const WorkSection = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/public/videos`,
        );
        if (response.data.status === 'success') {
          setVideos(response.data.data.videos);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handlePlayVideo = async (index) => {
    const videoRef = videoRefs.current[index];
    if (videoRef) {
      try {
        videoRef.muted = false;

        if (videoRef.requestFullscreen) {
          await videoRef.requestFullscreen();
        } else if (videoRef.webkitRequestFullscreen) {
          await videoRef.webkitRequestFullscreen();
        } else if (videoRef.mozRequestFullScreen) {
          await videoRef.mozRequestFullScreen();
        }

        const playPromise = videoRef.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setActiveVideoIndex(index);
            })
            .catch((error) => {
              console.error('Video play error:', error);
              window.open(videos[index].videoUrl, '_blank');
            });
        }
      } catch (error) {
        console.error('Fullscreen error:', error);
        window.open(videos[index].videoUrl, '_blank');
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        activeVideoIndex !== null
      ) {
        const videoRef = videoRefs.current[activeVideoIndex];
        if (videoRef) {
          videoRef.pause();
          videoRef.currentTime = 0;
          videoRef.muted = true;
        }
        setActiveVideoIndex(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
    };
  }, [activeVideoIndex]);

  if (isLoading) {
    return (
      <div className="w-full bg-[#0B1120] py-3 sm:py-4">
        <h2 className="text-center text-yellow-400 text-xl sm:text-2xl font-semibold">
          WORK
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-[#0B1120]">
      <div className="w-full py-3 sm:py-4">
        <h2 className="text-center text-yellow-400 text-xl sm:text-2xl font-semibold">
          WORK
        </h2>
      </div>
      <section>
        <div className="mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <div
                key={video._id}
                className="relative group cursor-pointer overflow-hidden aspect-[16/9]"
              >
                {/* Video */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  muted
                  playsInline
                  preload="metadata"
                  onMouseOver={(e) => {
                    e.target.muted = true;
                    e.target
                      .play()
                      .catch((err) =>
                        console.error('Preview play error:', err),
                      );
                  }}
                  onMouseOut={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                ></video>

                {/* Thumbnail */}
                <img
                  src={video.thumbnailUrl}
                  alt={`Video Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                />

                {/* Overlay for Play */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => handlePlayVideo(index)}
                >
                  <div className="border-2 border-white rounded-full p-4">
                    <button className="text-white text-xl font-bold">
                      ▶ Play Fullscreen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkSection;
