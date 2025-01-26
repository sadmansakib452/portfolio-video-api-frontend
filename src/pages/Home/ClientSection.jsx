import Marquee from "react-fast-marquee";
import bgimage from "../../assets/backgroundimages/clientskeyboardbg.jpeg";
import mimage1 from "../../assets/clientsimages/client-logos_06.png";
import mimage11 from "../../assets/clientsimages/client-logos_09.png";
import mimage2 from "../../assets/clientsimages/client-logos_15.png";
import mimage3 from "../../assets/clientsimages/client-logos_18.png";
import mimage4 from "../../assets/clientsimages/client-logos_21.png";
import mimage5 from "../../assets/clientsimages/client-logos_24.png";
import mimage6 from "../../assets/clientsimages/client-logos_31.png";
import mimage7 from "../../assets/clientsimages/client-logos_33.png";
import mimage8 from "../../assets/clientsimages/client-logos_36.png";
import mimage9 from "../../assets/clientsimages/client-logos_38.png";
import mimage10 from "../../assets/clientsimages/client-logos_45.png";

const ClientSection = () => {
  const clients1 = [
    { src: mimage1, alt: "Nike" },
    { src: mimage11, alt: "Apple TV" },
    { src: mimage2, alt: "Google" },
    { src: mimage3, alt: "Coca Cola" },
    { src: mimage8, alt: "Coca Cola" },
  ];
  const clients2 = [
    { src: mimage4, alt: "Nike" },
    { src: mimage5, alt: "Apple TV" },
    { src: mimage6, alt: "Google" },
    { src: mimage7, alt: "Coca Cola" },
  ];
  const clients3 = [
    { src: mimage8, alt: "Nike" },
    { src: mimage9, alt: "Apple TV" },
    { src: mimage9, alt: "Google" },
    { src: mimage10, alt: "Coca Cola" },
  ];

  return (
    <div>
      {/* Background Section */}
      <div
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="text-white px-[5%] py-12"
      >
        <div className="text-yellow-500 text-xl font-bold uppercase pl-4 lg:pl-40 mb-8">
          Clients
        </div>

        <div className="flex justify-center items-center h-auto max-w-[1024px] mx-auto">
          <div className="marqueesetion w-full">
            <div>
              <Marquee gradient={false} speed={50} className="w-full">
                <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
                  {clients1.map((client, index) => (
                    <div
                      key={index}
                      className="w-24 sm:w-32 md:w-40 lg:w-48 mx-auto"
                    >
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>

            <div className="py-5 lg:py-12">
              <Marquee
                direction="right"
                gradient={false}
                speed={50}
                className="w-full"
              >
                <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
                  {clients2.map((client, index) => (
                    <div
                      key={index}
                      className="w-24 sm:w-32 md:w-40 lg:w-48 mx-auto"
                    >
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>

            <div>
              <Marquee gradient={false} speed={50} className="w-full">
                <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
                  {clients3.map((client, index) => (
                    <div
                      key={index}
                      className="w-24 sm:w-32 md:w-40 lg:w-48 mx-auto"
                    >
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSection;
