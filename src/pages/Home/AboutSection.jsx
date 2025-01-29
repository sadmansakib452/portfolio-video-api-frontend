import abgimage from '../../assets/backgroundimages/aboutbg.png';

const AboutSection = () => {
  return (
    <div className="flex flex-col w-full">
      {/* About Header */}
      <div className="w-full bg-yellow-400 py-3 sm:py-4">
        <h2 className="text-center text-xl sm:text-2xl font-semibold">ABOUT</h2>
      </div>

      {/* Main Content Section */}
      <div
        style={{
          backgroundImage: `url(${abgimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundColor: 'black',
        }}
        className="text-white min-h-screen flex items-center"
      >
        <div className="flex justify-end w-full px-4 sm:px-6 md:px-8">
          {/* Text Content */}
          <div className="w-full md:w-3/4 lg:w-1/2 pr-4 sm:pr-8 md:pr-12 lg:pr-[20%] space-y-4 sm:space-y-6 md:space-y-8">
            <div>
              <p className="text-base sm:text-lg leading-relaxed">
                A benchmark of excellence in music and audio services,{' '}
                <span className="text-yellow-400">DREAM RADIO</span> represents
                the intersection of artistry and technology. Renowned for
                multi-genre expertise, cutting-edge production, and a bold
                creative stamp, the team has earned the lasting trust of the
                world s leading brands and creators.
              </p>
            </div>
            <div>
              <p className="text-base sm:text-lg leading-relaxed">
                Our mission is to push beyond mere sound — to elevate visions
                and craft moments that leave an emotional legacy.
              </p>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default AboutSection;
