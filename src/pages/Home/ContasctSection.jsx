import { useState, useEffect } from 'react';
import contactimage from '../../assets/backgroundimages/contactImage.jpeg';

const ContactSection = () => {
  // Add debug logs for image loading
  useEffect(() => {
    console.log('🔍 Checking contact image path:', contactimage);

    const img = new Image();
    img.onload = () => {
      console.log('✅ Contact background image loaded successfully');
    };
    img.onerror = (error) => {
      console.error('❌ Contact background image failed to load:', error);
    };
    img.src = contactimage;
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${contactimage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="maincontainer h-screen flex flex-col justify-between p-5 lg:p-20"
    >
      {/* Text Section */}
      <div className="text-center">
        <p className="text-lg text-white">
          Original Music. Sonic Branding. Sound Design. Audio Strategy. Music
          Supervision. <span className="text-yellow-400">Sounds good.</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full lg:max-w-[900px] lg:pl-[12%] gap-6 sm:gap-0">
        {/* Contact Person 1 */}
        <div className="text-white text-center sm:text-left">
          <p className="font-bold text-white">Devin Gati</p>
          <p>Executive Producer</p>
        </div>

        {/* Contact Person 2 */}
        <div className="space-y-2 text-center sm:text-left text-white">
          <p className="font-bold">Russell Cloder</p>
          <p>Chief Creative Officer</p>
        </div>

        {/* Contact Details */}
        <div className="text-white text-center sm:text-left space-y-2">
          <p className="flex items-center justify-center sm:justify-start gap-2">
            <span className="material-icons">phone</span>
            (914) 469 -8731
          </p>
          <p className="flex items-center justify-center sm:justify-start gap-2">
            <span className="material-icons">email</span>
            get@thedreamradio.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
