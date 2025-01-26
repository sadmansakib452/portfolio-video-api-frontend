import { useState } from 'react';
import bgImage from '../../assets/backgroundimages/aboutbg.png';

const ContactSection = () => {
  // Add debug logs
  useEffect(() => {
    console.log(
      '🔍 Checking background image path:',
      '/src/assets/backgroundimages/aboutbg.png',
    );

    // Test if image exists
    const img = new Image();
    img.onload = () => {
      console.log('✅ Background image loaded successfully');
    };
    img.onerror = (error) => {
      console.error('❌ Background image failed to load:', error);
    };
    img.src = '/src/assets/backgroundimages/aboutbg.png';
  }, []);

  // ... rest of your code

  return (
    <div className="relative min-h-screen">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-black"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        onLoad={() => console.log('🎨 Background div loaded')}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>

      {/* ... rest of your code */}
    </div>
  );
};

export default ContactSection;
