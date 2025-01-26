const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  uploadMaxSize: 2 * 1024 * 1024 * 1024, // 2GB in bytes
  thumbnailMaxSize: 10 * 1024 * 1024, // 10MB in bytes
  allowedVideoFormats: ['video/mp4', 'video/webm', 'video/ogg'],
  allowedImageFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};

export default config; 