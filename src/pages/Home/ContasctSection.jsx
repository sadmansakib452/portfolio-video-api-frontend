import contactimage from '../../assets/backgroundimages/contactImage.jpeg';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <>
      <div className="w-full bg-[#f7ce2e] py-3 sm:py-4">
        <h2
          className="text-center text-white text-xl sm:text-2xl font-normal"
          style={{ fontFamily: 'Gotham Regular, sans-serif' }}
        >
          CONTACT
        </h2>
      </div>

      <div
        style={{
          backgroundImage: `url(${contactimage})`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className="maincontainer h-[60vh]  lg:h-screen flex flex-col justify-between p-5 lg:p-20 "
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
            {/* Phone Section */}
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <FaPhoneAlt className="text-yellow-400 text-lg" />{' '}
              {/* Yellow Phone Icon */}
              (914) 469-8731
            </p>

            {/* Email Section */}
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <FaEnvelope className="text-yellow-400 text-lg" />{' '}
              {/* Yellow Email Icon */}
              get@thedreamradio.com
            </p>
          </div>
        </div>

        {/* Contact Details Section */}
      </div>
    </>
  );
};

export default ContactSection;
