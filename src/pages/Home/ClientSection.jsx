import bgimage from '../../assets/backgroundimages/clientskeyboardbg.jpeg';
import mimage1 from '../../assets/clientsimages/client-logos_06.png';
import mimage11 from '../../assets/clientsimages/client-logos_09.png';
import mimage2 from '../../assets/clientsimages/client-logos_15.png';
import mimage3 from '../../assets/clientsimages/client-logos_18.png';
import mimage4 from '../../assets/clientsimages/client-logos_21.png';
import mimage5 from '../../assets/clientsimages/client-logos_24.png';
import mimage6 from '../../assets/clientsimages/client-logos_31.png';
import mimage7 from '../../assets/clientsimages/client-logos_33.png';
import mimage8 from '../../assets/clientsimages/client-logos_36.png';
import mimage9 from '../../assets/clientsimages/client-logos_38.png';
import mimage10 from '../../assets/clientsimages/client-logos_45.png';
import mimage12 from '../../assets/clientsimages/client-logos_48.png';
import mimage13 from '../../assets/clientsimages/netflix logo.png';
import mimage14 from '../../assets/clientsimages/client-logos_03.png';
import mimage15 from '../../assets/clientsimages/client-logos_48.png';

const ClientSection = () => {
  return (
    <div className="relative text-white  ">
      {/* Black Overlay */}
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        className="absolute inset-0"
      ></div>

      {/* Content (Ensures it appears above the overlay) */}
      <div className="relative z-10  bg-black bg-opacity-50 bg-blend-overlay  px-[5%] py-12">
        <div className="text-yellow-500 text-xl font-bold uppercase pl-4 lg:pl-40 mb-8">
          Clients
        </div>

        {/* Static Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center max-w-[1200px] mx-auto lg:py-20">
          {/* Row 1 */}
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage10}
              alt="Nike"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage12}
              alt="Apple TV"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage9}
              alt="Google"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage4}
              alt="Coca Cola"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage13}
              alt="Netflix"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Row 2 */}
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage11}
              alt="Hulu"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage3}
              alt="AT&T"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage14}
              alt="Beats"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage15}
              alt="ESPN"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage7}
              alt="Fitbit"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Row 3 */}
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage1}
              alt="Lionsgate"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage6}
              alt="Showtime"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage8}
              alt="Meta"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage5}
              alt="Comedy Central"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="w-36 h-24 flex justify-center items-center">
            <img
              src={mimage2}
              alt="Universal Music Group"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSection;
