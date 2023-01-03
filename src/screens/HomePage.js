import React, { useEffect } from "react";
//Components
import HomeServices from "../components/homePage sections/HomeServices";
import Header from "../components/homePage sections/Header";
import NavBarr from "../containers/NavBarr";
import Footer from "../containers/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
// import HomeMessage from "../components/homePage sections/HomeMessage";
import ServicesStat from "../components/homePage sections/ServicesStat";
export default function HomePage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="homePage">
      <NavBarr />
      <Header />

      <div data-aos="fade-up">
        <HomeServices />
        <ServicesStat />
      </div>
      {/* <HomeMessage /> */}
      <Footer />
    </div>
  );
}
