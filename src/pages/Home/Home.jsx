// import React from 'react';
import AboutSection from './AboutSection';
import ClientSection from './ClientSection';
import ContactSection from './ContasctSection';
import Header from './Header';
import WorkSection from './WorkSection';

const Home = () => {
  return (
    <div className="landing-page-wrapper">
      <Header />
      <ClientSection />
      <div id="work">
        <WorkSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default Home;
